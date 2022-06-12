import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { DocumentType } from '@typegoose/typegoose/lib/types'
import { AuthDto } from '@app/auth/dto/auth.dto'
import { UserModel } from '@app/auth/user.model'
import { AuthService } from '@app/auth/auth.service'
import { ALREADY_REGISTERED_ERROR } from '@app/auth/auth.constants'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto): Promise<DocumentType<UserModel>> {
		const oldUser = await this.authService.findUser(dto.login)

		if(oldUser) {
			throw new BadRequestException(ALREADY_REGISTERED_ERROR)
		}
		return this.authService.createUser(dto)
	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto): Promise<{access_token: string}> {
		const { email } = await this.authService.validateUser(dto.login, dto.password)
		return this.authService.login(email)
	}
}
