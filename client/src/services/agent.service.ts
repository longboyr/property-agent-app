// src/services/agent.service.ts
import apiClient from "./api.service";
import type { PropertyAgent, CreateAgentDTO } from "../types";

export default {
  async getAll(): Promise<PropertyAgent[]> {
    const response = await apiClient.get("/property-agents");
    return response.data;
  },

  async getById(id: number): Promise<PropertyAgent> {
    const response = await apiClient.get(`/property-agents/${id}`);
    return response.data;
  },

  async create(agent: CreateAgentDTO): Promise<PropertyAgent> {
    const response = await apiClient.post("/property-agents", agent);
    return response.data;
  },

  async update(id: number, agent: CreateAgentDTO): Promise<PropertyAgent> {
    const response = await apiClient.put(`/property-agents/${id}`, agent);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/property-agents/${id}`);
  },

  async getAgentProperties(id: number): Promise<PropertyAgent> {
    const response = await apiClient.get(`/property-agents/${id}/properties`);
    return response.data;
  },
};
