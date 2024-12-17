import { z } from 'zod';

import { HubSchema } from './hub';

export const RelatedSchema = z.object({
  Hub: z.array(z.lazy(() => HubSchema)).optional()
});
export type Related = z.infer<typeof RelatedSchema>;
