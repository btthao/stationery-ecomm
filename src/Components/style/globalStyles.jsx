import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
}
body { 
    font-family: 'Playfair Display', serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
 
}


html{
    font-size: 10px;   
}

a[href^=tel] {
    color: inherit;
    text-decoration: none;
}


`;

export default GlobalStyle;
