export const toggleSearch = (action, newAction, setActive, setAction) => {
    if (action === newAction) {
        setActive(prev => !prev);
    } else {
        setAction(newAction);
        setActive(true);
    }
}

export const handleAddToken = async (newToken, setTokens) => {
    setTokens(prevTokens => {
        if (!prevTokens.find(token => token.address === newToken.address)) {
            return [...prevTokens, newToken];
        }
        return prevTokens;
    });
}

export const handleRemoveToken = (tokenToRemove, setTokens) => {
    setTokens(prevTokens => prevTokens.filter(token => token.address !== tokenToRemove.address));
}

export const handleSubmit = async (e, action, handleAdd, handleRemove, setActive, fetchTokenData, tokens) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const address = formData.get('address');
    if (address) {
        if (action === "add") {
            const tokenExists = tokens.some(token => token.address === address);
            if (!tokenExists) {
                const data = await fetchTokenData([address]);
                if (data.length > 0) {
                    await handleAdd(data[0]);
                }
            }
        } else if (action === "remove") {
            handleRemove({ address });
        }
        e.target.reset();
        setActive(false);
    }
}