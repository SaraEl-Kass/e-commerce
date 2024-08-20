import { render, screen } from '@testing-library/angular'
import { ProductDetailsComponent } from './product-details.component'
import { CartService } from '../../../services/cart.service'
import '@testing-library/jest-dom'
import { Product } from '../../../../shared/models/models/product'

describe('ProductDetailsComponent', () => {
  let cartServiceMock: jasmine.SpyObj<CartService>

  beforeEach(async () => {
    cartServiceMock = jasmine.createSpyObj('CartService', ['addToCart'])
    await render(ProductDetailsComponent, {
      providers: [{ provide: CartService, useValue: cartServiceMock }],
    })
  })

  it('should display the product details', async () => {
    // Arrange
    const mockProduct: Product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      image: 'test-image-url',
      category: 'Test Category',
      description: 'Test Description',
      rating: {
        rate: 4.5,
        count: 100,
      },
    }

    cartServiceMock.addToCart.and.returnValue(Promise.resolve())

    // Act
    const titleElement = await screen.getByText(mockProduct.title)
    const priceElement = await screen.getByText(`$${mockProduct.price}`)

    // Assert
    expect(titleElement).toBeInTheDocument()
    expect(priceElement).toBeInTheDocument()
  })

  it('should display the product details', async () => {
    // Arrange
    const mockProduct: Product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      image: 'test-image-url',
      category: 'Test Category',
      description: '',
      rating: {
        rate: 0,
        count: 0,
      },
    }
    cartServiceMock.addToCart.and.returnValue(Promise.resolve())

    // Act
    const titleElement = screen.getByText(mockProduct.title)
    const priceElement = screen.getByText(`$${mockProduct.price}`)

    // Assert
    expect(titleElement).toBeInTheDocument()
    expect(priceElement).toBeInTheDocument()
  })
})
