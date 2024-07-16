import { Module } from '@nestjs/common'
import { AuthnenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { FetchRecentQuestionsCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthnenticateController,
    CreateQuestionController,
    FetchRecentQuestionController,
  ],
  providers: [CreateQuestionUseCase, FetchRecentQuestionsCase],
})
export class HttpModule {}
