export interface User {
  id: string;
  username: string;
  role: 'ADMIN' | 'USER';
}