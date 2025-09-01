export const formatGenres = (genres: string[], separator: string = ', '): string => {
  if (!Array.isArray(genres)) {
    return '';
  }
  
  const validGenres = genres
    .filter(genre => genre && typeof genre === 'string')
    .map(genre => genre.trim())
    .filter(genre => genre.length > 0);

  if (validGenres.length === 0) {
    return '';
  }

  return validGenres.join(separator);
};