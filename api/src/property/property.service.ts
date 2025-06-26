// src/property/property.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';
import { v4 as uuidv4 } from 'uuid';
import { PropertyAgentService } from '../property-agent/property-agent.service';

@Injectable()
export class PropertyService {
  private properties: Property[] = [];

  constructor(private readonly propertyAgentService: PropertyAgentService) {}

  create(createPropertyDto: CreatePropertyDto): Property {
    // Verify that the agent exists
    if (createPropertyDto.agentId) {
      try {
        this.propertyAgentService.findOne(createPropertyDto.agentId);
      } catch (error) {
        throw new BadRequestException(
          `Property agent with ID ${createPropertyDto.agentId} not found`,
        );
      }
    }

    const newProperty: Property = {
      id: uuidv4(),
      ...createPropertyDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.properties.push(newProperty);
    return newProperty;
  }

  findAll(): Property[] {
    return this.properties;
  }

  findByAgentId(agentId: string): Property[] {
    return this.properties.filter((property) => property.agentId === agentId);
  }

  findOne(id: string): Property {
    const property = this.properties.find((property) => property.id === id);
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return property;
  }

  update(id: string, updatePropertyDto: UpdatePropertyDto): Property {
    // Verify that the agent exists if agentId is being updated
    if (updatePropertyDto.agentId) {
      try {
        this.propertyAgentService.findOne(updatePropertyDto.agentId);
      } catch (error) {
        throw new BadRequestException(
          `Property agent with ID ${updatePropertyDto.agentId} not found`,
        );
      }
    }

    const propertyIndex = this.properties.findIndex(
      (property) => property.id === id,
    );

    if (propertyIndex === -1) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    const updatedProperty = {
      ...this.properties[propertyIndex],
      ...updatePropertyDto,
      updatedAt: new Date(),
    };

    this.properties[propertyIndex] = updatedProperty;
    return updatedProperty;
  }

  remove(id: string): void {
    const propertyIndex = this.properties.findIndex(
      (property) => property.id === id,
    );

    if (propertyIndex === -1) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    this.properties.splice(propertyIndex, 1);
  }
}
