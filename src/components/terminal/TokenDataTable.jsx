import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import formatMarketCap from "../../utils/formatMarketCap";
import TokenDataLoading from "./TokenDataLoading";

function TokenDataTable({ fetchTokenData }) {
    const [tokenData, setTokenData] = useState([]);
    const [loading, setLoading] = useState(true);

    const addresses = useMemo(() => [
        "26KMQVgDUoB6rEfnJ51yAABWWJND8uMtpnQgsHQ64Udr",
        "2GZcmRHmKFWPqkJ9Wm1XAf5kLwFxcYG5cTiTGkH4VZht",
        "0xaaeE1A9723aaDB7afA2810263653A34bA2C21C7a",
        "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
    ], []);

    useEffect(() => {
        let intervalId;

        async function fetchData() {
            try {
                const data = await fetchTokenData(addresses);
                setTokenData(data);
            } catch (error) {
                console.error('Error fetching token data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData(); 

        intervalId = setInterval(fetchData, 60000);

        return () => clearInterval(intervalId); 
    }, [fetchTokenData, addresses]);

    const tableStyles = {
        container: "text-green-500 flex flex-row px-1 py-1 border mt-2 border-green-900 w-max bg-green-900/5",
        th: "px-4 py-1.5 font-medium text-green-500 uppercase tracking-wider",
        td: "px-4 py-3.5 whitespace-nowrap transition-color duration-600",
        row: "text-md font-light hover:opacity-75 transition-all duration-300",
        purple: "text-purple-600"
    }
    
    const { container, th, td, row, purple } = tableStyles;

    if (loading) {
        return <TokenDataLoading />;
    }

    return (
        <div className={container}>
            <table className="min-w-full divide-y divide-gray-700 ml-1.5">

                <thead>
                    <tr className="text-left text-xs">
                        <th className={th}><span className={purple}>Ticker</span></th>
                        <th className={th}>Price</th>
                        <th className={th}>Fdv</th>
                        <th className={th}>5min <span className={purple}>%</span></th>                    
                        <th className={th}>1hr <span className={purple}>%</span></th>                    
                        <th className={th}>24hr <span className={purple}>%</span></th>                    
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-800 text-sm">
                    {tokenData.map((token, index) => (

                        <tr key={index} className={row}>

                            <td className={`${td} hover:cursor-pointer`}><span className={purple}>(</span>
                            <a href={`https://dexscreener.com/${token.chainId}/${token.address}`} target="_blank" rel="noopener noreferrer">{token.symbol.startsWith("$") ? "!" : "$"}{token.symbol.toUpperCase()}</a>
                            <span className={purple}>)</span></td>

                            <td className={td}>${token.price}</td>
                            <td className={td}>{formatMarketCap(token.fdv)}</td>

                            <td className={`${td} ${token.changeFive < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                {token.changeFive}%
                            </td>
                            <td className={`${td} ${token.changeHour < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                {token.changeHour}%
                            </td>
                            <td className={`${td} ${token.changeDay < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                {token.changeDay}%
                            </td>
                        </tr>

                    ))}
                </tbody>

            </table>
        </div>
    )
}

TokenDataTable.propTypes = {
    fetchTokenData: PropTypes.func.isRequired,
};


export default TokenDataTable;