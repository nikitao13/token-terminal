import { MdOutlineCancel, MdAddCircleOutline } from "react-icons/md";

function Nav() {
    const navStyles = {
        align: "flex justify-center mt-3",
        icons: "text-2xl",
        effects: "hover:cursor-pointer hover:opacity-50 transition-opacity duration-300",
        url: "https://dexscreener.com/new-pairs/6h?rankBy=pairAge&order=asc&chainIds=solana&maxAge=24",
        container: "tracking-wide bg-green-900/5 font-mono text-sm flex flex-col mt-2 px-2 text-left border-t border-b border-green-900"
    }

    const { align, icons, effects, url, container } = navStyles;

    return (
        <nav className={container}>
            <a className={`${align} ${icons} ${effects}`}><MdAddCircleOutline /></a>
            <a className={`${align} ${icons} ${effects}`}><MdOutlineCancel /></a>
            <a href={url} target="_blank" rel="noopener noreferrer" className={`${align} ${effects} text-purple-500`}>new</a>
            <a className={`${align} ${effects}`}>sort</a>
        </nav>
    )
}

export default Nav;