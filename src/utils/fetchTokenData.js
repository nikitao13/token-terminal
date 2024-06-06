import axios from "axios";

const dexscreenerUrl = `https://api.dexscreener.io/latest/dex/tokens`;
const SOL_ADDRESS = "So11111111111111111111111111111111111111112";

export default async function fetchTokenData(addresses) {
  try {
    console.log("http request!");
    const addressString = addresses.join(",");
    const result = await axios.get(`${dexscreenerUrl}/${addressString}`);

    // Filter pairs to include only pairs where SOL is the quote token
    const filteredPairs = result.data.pairs.filter((pair) => {
      const isQuoteSOL = pair.quoteToken.address === SOL_ADDRESS;
      const isRelevantToken = addresses.includes(pair.baseToken.address);
      return isRelevantToken && isQuoteSOL;
    });

    // Group by base token address and select the pair with the highest liquidity
    const groupedByToken = filteredPairs.reduce((acc, pair) => {
      const baseAddress = pair.baseToken.address;
      const currentLiquidity = (pair.liquidity && pair.liquidity.usd) || 0;

      if (
        !acc[baseAddress] ||
        currentLiquidity >
          ((acc[baseAddress].liquidity && acc[baseAddress].liquidity.usd) || 0)
      ) {
        acc[baseAddress] = pair;
      }

      return acc;
    }, {});

    // Format the data for output
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
