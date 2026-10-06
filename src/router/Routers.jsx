import { Routes,Route } from 'react-router-dom';

import { navLinks } from '../constant/path';

const AppRouter = () => {
    return (
        <Routes>
            {navLinks.map((item, key) => {
                const Component = item.component
                return (
                    <Route key={key} path={item.path} element={<Component/>} />
                )
            })}
        </Routes>
    )
}

export default AppRouter;