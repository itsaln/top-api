import { Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from '@app/auth/guards/jwt.guard'
import { FileElementResponse } from '@app/files/dto/file-element.response'
import { FilesService } from '@app/files/files.service'

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@UseInterceptors(FileInterceptor('files'))
	@UseGuards(JwtAuthGuard)
	@HttpCode(200)
	@Post('upload')
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
		return await this.filesService.saveFiles([file])
	}
}
