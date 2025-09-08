import type { Genre } from "../types/genre";

const genreTranslations: Record<string, string> = {
  'history': 'Исторический',
  'horror': 'Ужасы', 
  'scifi': 'Научная фантастика',
  'stand-up': 'Стендап',
  'fantasy': 'Фэнтези',
  'drama': 'Драма',
  'mystery': 'Мистика',
  'family': 'Семейный',
  'comedy': 'Комедия',
  'romance': 'Романтика',
  'music': 'Музыкальный',
  'crime': 'Криминал',
  'tv-movie': 'Телефильм',
  'documentary': 'Документальный',
  'action': 'Боевик',
  'thriller': 'Триллер',
  'western': 'Вестерн',
  'animation': 'Анимация',
  'war': 'Военный',
  'adventure': 'Приключения'
};

export const transformGenres = (genreIds: string[]): Genre[] => {
  return genreIds.map(genreId => ({
    id: genreId,
    name: genreTranslations[genreId] || genreId,
    imageUrl: `/image/genres/${genreId}.png`
  }));
};

export const getGenreName = (genreId: string): string => {
  const name = genreTranslations[genreId] || genreId;
  return name.charAt(0).toUpperCase() + name.slice(1);
};

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