import { IsNumber, IsString, Max, Min } from 'class-validator'

export class CreateReviewDto {
  @IsString()
  name: string

  @IsString()
  title: string

  @IsString()
  description: string

  @Min(1, { message: 'Рейтинг не может быть менее 1' })
  @Max(5, { message: 'Рейтинг не может быть больше 1' })
  @IsNumber()
  rating: number

  @IsString()
  productId: string
}
