export const formatCurrency = (
  amountString: string, 
  currency: string = "руб."
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