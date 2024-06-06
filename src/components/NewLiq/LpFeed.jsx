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
      "overflow-hidden text-green-500 py-1 border-t lg:border-l border-b mt-0 lg:mt-2 border-green-900 bg-black lg:bg-green-900/5 flex flex-col lg:flex-row font-mono h-[55vh] lg:h-[85vh]",
    th: "py-2 px-0.5 font-medium text-green-500 uppercase tracking-wider",
    td: "py-2 px-0.5 whitespace-nowrap transition-color duration-600 text-xs lg:text-xs 2xl:text-base",
    purple: "text-purple-600",
    tableWrapper:
      "w-full scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent overflow-y-auto smooth-scroll"
  };

  return (
    <div className={tableStyles.container}>
      <div className={tableStyles.tableWrapper}>
        <table className="min-w-full divide-y divide-gray-700 ml-1.5">
          <thead>
            <tr className="text-left text-xs 2xl:text-sm">
              <th className={tableStyles.th}>
                New Liquidity Pools<span className={tableStyles.purple}>~</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-xs lg:text-base flex flex-col gap-1">
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
