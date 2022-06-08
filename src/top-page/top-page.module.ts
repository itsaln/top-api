import { Module } from '@nestjs/common'
import { TopPageController } from './top-page.controller'
import { TypegooseModule } from 'nestjs-typegoose'

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
export class TopPageModule {
}
