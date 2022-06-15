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
import { JwtAuthGuard } from '@app/auth/guards/jwt.guard'
import { DocumentType } from '@typegoose/typegoose/lib/types'
import { IdValidationPipe } from '@app/pipes/ad-validation.pipe'
import { CreateProductDto } from '@app/product/dto/create-product.dto'
import { FindProductDto } from '@app/product/dto/find-product.dto'
import { ProductModel } from '@app/product/product.model'
import { ReviewModel } from '@app/review/review.model'
import { ProductService } from '@app/product/product.service'
import { PRODUCT_NOT_FOUND_ERROR } from '@app/product/product.constants'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateProductDto): Promise<DocumentType<ProductModel>> {
    return this.productService.create(dto)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id', IdValidationPipe) id: string): Promise<DocumentType<ProductModel> | null> {
    const product = await this.productService.findById(id)

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
    }
    return product
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteById(@Param('id', IdValidationPipe) id: string): Promise<DocumentType<ProductModel> | null> {
    const deletedProduct = await this.productService.deleteById(id)

    if (!deletedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
    }
    return deletedProduct
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async updateById(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateProductDto): Promise<DocumentType<ProductModel> | null> {
    const updatedProduct = await this.productService.updateById(id, dto)

    if (!updatedProduct) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
    }
    return updatedProduct
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto): Promise<(ProductModel & { $reviews: ReviewModel[], reviewCount: number, reviewAvg: number })[]> {
    return this.productService.findWithReviews(dto)
  }
}
