import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class TemplateDto {
  @IsNotEmpty()
  @IsString()
  templateText: string;

  @IsNotEmpty()
  preview: Record<string, any>;

  @IsNumber()
  id: number;
}
