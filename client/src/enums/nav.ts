import { RouterName } from "./router-name";

export const enum NavName {
  Home = "首页",
  SongSheet = "探索",
  Singer = "铸造",
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
    name: NavName.SongSheet,
    path: RouterName.SongSheet,
  },
  {
    name: NavName.Singer,
    path: RouterName.Singer,
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
