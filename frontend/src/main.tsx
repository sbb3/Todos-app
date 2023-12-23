import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import theme from "./theme";
import "./index.css";
import store from "./app/store";
import "@fontsource/montserrat";
import { ColorModeScript } from "@chakra-ui/react";

const App = lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <Router>
      <ChakraProvider theme={theme}>
        <Suspense
          fallback={<BeatLoader size={8} color={theme.colors.loader} />}
        >
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </Suspense>
      </ChakraProvider>
    </Router>
  </Provider>
);
