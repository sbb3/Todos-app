import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './globalExecptionHandler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  });

  const allowedOrigins = [`${process.env.FRONTEND_URL}`];

  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error(`origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  };

  // This will nable CORS
  app.enableCors(corsOptions);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // will remove all the properties that are not in the DTO
    }),
  );

  // Swagger for API documentation
  const config = new DocumentBuilder()
    .setTitle('Todos API')
    .setDescription('Todos API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/routes', app, document);

  // global exception filter to catch all the exceptions
  app.useGlobalFilters(new GlobalExceptionFilter());

  // a global prefix for all routes
  app.setGlobalPrefix(`api`);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
