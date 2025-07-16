/**
 * Extracts Cloudinary public_id from a full image URL.
 * Works for standard Cloudinary URLs.
 * 
 * @param {string} url - Full Cloudinary image URL
 * @returns {string|null} - Extracted public_id or null if invalid
 */
export function extractPublicIdFromUrl(url: string): string | null {
    try {
      const parts = url.split('/upload/');
      if (parts.length < 2) return null;
  
      // Remove file extension (.jpg, .png, etc.)
      const pathWithVersionAndName = parts[1];
      const pathSegments = pathWithVersionAndName.split('/');
      const lastSegment = pathSegments[pathSegments.length - 1];
      const publicId = lastSegment.replace(/\.[^/.]+$/, ''); // strip extension
  
      // If image is in a folder, include folder in public_id
      if (pathSegments.length > 2) {
        return pathSegments.slice(1).join('/').replace(/\.[^/.]+$/, '');
      }
  
      return publicId;
    } catch (err) {
      console.error('Error extracting public_id:', err);
      return null;
    }
  }