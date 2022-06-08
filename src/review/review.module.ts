import { Module } from '@nestjs/common'
import { ReviewController } from './review.controller'
import { TypegooseModule } from 'nestjs-typegoose'

@Module({
  controllers: [ReviewController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ReviewModule,
        schemaOptions: { collection: 'Review' }
      }
    ])
  ]
})
export class ReviewModule {
}
