import React from 'react';
import RootLayout from '../RootLayout/RootLayout';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home'
import UnAuthRouter from './UnAuthRouter';
import AuthRouter from './AuthRouter';
import NotFound from '../NotFound/NotFound';
import RootHeader from '../RootHeader/RootHeader';

// 모든 Route에 NotFound 걸어줘야함
function MainRouter(props) {
    return (
        <RootLayout>
            <RootHeader />
            <Routes>
                <Route path='' element={<Home />} />
                <Route path='/auth/*' element={<AuthRouter />} />
                <Route path='/users/*' element={<UnAuthRouter />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </RootLayout>
    );
}

export default MainRouter;
