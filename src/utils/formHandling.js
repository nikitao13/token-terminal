export const toggleSearch = (currentAction, newAction, setActive, setAction) => {
    if (currentAction === newAction) {
        setActive(active => !active);
    } else {
        setAction(newAction);
        setActive(true);
    }
};

export const handleAddAddress = (newAddress, setAddresses) => {
    setAddresses(prevAddresses => {
        if (!prevAddresses.includes(newAddress)) {
            return [...prevAddresses, newAddress];
        }
        return prevAddresses;
    });
};

export const handleRemoveAddress = (addressToRemove, setAddresses) => {
    setAddresses(prevAddresses => prevAddresses.filter(address => address !== addressToRemove));
};

export const handleSubmit = (e, action, handleAddAddress, handleRemoveAddress, setActive) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const address = formData.get('address');
    if (address) {
        if (action === "add") {
            handleAddAddress(address);
        } else if (action === "remove") {
            handleRemoveAddress(address);
        }
        e.target.reset();
        setActive(false);
    }
};
