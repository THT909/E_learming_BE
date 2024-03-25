import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //config swagger
  const config = new DocumentBuilder()
    .setTitle('E-Learning')
    .setDescription('The  API make by SGOD')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //config PORT
  const PORT = process.env.PORT || 8080;
  app.enableCors();
  await app.listen(PORT);
  console.log(`Sever is running at ${await app.getUrl()}`);
}
bootstrap();
