// src/property-agent/property-agent.controller.ts
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
import { PropertyAgentService } from './property-agent.service';
import { CreatePropertyAgentDto } from './dto/create-property-agent.dto';
import { UpdatePropertyAgentDto } from './dto/update-property-agent.dto';
import { PropertyAgent } from './entities/property-agent.entity';

@Controller('property-agents')
export class PropertyAgentController {
  constructor(private readonly propertyAgentService: PropertyAgentService) {}

  @Post()
  create(
    @Body(ValidationPipe) createPropertyAgentDto: CreatePropertyAgentDto,
  ): PropertyAgent {
    return this.propertyAgentService.create(createPropertyAgentDto);
  }

  @Get()
  findAll(): PropertyAgent[] {
    return this.propertyAgentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): PropertyAgent {
    return this.propertyAgentService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePropertyAgentDto: UpdatePropertyAgentDto,
  ): PropertyAgent {
    return this.propertyAgentService.update(id, updatePropertyAgentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.propertyAgentService.remove(id);
  }
}
