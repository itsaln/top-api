import { Inject, Injectable } from '@nestjs/common'
import { Telegraf } from 'telegraf'
import { ITelegramOptions } from '@app/telegram/telegram.interface'
import { TELEGRAM_MODULE_OPTIONS } from '@app/telegram/telegram.constants'

@Injectable()
export class TelegramService {
  bot: Telegraf
  options: ITelegramOptions

  constructor(
    @Inject(TELEGRAM_MODULE_OPTIONS) options: ITelegramOptions
  ) {
    this.options = options
    this.bot = new Telegraf(options.token)
  }

  async sendMessage(message: string, chatId: string = this.options.chatId) {
    await this.bot.telegram.sendMessage(chatId, message)
  }
}
