import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyAgentService } from './property-agent.service';
import { CreatePropertyAgentDto } from './dto/create-property-agent.dto';
import { UpdatePropertyAgentDto } from './dto/update-property-agent.dto';

@Controller('property-agent')
export class PropertyAgentController {
  constructor(private readonly propertyAgentService: PropertyAgentService) {}

  @Post()
  create(@Body() createPropertyAgentDto: CreatePropertyAgentDto) {
    return this.propertyAgentService.create(createPropertyAgentDto);
  }

  @Get()
  findAll() {
    return this.propertyAgentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyAgentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyAgentDto: UpdatePropertyAgentDto) {
    return this.propertyAgentService.update(+id, updatePropertyAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyAgentService.remove(+id);
  }
}
