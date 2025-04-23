export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  exp: number;
  management: boolean;
  createdAt: Date;
  createName: string;
  updatedAt: Date | null;
  updateName: string | null;
}
