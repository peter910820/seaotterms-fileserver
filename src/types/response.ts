import type { User } from "@/types/user";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Response<T = any> {
  message: string;
  data: T;
}

export type LoginResponse = Response<User>;
