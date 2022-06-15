import { Injectable } from '@nestjs/common'
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { CreateProductDto } from '@app/product/dto/create-product.dto'
import { FindProductDto } from '@app/product/dto/find-product.dto'
import { ProductModel } from '@app/product/product.model'
import { ReviewModel } from '@app/review/review.model'

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>
  ) {
  }

  async create(dto: CreateProductDto): Promise<DocumentType<ProductModel>> {
    return this.productModel.create(dto)
  }

  async findById(id: string): Promise<DocumentType<ProductModel> | null> {
    return this.productModel.findById(id).exec()
  }

  async deleteById(id: string): Promise<DocumentType<ProductModel> | null> {
    return this.productModel.findByIdAndDelete(id).exec()
  }

  async updateById(id: string, dto: CreateProductDto): Promise<DocumentType<ProductModel> | null> {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec()
  }

  async findWithReviews(dto: FindProductDto): Promise<(ProductModel & { $reviews: ReviewModel[], reviewCount: number, reviewAvg: number })[]> {
    return await this.productModel
      .aggregate()
      .match({ categories: dto.category })
      .sort({ _id: 1 })
      .limit(dto.limit)
      .lookup({
        from: 'Review',
        localField: '_id',
        foreignField: 'productId',
        as: 'reviews'
      })
      .addFields({
        reviewCount: { $size: '$reviews' },
        reviewAvg: { $avg: '$reviews.rating' },
        reviews: {
          $function: {
            body: `function(reviews) {
              reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              return reviews
            }`,
            args: ['$reviews'],
            lang: 'js'
          }
        }
      }).exec() as (ProductModel & { $reviews: ReviewModel[], reviewCount: number, reviewAvg: number })[]
  }
}
