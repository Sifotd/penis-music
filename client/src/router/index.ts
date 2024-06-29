import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
  {
    path: "/404",
    component: () => import("@/views/error/404.vue"),
  },
  {
    path: "/",
    name: "penis-container",
    component: () => import("@/views/PenisContainer.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/song-sheet",
        name: "song-sheet",
        component: () => import("@/views/song-sheet/SongSheet.vue"),
      },
      {
        path: "/song-sheet-detail/:id",
        name: "song-sheet-detail",
        component: () => import("@/views/song-sheet/SongSheetDetail.vue"),
      },
      {
        path: "/lyric/:id",
        name: "lyric",
        component: () => import("@/views/Lyric.vue"),
      },
      {
        path: "/search",
        name: "search",
        component: () => import("@/views/search/Search.vue"),
      },
      {
        path: "/detail",
        name: "detail",
        component: ()=> import("@/views/Detail.vue"),
      },
      {
        path: "/innerdetail",
        name: "innerdetail",
        component: ()=> import("@/views/InnerDetail.vue"),
      },
      {
        path: "/outdetail",
        name: "outdetail",
        component: ()=> import("@/views/OutDetail.vue"),
      },
      {
        path: "/mint",
        name: "mint",
        component: ()=> import("@/views/Mint.vue"),
      },
      {
        path: "/singer",
        name: "singer",
        component: ()=> import("@/views/Singer.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
