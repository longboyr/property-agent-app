export interface PropertyAgent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
  properties?: Property[];
}

export interface CreateAgentDTO {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
}

export interface Property {
  id: string;
  address: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  monthlyRent: number;
  agentId: string;
  createdAt?: Date;
  updatedAt?: Date;
  agent?: PropertyAgent;
  families?: Family[];
  notes?: Note[];
}

export interface CreatePropertyDTO {
  address: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  monthlyRent: number;
  agentId: string;
}

export interface Family {
  id: number;
  name: string;
  contactNumber: string;
  propertyId: string;
  tenants?: Tenant[];
}

export interface CreateFamilyDTO {
  name: string;
  contactNumber: string;
  propertyId: string;
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
  propertyId: string;
}

export interface CreateNoteDTO {
  content: string;
  propertyId: string;
}
