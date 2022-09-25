import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SitemapController } from '@app/sitemap/sitemap.controller'
import { TopPageModule } from '@app/top-page/top-page.module'

@Module({
	controllers: [SitemapController],
	imports: [TopPageModule, ConfigModule]
})
export class SitemapModule {}
