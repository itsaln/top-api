import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { ALREADY_REGISTERED_ERROR } from '@app/auth/auth.constants'
import { AuthService } from '@app/auth/auth.service'
import { AuthDto } from '@app/auth/dto/auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto) {
		const oldUser = await this.authService.findUser(dto.login)
		if(oldUser) {
			throw new BadRequestException(ALREADY_REGISTERED_ERROR)
		}
		return this.authService.createUser(dto)
	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() { login, password }: AuthDto) {
		const { email } = await this.authService.validateUser(login, password)
		return this.authService.login(email)
	}
}
