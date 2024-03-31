import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfig } from './common/config/envs.config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    //Configuracion de variables de entorno
    ConfigModule.forRoot({
      load: [EnvConfig]
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: EnvConfig().postgresdbHost,
      port: EnvConfig().port,
      username: EnvConfig().userName,
      password: EnvConfig().password,
      database: EnvConfig().dbname,
      synchronize: true, // Solo para desarrollo, deshabilitar en producción
      autoLoadEntities: true,
    }),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
