// Helper function to get user avatar URL
export const getUserAvatarUrl = (photo) => {
  if (!photo) return null;
  
  // If it's already a blob URL (from optimistic updates), use it directly
  if (photo.startsWith('blob:')) {
    return photo;
  }
  
  // If it's a filename, construct the full URL
  return `http://localhost:5000/img/users/${photo}`;
};

// Helper function to get image URL for any type
export const getImageUrl = (imagePath, type = 'users') => {
  if (!imagePath) return null;
  
  // If it's already a full URL, return it
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it's a blob URL, return it directly
  if (imagePath.startsWith('blob:')) {
    return imagePath;
  }
  
  // Otherwise, construct the full URL
  return `http://localhost:5000/img/${type}/${imagePath}`;
}; 