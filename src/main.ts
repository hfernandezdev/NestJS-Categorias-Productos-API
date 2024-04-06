import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('API de Gestión de Productos y Categorías')
    .setDescription('Esta documentación proporciona información detallada sobre los servicios y recursos disponibles en la API de gestión de productos y categorías. La API permite a los usuarios realizar operaciones CRUD (crear, leer, actualizar y eliminar) en productos y categorías, así como gestionar sus relaciones.')
    .setVersion('1.0')
    .addTag('Productos', 'Operaciones relacionadas con productos')
    .addTag('Categorías', 'Operaciones relacionadas con categorías')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
