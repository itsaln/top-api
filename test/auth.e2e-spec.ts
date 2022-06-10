import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, Logger } from '@nestjs/common'
import * as request from 'supertest'
import { disconnect } from 'mongoose'
import { AppModule } from '../src/app.module'
import { AuthDto } from '../src/auth/dto/auth.dto'
import { WRONG_PASSWORD_ERROR, USER_NOT_FOUND_ERROR } from '../src/auth/auth.constants'

const loginDto: AuthDto = {
	login: 'aln@gmail.com',
	password: '123'
}

describe('AuthController (e2e)', () => {
	let app: INestApplication

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).setLogger(new Logger()).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	it('/auth/login (POST - success)', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.access_token).toBeDefined()
			})
	})

	it('/auth/login (POST - fail password)', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, password: '2' })
			.expect(401, {
				statusCode: 401,
				message: WRONG_PASSWORD_ERROR,
				error: 'Unauthorized'
			})
	})

	it('/auth/login (POST - fail email)', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, login: 'aaa@a.ru' })
			.expect(401, {
				statusCode: 401,
				message: USER_NOT_FOUND_ERROR,
				error: 'Unauthorized'
			})
	})

	afterAll(() => {
		disconnect()
	})
})
