export interface PropertyAgent {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  properties?: Property[];
}

export interface CreateAgentDTO {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export interface Property {
  id: number;
  address: string;
  description?: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  agentId: number;
  agent?: PropertyAgent;
  families?: Family[];
  notes?: Note[];
}

export interface CreatePropertyDTO {
  address: string;
  description?: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  agentId: number;
}

export interface Family {
  id: number;
  name: string;
  contactNumber: string;
  propertyId: number;
  tenants?: Tenant[];
}

export interface CreateFamilyDTO {
  name: string;
  contactNumber: string;
  propertyId: number;
}

export interface Tenant {
  id: number;
  name: string;
  age: number;
  occupation?: string;
  familyId: number;
}

export interface CreateTenantDTO {
  name: string;
  age: number;
  occupation?: string;
  familyId: number;
}

export interface Note {
  id: number;
  content: string;
  createdAt: Date;
  propertyId: number;
}

export interface CreateNoteDTO {
  content: string;
  propertyId: number;
}
