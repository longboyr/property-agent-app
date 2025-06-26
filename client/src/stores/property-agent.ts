import { defineStore } from "pinia";
import propertyAgentService from "@/services/property-agent.service";
import type { PropertyAgent } from "@/types/property-agent";

export const usePropertyAgentStore = defineStore("propertyAgent", {
  state: () => ({
    agents: [] as PropertyAgent[],
    selectedAgent: null as PropertyAgent | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getAgentById: (state) => (id: string) => {
      return state.agents.find((agent) => agent.id === id);
    },
  },

  actions: {
    async fetchAllAgents() {
      this.loading = true;
      this.error = null;

      try {
        this.agents = await propertyAgentService.getAllAgents();
      } catch (error) {
        console.error("Error fetching agents:", error);
        this.error = "Failed to fetch agents";
      } finally {
        this.loading = false;
      }
    },

    async fetchAgentById(id: string) {
      this.loading = true;
      this.error = null;

      try {
        this.selectedAgent = await propertyAgentService.getAgentById(id);
      } catch (error) {
        console.error(`Error fetching agent with ID ${id}:`, error);
        this.error = "Failed to fetch agent details";
      } finally {
        this.loading = false;
      }
    },

    async createAgent(agent: Omit<PropertyAgent, "id" | "createdAt" | "updatedAt">) {
      this.loading = true;
      this.error = null;

      try {
        const createdAgent = await propertyAgentService.createAgent(agent);
        this.agents.push(createdAgent);
        return createdAgent;
      } catch (error) {
        console.error("Error creating agent:", error);
        this.error = "Failed to create agent";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateAgent(id: string, agent: Partial<PropertyAgent>) {
      this.loading = true;
      this.error = null;

      try {
        const updatedAgent = await propertyAgentService.updateAgent(id, agent);

        const index = this.agents.findIndex((a) => a.id === id);
        if (index !== -1) {
          this.agents[index] = updatedAgent;
        }

        if (this.selectedAgent?.id === id) {
          this.selectedAgent = updatedAgent;
        }

        return updatedAgent;
      } catch (error) {
        console.error(`Error updating agent with ID ${id}:`, error);
        this.error = "Failed to update agent";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteAgent(id: string) {
      this.loading = true;
      this.error = null;

      try {
        await propertyAgentService.deleteAgent(id);
        this.agents = this.agents.filter((agent) => agent.id !== id);

        if (this.selectedAgent?.id === id) {
          this.selectedAgent = null;
        }
      } catch (error) {
        console.error(`Error deleting agent with ID ${id}:`, error);
        this.error = "Failed to delete agent";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    selectAgent(agent: PropertyAgent) {
      this.selectedAgent = agent;
    },

    clearSelectedAgent() {
      this.selectedAgent = null;
    },
  },
});
