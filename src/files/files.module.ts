import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { FilesController } from '@app/files/files.controller'
import { FilesService } from '@app/files/files.service'

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: `${path}/uploads`,
    serveRoot: '/static'
  })],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}
