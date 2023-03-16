import { z } from 'zod';

export const RoleSchema = z.object({
  id: z.coerce.number(),
  filter: z.string(),
  tag: z.string(),
  tagKey: z.string().optional(),
  role: z.string(),
  thumb: z.string().optional()
});
export type Role = z.infer<typeof RoleSchema>;
