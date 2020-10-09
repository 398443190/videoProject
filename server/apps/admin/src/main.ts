import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()
  app.useStaticAssets('uploads', {
    prefix: '/uploads'
  })
  const options = new DocumentBuilder()
    .setTitle('视频网站api界面')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(port);

  console.log(`http://localhost:${port}/api-docs`)
}
bootstrap();
