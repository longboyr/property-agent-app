import apiClient from "./api.service";
import type { Property } from "@/types/property";

export default {
  async getAllProperties(): Promise<Property[]> {
    const response = await apiClient.get("/properties");
    return response.data;
  },

  async getPropertyById(id: string): Promise<Property> {
    const response = await apiClient.get(`/properties/${id}`);
    return response.data;
  },

  async createProperty(property: any): Promise<Property> {
    const response = await apiClient.post("/properties", property);
    return response.data;
  },

  async getPropertyDetails(id: string): Promise<any> {
    const response = await apiClient.get(`/properties/${id}/details`);
    return response.data;
  },
};
