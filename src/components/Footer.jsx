function Footer() {
    const footerStyles = {
        container: "w-full h-[35px] bg-green-900/5",
        footer: "font-mono py-1 px-2 text-sm border-t border-green-900 flex align-center",
        effects: "hover:cursor-pointer hover:opacity-50 transition-all duration-300",
        purple: "text-purple-500"
    }

    const { container, footer, effects, purple } = footerStyles;
    
    return (
        <div className={container}>
            <h1 className={footer}><span className={effects}>forever online<span className={purple}>~</span></span></h1>
        </div>
    )
}

export default Footer;