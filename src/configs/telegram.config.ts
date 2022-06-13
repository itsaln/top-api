import { ConfigService } from '@nestjs/config'
import { ITelegramOptions } from '@app/telegram/telegram.interface'

export const getTelegramConfig = (): ITelegramOptions => {
	return {
		chatId: '',
		token: ''
	}
}
