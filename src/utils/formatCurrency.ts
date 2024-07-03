export const formatUSD = (amount: number, fractionalDigits: number = 0) => {
    const formatUSD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: fractionalDigits,

        // https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
        // These options are needed to round to whole numbers if that's what you want.
        // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return formatUSD.format(amount);
};

export const formatAmount = (number: number) => {
    // Eg: 5000 => 5.000
    return new Intl.NumberFormat('vi-VN').format(number);
};
