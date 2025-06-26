import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTenantDto } from '../../tenant/dto/create-tenant.dto';

export class CreateFamilyDto {
  @IsNotEmpty()
  @IsString()
  familyName: string;

  @IsNotEmpty()
  @IsString()
  primaryContactName: string;

  @IsNotEmpty()
  @IsString()
  primaryContactPhone: string;

  @IsNotEmpty()
  @IsEmail()
  primaryContactEmail: string;

  @IsOptional()
  @IsString()
  propertyId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTenantDto)
  tenants?: CreateTenantDto[];
}
