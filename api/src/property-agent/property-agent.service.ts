import { Injectable } from '@nestjs/common';
import { CreatePropertyAgentDto } from './dto/create-property-agent.dto';
import { UpdatePropertyAgentDto } from './dto/update-property-agent.dto';

@Injectable()
export class PropertyAgentService {
  create(createPropertyAgentDto: CreatePropertyAgentDto) {
    return 'This action adds a new propertyAgent';
  }

  findAll() {
    return `This action returns all propertyAgent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertyAgent`;
  }

  update(id: number, updatePropertyAgentDto: UpdatePropertyAgentDto) {
    return `This action updates a #${id} propertyAgent`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertyAgent`;
  }
}
