import Home from "./pages/Home"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import RegistrationTwo from "./pages/RegistrationTwo"
import Office from "./pages/Office"
import { HOME_ROUTE, LOGIN_ROUTE, OFFICE_ROUTE, REGISTRATIONTWO_ROUTE, REGISTRATION_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: OFFICE_ROUTE,
        Component: Office
    },

]


export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: REGISTRATIONTWO_ROUTE,
        Component: RegistrationTwo
    }

]
    
