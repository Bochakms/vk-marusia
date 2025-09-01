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
    imageUrl: `../../public/image/genres/${genreId}.png`
  }));
};

export const getGenreName = (genreId: string): string => {
  const name = genreTranslations[genreId] || genreId;
  return name.charAt(0).toUpperCase() + name.slice(1);
};