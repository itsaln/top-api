import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { IdValidationPipe } from '@app/pipes/ad-validation.pipe'
import { JwtAuthGuard } from '@app/auth/guards/jwt.guard'
import { TopPageModel } from '@app/top-page/top-page.model'
import { CreateTopPageDto } from '@app/top-page/dto/create-top-page.dto'
import { FindTopPageDto } from '@app/top-page/dto/find-top-page.dto'
import { TopPageService } from '@app/top-page/top-page.service'
import { TOP_PAGE_NOT_FOUND_ERROR } from '@app/top-page/top-page.constants'

@Controller('top-page')
export class TopPageController {
	constructor(private readonly topPageService: TopPageService) {}

	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		return await this.topPageService.create(dto)
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async findById(@Param('id', IdValidationPipe) id: string) {
		const topPage = await this.topPageService.findById(id)

		if(!topPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
		}
		return topPage
	}

	@Get('byAlias/:alias')
	async findByAlias(@Param('alias') alias: string) {
		const topPage = await this.topPageService.findByAlias(alias)

		if(!topPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
		}
		return topPage
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async findByCategory(@Body() dto: FindTopPageDto) {
		return await this.topPageService.findByCategory(dto.firstCategory)
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async deleteById(@Param('id', IdValidationPipe) id: string) {
		const deletedtopPage = await this.topPageService.deleteById(id)

		if(!deletedtopPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
		}
		return deletedtopPage
	}

	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async updateById(@Param('id', IdValidationPipe) id: string, @Body() dto: TopPageModel) {
		const updatedtopPage = await this.topPageService.updateById(id, dto)

		if(!updatedtopPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
		}
		return updatedtopPage
	}
}
