// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BranchesModule } from './branches/branches.module';
import { LocationsModule } from './locations/locations.module';
import { PrismaModule } from './prisma/prisma.module'; // คุณต้องสร้าง PrismaModule ด้วย

@Module({
  imports: [UsersModule, BranchesModule, LocationsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}