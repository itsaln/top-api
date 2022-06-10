export class ProductCharacteristic {
	name: string
	value: string
}

export class CreateProductDto {
	image: string
	title: string
	price: number
	oldPrice: number
	credit: number
	calculatedRating: number
	description: string
	advantages: string
	disAdvantages: string
	categories: string[]
	tags: string[]
	characteristics: ProductCharacteristic[]
}
