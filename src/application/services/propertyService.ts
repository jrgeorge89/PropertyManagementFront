import axios from 'axios'
import { Property, CreatePropertyDTO, UpdatePropertyDTO, PropertyListItem } from '@/domain/models/property'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export class PropertyService {
  static async getProperties(): Promise<PropertyListItem[]> {
    const response = await axios.get(`${API_URL}/properties`)
    return response.data
  }

  static async getPropertyById(id: string): Promise<Property> {
    const response = await axios.get(`${API_URL}/properties/${id}`)
    return response.data
  }

  static async createProperty(property: CreatePropertyDTO): Promise<Property> {
    const response = await axios.post(`${API_URL}/properties`, property)
    return response.data
  }

  static async updateProperty(id: string, property: UpdatePropertyDTO): Promise<Property> {
    const response = await axios.put(`${API_URL}/properties/${id}`, property)
    return response.data
  }

  static async deleteProperty(id: string): Promise<void> {
    await axios.delete(`${API_URL}/properties/${id}`)
  }

  static async searchProperties(params: {
    type?: string
    status?: string
    minPrice?: number
    maxPrice?: number
    location?: string
    features?: string[]
  }): Promise<PropertyListItem[]> {
    const response = await axios.get(`${API_URL}/properties/search`, {
      params
    })
    return response.data
  }

  // Método para obtener propiedades destacadas
  static async getFeaturedProperties(): Promise<PropertyListItem[]> {
    const response = await axios.get(`${API_URL}/properties/featured`)
    return response.data
  }

  // Método para obtener propiedades similares
  static async getSimilarProperties(propertyId: string): Promise<PropertyListItem[]> {
    const response = await axios.get(`${API_URL}/properties/${propertyId}/similar`)
    return response.data
  }
}