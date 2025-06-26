import { defineStore } from "pinia";
import propertyService from "@/services/property.service";
import type { Property } from "@/types/property";

export const usePropertyStore = defineStore("property", {
  state: () => ({
    properties: [] as Property[],
    agentProperties: [] as Property[],
    selectedProperty: null as Property | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchAllProperties() {
      this.loading = true;
      this.error = null;

      try {
        this.properties = await propertyService.getAllProperties();
      } catch (error) {
        console.error("Error fetching properties:", error);
        this.error = "Failed to fetch properties";
      } finally {
        this.loading = false;
      }
    },

    async fetchAgentProperties(agentId: string) {
      this.loading = true;
      this.error = null;

      try {
        this.agentProperties = await propertyService.getPropertiesByAgentId(agentId);
      } catch (error) {
        console.error(`Error fetching properties for agent ${agentId}:`, error);
        this.error = "Failed to fetch agent properties";
      } finally {
        this.loading = false;
      }
    },

    async createProperty(property: any) {
      this.loading = true;
      this.error = null;

      try {
        const createdProperty = await propertyService.createProperty(property);
        this.properties.push(createdProperty);

        if (
          this.agentProperties.length > 0 &&
          createdProperty.agentId === this.agentProperties[0].agentId
        ) {
          this.agentProperties.push(createdProperty);
        }

        return createdProperty;
      } catch (error) {
        console.error("Error creating property:", error);
        this.error = "Failed to create property";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    clearAgentProperties() {
      this.agentProperties = [];
    },
  },
});
