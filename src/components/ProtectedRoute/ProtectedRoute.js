import React from "react";
import { Navigate } from "react-router-dom";

import { ENDPOINT_ROOT } from "../../utils/constants";

const ProtectedRoute = ({ isUserLoggedIn, children }) =>
  isUserLoggedIn ? children : <Navigate to={ENDPOINT_ROOT} replace />;

export default ProtectedRoute;