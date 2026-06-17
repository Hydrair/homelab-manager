export type LoginData = {
  email: string
  password: string
}

export type RequestParams = {
  id: string;
};

export type UpdateServerBody = {
  name?: string,
  ipAddress?: string,
  description?: string
}

export type UpdateServiceBody = {
  name?: string,
  url?: string,
  port?: number
}