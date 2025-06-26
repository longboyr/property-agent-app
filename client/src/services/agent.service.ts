// src/services/agent.service.ts
import apiClient from "./api.service";
import type { PropertyAgent, CreateAgentDTO } from "../types";

export default {
  async getAll(): Promise<PropertyAgent[]> {
    const response = await apiClient.get("/agents");
    return response.data;
  },

  async getById(id: number): Promise<PropertyAgent> {
    const response = await apiClient.get(`/agents/${id}`);
    return response.data;
  },

  async create(agent: CreateAgentDTO): Promise<PropertyAgent> {
    const response = await apiClient.post("/agents", agent);
    return response.data;
  },

  async update(id: number, agent: CreateAgentDTO): Promise<PropertyAgent> {
    const response = await apiClient.patch(`/agents/${id}`, agent);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/agents/${id}`);
  },

  async getAgentProperties(id: number): Promise<PropertyAgent> {
    const response = await apiClient.get(`/agents/${id}/properties`);
    return response.data;
  },
};
