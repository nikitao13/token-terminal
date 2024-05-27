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


const formatData = (chainId, address, tokenName, priceUSD, fdv, symbol, changeFive, changeHour, changeDay) => ({
    chainId: chainId,
    address: address,
    name: tokenName,
    price: parseFloat(parseFloat(priceUSD).toFixed(10)),
    fdv: fdv,
    symbol: symbol,
    changeFive: parseFloat(parseFloat(changeFive).toFixed(2)),
    changeHour: parseFloat(parseFloat(changeHour).toFixed(2)),
    changeDay: parseFloat(parseFloat(changeDay).toFixed(2))
});
