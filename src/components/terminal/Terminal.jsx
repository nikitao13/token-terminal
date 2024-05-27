import TokenDataTable from "./TokenDataTable";
import fetchTokenData from "../../utils/fetchTokenData";
import Nav from "./Nav";
import { useState } from 'react';

function Terminal() {
    const terminalStyles = {
        container: "flex subpixel-antialiased",
        search: "w-full font-mono px-1 text-sm bg-transparent text-md text-green-600 placeholder-green-600 outline-none mt-2 opacity-75",
        searchWrapper: "relative my-2 flex w-full"
    }

    const [active, setActive] = useState(false);

    const toggleSearch = () => {
        setActive(!active);
    }
    
    return (
        <div className="subpixel-antialiased w-full">
            
            <section className={terminalStyles.container}>
                <Nav toggleSearch={toggleSearch}/> 
                <TokenDataTable fetchTokenData={fetchTokenData}/>
            </section>
            {active ? (
                <div className={terminalStyles.searchWrapper}>
                    <span className="pl-2 mt-1.5 text-purple-600 flex flex-col justify-center text-sm">{">"}</span>
                    <input placeholder="enter contract address" className={terminalStyles.search} maxLength={66} spellCheck={false} autoComplete="off"></input>
                </div>
            ) : null}
        </div>
    )
}

export default Terminal;