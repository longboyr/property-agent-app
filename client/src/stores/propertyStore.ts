// src/stores/propertyStore.ts
import { defineStore } from "pinia";
import type {
  Property,
  CreatePropertyDTO,
  Note,
  CreateNoteDTO,
} from "../types";
import propertyService from "../services/property.service";

export const usePropertyStore = defineStore("property", {
  state: () => ({
    agentProperties: [] as Property[],
    selectedProperty: null as Property | null,
    notes: [] as Note[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchAgentProperties(agentId: number) {
      this.loading = true;
      this.error = null;

      try {
        const response = await propertyService.getAll();
        this.agentProperties = response.filter((p) => p.agentId === agentId);
      } catch (error: any) {
        this.error = error.message || "Failed to fetch properties";
        console.error(this.error);
      } finally {
        this.loading = false;
      }
    },

    async createProperty(property: CreatePropertyDTO) {
      this.loading = true;
      this.error = null;

      try {
        const newProperty = await propertyService.create(property);
        this.agentProperties.push(newProperty);
        return newProperty;
      } catch (error: any) {
        this.error = error.message || "Failed to create property";
        console.error(this.error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    selectProperty(property: Property | null) {
      this.selectedProperty = property;
      if (property) {
        this.fetchPropertyNotes(property.id);
      }
    },

    async fetchPropertyNotes(propertyId: number) {
      this.loading = true;
      this.error = null;

      try {
        this.notes = await propertyService.getNotes(propertyId);
      } catch (error: any) {
        this.error = error.message || "Failed to fetch notes";
        console.error(this.error);
      } finally {
        this.loading = false;
      }
    },

    async addNote(note: CreateNoteDTO) {
      this.loading = true;
      this.error = null;

      try {
        const newNote = await propertyService.addNote(note);
        this.notes.push(newNote);
      } catch (error: any) {
        this.error = error.message || "Failed to add note";
        console.error(this.error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    clearSelectedProperty() {
      this.selectedProperty = null;
      this.notes = [];
    },
  },
});
