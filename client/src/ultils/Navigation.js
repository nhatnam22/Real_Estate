import { ItemRent, ItemsSold } from "./Constant";
import { paths } from "./path";

export const navigation = [{
    id: 1,
    path: paths.public.SoldProperty,
    name : "Nhà Đất Bán",
    hasSubs: true,
    subs: ItemsSold
},
{
    id: 2,
    path: paths.public.RentProperty,
    name : "Nhà Đất Thuê",
    hasSubs: true,
    subs: ItemRent
},
{
    id: 3,
    path: paths.public.News,
    name : "Tin Tức",
    hasSubs: false,
    subs: false
}]