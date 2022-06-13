import { Module } from '@nestjs/common'
import { FilesController } from '@app/files/files.controller'
import { FilesService } from '@app/files/files.service'

@Module({
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule {}
