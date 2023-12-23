export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  accessToken: string;
  user: User;
}

export interface Todo {
  id: string;
  title: string;
  isDone: boolean;
  userId: string;
}
