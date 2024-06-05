import { useEffect, useContext, useCallback } from "react";
import formatMarketCap from "../../utils/formatMarketCap";
import { TokenContext } from "../../TokenContext";
import fetchTokenData from "../../utils/fetchTokenData";

function TokenDataTable() {
  const { tokens, setTokens } = useContext(TokenContext);

  const updateTokenData = useCallback(async () => {
    if (tokens.length > 0) {
      const addresses = tokens.map((token) => token.address);
      const updatedData = await fetchTokenData(addresses);
      setTokens((prevTokens) =>
        prevTokens.map(
          (token) =>
            updatedData.find((data) => data.address === token.address) || token
        )
      );
    }
  }, [tokens, setTokens]);

  useEffect(() => {
    if (tokens.length > 0) {
      const intervalId = setInterval(updateTokenData, 10000);
      return () => clearInterval(intervalId);
    }
  }, [tokens, updateTokenData]);

  const tableStyles = {
    container:
      "text-green-500 flex flex-row px-1 py-1 border mt-2 border-green-900 bg-green-900/5 w-[65vw] min-w-[60vw] h-[582.898px] min-h-[582.898px] 2xl:min-h-[87vh] 2xl:max-h-[87vh]",
    tableWrapper:
      "w-full h-full scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent overflow-y-auto smooth-scroll",
    th: "xl:px-4 xl:py-2.5 font-medium text-green-500 uppercase tracking-wider",
    td: "xl:px-4 xl:py-3.5 whitespace-nowrap transition-color duration-600",
    row: "font-light hover:opacity-75 transition-all duration-300 xl:text-sm 2xl:text-base sm:text-xs md:text-sm",
    purple: "text-purple-600"
  };

  const { container, tableWrapper, th, td, row, purple } = tableStyles;

  return (
    <div className={container}>
      <div className={tableWrapper}>
        <table className="min-w-full h-full divide-y divide-gray-700 ml-1.5">
          <thead>
            <tr className="text-left text-xs">
              <th className={th}>
                <span className={purple}>Ticker</span>
              </th>
              <th className={th}>
                <span className={purple}>Fdv</span>
              </th>
              <th className={th}>Price</th>
              <th className={th}>
                5min <span className={purple}>%</span>
              </th>
              <th className={th}>
                1hr <span className={purple}>%</span>
              </th>
              <th className={th}>
                24hr <span className={purple}>%</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm">
            {tokens.map((token, index) => (
              <tr
                key={index}
                className={row}
              >
                <td className={`${td} hover:cursor-pointer`}>
                  <span className={purple}>(</span>
                  <a
                    href={`https://dexscreener.com/${token.chainId || ""}/${
                      token.address || ""
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {token.symbol?.startsWith("$") ? "!" : "$"}
                    {token.symbol?.toUpperCase() || "N/A"}
                  </a>
                  <span className={purple}>)</span>
                </td>
                <td className={td}>{formatMarketCap(token.fdv)}</td>
                <td className={td}>${token.price}</td>
                <td
                  className={`${td} ${
                    token.changeFive < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {token.changeFive}%
                </td>
                <td
                  className={`${td} ${
                    token.changeHour < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {token.changeHour}%
                </td>
                <td
                  className={`${td} ${
                    token.changeDay < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {token.changeDay}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TokenDataTable;
