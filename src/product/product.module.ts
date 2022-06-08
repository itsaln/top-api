import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { ProductController } from './product.controller'

@Module({
	controllers: [ProductController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ProductModule,
				schemaOptions: { collection: 'Product' }
			}
		])
	]
})

export class ProductModule {}
