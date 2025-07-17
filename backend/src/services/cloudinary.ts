import { v2 as cloudinary } from 'cloudinary';
import { extractPublicIdFromUrl } from '../utils/cloudinaryUtils';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteImage = async (url: string) => {
  const publicId = extractPublicIdFromUrl(url);
  if (!publicId) {
    throw new Error('Invalid image URL');
  }
  return await cloudinary.uploader.destroy(publicId);
};
