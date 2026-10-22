import { Routes, Route } from 'react-router-dom';

import { routes } from './index';

const AppRouter = () => {
    return (
        <Routes>
            {routes.map((item, key) => {
                const Component = item.component
                return (
                    <Route key={key} path={item.path} element={<Component />} />
                )
            })}
        </Routes>
    )
}

export default AppRouter;