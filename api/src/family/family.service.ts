import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';
import { Family } from './entities/family.entity';
import { v4 as uuidv4 } from 'uuid';
import { TenantService } from '../tenant/tenant.service';

@Injectable()
export class FamilyService {
  private families: Family[] = [];

  constructor(private readonly tenantService: TenantService) {}

  create(createFamilyDto: CreateFamilyDto): Family {
    const familyId = uuidv4();

    const newFamily: Family = {
      id: familyId,
      familyName: createFamilyDto.familyName,
      primaryContactName: createFamilyDto.primaryContactName,
      primaryContactPhone: createFamilyDto.primaryContactPhone,
      primaryContactEmail: createFamilyDto.primaryContactEmail,
      propertyId: createFamilyDto.propertyId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.families.push(newFamily);

    // Create tenants if provided
    if (createFamilyDto.tenants && createFamilyDto.tenants.length > 0) {
      createFamilyDto.tenants.forEach((tenantDto) => {
        this.tenantService.create({
          ...tenantDto,
          familyId: familyId,
        });
      });
    }

    return newFamily;
  }

  findAll(): Family[] {
    return this.families;
  }

  findOne(id: string): Family {
    const family = this.families.find((family) => family.id === id);
    if (!family) {
      throw new NotFoundException(`Family with ID ${id} not found`);
    }
    return family;
  }

  findByPropertyId(propertyId: string): Family[] {
    return this.families.filter((family) => family.propertyId === propertyId);
  }

  update(id: string, updateFamilyDto: UpdateFamilyDto): Family {
    const familyIndex = this.families.findIndex((family) => family.id === id);

    if (familyIndex === -1) {
      throw new NotFoundException(`Family with ID ${id} not found`);
    }

    const updatedFamily = {
      ...this.families[familyIndex],
      ...updateFamilyDto,
      updatedAt: new Date(),
    };

    this.families[familyIndex] = updatedFamily;
    return updatedFamily;
  }

  remove(id: string): void {
    const familyIndex = this.families.findIndex((family) => family.id === id);

    if (familyIndex === -1) {
      throw new NotFoundException(`Family with ID ${id} not found`);
    }

    this.families.splice(familyIndex, 1);
  }
}
