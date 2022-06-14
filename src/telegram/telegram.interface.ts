import { ModuleMetadata } from '@nestjs/common'

export interface ITelegramOptions {
	token: string
	chatId: string
}

export interface ITelegramModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useFactory: (...args: any[]) => Promise<ITelegramOptions> | ITelegramOptions
	inject?: any[]
}
