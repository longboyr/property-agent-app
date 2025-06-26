import apiClient from "./api.service";
import type { PropertyAgent } from "@/types/property-agent";

export default {
  async getAllAgents(): Promise<PropertyAgent[]> {
    const response = await apiClient.get("/property-agents");
    return response.data;
  },

  async getAgentById(id: string): Promise<PropertyAgent> {
    const response = await apiClient.get(`/property-agents/${id}`);
    return response.data;
  },

  async createAgent(
    agent: Omit<PropertyAgent, "id" | "createdAt" | "updatedAt">
  ): Promise<PropertyAgent> {
    const response = await apiClient.post("/property-agents", agent);
    return response.data;
  },

  async updateAgent(id: string, agent: Partial<PropertyAgent>): Promise<PropertyAgent> {
    const response = await apiClient.put(`/property-agents/${id}`, agent);
    return response.data;
  },

  async deleteAgent(id: string): Promise<void> {
    await apiClient.delete(`/property-agents/${id}`);
  },

  async getAgentProperties(id: string): Promise<any[]> {
    const response = await apiClient.get(`/property-agents/${id}/properties`);
    return response.data;
  },
};
