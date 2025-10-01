import * as z from 'zod';

export const LoginData = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .refine(
    (data) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(data.password),
    {
      message:
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
      path: ['password'],
    },
  );

export const AuthPayload = z.object({
  id: z.uuid(),
  name: z.string(),
  username: z.string(),
});

export const TokenPayload = z.object({
  token: z.string(),
  userData: AuthPayload,
});

export type LoginDataType = z.infer<typeof LoginData>;
export type AuthPayloadType = z.infer<typeof AuthPayload>;
export type TokenPayloadType = z.infer<typeof TokenPayload>;
