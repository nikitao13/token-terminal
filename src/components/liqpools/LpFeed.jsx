function LpFeed() {
  const tableStyles = {
    container:
      "overflow-hidden text-green-500 px-1 py-1 border-t border-l border-b mt-2 border-green-900 bg-green-900/5 flex ml-1 font-mono max-h-[582.898px] h-[582.898px] min-h-[582.898px] w-[35vw] min-w-[35vw] 2xl:min-h-[87vh] 2xl:max-h-[87vh]",
    th: "py-1.5 font-medium text-green-500 uppercase tracking-wider",
    td: "py-2 whitespace-nowrap transition-color duration-600 tracking-wider",
    purple: "text-purple-600",
  };

  return (
    <div className={tableStyles.container}>
      <table className="min-w-full divide-y divide-gray-700 ml-1.5">
        <thead>
          <tr className="text-left text-xs">
            <th className={tableStyles.th}>
              New Liquidity Pools<span className={tableStyles.purple}>~</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-800 xl:text-xs 2xl:text-lg sm:text-xs flex flex-col gap-3">
          <td className={tableStyles.td}>
            <div className="">
              NEW POOL! <span className="text-purple-600">[16:00:28]</span>
            </div>
            <div>675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8</div>
          </td>
          <td className={tableStyles.td}>
            <div>
              NEW POOL! <span className="text-purple-600">[16:00:28]</span>
            </div>
            <div>675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8</div>
          </td>
          <td className={tableStyles.td}>
            <div>
              NEW POOL! <span className="text-purple-600">[16:00:28]</span>
            </div>
            <div>675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8</div>
          </td>
          <td className={tableStyles.td}>
            <div>
              NEW POOL! <span className="text-purple-600">[16:00:28]</span>
            </div>
            <div>675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8</div>
          </td>
          <td className={tableStyles.td}>
            <div>
              NEW POOL! <span className="text-purple-600">[16:00:28]</span>
            </div>
            <div>675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8</div>
          </td>
          <td className={tableStyles.td}>
            <div>
              NEW POOL! <span className="text-purple-600">[16:00:28]</span>
            </div>
            <div>675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8</div>
          </td>
          <td className={tableStyles.td}>
            <div>
              NEW POOL! <span className="text-purple-600">[16:00:28]</span>
            </div>
            <div>675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8</div>
          </td>
          <td className={tableStyles.td}>
            <div>
              NEW POOL! <span className="text-purple-600">[16:00:28]</span>
            </div>
            <div>675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8</div>
          </td>
          <td className={tableStyles.td}>
            <div>
              NEW POOL! <span className="text-purple-600">[16:00:28]</span>
            </div>
            <div>675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8</div>
          </td>
        </tbody>
      </table>
    </div>
  );
}

export default LpFeed;