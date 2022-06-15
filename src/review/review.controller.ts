import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { DocumentType } from '@typegoose/typegoose/lib/types'
import { JwtAuthGuard } from '@app/auth/guards/jwt.guard'
import { IdValidationPipe } from '@app/pipes/ad-validation.pipe'
import { CreateReviewDto } from '@app/review/dto/create-review.dto'
import { ReviewModel } from '@app/review/review.model'
import { ReviewService } from '@app/review/review.service'
import { TelegramService } from '@app/telegram/telegram.service'
import { REVIEW_NOT_FOUND } from '@app/review/review.constants'

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly telegramService: TelegramService
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
    return await this.reviewService.create(dto)
  }

  @UsePipes(new ValidationPipe())
  @Post('notify')
  async notify(@Body() dto: CreateReviewDto) {
    const message = `Имя: ${dto.name}\n`
      + `Заголовок: ${dto.title}\n`
      + `Описание: ${dto.description}\n`
      + `Рейтинг: ${dto.rating}\n`
      + `ID Продукта: ${dto.productId}\n`

    return this.telegramService.sendMessage(message)
  }

  @Get(':id')
  async findById(@Param('id', IdValidationPipe) id: string): Promise<DocumentType<ReviewModel> | null> {
    const review = await this.reviewService.findById(id)

    if (!review) {
      throw new NotFoundException(REVIEW_NOT_FOUND)
    }
    return review
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteById(@Param('id', IdValidationPipe) id: string): Promise<DocumentType<ReviewModel> | null> {
    const deletedDoc = await this.reviewService.deleteById(id)

    if (!deletedDoc) {
      throw new NotFoundException(REVIEW_NOT_FOUND)
    }
    return deletedDoc
  }

  @Get('byProduct/:productId')
  async findByProductId(@Param('productId', IdValidationPipe) productId: string): Promise<DocumentType<ReviewModel>[] | null> {
    const review = await this.reviewService.findByProductId(productId)

    if (!review) {
      throw new NotFoundException(REVIEW_NOT_FOUND)
    }
    return review
  }

  @UseGuards(JwtAuthGuard)
  @Delete('byProduct/:productId')
  async deleteByProductId(@Param('productId', IdValidationPipe) productId: string) {
    const deletedDoc = await this.reviewService.deleteByProductId(productId)

    if (!deletedDoc) {
      throw new NotFoundException(REVIEW_NOT_FOUND)
    }
    return deletedDoc
  }
}
