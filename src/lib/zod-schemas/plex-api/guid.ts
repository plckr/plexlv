import { z } from 'zod';

export const GuidSchema = z.object({
  id: z.string()
});
export type Guid = z.infer<typeof GuidSchema>;
