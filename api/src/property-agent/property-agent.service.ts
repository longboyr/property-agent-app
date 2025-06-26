// src/property-agent/property-agent.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyAgentDto } from './dto/create-property-agent.dto';
import { UpdatePropertyAgentDto } from './dto/update-property-agent.dto';
import { PropertyAgent } from './entities/property-agent.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PropertyAgentService {
  private propertyAgents: PropertyAgent[] = [];

  create(createPropertyAgentDto: CreatePropertyAgentDto): PropertyAgent {
    const newAgent: PropertyAgent = {
      id: uuidv4(),
      ...createPropertyAgentDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.propertyAgents.push(newAgent);
    return newAgent;
  }

  findAll(): PropertyAgent[] {
    return this.propertyAgents;
  }

  findOne(id: string): PropertyAgent {
    const agent = this.propertyAgents.find((agent) => agent.id === id);
    if (!agent) {
      throw new NotFoundException(`Property agent with ID ${id} not found`);
    }
    return agent;
  }

  update(
    id: string,
    updatePropertyAgentDto: UpdatePropertyAgentDto,
  ): PropertyAgent {
    const agentIndex = this.propertyAgents.findIndex(
      (agent) => agent.id === id,
    );

    if (agentIndex === -1) {
      throw new NotFoundException(`Property agent with ID ${id} not found`);
    }

    const updatedAgent = {
      ...this.propertyAgents[agentIndex],
      ...updatePropertyAgentDto,
      updatedAt: new Date(),
    };

    this.propertyAgents[agentIndex] = updatedAgent;
    return updatedAgent;
  }

  remove(id: string): void {
    const agentIndex = this.propertyAgents.findIndex(
      (agent) => agent.id === id,
    );

    if (agentIndex === -1) {
      throw new NotFoundException(`Property agent with ID ${id} not found`);
    }

    this.propertyAgents.splice(agentIndex, 1);
  }
}
