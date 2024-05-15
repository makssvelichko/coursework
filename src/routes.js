import Home from "./pages/Home"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import Office from "./pages/Office"
import Progress from "./pages/Progress"
import { FOOD_ROUTE, HOME_ROUTE, LOGIN_ROUTE, OFFICE_ROUTE, PROGRESS_ROUTE, REGISTRATION_ROUTE, DETAILS_ROUTE, PERSONINFORMATION_ROUTE, SUBSCRIPTIONS_ROUTE } from "./utils/consts"
import Food from "./pages/Food"
import DetailsPage from "./pages/DetailsPage"
import PersonInformation from "./pages/PersonInformation"
import Subscriptions from "./pages/Subscriptions"

export const authRoutes = [
    {
        path: OFFICE_ROUTE,
        Component: Office
    },
    {
        path: FOOD_ROUTE,
        Component: Food
    },
    {
        path: PROGRESS_ROUTE,
        Component: Progress
    },
    {
        path: DETAILS_ROUTE,
        Component: DetailsPage
    },
    {
        path: PERSONINFORMATION_ROUTE,
        Component: PersonInformation
    },
    {
        path: SUBSCRIPTIONS_ROUTE,
        Component: Subscriptions
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

]
    
