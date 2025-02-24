import api from './axios';

export const login = async (username: string, password: string) => {
//   const { data } = await api.post<{ token: string }>('/auth/login', { username, password });
//   return data;
if (username === 'admin' && password === 'password') {
    return {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    };
  }
  throw new Error('Invalid credentials');
};