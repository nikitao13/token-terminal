import PropTypes from 'prop-types';
import { MdOutlineCancel, MdAddCircleOutline } from "react-icons/md";
import { IoHeartOutline } from "react-icons/io5";

function Nav({ toggleSearch }) {
    const navStyles = {
        align: "flex justify-center mt-3",
        icons: "text-xl",
        text: "text-xs",
        effects: "hover:cursor-pointer hover:opacity-50 transition-all duration-150",
        url: "https://dexscreener.com/new-pairs/6h?rankBy=pairAge&order=asc&chainIds=solana&maxAge=24",
        container: "tracking-wide bg-green-900/5 font-mono text-sm flex flex-col mt-2 px-2 text-left border-t border-b border-green-900",
        scale: "active:scale-125",
        heart: "active:text-purple-600 active:opacity-100"
    }

    const { align, icons, text, effects, url, container, scale, heart } = navStyles;

    return (
        <nav className={container}>
            <a onClick={toggleSearch} className={`${align} ${icons} ${effects} ${scale}`}><MdAddCircleOutline /></a>
            <a className={`${align} ${icons} ${effects} ${scale} mb-2`}><MdOutlineCancel /></a>
            <a href={url} target="_blank" rel="noopener noreferrer" className={`${align} ${effects} ${text} text-purple-600`}>new</a>
            <a className={`${align} ${effects} ${text} mb-0.5`}>sort</a>
            <a className={`${align} ${icons} ${effects} ${scale} ${heart}`}><IoHeartOutline /></a>
        </nav>
    )
}

Nav.propTypes = {
    toggleSearch: PropTypes.func.isRequired
};

export default Nav;