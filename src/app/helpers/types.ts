export interface User {
  id: string;
  username: string;
  role: string;
}

export interface Message {
  user: User;
  room: Chat;
  content: string;
  createdAt: Date;
}

export interface Chat {
  _id: number;
  name: string;
  users: User[];
}
