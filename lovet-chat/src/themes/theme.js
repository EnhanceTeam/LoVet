import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";

const fontFamily = [
    'nunito sans',
    'sans-serif',
].join(',');

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: fontFamily,
        },
        button: {
            textTransform: 'none',
        }
    },
});

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: colors.primary,
        },
        secondary: {
            main: colors.secondary,
        },
    },
    shape: {
        borderRadius: 9999,
    },
    typography: {
        button: {
            fontFamily: fontFamily,
            textTransform: 'none',
        }
    }
})

export { theme, buttonTheme }