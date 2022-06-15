import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { TopPageModel } from '@app/top-page/top-page.model'
import { TopPageController } from '@app/top-page/top-page.controller'
import { TopPageService } from '@app/top-page/top-page.service'
import { HhModule } from '@app/hh/hh.module'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: TopPageModel,
				schemaOptions: { collection: 'TopPage' }
			}
		]),
		HhModule
	],
	controllers: [TopPageController],
	providers: [TopPageService],
	exports: [TopPageService]
})

export class TopPageModule { }
