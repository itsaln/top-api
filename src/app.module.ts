import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { getMongoConfig } from '@app/configs/mongo.config'
import { AuthModule } from '@app/auth/auth.module'
import { TopPageModule } from '@app/top-page/top-page.module'
import { ProductModule } from '@app/product/product.module'
import { ReviewModule } from '@app/review/review.module'
import { FilesModule } from '@app/files/files.module'
import { SitemapModule } from '@app/sitemap/sitemap.module'
import { TelegramModule } from '@app/telegram/telegram.module'
import { getTelegramConfig } from '@app/configs/telegram.config'
import { HhModule } from '@app//hh/hh.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig
    }),
    AuthModule,
    TopPageModule,
    ProductModule,
    ReviewModule,
    FilesModule,
    SitemapModule,
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTelegramConfig
    }),
    HhModule
  ]
})

export class AppModule { }
