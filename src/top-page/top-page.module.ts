import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { TopPageController } from './top-page.controller'

@Module({
	controllers: [TopPageController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: TopPageModule,
				schemaOptions: { collection: 'TopPage' }
			}
		])
	]
})

export class TopPageModule {}
