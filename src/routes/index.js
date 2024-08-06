
import AddressUser from "../components/AddressUser/AddressUser";
import DetailUser from "../components/DetailUser/DetailUser";
import AdminPage from "../pages/AdminPage/AdminPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProfileUserPage from "../pages/ProfileUserPage/ProfileUserPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true   
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true 
    },
    {
        path: '/product-detail/:id',
        page: ProductDetailPage,
        isShowHeader: true 
    },
    {
        path: '/type',
        page: TypeProductPage,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage,
    },
    {
        path: '/sign-up',
        page: SignUpPage,
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isPrivate: true
    },
    {
        path: '/profile-user',
        page: ProfileUserPage,
        isShowHeader: true,
        children: [
            {
                path: 'detail',
                element: <DetailUser />
            },
            {
                path: 'address',
                element: <AddressUser />
            },
        ]
    },
    {
        path: '*',
        page: NotFoundPage
    }
]