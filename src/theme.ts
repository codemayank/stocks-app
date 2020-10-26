import {theme} from '@chakra-ui/core';
import {mode} from '@chakra-ui/theme-tools';




const CustomTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    bgColorMain: "#fff",
    priceIncrease: theme.colors.green,
    priceDecrease: theme.colors.red,
    black: "gray.600"
  },
  styles: {
    global: (props: any) => ({
      "html, body": {
        bg: mode("white", "gray.600")(props),
        color: mode("black", "white")(props)
      }
    })
  }
}

export default CustomTheme;