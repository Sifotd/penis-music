import { RouterName } from "./router-name";

export const enum NavName {
  Home = "首页",
  Explore = "探索",
  Mint = "铸造",
  Personal = "个人主页",
  SignOut = "退出",
}

// 左侧导航栏
export const HEADERNAVLIST = [
  {
    name: NavName.Home,
    path: RouterName.Home,
  },
  {
    name: NavName.Explore,
    path: RouterName.Explore,
  },
  {
    name: NavName.Mint,
    path: RouterName.Mint,
  },
];

// 用户下拉菜单项
export const MENULIST = [
  {
    name: NavName.Personal,
    path: RouterName.Personal,
  },
  {
    name: NavName.SignOut,
    path: RouterName.SignOut,
  },
];
