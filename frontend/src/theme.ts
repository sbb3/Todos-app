import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    loader: "#6B46C1",
  },
  styles: {
    global: {
      body: {
        display: "flex",
        direction: "row",
        justifyContent: "center",
        alignItems: "start",
        margin: 0,
        paddng: 0,
        boxSizing: "border-box",
        fontFamily: `'Montserrat', sans-serif`,
      },
      a: {
        textDecoration: "none",
      },
    },
  },
});

export default theme;
