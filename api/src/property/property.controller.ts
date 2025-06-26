import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  create(@Body(ValidationPipe) createPropertyDto: CreatePropertyDto): Property {
    return this.propertyService.create(createPropertyDto);
  }

  @Get()
  findAll(): Property[] {
    return this.propertyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Property {
    return this.propertyService.findOne(id);
  }

  @Get(':id/details')
  async getPropertyWithDetails(@Param('id') id: string) {
    return await this.propertyService.getPropertyWithDetails(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePropertyDto: UpdatePropertyDto,
  ): Property {
    return this.propertyService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.propertyService.remove(id);
  }
}
