function Header() {
    const headerStyles = {
        container: "w-full h-max bg-green-900/5",
        header: "font-mono py-1 px-2 text-lg border-b border-green-900",
        effects: "hover:opacity-50 transition-all duration-300 hover:antialiased"
    }

    const { container, header, effects } = headerStyles;

    return (
        <header className={container}>
            <h1 className={header}>
                <span className={effects}>token terminal<span className="text-purple-500">~</span></span>
            </h1>
        </header>
    )
}

export default Header;