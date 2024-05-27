import tokenData from  "./tokenData"

function TokenDataTable() {
    const tableStyles = {
        container: "text-green-500 flex flex-row px-1 py-1 border mt-2 border-green-900 w-max bg-green-900/5",
        th: "px-4 py-1.5 font-medium text-green-500 uppercase tracking-wider",
        td: "px-4 py-3.5 whitespace-nowrap transition-color duration-600",
        row: "text-md font-light hover:opacity-75 transition-all duration-300",
        purple: "text-purple-500"
    }
    
    const { container, th, td, row, purple } = tableStyles;

    return (
        <div className={container}>
            <table className="min-w-full divide-y divide-gray-700 ml-1.5">

                <thead>
                    <tr className="text-left text-sm">
                        <th className={th}><span className={purple}>Name</span></th>
                        <th className={th}>Price</th>
                        <th className={th}>FDV</th>
                        <th className={th}>5min <span className={purple}>%</span></th>                    
                        <th className={th}>1hr <span className={purple}>%</span></th>                    
                        <th className={th}>24hr <span className={purple}>%</span></th>                    
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-800">
                    {tokenData.map((token, index) => (

                        <tr key={index} className={row}>
                            <td className={`${td} hover:cursor-pointer`}><span className="text-purple-500">(</span>{token.name}<span className="text-purple-500">)</span></td>
                            <td className={td}>{token.price}</td>
                            <td className={td}>{token.fdv}</td>

                            <td className={`${td} ${token.changeFive.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                                {token.changeFive}
                            </td>
                            <td className={`${td} ${token.changeHour.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                                {token.changeHour}
                            </td>
                            <td className={`${td} ${token.changeDay.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                                {token.changeDay}
                            </td>
                        </tr>

                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default TokenDataTable;