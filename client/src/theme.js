import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1D3557" },
    secondary: { main: "#F4A261" },
    background: {
      default: "#FAF3E7",
      paper: "#FFFFFF"
    },
    text: {
      primary: "#1C2B39",
      secondary: "rgba(28,43,57,0.7)"
    }
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: "'Inter', sans-serif",
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#1D3557" },
    secondary: { main: "#F4A261" },
    background: {
      default: "#111827",
      paper: "#0F172A"
    },
    text: {
      primary: "#F9FAFB",
      secondary: "rgba(249,250,251,0.7)"
    }
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: "'Inter', sans-serif",
  }
});
