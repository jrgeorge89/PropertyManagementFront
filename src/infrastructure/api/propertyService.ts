import { PropertyFilters, PropertyListItem, Property } from "@/domain/models/property";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5171';

export const getProperties = async (filters?: PropertyFilters): Promise<PropertyListItem[]> => {
  try {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(
      `${API_BASE_URL}/Properties?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error("Error fetching properties");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

export const getPropertyById = async (id: string): Promise<Property> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Properties/${id}`);
    
    if (!response.ok) {
      throw new Error("Error fetching property details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching property details:", error);
    throw error;
  }
};