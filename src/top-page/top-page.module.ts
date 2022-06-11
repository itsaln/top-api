import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { TopPageModel } from '@app/top-page/top-page.model'
import { TopPageController } from '@app/top-page/top-page.controller'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: TopPageModel,
				schemaOptions: { collection: 'TopPage' }
			}
		])
	],
	controllers: [TopPageController],
	providers: []
})

export class TopPageModule {}
