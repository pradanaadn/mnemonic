import * as z from 'zod';

export const NewUser = z
  .object({
    name: z.string(),
    username: z.string(),
    password: z.string(),
    roleId: z.string(),
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
export const UserRecord = z.object({
  id: z.string(),
  name: z.string(),
  password: z.string(),
  roleId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date,
});
export type UserDataType = z.infer<typeof NewUser>;
export type UserRecordType = z.infer<typeof UserRecord>;
