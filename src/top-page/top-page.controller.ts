import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common'
import { FindTopPageDto } from '@app/top-page/dto/find-top-page.dto'
import { TopPageModel } from '@app/top-page/top-page.model'

@Controller('product')
export class TopPageController {

	@Post('create')
	async create(@Body() dto: Omit<TopPageModel, '_id'>) {

	}

	@Get(':id')
	async get(@Param('id') id: string) {

	}

	@Delete(':id')
	async delete(@Param('id') id: string) {

	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: TopPageModel) {

	}

	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindTopPageDto) {

	}
}
