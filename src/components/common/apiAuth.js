import axios from 'axios';

const api = axios.create({
  baseURL: 'https://shopDirect-api.onrender.com/api/v4',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export async function signup({ email, password, passwordConfirm, name }) {
  try {
    const res = await api.post('/users/sign-up', {
      email,
      password,
      passwordConfirm,
      name,
    });
    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || err.message || 'Error during signup'
    );
  }
}