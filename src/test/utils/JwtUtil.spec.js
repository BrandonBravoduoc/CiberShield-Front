import { getRoleFromToken, isAdmin, getUserIdFromToken } from '../../utils/JwtUtil.js';

describe('JwtUtil', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getRoleFromToken', () => {
    it('should return null when no token exists', () => {
      expect(getRoleFromToken()).toBeNull();
    });

    it('should return role from valid token', () => {
      const payload = btoa(JSON.stringify({ role: 'ADMINISTRADOR' }));
      const mockToken = `header.${payload}.signature`;
      localStorage.setItem('token', mockToken);
      
      expect(getRoleFromToken()).toBe('ADMINISTRADOR');
    });

    it('should return null for invalid token', () => {
      localStorage.setItem('token', 'invalid.token.here');
      expect(getRoleFromToken()).toBeNull();
    });
  });

  describe('isAdmin', () => {
    it('should return true when admin role', () => {
      const payload = btoa(JSON.stringify({ role: 'ADMINISTRADOR' }));
      const mockToken = `header.${payload}.signature`;
      localStorage.setItem('token', mockToken);
      
      expect(isAdmin()).toBe(true);
    });

    it('should return false when not admin', () => {
      const payload = btoa(JSON.stringify({ role: 'USER' }));
      const mockToken = `header.${payload}.signature`;
      localStorage.setItem('token', mockToken);
      
      expect(isAdmin()).toBe(false);
    });

    it('should return false when no token', () => {
      expect(isAdmin()).toBe(false);
    });
  });

  describe('getUserIdFromToken', () => {
    it('should return null when no token exists', () => {
      expect(getUserIdFromToken()).toBeNull();
    });

    it('should return userId from valid token', () => {
      const payload = btoa(JSON.stringify({ userId: 123 }));
      const mockToken = `header.${payload}.signature`;
      localStorage.setItem('token', mockToken);
      
      expect(getUserIdFromToken()).toBe(123);
    });
  });
});
