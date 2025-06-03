import axios from 'axios';

// Create a custom axios instance for API calls
export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true, // Important for cookies, including CSRF
});

// Helper function to set auth token in headers
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Token ${token}`;
    // Also set it for any requests made with the default axios instance
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Initialize token from localStorage if it exists
const initializeAuth = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const userData = JSON.parse(storedUser);
      if (userData && userData.token) {
        setAuthToken(userData.token);
      }
    } catch (error) {
      console.error('Invalid user data in localStorage:', error);
      localStorage.removeItem('user');
    }
  }
};

// Call this function when the app starts
initializeAuth();

// Function to fetch CSRF token before sensitive operations
export const fetchCSRFToken = async () => {
  try {
    await api.get('/csrf/');
    console.log('CSRF token fetched successfully');
    return true;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    return false;
  }
};

// Export a convenience function for making authenticated API calls
export const makeAuthenticatedRequest = async (method, url, data = null, fetchCSRF = false) => {
  try {
    // Fetch CSRF token before POST/PUT/PATCH requests if requested
    if (fetchCSRF && method !== 'get' && method !== 'options') {
      await fetchCSRFToken();
    }
    
    const config = {
      method,
      url,
      data: method !== 'get' ? data : undefined,
      params: method === 'get' ? data : undefined,
    };
    
    const response = await api(config);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`API Error (${url}):`, error);
    return { 
      success: false, 
      error: error.response?.data || { message: 'Network error occurred' }
    };
  }
};

// Export convenience methods for common HTTP verbs
export const apiGet = (url, params) => makeAuthenticatedRequest('get', url, params, false);

// For auth operations (login/register), always fetch CSRF token first
export const apiAuthPost = (url, data) => makeAuthenticatedRequest('post', url, data, true);

// Regular operations
export const apiPost = (url, data) => makeAuthenticatedRequest('post', url, data, false);
export const apiPut = (url, data) => makeAuthenticatedRequest('put', url, data, false);
export const apiPatch = (url, data) => makeAuthenticatedRequest('patch', url, data, false);
export const apiDelete = (url) => makeAuthenticatedRequest('delete', url, null, false);
