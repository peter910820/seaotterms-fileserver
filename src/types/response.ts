import type { UserType } from "@/types/user";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ResponseType<T = any> {
  message: string;
  data: T;
}

export type LoginResponseType = ResponseType<UserType>;
