import TokenDataTable from "./TokenDataTable";
import fetchTokenData from "../../utils/fetchTokenData";
import Nav from "./Nav";

function Terminal() {
    const terminalStyles = {
        container: "flex subpixel-antialiased"
    }
    
    return (
        <section className={terminalStyles.container}>
            <Nav /> 
            <TokenDataTable fetchTokenData={fetchTokenData}/>
        </section>
    )
}

export default Terminal;