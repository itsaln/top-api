import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { ReviewModel } from '@app/review/review.model'
import { ReviewController } from '@app/review/review.controller'
import { ReviewService } from '@app/review/review.service'
import { TelegramModule } from '@app/telegram/telegram.module'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ReviewModel,
				schemaOptions: { collection: 'Review' }
			}
		]),
		TelegramModule
	],
	controllers: [ReviewController],
	providers: [ReviewService]
})

export class ReviewModule {}
