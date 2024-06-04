function LpFeed() {
  const tableStyles = {
    container:
      "text-green-500 px-1 py-1 border-t border-l border-b mt-2 border-green-900 bg-green-900/5 overflow-auto flex ml-1 font-mono min-h-[578px] max-h-[578px]",
    th: "py-1.5 font-medium text-green-500 uppercase tracking-wider",
    td: "py-2 whitespace-nowrap transition-color duration-600",
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

        <tbody className="divide-y divide-gray-800 text-xs flex flex-col gap-3">
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