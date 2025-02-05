import { DashBoard } from "@/pages/user";

export const paths ={
    public: {
        PublicLayout : "/",
        Home : "*",
        News : "tin-tuc",
        RentProperty : "nha-dat-thue",
        SoldProperty : "nha-dat-ban",
        Contact : "lien-he"
    },
    admin : {
        AdminLayout : "admin",
        DashBoard : "bang-tong"

    },
    user : {
        UserLayout : "user",
        PostProperty: "dang-bai",
        DashBoard:"trang-chu",
        RechargeMoney: "nap-tien"   
    }
}