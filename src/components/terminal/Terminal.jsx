import TokenDataTable from "../Terminal/TokenDataTable";
import fetchTokenData from "../../utils/fetchTokenData";
import LpFeed from "../NewLiq/LpFeed";
import Nav from "../Nav/Nav";
import { useState, useCallback, useContext, useEffect, useRef } from "react";
import {
  toggleSearch,
  handleAddToken,
  handleRemoveToken,
  handleSubmit
} from "../../utils/formHandling";
import { TokenContext } from "../../context/TokenContext";

function Terminal() {
  const [active, setActive] = useState(false);
  const [action, setAction] = useState("add");
  const { tokens, setTokens } = useContext(TokenContext);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef(null);

  const terminalStyles = {
    container:
      "flex flex-col lg:flex-row subpixel-antialiased overflow-hidden h-full",
    search:
      "w-full font-mono px-1 text-sm bg-transparent text-xs lg:text-sm text-green-600 placeholder-green-600 outline-none opacity-75 mt-1.5",
    searchWrapper: "flex w-full pt-0.5 pb-2 bg-green-900/5 lg:bg-black border-t border-green-900/60 lg:border-t-0",
    formContainer: "flex flex-col justify-start"
  };

  const getAddRemoveClass = (action) => {
    return action === "add"
      ? "pl-2 mt-1 text-purple-600 flex flex-col justify-center text-sm"
      : "pl-2 mt-1 text-red-600 flex flex-col justify-center text-sm";
  };

  const handleToggleSearch = useCallback(
    (newAction) => {
      toggleSearch(action, newAction, setActive, setAction);
    },
    [action]
  );

  const handleAdd = useCallback(
    async (newToken) => {
      return await handleAddToken(newToken, tokens, setTokens, fetchTokenData);
    },
    [tokens, setTokens]
  );

  const handleRemove = useCallback(
    (tokenToRemove) => {
      return handleRemoveToken(tokenToRemove, tokens, setTokens);
    },
    [tokens, setTokens]
  );

  const handleFormSubmit = async (e) => {
    await handleSubmit(
      e,
      action,
      handleAdd,
      handleRemove,
      setActive,
      fetchTokenData,
      tokens,
      setErrorMsg,
      setTokens
    );
  };

  const handleSort = () => {
    const sortedList = [...tokens].sort((a, b) =>
      a.symbol.localeCompare(b.symbol, undefined, { sensitivity: "base" })
    );
    setTokens(sortedList);
  };

  const isDisabled =
    errorMsg === "token not found." || errorMsg === "token array is full.";

  useEffect(() => {
    if (!isDisabled && active && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDisabled, active, action]);

  return (
    <div className="subpixel-antialiased flex flex-col lg:flex-row w-full h-full">
      <div className="trackedTokens flex-1 overflow-hidden flex flex-col h-full">
        <section className={terminalStyles.container}>
          <Nav
            toggleSearch={handleToggleSearch}
            handleSort={handleSort}
          />
          <TokenDataTable />
        </section>
        <div className={terminalStyles.formContainer}>
          {active ? (
            <div className={terminalStyles.searchWrapper}>
              <span className={getAddRemoveClass(action)}>{">"}</span>
              <form
                onSubmit={handleFormSubmit}
                className="w-full lg:w-3/4"
              >
                <input
                  ref={inputRef}
                  placeholder="enter contract address"
                  type="text"
                  className={terminalStyles.search}
                  maxLength={64}
                  spellCheck={false}
                  autoComplete="off"
                  name="address"
                  value={errorMsg}
                  onChange={(e) => setErrorMsg(e.target.value)}
                  disabled={isDisabled}
                  autoFocus
                />
                <button
                  type="submit"
                  style={{ display: "none" }}
                >
                  Submit
                </button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex-grow lg:flex-none h-full w-full lg:w-1/3 ml-0 lg:ml-1.5">
        <LpFeed />
      </div>
    </div>
  );
}

export default Terminal;
