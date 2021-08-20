import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.SERVER_PORT || 3008;
  const app = await NestFactory.create(AppModule);

  app.enableCors()

  const options = new DocumentBuilder()
    .setTitle('server前段视频网站api界面')
    .setDescription('主要用于前端页面使用')
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
