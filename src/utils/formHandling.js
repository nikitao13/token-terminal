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

  try {
    const data = await fetchTokenData([newToken.address]);
    if (data.length > 0) {
      setTokens((prevTokens) => [...prevTokens, data[0]]);
      return true;
    }
  } catch (error) {
    console.error("error adding token:", error);
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

  setTokens((prevTokens) =>
    prevTokens.filter((token) => token.address !== tokenToRemove.address)
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
  const address = formData.get("address")?.trim();

  if (!address) {
    setErrorMsg("address is required.");
    setTimeout(() => setErrorMsg(""), 1500);
    return;
  }

  let success = false;
  if (action === "add") {
    success = await handleAdd({ address }, tokens, setTokens, fetchTokenData);
    if (!success) {
      setErrorMsg("failed to add token. It might be a duplicate.");
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
