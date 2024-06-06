import "./styles/App.css";
import Header from "./components/Header/Header";
import Terminal from "./components/Terminal/Terminal";

const appStyles = {
  container:
    "flex flex-col font-sans tracking-wide select-none bg-black text-green-600 min-h-screen"
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
