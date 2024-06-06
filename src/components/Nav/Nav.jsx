import PropTypes from "prop-types";
import { MdOutlineCancel, MdAddCircleOutline } from "react-icons/md";
import { IoHeartOutline } from "react-icons/io5";

function Nav({ toggleSearch, handleSort }) {
  const navStyles = {
    align: "flex justify-center items-center mt-2",
    icons: "text-lg lg:text-xl pr-2 lg:pr-0",
    text: "text-xs px-1",
    effects:
      "hover:cursor-pointer hover:opacity-50 transition-all duration-150",
    url: "https://dexscreener.com/new-pairs/6h?rankBy=pairAge&order=asc&chainIds=solana&maxAge=24",
    container:
      "tracking-wide bg-green-900/5 font-mono text-sm flex flex-row lg:flex-col mt-1 lg:mt-2 px-2 lg:pt-2 text-left border-t border-b border-green-900 w-full 2xl:w-[3vw] lg:w-[5vw] 2xl:h-[60vh] lg:h-[80vh]",
    scale: "active:scale-125",
    heart: "active:text-purple-600 active:opacity-100 ml-1 lg:ml-0"
  };

  const { align, icons, text, effects, url, container, scale, heart } =
    navStyles;

  return (
    <nav className={container}>
      <a
        onClick={() => toggleSearch("add")}
        className={`${align} ${icons} ${effects} ${scale} mb-2`}
      >
        <MdAddCircleOutline />
      </a>
      <a
        onClick={() => toggleSearch("remove")}
        className={`${align} ${icons} ${effects} ${scale} mb-2`}
      >
        <MdOutlineCancel />
      </a>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${align} ${effects} ${text} text-purple-600 mb-2`}
      >
        new
      </a>
      <a
        onClick={() => handleSort()}
        className={`${align} ${effects} ${text} mb-2`}
      >
        sort
      </a>
      <a className={`${align} ${icons} ${effects} ${scale} ${heart} mb-2`}>
        <IoHeartOutline />
      </a>
    </nav>
  );
}

Nav.propTypes = {
  toggleSearch: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired
};

export default Nav;
