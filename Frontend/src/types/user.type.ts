export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserPayload {
  name?: string;
  avatarUrl?: string;
}
