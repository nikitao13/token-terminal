export const toggleSearch = (action, newAction, setActive, setAction) => {
  if (action === newAction) {
    setActive((prev) => !prev);
  } else {
    setAction(newAction);
    setActive(true);
  }
};

export const handleAddToken = async (
  newToken,
  tokens,
  setTokens,
  fetchTokenData
) => {
  const isDuplicate = tokens.some(
    (token) => token.address === newToken.address
  );
  if (isDuplicate) {
    return false;
  }

  const data = await fetchTokenData([newToken.address]);

  if (data.length > 0) {
    setTokens((prevTokens) => [...prevTokens, data[0]]);
    return true;
  }

  return false;
};

export const handleRemoveToken = (tokenToRemove, tokens, setTokens) => {
  const tokenExists = tokens.some(
    (token) => token.address === tokenToRemove.address
  );
  if (!tokenExists) {
    return false;
  }

  setTimeout(
    () =>
      setTokens((prevTokens) =>
        prevTokens.filter((token) => token.address !== tokenToRemove.address)
      ),
    150
  );
  return true;
};

export const handleSubmit = async (
  e,
  action,
  handleAdd,
  handleRemove,
  setActive,
  fetchTokenData,
  tokens,
  setErrorMsg,
  setTokens
) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const address = formData.get("address");

  if (!address) return;

  let success = false;
  if (action === "add") {
    success = await handleAdd({ address }, tokens, setTokens, fetchTokenData);
    if (!success) {
      setErrorMsg("failed to add token. it might be a duplicate.");
      setTimeout(() => setErrorMsg(""), 1500);
    }
  } else if (action === "remove") {
    success = handleRemove({ address }, tokens, setTokens);
    if (!success) {
      setErrorMsg("token not found.");
      setTimeout(() => setErrorMsg(""), 1500);
    }
  }

  e.target.reset();
  if (success) {
    setErrorMsg("");
    setActive(false);
  }
};