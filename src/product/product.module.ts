import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { ProductModel } from '@app/product/product.model'
import { ProductController } from '@app/product/product.controller'
import { ProductService } from '@app/product/product.service'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ProductModel,
				schemaOptions: { collection: 'Product' }
			}
		])
	],
	controllers: [ProductController],
	providers: [ProductService]
})

export class ProductModule {}
