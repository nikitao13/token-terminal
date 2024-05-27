function TokenDataLoading() {
    const tableStyles = {
        container: "text-green-500 flex flex-row px-1 py-1 border mt-2 border-green-900 w-max bg-green-900/5",
        th: "px-4 py-1.5 font-medium text-green-500 uppercase tracking-wider",
        td: "px-4 py-3.5 whitespace-nowrap transition-color duration-600",
        row: "text-md font-light hover:opacity-75 transition-all duration-300",
        purple: "text-purple-500"
    }
    
    const { container, th, td, row, purple } = tableStyles;

    const dummyData = ["1", "2", "3"];

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
                    {dummyData.map((token, index) => (
                        <tr key={index} className={row}>
                            <td className={`${td} hover:cursor-pointer`}>
                                <span className={purple}>(</span><a>{`$TICKER${index + 1}`}</a><span className={purple}>)</span>
                            </td>
                            <td className={td}>$0.24</td>
                            <td className={td}>69.3M</td>
                            <td className={`${td} text-green-500`}>100%</td>
                            <td className={`${td} text-green-500`}>100%</td>
                            <td className={`${td} text-green-500`}>100%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TokenDataLoading;