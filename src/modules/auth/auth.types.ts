export type JwtType = 'user';

export type JwtPayload = {
  id: number;
  type: JwtType;
  auth: Record<any, any>;
};
