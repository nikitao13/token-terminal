function Header() {
  const headerStyles = {
    container: "w-full h-max bg-green-900/5",
    header: "font-mono pt-1 lg:pb-1 px-2 text-lg 2xl:text-xl lg:border-b border-green-900 lg:bg-green-900/5",
    effects: "hover:opacity-50 transition-all duration-300 hover:antialiased",
    xxlBorders: "xxl:border-r xxl:border-l border-green-900", 
  };

  const { container, header, effects, xxlBorders } = headerStyles;

  return (
    <header className={`${container} ${xxlBorders}`}>
      <h1 className={header}>
        <span className={effects}>
          token terminal<span className="text-purple-600">~</span>
        </span>
      </h1>
    </header>
  );
}

export default Header;
