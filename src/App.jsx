import "./styles/App.css";
import Header from "./components/Header/Header.jsx";
import Terminal from "./components/Terminal/TerminalMain.jsx";

const appStyles = {
  container:
    "flex flex-col font-sans tracking-wide select-none bg-black text-green-600 min-h-screen max-w-[1600px] mx-auto"
};

function App() {
  return (
    <div className={appStyles.container}>
      <Header />
      <main className="flex-grow">
        <Terminal />
      </main>
    </div>
  );
}

export default App;
