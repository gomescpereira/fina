export function getmonthDateRange(month: number, year: number): {startDate: string, endDate: string} {
    if (month < 1 || month > 12 ){
        throw new Error("Mês inválido.");
    }

    // Define o primeiro dia do mes
    const startDate = new Date(year, month -1, 1);
   // Define o primeiro dia do mes
    const endDate = new Date(year, month, 0);

    const formatDate = (date: Date): string => {
        return date.toISOString().split('T')[0];
    }

    return {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),

    }

}