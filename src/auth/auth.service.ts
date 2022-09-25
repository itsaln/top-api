import { Injectable, UnauthorizedException } from '@nestjs/common'
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { genSalt, hash, compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { AuthDto } from '@app/auth/dto/auth.dto'
import { UserModel } from '@app/auth/user.model'
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from '@app/auth/auth.constants'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
		private readonly jwtService: JwtService
	) {}

	async createUser(dto: AuthDto): Promise<DocumentType<UserModel>> {
		const salt = await genSalt(10)
		const newUser = new this.userModel({
			email: dto.login,
			passwordHash: await hash(dto.password, salt)
		})
		return newUser.save()
	}

	async findUser(email: string): Promise<DocumentType<UserModel>> {
		return this.userModel.findOne({ email }).exec()
	}

	async validateUser(email: string, password: string): Promise<Pick<UserModel, 'email'>> {
		const user = await this.findUser(email)
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR)
		}
		const isCorrectPassword = await compare(password, user.passwordHash)
		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR)
		}
		return { email: user.email }
	}

	async login(email: string): Promise<{ access_token: string }> {
		return {
			access_token: await this.jwtService.signAsync({ email })
		}
	}
}
