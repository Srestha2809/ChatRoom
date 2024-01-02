import { createTheme } from "@mui/material/styles";
export default createTheme({
    typography: {
        useNextVariants: true,
    },
    palette: { "common": { "black": "rgba(217, 217, 217, 1)", "white": "rgba(231, 226, 226, 1)" }, "background": { "paper": "rgba(222, 103, 103, 1)", "default": "rgba(249, 239, 239, 1)" }, "primary": { "light": "#7986cb", "main": "rgba(6, 20, 93, 1)", "dark": "#303f9f", "contrastText": "#fff" }, "secondary": { "light": "rgba(128, 45, 73, 1)", "main": "#f50057", "dark": "#c51162", "contrastText": "#fff" }, "error": { "light": "#e57373", "main": "#f44336", "dark": "#d32f2f", "contrastText": "#fff" }, "text": { "primary": "rgba(0, 0, 0, 0.87)", "secondary": "rgba(189, 47, 47, 0.54)", "disabled": "rgba(0, 0, 0, 0.38)", "hint": "rgba(0, 0, 0, 0.38)" } }
});
