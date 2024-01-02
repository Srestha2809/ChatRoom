import { createTheme } from "@mui/material/styles";
export default createTheme({
    typography: {
        useNextVariants: true,
    },
    palette: { "common": { "black": "rgba(37, 36, 36, 1)", "white": "rgba(156, 5, 5, 1)" }, "background": { "paper": "#fff", "default": "#fafafa" }, "primary": { "light": "#7986cb", "main": "rgba(9, 19, 75, 1)", "dark": "#303f9f", "contrastText": "#fff" }, "secondary": { "light": "#ff4081", "main": "#f50057", "dark": "#c51162", "contrastText": "#fff" }, "error": { "light": "#e57373", "main": "#f44336", "dark": "#d32f2f", "contrastText": "#fff" }, "text": { "primary": "rgba(0, 0, 0, 0.87)", "secondary": "rgba(0, 0, 0, 0.54)", "disabled": "rgba(0, 0, 0, 0.38)", "hint": "rgba(0, 0, 0, 0.38)" } }
});
