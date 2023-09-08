import { ReactNode } from 'react';
import './GlobalStyles.scss';
interface GlobalStyle {
    children: ReactNode;
}
function GlobalStyles({ children }: GlobalStyle) {
    return <div>{children}</div>;
}

export default GlobalStyles;
