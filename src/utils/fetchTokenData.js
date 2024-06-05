import axios from "axios";

const dexscreenerUrl = `https://api.dexscreener.io/latest/dex/tokens`;

export default async function fetchTokenData(addresses) {
  try {
    console.log("http request!");
    const addressString = addresses.join(",");
    const result = await axios.get(`${dexscreenerUrl}/${addressString}`);

    const filteredPairs = result.data.pairs.filter((pair) =>
      addresses.includes(pair.baseToken.address)
    );

    const groupedByToken = filteredPairs.reduce((acc, pair) => {
      const address = pair.baseToken.address;
      if (
        !acc[address] ||
        ((pair.liquidity && pair.liquidity.usd) || 0) >
          ((acc[address].liquidity && acc[address].liquidity.usd) || 0)
      ) {
        acc[address] = pair;
      }
      return acc;
    }, {});

    const formattedData = Object.values(groupedByToken)
      .map((pair) => extractFormattedData(pair))
      .filter((data) => data !== null);

    return formattedData;
  } catch (error) {
    console.error("Error fetching token data:", error);
    return [];
  }
}

function extractFormattedData(pair) {
  if (!pair) return null;

  const {
    chainId,
    fdv,
    priceUsd,
    baseToken: { address, name: tokenName, symbol },
    priceChange
  } = pair;

  const { m5, h1, h24 } = priceChange || {};

  return {
    chainId,
    address,
    name: tokenName,
    price: parseFloat(priceUsd),
    fdv,
    symbol,
    changeFive: formatPercentage(m5),
    changeHour: formatPercentage(h1),
    changeDay: formatPercentage(h24)
  };
}

const formatPercentage = (value) =>
  value >= 1000
    ? (value / 1000).toFixed(1) + "K"
    : parseFloat(value).toFixed(2);
