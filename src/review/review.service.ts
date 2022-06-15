import { Injectable } from '@nestjs/common'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types'
import { CreateReviewDto } from '@app/review/dto/create-review.dto'
import { ReviewModel } from '@app/review/review.model'

class Leak {}

const leaks = []

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>
  ) {}

  async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
    return this.reviewModel.create(dto)
  }

  async findById(id: string): Promise<DocumentType<ReviewModel> | null> {
    return this.reviewModel.findById(id).exec()
  }

  async deleteById(id: string): Promise<DocumentType<ReviewModel> | null> {
    return this.reviewModel.findByIdAndDelete(id).exec()
  }

  async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[] | null> {
    leaks.push(new Leak())
    return this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec()
  }

  async deleteByProductId(productId: string) {
    return this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec()
  }
}
