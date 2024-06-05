import TokenDataTable from "./TokenDataTable";
import fetchTokenData from "../../utils/fetchTokenData";
import LpFeed from "../liqpools/LpFeed";
import Nav from "./Nav";
import { useState, useCallback, useContext, useEffect, useRef } from "react";
import {
  toggleSearch,
  handleAddToken,
  handleRemoveToken,
  handleSubmit
} from "../../utils/formHandling";
import { TokenContext } from "../../TokenContext";

function Terminal() {
  const [active, setActive] = useState(false);
  const [action, setAction] = useState("add");
  const { tokens, setTokens } = useContext(TokenContext);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef(null);

  const terminalStyles = {
    container: "flex subpixel-antialiased",
    search:
      "w-full font-mono px-1 text-sm bg-transparent text-md text-green-600 placeholder-green-600 outline-none mt-1 opacity-75",
    searchWrapper: "relative my-2 flex w-full"
  };

  const getAddRemoveClass = (action) => {
    return action === "add"
      ? "pl-2 mt-1.5 text-purple-600 flex flex-col justify-center text-sm"
      : "pl-2 mt-1.5 text-red-600 flex flex-col justify-center text-sm";
  };

  const handleToggleSearch = useCallback(
    (newAction) => {
      toggleSearch(action, newAction, setActive, setAction);
    },
    [action, setActive, setAction]
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
    <div className="subpixel-antialiased flex">
      <div className="trackedTokens w-[65vw] min-w-[60v] overflow-hidden">
        <section className={terminalStyles.container}>
          <Nav
            toggleSearch={handleToggleSearch}
            handleSort={handleSort}
          />
          <TokenDataTable />
        </section>
        {active ? (
          <div className={terminalStyles.searchWrapper}>
            <span className={getAddRemoveClass(action)}>{">"}</span>
            <form
              onSubmit={handleFormSubmit}
              className="w-[580px]"
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
      <div>
        <LpFeed />
      </div>
    </div>
  );
}

export default Terminal;