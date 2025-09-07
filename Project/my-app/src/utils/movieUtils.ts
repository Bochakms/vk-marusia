export const formatCurrency = (
  amountString: string, 
  currency: string = "$"
): string => {
  if (!amountString || amountString.trim() === '') {
    return `— ${currency}`;
  }

  const amount = parseInt(amountString, 10);
  
  if (isNaN(amount)) {
    return `— ${currency}`;
  }

  const formattedAmount = amount.toLocaleString('ru-RU', {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  return `${formattedAmount} ${currency}`;
};

const languageTranslations: Record<string, string> = {
  'ab': 'Абхазский',
  'av': 'Аварский', 
  'az': 'Азербайджаский',
  'sq': 'Албанский',
  'en': 'Английский',
  'ar': 'Арабский',
  'an': 'Арагонский',
  'hy': 'Армянский',
  'bg': 'Болгарский',
  'bs': 'Боснийский',
  'cy': 'Валийский',
  'hu': 'Венгерский',
  'vi': 'Вьетнамский',
  'el': 'Греческий',
  'ka': 'Грузинский',
  'da': 'Датский',
  'he': 'Иврит',
  'yi': 'Идиш',
  'id': 'Индонейзийский',
  'ga': 'Ирландский',
  'is': 'Исладский',
  'es': 'Испанский', 
  'it': 'Итальянский',
  'kk': 'Казахский',
  'ca': 'Каталанский',
  'ky': 'Киргизский',
  'zh': 'Китайский',
  'kg': 'Конго',
  'ko': 'Корейский',
  'co': 'Корсиканский',
  'ku': 'Курдский',
  'la': 'Латинский',
  'lv': 'Латышский',
  'lt': 'Литовский',
  'lb': 'Люксембургский',
  'mk': 'Македонский',
  'ms': 'Малайский',
  'mi': 'Маори',
  'mr': 'Маратхи',
  'mn': 'Монгольский',
  'de': 'Немецкий',
  'ne': 'Непальский',
  'nl': 'Нидерладский',
  'no': 'Норвежский',
  'fa': 'Персидский',
  'pl': 'Польский',
  'pt': 'Португальский',
  'ro': 'Румынский',
  'ru': 'Русский',
  'sa': 'Санскрит',
  'sr': 'Сербский',
  'sk': 'Словацкий',
  'sl': 'Словенский',
  'so': 'Сомалийский',
  'sw': 'Суахили',
  'tg': 'Таджикский',
  'th': 'Тайский',
  'tt': 'Татарский',
  'bo': 'Тибетский',
  'tr': 'Турецкий',
  'tk': 'Туркменский',
  'uz': 'Узбекский',
  'ug': 'Уйгурский',
  'uk': 'Украиский',
  'fi': 'Финский',
  'fr': 'Французский',
  'hi': 'Хинди',
  'hr': 'Хорватский',
  'cs': 'Чешский',
  'sv': 'Шведский',
  'et': 'Эстонский',
  'ja': 'Японский',
};

export const transformLanguage = (language: string): string => {
  return languageTranslations[language] || language
};