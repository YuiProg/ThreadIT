import { v2 as cloudinary } from "cloudinary";
import env from "./env.js";
cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: String(env.CLOUDINARY_API_KEY),
    api_secret: env.CLOUDINARY_SECRET_KEY
});
export default cloudinary;
//# sourceMappingURL=cloudinary.js.map