import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FilterBar } from '../FilterBar'
import { PropertyFilters } from '@/domain/models/property'

describe('FilterBar', () => {
  const mockOnNameChange = jest.fn()
  const mockOnAddressChange = jest.fn()
  const mockOnFilterChange = jest.fn()
  const mockOnResetFilters = jest.fn()

  const defaultProps = {
    nameSearch: '',
    addressSearch: '',
    onNameChange: mockOnNameChange,
    onAddressChange: mockOnAddressChange,
    onFilterChange: mockOnFilterChange,
    onResetFilters: mockOnResetFilters,
    filters: {} as Partial<PropertyFilters>,
    isLoading: false
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all filter inputs correctly', () => {
    render(<FilterBar {...defaultProps} />)
    
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/dirección/i)).toBeInTheDocument()
  })

  it('calls onNameChange when name input changes', async () => {
    render(<FilterBar {...defaultProps} />)
    const nameInput = screen.getByLabelText(/nombre/i)
    
    fireEvent.change(nameInput, { target: { value: 'test name' } })
    expect(mockOnNameChange).toHaveBeenCalledWith('test name')
  })

  it('calls onAddressChange when address input changes', async () => {
    render(<FilterBar {...defaultProps} />)
    const addressInput = screen.getByLabelText(/dirección/i)
    
    fireEvent.change(addressInput, { target: { value: 'test address' } })
    expect(mockOnAddressChange).toHaveBeenCalledWith('test address')
  })

  it('calls onFilterChange when price range changes', () => {
    render(<FilterBar {...defaultProps} />)
    const minPriceInput = screen.getByPlaceholderText('Precio mínimo')
    const maxPriceInput = screen.getByPlaceholderText('Precio máximo')
    
    fireEvent.change(minPriceInput, { target: { value: '100000' } })
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      MinPrice: 100000,
      MaxPrice: undefined
    })
    
    fireEvent.change(maxPriceInput, { target: { value: '200000' } })
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      MinPrice: undefined,
      MaxPrice: 200000
    })
  })

  it('calls onResetFilters when reset button is clicked', async () => {
    render(<FilterBar {...defaultProps} />)
    const resetButton = screen.getByRole('button', { name: /restablecer/i })
    
    await userEvent.click(resetButton)
    expect(mockOnResetFilters).toHaveBeenCalled()
  })

  it('disables inputs when isLoading is true', () => {
    render(<FilterBar {...defaultProps} isLoading={true} />)
    
    expect(screen.getByLabelText(/nombre/i)).toBeDisabled()
    expect(screen.getByLabelText(/dirección/i)).toBeDisabled()
    expect(screen.getByRole('button', { name: /restablecer/i })).toBeDisabled()
  })
})