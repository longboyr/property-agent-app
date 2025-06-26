// src/services/property.service.ts
import apiClient from "./api.service";
import type {
  Property,
  CreatePropertyDTO,
  Note,
  CreateNoteDTO,
} from "../types";

export default {
  async getAll(): Promise<Property[]> {
    const response = await apiClient.get("/properties");
    return response.data;
  },

  async getById(id: number): Promise<Property> {
    const response = await apiClient.get(`/properties/${id}`);
    return response.data;
  },

  async create(property: CreatePropertyDTO): Promise<Property> {
    const response = await apiClient.post("/properties", property);
    return response.data;
  },

  async update(id: number, property: CreatePropertyDTO): Promise<Property> {
    const response = await apiClient.patch(`/properties/${id}`, property);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/properties/${id}`);
  },

  async getNotes(id: number): Promise<Note[]> {
    const response = await apiClient.get(`/properties/${id}/notes`);
    return response.data;
  },

  async addNote(note: CreateNoteDTO): Promise<Note> {
    const response = await apiClient.post("/notes", note);
    return response.data;
  },
};
