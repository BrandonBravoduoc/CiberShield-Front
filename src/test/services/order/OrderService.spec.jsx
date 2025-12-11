import OrderService from '../../../services/order/OrderService';

describe('OrderService', () => {
  it('should have getAllOrders method', () => {
    expect(OrderService.getAllOrders).toBeDefined();
    expect(typeof OrderService.getAllOrders).toBe('function');
  });

  it('should have getOrderById method', () => {
    expect(OrderService.getOrderById).toBeDefined();
    expect(typeof OrderService.getOrderById).toBe('function');
  });

  it('should have createOrder method', () => {
    expect(OrderService.createOrder).toBeDefined();
    expect(typeof OrderService.createOrder).toBe('function');
  });

  it('should have patchOrderStatus method', () => {
    expect(OrderService.patchOrderStatus).toBeDefined();
    expect(typeof OrderService.patchOrderStatus).toBe('function');
  });

  it('should have deleteOrder method', () => {
    expect(OrderService.deleteOrder).toBeDefined();
    expect(typeof OrderService.deleteOrder).toBe('function');
  });
});
