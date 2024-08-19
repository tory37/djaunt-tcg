export const isLoggedIn = () => {
  const loginTime = localStorage.getItem('loginTime');
  return loginTime && (Date.now() - loginTime < 48 * 60 * 60 * 1000);
};

export const login = () => {
  localStorage.setItem('loggedIn', 'true');
  localStorage.setItem('loginTime', Date.now());
};

export const logout = () => {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('loginTime');
};