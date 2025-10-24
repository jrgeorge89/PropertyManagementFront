export interface PropertyFilters {
  Name?: string;
  Address?: string;
  MinPrice?: number;
  MaxPrice?: number;
  PageNumber?: number;
  PageSize?: number;
}

export interface Owner {
  idOwner: string;
  name: string;
  address: string;
  photo: string;
  birthDate: string;
}

export interface PropertyImage {
  idPropertyImage: string;
  file: string;
}

export interface PropertyListItem {
  idProperty: string;
  name: string;
  address: string;
  price: number;
  images: string[];
  type: string | null;
}

export interface Property {
  idProperty: string;
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  yearBuilt: number;
  type: string | null;
  zone: string;
  city: string;
  owner: Owner;
  images: PropertyImage[];
}