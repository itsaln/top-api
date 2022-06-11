import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { getJWTConfig } from '@app/configs/jwt.config'
import { JwtStrategy } from '@app/auth/strategies/jwt-strategy'
import { UserModel } from '@app/auth/user.model'
import { AuthController } from '@app/auth/auth.controller'
import { AuthService } from '@app/auth/auth.service'

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: { collection: 'User' }
			}
		]),
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig
		}),
		PassportModule
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy]
})

export class AuthModule {}
