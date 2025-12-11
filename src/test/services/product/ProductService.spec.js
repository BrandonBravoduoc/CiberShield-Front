import ProductService from '../../../services/product/ProductService.jsx';

describe('ProductService', () => {
  it('should have getAllProducts method', () => {
    expect(ProductService.getAllProducts).toBeDefined();
    expect(typeof ProductService.getAllProducts).toBe('function');
  });

  it('should have getProductById method', () => {
    expect(ProductService.getProductById).toBeDefined();
    expect(typeof ProductService.getProductById).toBe('function');
  });

  it('should have createProduct method', () => {
    expect(ProductService.createProduct).toBeDefined();
    expect(typeof ProductService.createProduct).toBe('function');
  });

  it('should have updateProduct method', () => {
    expect(ProductService.updateProduct).toBeDefined();
    expect(typeof ProductService.updateProduct).toBe('function');
  });

  it('should have deleteProduct method', () => {
    expect(ProductService.deleteProduct).toBeDefined();
    expect(typeof ProductService.deleteProduct).toBe('function');
  });
});
