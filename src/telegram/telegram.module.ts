import { DynamicModule, Global, Module, Provider } from '@nestjs/common'
import { TelegramService } from '@app/telegram/telegram.service'
import { ITelegramModuleAsyncOptions } from '@app/telegram/telegram.interface'
import { TELEGRAM_MODULE_OPTIONS } from '@app/telegram/telegram.constants'

@Global()
@Module({})
export class TelegramModule {
	static forRootAsync(options: ITelegramModuleAsyncOptions): DynamicModule {
		const asyncOptions = this.createAsyncOptionsProvider(options)
		return {
			module: TelegramModule,
			imports: options.imports,
			providers: [TelegramService, asyncOptions],
			exports: [TelegramService]
		}
	}

	private static createAsyncOptionsProvider(options: ITelegramModuleAsyncOptions): Provider {
		return {
			provide: TELEGRAM_MODULE_OPTIONS,
			useFactory: async (...args: any[]) => {
				return options.useFactory(...args)
			},
			inject: options.inject || []
		}
	}
}
