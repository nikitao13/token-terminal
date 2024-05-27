function formatMarketCap(number) {
    if (number >= 1e9) {
        const value = (number / 1e9).toFixed(2);
        return trimToThreeChars(value) + 'B';
    } else if (number >= 1e6) {
        const value = (number / 1e6).toFixed(2);
        return trimToThreeChars(value) + 'M';
    } else if (number >= 1e3) {
        const value = (number / 1e3).toFixed(2);
        return trimToThreeChars(value) + 'K';
    } else {
        return number.toString();
    }
}

function trimToThreeChars(value) {
    const trimmed = value.replace(/\.?0+$/, '');
    if (trimmed.length > 3) {
        return trimmed.slice(0, 3);
    }
    return trimmed;
}

export default formatMarketCap;