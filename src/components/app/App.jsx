import {BrowserRouter, Routes, Route} from "react-router-dom";
import {publicRoutes, privateRoutes} from "../../routes/routes";
import PrivateRoute from "../../utils/PrivateRoute";

import Header from "../header/Header";

import './app.sass';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header/>}>
                    <Route element={<PrivateRoute/>}>
                        {privateRoutes.map(route =>
                            <Route key={route.path} path={route.path} element={route.component}/>
                        )}
                    </Route>
                    {publicRoutes.map(route =>
                        <Route key={route.path} path={route.path} element={route.component}/>
                    )}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
