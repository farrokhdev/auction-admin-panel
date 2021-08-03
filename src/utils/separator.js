export const separatorCurrency = (num) => {
    return Number(num).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}