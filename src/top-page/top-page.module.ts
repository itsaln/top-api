import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { TopPageModel } from '@app/top-page/top-page.model'
import { TopPageController } from '@app/top-page/top-page.controller'
import { TopPageService } from '@app/top-page/top-page.service'

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
	providers: [TopPageService],
	exports: [TopPageService]
})

export class TopPageModule {}
