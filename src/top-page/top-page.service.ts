import { Injectable } from '@nestjs/common'
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { addDays } from 'date-fns'
import { Types } from 'mongoose'
import { CreateTopPageDto } from '@app/top-page/dto/create-top-page.dto'
import { TopLevelCategory, TopPageModel } from '@app/top-page/top-page.model'

@Injectable()
export class TopPageService {
	constructor(
		@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>
	) {}

	async create(dto: CreateTopPageDto): Promise<DocumentType<TopPageModel>> {
		return this.topPageModel.create(dto)
	}

	async findById(id: string): Promise<DocumentType<TopPageModel> | null> {
		return this.topPageModel.findById(id).exec()
	}

	async findAll(): Promise<DocumentType<TopPageModel>[] | null> {
		return this.topPageModel.find({}).exec()
	}

	async findByAlias(alias: string): Promise<DocumentType<TopPageModel> | null> {
		return this.topPageModel.findOne({ alias }).exec()
	}

	async findByCategory(firstCategory: TopLevelCategory) {
		return this.topPageModel
			.aggregate()
			.match({ firstCategory })
			.group({
				_id: { secondCategory: '$secondCategory' },
				pages: { $push: { alias: '$alias', title: '$title', _id: '$_id', category: '$category' } }
			}).exec()
	}

	async findByText(text: string) {
		return this.topPageModel.find({ $text: { $search: text, $caseSensitive: false } }).exec()
	}

	async deleteById(id: string): Promise<DocumentType<TopPageModel> | null> {
		return this.topPageModel.findByIdAndDelete(id).exec()
	}

	async updateById(id: string | Types.ObjectId, dto: CreateTopPageDto): Promise<DocumentType<TopPageModel> | null> {
		return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec()
	}

	async findForHhUpdate(date: Date) {
		return this.topPageModel.find({
			firstCategory: TopLevelCategory.Courses,
			$or: [
				{ 'hh.updatedAt': { $lt: addDays(date, -1) } },
				{ 'hh.updatedAt': { $lt: date } },
				{ 'hh.updatedAt': { $exists: false } }
			]
		}).exec()
	}
}
