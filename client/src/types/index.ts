export interface Property {
  id: string;
  name: string;
  address1: string;
  address2: string;
  sqft: number;
  isOccupied: boolean;
  baseRent: string;
}

export interface Contact {
  id: string;
  phone: string;
  email: string;
  tags: string[];
}

export interface Lease {
  id: string;
  status: string;
  companyName: string;
  startDate: string;
  inclusiveEndDate: string;
  contacts: Record<string, Contact>;
}

export interface ServiceResponse<Type> {
  error?: Error;
  data: Type | null;
}
