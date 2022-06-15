import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { DocumentType } from '@typegoose/typegoose/lib/types'
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
    private readonly hhService: HhService
  ) { }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateTopPageDto): Promise<DocumentType<TopPageModel>> {
    return await this.topPageService.create(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id', IdValidationPipe) id: string): Promise<DocumentType<TopPageModel> | null> {
    const topPage = await this.topPageService.findById(id)

    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
    }
    return topPage
  }

  @Get()
  async findAll(): Promise<DocumentType<TopPageModel>[] | null> {
    return await this.topPageService.findAll()
  }

  @Get('byAlias/:alias')
  async findByAlias(@Param('alias') alias: string): Promise<DocumentType<TopPageModel> | null> {
    const topPage = await this.topPageService.findByAlias(alias)

    if (!topPage) {
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
  async deleteById(@Param('id', IdValidationPipe) id: string): Promise<DocumentType<TopPageModel> | null> {
    const deletedTopPage = await this.topPageService.deleteById(id)

    if (!deletedTopPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR)
    }
    return deletedTopPage
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateById(@Param('id', IdValidationPipe) id: string, @Body() dto: TopPageModel): Promise<DocumentType<TopPageModel> | null> {
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

  @Get('test')
  async test() {
    const data = await this.topPageService.findForHhUpdate(new Date())
    for (let page of data) {
      const hhData = await this.hhService.getData(page.category)
      console.log(hhData)
      page.hh = hhData
      await this.topPageService.updateById(page._id, page)
    }
  }
}
