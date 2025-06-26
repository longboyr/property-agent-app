export interface Property {
  id: string;
  address: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  monthlyRent: number;
  agentId: string;
  createdAt: Date;
  updatedAt: Date;
}
