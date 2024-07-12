export function getAuthToken() {
  return localStorage.getItem('token');
}

export function deleteAuthToken() {
  return localStorage.removeItem('token');
}
