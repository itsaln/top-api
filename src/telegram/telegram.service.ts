import { Injectable } from '@nestjs/common'
import { Telegraf } from 'telegraf'
import { ITelegramOptions } from '@app/telegram/telegram.interface'
import { getTelegramConfig } from '@app/configs/telegram.config'

@Injectable()
export class TelegramService {
	bot: Telegraf
	options: ITelegramOptions

	constructor() {
		this.options = getTelegramConfig()
		this.bot = new Telegraf(this.options.token)
	}

	async sendMessage(message: string, chatId: string = this.options.chatId): Promise<void> {
		await this.bot.telegram.sendMessage(chatId, message)
	}
}
