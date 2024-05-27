import TokenDataTable from "./TokenDataTable";
import Nav from "./Nav";

function Terminal() {
    const terminalStyles = {
        container: "flex subpixel-antialiased"
    }
    
    return (
        <section className={terminalStyles.container}>
            <Nav /> 
            <TokenDataTable />
        </section>
    )
}

export default Terminal;