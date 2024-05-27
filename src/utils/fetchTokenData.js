import axios from 'axios'

const dexscreenerUrl = `https://api.dexscreener.io/latest/dex/tokens`;

export default async function getTokenData(addresses) {
    try {
        const results = await Promise.all(addresses.map(address => axios.get(`${dexscreenerUrl}/${address}`)));
        return results.map(res => extractFormattedData(res.data)).filter(data => data !== null);
    } catch (error) {
        console.error('Error fetching token data:', error);
        return [];
    }
}

function extractFormattedData(data) {
    const pairs = data.pairs || [];
    if (pairs.length > 0) {
        const pair = pairs[0];
        const { chainId, fdv, priceUsd, baseToken: { address: address, name: tokenName, symbol: symbol }, priceChange } = pair;
        const { m5, h1, h24 } = priceChange || {};
        return formatData(chainId, address, tokenName, priceUsd, fdv, symbol, m5, h1, h24);
    }
    return null;
}

const formatPercentage = value => value >= 1000 ? (value / 1000).toFixed(1) + "K": parseFloat(value).toFixed(2);

const formatData = (chainId, address, tokenName, priceUSD, fdv, symbol, changeFive, changeHour, changeDay) => ({
    chainId: chainId,
    address: address,
    name: tokenName,
    price: parseFloat(parseFloat(priceUSD).toFixed(8)),
    fdv: fdv,
    symbol: symbol,
    changeFive: formatPercentage(changeFive),
    changeHour: formatPercentage(changeHour),
    changeDay: formatPercentage(changeDay)
});