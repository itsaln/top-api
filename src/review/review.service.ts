import { Injectable } from '@nestjs/common'
import { Types } from 'mongoose'
import { InjectModel } from 'nestjs-typegoose'
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types'
import { ReviewModel } from './review.model'
import { CreateReviewDto } from './dto/create-review.dto'

class Leak {

}

const leaks = []

@Injectable()
export class ReviewService {
  constructor(@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>) {}

  async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
    return await this.reviewModel.create(dto)
  }

  async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
    return await this.reviewModel.findByIdAndDelete(id).exec()
  }

  async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[] | null> {
    leaks.push(new Leak())
    return await this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec()
  }

  async deleteByProductId(productId: string) {
    return await this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec()
  }
}
