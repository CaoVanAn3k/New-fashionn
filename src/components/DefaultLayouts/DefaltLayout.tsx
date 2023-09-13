import { ReactNode } from 'react';
import Footer from '../Footer';
import Header from '../Header/Header';

interface DefaultChildren {
    children: ReactNode;
}
const DefaultLayout = ({ children }: DefaultChildren) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default DefaultLayout;
