import React from "react";
import { useContext } from "react";
import { Auth } from "./ContexntAPI/Auth";
import { Navigate} from "react-router-dom";

const PrivateRoute = ({ children}) => {
    const { auth } = useContext(Auth);
    return auth? children : <Navigate to="/" />;
  };

export default PrivateRoute;
