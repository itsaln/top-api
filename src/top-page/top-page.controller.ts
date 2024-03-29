import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode, Logger,
	NotFoundException,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { DocumentType } from '@typegoose/typegoose/lib/types'
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule'
import { IdValidationPipe } from '@app/pipes/ad-validation.pipe'
import { JwtAuthGuard } from '@app/auth/guards/jwt.guard'
import { CreateTopPageDto } from '@app/top-page/dto/create-top-page.dto'
import { FindTopPageDto } from '@app/top-page/dto/find-top-page.dto'
import { TopPageModel } from '@app/top-page/top-page.model'
import { TopPageService } from '@app/top-page/top-page.service'
import { HhService } from '@app/hh/hh.service'
import { TOP_PAGE_NOT_FOUND_ERROR } from '@app/top-page/top-page.constants'

@Controller('top-page')
export class TopPageController {
	constructor(
		private readonly topPageService: TopPageService,
		private readonly hhService: HhService,
		private readonly schedulerRegistry: SchedulerRegistry
	) {}

	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	@Post('create')
	create(@Body() dto: Omit<CreateTopPageDto, 'hh.updatedAt'>) {
		return this.topPageService.create(dto)
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async findById(@Param('id', IdValidationPipe) id: string) {
		const topPage = await this.topPageService.findById(id)

		if (!topPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
		}
		return topPage
	}

	@Get()
	findAll(): Promise<DocumentType<TopPageModel>[] | null> {
		return this.topPageService.findAll()
	}

	@Get('byAlias/:alias')
	async findByAlias(@Param('alias') alias: string) {
		const topPage = await this.topPageService.findByAlias(alias)

		if (!topPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
		}
		return topPage
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	findByCategory(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto.firstCategory)
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async deleteById(@Param('id', IdValidationPipe) id: string) {
		const deletedTopPage = await this.topPageService.deleteById(id)

		if (!deletedTopPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
		}
		return deletedTopPage
	}

	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async updateById(@Param('id', IdValidationPipe) id: string, @Body() dto: TopPageModel) {
		const updatedTopPage = await this.topPageService.updateById(id, dto)

		if (!updatedTopPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
		}
		return updatedTopPage
	}

	@Get('textSearch/:text')
	async textSearch(@Param('text') text: string) {
		return this.topPageService.findByText(text)
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { name: 'test' })
	async test() {
		const job = this.schedulerRegistry.getCronJob('test')
		const data = await this.topPageService.findForHhUpdate(new Date())
		for (const page of data) {
			page.hh = await this.hhService.getData(page.category)
			Logger.log(page.hh)
			return this.topPageService.updateById(page._id, page)
		}
	}
}
