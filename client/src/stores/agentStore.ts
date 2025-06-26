// src/stores/agentStore.ts
import { defineStore } from "pinia";
import type { PropertyAgent, CreateAgentDTO } from "../types";
import agentService from "../services/agent.service";

export const useAgentStore = defineStore("agent", {
  state: () => ({
    agents: [] as PropertyAgent[],
    selectedAgent: null as PropertyAgent | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getAgentById: (state) => {
      return (id: number) =>
        state.agents.find((agent) => agent.id === id) || null;
    },
  },

  actions: {
    async fetchAgents() {
      this.loading = true;
      this.error = null;

      try {
        this.agents = await agentService.getAll();
      } catch (error: any) {
        this.error = error.message || "Failed to fetch agents";
        console.error(this.error);
      } finally {
        this.loading = false;
      }
    },

    async fetchAgentWithProperties(id: number) {
      this.loading = true;
      this.error = null;

      try {
        this.selectedAgent = await agentService.getAgentProperties(id);
      } catch (error: any) {
        this.error = error.message || "Failed to fetch agent properties";
        console.error(this.error);
      } finally {
        this.loading = false;
      }
    },

    async createAgent(agent: CreateAgentDTO) {
      this.loading = true;
      this.error = null;

      try {
        const newAgent = await agentService.create(agent);
        this.agents.push(newAgent);
      } catch (error: any) {
        this.error = error.message || "Failed to create agent";
        console.error(this.error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateAgent(id: number, agent: CreateAgentDTO) {
      this.loading = true;
      this.error = null;

      try {
        const updatedAgent = await agentService.update(id, agent);
        const index = this.agents.findIndex((a) => a.id === id);
        if (index !== -1) {
          this.agents[index] = updatedAgent;
        }
        if (this.selectedAgent?.id === id) {
          this.selectedAgent = updatedAgent;
        }
      } catch (error: any) {
        this.error = error.message || "Failed to update agent";
        console.error(this.error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteAgent(id: number) {
      this.loading = true;
      this.error = null;

      try {
        await agentService.delete(id);
        this.agents = this.agents.filter((agent) => agent.id !== id);
        if (this.selectedAgent?.id === id) {
          this.selectedAgent = null;
        }
      } catch (error: any) {
        this.error = error.message || "Failed to delete agent";
        console.error(this.error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    selectAgent(agent: PropertyAgent | null) {
      this.selectedAgent = agent;
    },

    clearSelectedAgent() {
      this.selectedAgent = null;
    },
  },
});
