const decodeToken = (token) => {
  if (!token) return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  try {
    const decoded = JSON.parse(atob(parts[1]));
    return decoded;
  } catch (err) {
    console.error("Error decodificando token:", err);
    return null;
  }
};

export const getRoleFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded?.role || null;
};

export const isAdmin = () => {
  const role = getRoleFromToken();
  return role === 'ADMINISTRADOR';
};

export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded?.userId || null;
};
