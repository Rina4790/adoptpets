import { Provider } from "react-redux";
import { useContext } from "react";

import { RootRouter } from "./routing/RootRouter";
import "./App.css";
import { store } from "./redux/store";
import { ThemeContext } from "./context/ThemeContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <Provider store={store}>
      <div
        className="App"
        style={{
          background: theme.background,
        }}
      >
        <BrowserRouter><RootRouter /></BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
