<template>
  <div class="penis-header">
    <!--图标-->
    <div class="flex" @click="goPage()">
      <penis-icon class="w-8 mr-3" :icon="iconList.ERJI"></penis-icon>
      <span>{{ musicName }}</span>
    </div>
    <penis-header-nav class="penis-header-nav" :styleList="headerNavList" :activeName="activeNavName" @click="goPage"></penis-header-nav>
    <!--搜索框-->
    
    <div class="flex-grow w-full ml-36 mr-72">
      <el-input placeholder="搜索" :prefix-icon="Search" v-model="keywords" @keyup.enter="goSearch()" />
    </div>
    <!--设置-->
    <div class="penis-header-nav">
      <el-button v-if="!wallet" size="large" @click="walletConnect">连接钱包</el-button>
      <el-button v-else size="large" @click="jumpToMyList">
        <div class="text-ellipsis overflow-hidden w-[120px]">
          {{ wallet.account }}
        </div>
      </el-button>
    </div>
    <el-dropdown class="user-wrap" v-if="token" trigger="click">
      <el-image class="user" fit="contain" :src="attachImageUrl(userPic)" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(item, index) in menuList" :key="index" @click.stop="goMenuList(item.path)">{{ item.name }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance, computed, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useUser } from '@/store/user';
import { useConfigure } from '@/store/configure';
import PenisIcon from "./PenisIcon.vue";
import PenisHeaderNav from "./PenisHeaderNav.vue";
import mixin from "@/mixins/mixin";
import { HEADERNAVLIST, MENULIST, Icon, MUSICNAME, RouterName, NavName } from "@/enums";
import { HttpManager } from "@/api";
import { ElMessage } from 'element-plus'
import { useWallet } from '@/api/wallets';

export default defineComponent({
  components: {
    PenisIcon,
    PenisHeaderNav,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const userStore = useUser();
    const configureStore = useConfigure();
    const { changeIndex, routerManager } = mixin();

    const musicName = ref(MUSICNAME);
    const headerNavList = ref(HEADERNAVLIST); // 左侧导航栏
    const menuList = ref(MENULIST); // 用户下拉菜单项
    const iconList = reactive({
      ERJI: Icon.ERJI,
    });
    const keywords = ref("");
    const activeNavName = computed(() => configureStore.activeNavName);
    const userPic = computed(() => userStore.userPic);
    const token = computed(() => configureStore.token);
    const wallet = ref();

    function goPage(path, name) {
      if (!path && !name) {
        changeIndex(NavName.Home);
        routerManager(RouterName.Home, { path: RouterName.Home });
      } else {
        changeIndex(name);
        routerManager(path, { path });
      }
    }

    async function walletConnect() {
      // 获取到权限key
      wallet.value = await useWallet();
      console.log('wallet', wallet);
    }

    function goMenuList(path) {
      if (path == RouterName.SignOut) {
        proxy.$store.commit("setToken", false);
        changeIndex(NavName.Home);
        routerManager(RouterName.Home, { path: RouterName.Home });
      } else {
        routerManager(path, { path });
      }
    }
    function goSearch() {
      if (keywords.value !== "") {
        proxy.$store.commit("setSearchWord", keywords.value);
        routerManager(RouterName.Search, { path: RouterName.Search, query: { keywords: keywords.value } });
      } else {
        (proxy as any).$message({
          message: "搜索内容不能为空",
          type: "error",
        });
      }
    }

    function jumpToMyList() { 
      // 跳到我的主页面
    }

    return {
      musicName,
      headerNavList,
      menuList,
      iconList,
      keywords,
      activeNavName,
      wallet,
      walletConnect,
      jumpToMyList,
      userPic,
      token,
      Search,
      goPage,
      goMenuList,
      goSearch,
      attachImageUrl: HttpManager.attachImageUrl,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";

@media screen and (min-width: $sm) {
  .header-logo {
    margin: 0 1rem;
  }
}

@media screen and (max-width: $sm) {
  .header-logo {
    margin: 0 1rem;
    span {
      display: none;
    }
  }
  .header-search {
    display: none;
  }
}

.penis-header {
  position: fixed;
  width: 100%;
  height: $header-height;
  line-height: $header-height;
  padding: $header-padding;
  margin: $header-margin;
  background-color: $theme-header-color;
  box-shadow: $box-shadow;
  box-sizing: border-box;
  z-index: 100;
  display: flex;
  white-space: nowrap;
  flex-wrap: nowrap;
}

/* LOGO */
.header-logo {
  font-size: $font-size-logo;
  font-weight: bold;
  cursor: pointer;
  .icon {
    @include icon(1.9rem, $color-black);
    vertical-align: middle;
  }
  span {
    margin-left: 1rem;
  }
}

.penis-header-nav {
  flex: 1;
}

/*搜索输入框*/
.header-search {
  margin: 0 20px;
  width: 100%;
  :deep(input) {
    text-indent: 5px;
    max-width: $header-search-max-width;
    min-width: $header-search-min-width;
    border-radius: $header-search-radius;
    box-shadow: none;
    background-color: $color-light-grey;
    color: $color-black;
  }
}

/*用户*/
.user-wrap {
  position: relative;
  display: flex;
  align-items: center;

  .user {
    width: $header-user-width;
    height: $header-user-width;
    border-radius: $header-user-radius;
    margin-right: $header-user-margin;
    cursor: pointer;
  }
}
</style>
