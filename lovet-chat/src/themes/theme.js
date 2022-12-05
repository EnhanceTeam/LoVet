import { createTheme } from "@mui/material";
import { colors } from "./colors";

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: colors.primary,
        },
        secondary: {
            main: colors.secondary,
        },
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    }
})

export { buttonTheme }