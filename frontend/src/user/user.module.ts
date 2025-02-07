import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret:
          'a8b962ac89a4f7cd1ddd230fa9d5683023d0db9d7bd8c66c04a9ecc9b07e2f3c352ae7e7850a5ceec539041310d40521fa31b4492e94a88612125b171ce380a289c2406d374fed74e7b0235fa41414a38ef7d9475aaebe649ef6687128999a8c76b5c9b555a645b906355f3fea67002fa73b1f39d5b123d8f1ff7ba767f4ceca4891961966d15b205634d1904872bc69601c0fdb7d408b51739516d539b294f8aac260ce1a6ad9316d96a6a8a0b0aac88560ec026db6d7ae2e195ca2535340cdb0bc933c314f896613e922df6ed7f138fc177d73e903fbe98c23e18fe53887fb5a2c76c926e792ad04bc1af2b586ccfe2cf7461dc3d8334996373dfa75794db1',
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
