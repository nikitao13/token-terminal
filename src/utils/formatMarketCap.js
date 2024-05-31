function formatMarketCap(number) {
    if (number == null) {
        return 'N/A';
    }

    if (number >= 1e9) {
        return (number / 1e9).toFixed(2).replace(/\.?0+$/, '') + 'B';
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(1).replace(/\.?0+$/, '') + 'M';
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(1).replace(/\.?0+$/, '') + 'K';
    } else {
        return number.toString();
    }
}

export default formatMarketCap;