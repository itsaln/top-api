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
	ValidationPipe,
} from '@nestjs/common'
import { JwtAuthGuard } from '@app/auth/guards/jwt.guard'
import { CreateReviewDto } from '@app/review/dto/create-review.dto'
import { ReviewService } from '@app/review/review.service'
import { REVIEW_NOT_FOUND } from '@app/review/review.constants'

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return await this.reviewService.create(dto)
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		const review = await this.reviewService.findById(id)

		if(!review) {
			throw new NotFoundException(REVIEW_NOT_FOUND)
		}
		return review
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async deleteById(@Param('id') id: string) {
		const deletedDoc = await this.reviewService.deleteById(id)

		if (!deletedDoc) {
			throw new NotFoundException(REVIEW_NOT_FOUND)
		}
		return deletedDoc
	}

	@Get('byProduct/:productId')
	async findByProductId(@Param('productId') productId: string) {
		const review = await this.reviewService.findByProductId(productId)

		if(!review) {
			throw new NotFoundException(REVIEW_NOT_FOUND)
		}
		return review
	}

	@UseGuards(JwtAuthGuard)
	@Delete('byProduct/:productId')
	async deleteByProductId(@Param('productId') productId: string) {
		const deletedDoc = await this.reviewService.deleteByProductId(productId)

		if (!deletedDoc) {
			throw new NotFoundException(REVIEW_NOT_FOUND)
		}
		return deletedDoc
	}
}
