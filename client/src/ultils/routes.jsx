import App from "@/App";
import { paths } from "@/ultils/path";
import { PublicLayout, Home, News, RentProperty, SoldProperty, Contact } from "@/pages/public";
import { Dashboard, AdminLayout } from "@/pages/admin";
import UserLayout from "@/pages/user/UserLayout";
import { GoogleCallback } from "@/components/login";
import { DashBoard, PostProperty, RechargeMoney } from "@/pages/user";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: paths.public.PublicLayout, // "/" cho layout công khai
                element: <PublicLayout />,
                children: [
                    {
                        path: "/", // Đường dẫn mặc định cho `Home`
                        element: <Home />,
                    },
                    {
                        path: paths.public.News,
                        element: <News />,
                    },
                    {
                        path: paths.public.RentProperty,
                        element: <RentProperty />,
                    },
                    {
                        path: paths.public.SoldProperty,
                        element: <SoldProperty />,
                    },
                    {
                        path: paths.public.Contact,
                        element: <Contact />,
                    },
                ],
            },
            {
                path: paths.admin.AdminLayout, // Đường dẫn "admin"
                element: <AdminLayout />,
                children: [
                    {
                        path: paths.admin.DashBoard,
                        element: <Dashboard />,
                    },
                ],
            },
            {
                path: paths.user.UserLayout, // Đường dẫn "user"
                element: <UserLayout />,
                children: [
                    {
                        path: paths.user.PostProperty,
                        element: <PostProperty />,
                    },
                    {
                        path: paths.user.DashBoard,
                        element: <DashBoard/>
                    },
                    {
                        path: paths.user.RechargeMoney,
                        element: <RechargeMoney/>
                    }
                ]
            },
            {
                path: "/google/callback", // Đường dẫn Google redirect
                element: <GoogleCallback />,
            },
        ],
    },
];

export default routes;
