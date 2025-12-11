import authService from '../../../services/auth/AuthService.js';

describe('AuthService', () => {
  it('should have login method', () => {
    expect(authService.login).toBeDefined();
    expect(typeof authService.login).toBe('function');
  });

  it('should have register method', () => {
    expect(authService.register).toBeDefined();
    expect(typeof authService.register).toBe('function');
  });

  it('should have changePassword method', () => {
    expect(authService.changePassword).toBeDefined();
    expect(typeof authService.changePassword).toBe('function');
  });
});
