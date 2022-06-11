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
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { CreateProductDto } from '@app/product/dto/create-product.dto'
import { FindProductDto } from '@app/product/dto/find-product.dto'
import { ProductService } from '@app/product/product.service'
import { PRODUCT_NOT_FOUND_ERROR } from '@app/product/product.constants'

@Controller('prod')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateProductDto) {
		return await this.productService.create(dto)
	}

	@Get(':id')
	async findById(@Param('id') id: string) {
		const product = await this.productService.findById(id)

		if(!product) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
		}
		return product
	}

	@Delete(':id')
	async deleteById(@Param('id') id: string) {
		const deletedProduct = await this.productService.deleteById(id)

		if(!deletedProduct) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
		}
		return deletedProduct
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async updateById(@Param('id') id: string, @Body() dto: CreateProductDto) {
		const updatedProduct = await this.productService.updateById(id, dto)

		if(!updatedProduct) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR)
		}
		return updatedProduct
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindProductDto) {
		return await this.productService.findWithReviews(dto)
	}
}
