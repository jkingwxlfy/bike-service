import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const { isAuth } = useSelector((state) => state.header);
    return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
