import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFamilyDto } from '../../family/dto/create-family.dto';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  propertyType: string;

  @IsNotEmpty()
  @IsNumber()
  bedrooms: number;

  @IsNotEmpty()
  @IsNumber()
  bathrooms: number;

  @IsNotEmpty()
  @IsNumber()
  monthlyRent: number;

  @IsNotEmpty()
  @IsString()
  agentId: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateFamilyDto)
  family?: CreateFamilyDto;
}
