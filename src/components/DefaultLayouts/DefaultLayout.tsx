import { ReactNode } from 'react';
import Footer from '../Footer';
import Header from '../Header/Header';
import ButtonScrollTop from '../ButtonScrollTop/ButtonScrollTop';

interface DefaultChildren {
    children: ReactNode;
}
const DefaultLayout = ({ children }: DefaultChildren) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
            <ButtonScrollTop />
        </div>
    );
};

export default DefaultLayout;
