import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';


@Module({
  imports: [UsersModule,TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Mysql@259',
      database: 'user_dashboard',
      autoLoadEntities: true,
      synchronize: true, // turn off in production
    }),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
