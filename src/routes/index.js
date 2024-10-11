import AddressUser from "../components/AddressUser/AddressUser";
import DetailUser from "../components/DetailUser/DetailUser";
import AdminPage from "../pages/AdminPage/AdminPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import CategoryProductPage from "../pages/CategoryProductPage/CategoryProductPage";
import OrderSuccessPage from "../pages/OrderSuccessPage/OrderSuccessPage";
import PurchaseOrder from "../components/PurchaseOrder/PurchaseOrder";
import UserPage from "../pages/UserPage/UserPage";
import AdminPageListUser from "../components/AdminPageListUser/AdminPageListUser";
import AdminPageCategory from "../components/AdminPageCategory/AdminPageCategory";
import AdminPageProduct from "../components/AdminPageProduct/AdminPageProduct";
import AdminPagePurchaseOrder from "../components/AdminPagePurchaseOrder/AdminPagePurchaseOrder";
import PerOrderDetailComponent from "../components/PerOrderDetailComponent/PerOrderDetailComponent";

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
        path: '/payment/:id',
        page: PaymentPage ,
        isShowHeader: true 
    },
    {
        path: '/product-detail/:id',
        page: ProductDetailPage ,
        isShowHeader: true 
    },
    {
        path: '/category/:id',
        page: CategoryProductPage ,
        isShowHeader: true
    },
    {
        path: '/sign-in',
        page: SignInPage ,
    },
    {
        path: '/sign-up',
        page: SignUpPage ,
    },
    {
        path: '/user',
        page: UserPage ,
        isShowHeader: true,
        children: [
            {
                path: 'account', 
                children: [ 
                    {
                        path: 'profile',
                        page: DetailUser 
                    },
                    {
                        path: 'address',
                        page: AddressUser 
                    }
                ]
            },
            {
                path: 'purchase',
                page: PurchaseOrder,
                children: [ 
                    {
                        path: ':id',
                        page: PerOrderDetailComponent 
                    },
                ] 
            },
        ]
    },
    {
        path: '/admin',
        page: AdminPage ,
        isPrivate: true,
        children: [
            {
                path: 'account-management', 
                page: AdminPageListUser,
                isPrivate: true, 
            },
            {
                path: 'category-management',
                page: AdminPageCategory,
                isPrivate: true, 
            },
            {
                path: 'product-management',
                page: AdminPageProduct,
                isPrivate: true, 
            },
            {
                path: 'purchase-management',
                page: AdminPagePurchaseOrder,
                isPrivate: true,
            },
        ]
    },
    {
        path: '/order-success',
        page: OrderSuccessPage ,
    },
    {
        path: '*',
        page: NotFoundPage 
    }
];
