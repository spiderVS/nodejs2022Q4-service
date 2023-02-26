import { LoggingService } from './logger/logging.service';
import { LoggerModule } from './logger/logger.module';
import { FavouritesModule } from './favourites/favourites.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from '../db/typeorm.config';
import { LoggerMiddleware } from './logger/middleware/logger.middleware';

@Module({
  imports: [
    LoggerModule,
    FavouritesModule,
    AlbumModule,
    TrackModule,
    ArtistModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRoot(dataSourceConfig),
  ],
  controllers: [],
  providers: [LoggingService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
