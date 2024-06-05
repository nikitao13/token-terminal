import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

function getSocket() {
  if (!socket) {
    socket = io("http://localhost:3001");
  }
  return socket;
}

function LpFeed() {
  const [lpPairs, setLpPairs] = useState([]);

  useEffect(() => {
    const socketInstance = getSocket();

    socketInstance.on("new_lp_pair", (data) => {
      setLpPairs((prevPairs) => [data, ...prevPairs]);
      console.log("new lp found!");
    });

    return () => {
      socketInstance.off("new_lp_pair");
    };
  }, []);

  const tableStyles = {
    container:
      "overflow-hidden text-green-500 px-1 py-1 border-t border-l border-b mt-2 border-green-900 bg-green-900/5 flex ml-1 font-mono max-h-[582.898px] h-[582.898px] min-h-[582.898px] w-[35vw] min-w-[35vw] 2xl:min-h-[87vh] 2xl:max-h-[87vh]",
    th: "py-1.5 font-medium text-green-500 uppercase tracking-wider",
    td: "py-2 whitespace-nowrap transition-color duration-600 tracking-wider",
    purple: "text-purple-600",
    tableWrapper: "w-full scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent overflow-y-auto smooth-scroll",
  };

  return (
    <div className={tableStyles.container}>
      <div className={tableStyles.tableWrapper}>
      <table className="min-w-full divide-y divide-gray-700 ml-1.5">
        <thead>
          <tr className="text-left text-xs">
            <th className={tableStyles.th}>
              New Liquidity Pools<span className={tableStyles.purple}>~</span>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-800 xl:text-xs 2xl:text-lg sm:text-xs flex flex-col gap-1">
          {lpPairs.map(({ time, newLpPair }, index) => (
            <tr
              key={index}
              className={tableStyles.td}
            >
              <td>
                <div>
                  NEW POOL! <span className="text-purple-600">[{time}]</span>
                </div>
                <div className="select-text">{newLpPair}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default LpFeed;
