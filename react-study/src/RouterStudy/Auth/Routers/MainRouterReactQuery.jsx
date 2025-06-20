import RootLayout from '../RootLayout/RootLayout';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home'
import UnAuthRouter from './UnAuthRouter';
import AuthRouter from './AuthRouter';
import NotFound from '../NotFound/NotFound';
import RootHeader from '../RootHeader/RootHeader';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

/**
 * 
 * 전역 상태 관리
 * 1. 클라이언트 전역 상태(Zustand, recoil -> react19에서 지원x)
 * 2. 서버 전역 상태(ReactQuery)
 */

function MainRouterReactQuery(props) {

    const principalUserQuery = useQuery({
        queryKey: ["principalUserQuery"],
        queryFn: async () => {
            const accessToken = localStorage.getItem("AccessToken");
            return await axios.get("http://localhost:8080/api/users/principal", {
                headers: {
                    Authorization: !accessToken ? null : `Bearer ${accessToken}`,
                },
            })
        },
        // refetchOnWindowFocus: true,     // 브라우저 탭이 다시 활성화될 때, 해당 쿼리를 자동으로 다시 요청(refetch) 함
        // retry: 3,                       // 요청 실패 시 최대 3번까지 재시도함
        staleTime: 1000 * 60,                // 캐시된 데이터가 “신선(stale하지 않다)”하다고 간주되는 시간(ms). 즉, 3초 동안은 백엔드에 다시 요청하지 않고 캐시 데이터 사용
        // gcTime: 6000 * 10,              // stale 상태가 된 후, 캐시 데이터가 실제로 제거되기까지의 시간(ms)
        // enabled: false,
        retry: 0,
        
    });
    
    console.log(principalUserQuery.isLoading);
    console.log(principalUserQuery.data);

    return (
        <>
            {
                !principalUserQuery.isLoading && 
                <RootLayout>
                    <RootHeader />
                    <Routes>
                        <Route path='' element={<Home />} />
                        <Route path='/auth/*' element={<AuthRouter />} />
                        <Route path='/users/*' element={<UnAuthRouter />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </RootLayout>
            }
        </>
    );
}

export default MainRouterReactQuery;
