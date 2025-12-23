import { z } from 'zod';
const envSchema = z.object({
    PORT: z.number(),
    MONGO_URI: z.string(),
    JWT_SECRET: z.string()
});
const env = envSchema.parse(process.env);
export default env;
//# sourceMappingURL=env.js.map