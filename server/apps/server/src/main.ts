import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.SERVER_PORT || 3008;
  const app = await NestFactory.create(AppModule);

  app.enableCors()

  const options = new DocumentBuilder()
    .setTitle('server视频网站api界面')
    .setDescription('server The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);


  await app.listen(port);

  console.log(`http://localhost:${port}`)
}
bootstrap();
