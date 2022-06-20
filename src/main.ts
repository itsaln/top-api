import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from '@app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Top API')
    .setDescription('The first NestJS project')
    .setVersion('1.0')
    .addTag('Requests')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  // app.setGlobalPrefix('api')
  await app.listen(3000)
}

bootstrap()
