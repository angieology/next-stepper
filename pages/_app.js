import "../styles/global.css";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "#0070f3",
    page: "#b3d4fc",
  },
  main: "royalblue",
};

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
