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
    }
})

export { buttonTheme }