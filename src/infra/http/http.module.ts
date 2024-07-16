import { Module } from '@nestjs/common'
import { AuthnenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionController } from './controllers/fetch-recent-questions.controller'
import { PrismaService } from '../database/prisma/prisma.service'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthnenticateController,
    CreateQuestionController,
    FetchRecentQuestionController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
