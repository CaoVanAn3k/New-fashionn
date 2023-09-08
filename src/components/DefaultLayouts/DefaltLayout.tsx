import { ReactNode } from 'react';
import Header from '../Header/Header';

interface DefaultChildren {
    children: ReactNode;
}
const DefaultLayout = ({ children }: DefaultChildren) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};

export default DefaultLayout;
