import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';


@Module({
  imports: [DatabaseModule],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule { }
