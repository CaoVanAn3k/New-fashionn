import { ReactNode, useEffect, useState } from 'react';
import Footer from '../Footer';
import Header from '../Header/Header';
import ButtonScrollTop from '../ButtonScrollTop/ButtonScrollTop';
import { useLocation } from 'react-router-dom';

interface DefaultChildren {
    children: ReactNode;
}
const DefaultLayout = ({ children }: DefaultChildren) => {
    const location = useLocation();
    const [isChangeBackgroundHeader, setChangeBackgroundHeader] = useState<boolean>(false);

    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath !== '/') {
            setChangeBackgroundHeader(true);
        } else {
            setChangeBackgroundHeader(false);
        }
    }, [location.pathname]);
    return (
        <div>
            <Header isChangeBackgroundHeader={isChangeBackgroundHeader} />
            {children}
            <Footer />
            <ButtonScrollTop />
        </div>
    );
};

export default DefaultLayout;
