import TokenDataTable from "./TokenDataTable";
import fetchTokenData from "../../utils/fetchTokenData";
import Nav from "./Nav";
import { useState, useCallback } from 'react';
import { toggleSearch, handleAddAddress, handleRemoveAddress, handleSubmit } from '../../utils/formHandling';


function Terminal() {
    const terminalStyles = {
        container: "flex subpixel-antialiased",
        search: "w-full font-mono px-1 text-sm bg-transparent text-md text-green-600 placeholder-green-600 outline-none mt-2 opacity-75",
        searchWrapper: "relative my-2 flex w-full"
    }

    const [active, setActive] = useState(false);
    const [action, setAction] = useState("add");

    const [addresses, setAddresses] = useState([
        "26KMQVgDUoB6rEfnJ51yAABWWJND8uMtpnQgsHQ64Udr",
        "2GZcmRHmKFWPqkJ9Wm1XAf5kLwFxcYG5cTiTGkH4VZht",
        "0xaaeE1A9723aaDB7afA2810263653A34bA2C21C7a",
        "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
    ]);

    const handleToggleSearch = (newAction) => {
        toggleSearch(action, newAction, setActive, setAction);
    }

    const handleAdd = useCallback((newAddress) => {
        handleAddAddress(newAddress, setAddresses);
    }, []);

    const handleRemove = useCallback((addressToRemove) => {
        handleRemoveAddress(addressToRemove, setAddresses);
    }, []);

    const handleFormSubmit = (e) => {
        handleSubmit(e, action, handleAdd, handleRemove, setActive);
    }
    
    return (
        <div className="subpixel-antialiased w-full">
            
            <section className={terminalStyles.container}>
                <Nav toggleSearch={handleToggleSearch}/> 
                <TokenDataTable fetchTokenData={fetchTokenData} addresses={addresses}/>
            </section>
            {active ? (
                <div className={terminalStyles.searchWrapper}>
                    <span className="pl-2 mt-1.5 text-purple-600 flex flex-col justify-center text-sm">{">"}</span>
                    <form onSubmit={handleFormSubmit} className="w-[575px]">
                    <input placeholder="enter contract address" type="text" autoFocus className={terminalStyles.search} maxLength={66} spellCheck={false} autoComplete="off" name="address"></input>
                    <button type="submit" style={{ display: 'none' }}>Submit</button>
                    </form>
                </div>
            ) : null}
        </div>
    )
}

export default Terminal;