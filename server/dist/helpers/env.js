import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();
const envSchema = z.object({
    PORT: z.string().pipe(z.coerce.number()),
    MONGO_URI: z.string(),
    JWT_SECRET: z.string(),
    CLOUDINARY_CLOUD_NAME: z.string(),
    CLOUDINARY_SECRET_KEY: z.string(),
    CLOUDINARY_API_KEY: z.string().pipe(z.coerce.number())
});
const env = envSchema.parse(process.env);
export default env;
//# sourceMappingURL=env.js.map