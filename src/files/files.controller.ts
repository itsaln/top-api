import { Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from '@app/auth/guards/jwt.guard'
import { FileElementResponse } from '@app/files/dto/file-element.response'
import { FilesService } from '@app/files/files.service'
import { MFile } from '@app/files/mfile.class'

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@UseInterceptors(FileInterceptor('files'))
	@UseGuards(JwtAuthGuard)
	@HttpCode(200)
	@Post('upload')
	async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse[]> {
		const saveArray: MFile[] = [new MFile(file)]

		if (file.mimetype.includes('image')) {
			const buffer = await this.filesService.convertToWebp(file.buffer)
			saveArray.push(new MFile({
				originalname: `${file.originalname.split('.')[0]}.webp`,
				buffer
			}))
		}
		return this.filesService.saveFiles(saveArray)
	}
}
