<template>
    <div class="sidebar-content">
        <el-menu router default-active="/" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu index="/">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>内容管理</span>
                </template>
                <el-menu-item index="/">文章管理</el-menu-item>
                <el-menu-item index="/question">试题管理</el-menu-item>
                <el-menu-item index="/soul">心灵鸡汤</el-menu-item>
                <el-menu-item index="/tag">标签管理</el-menu-item>
                <el-menu-item index="/type">类别管理</el-menu-item>
            </el-submenu>
            <el-submenu index="/sys">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>系统管理</span>
                </template>
                <el-menu-item index="/user">用户管理</el-menu-item>
                <el-menu-item index="/roule">角色管理</el-menu-item>
                <el-menu-item index="/soul">心灵鸡汤</el-menu-item>
            </el-submenu>
            <el-menu-item index="/dashboard">
                <i class="el-icon-setting"></i>
                <span slot="title">统计</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}

</script>
<style lang='less' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.sidebar-content {
  position: absolute;
  width: 200px;
  height: calc(100% - 80px);
  background: #f6f6f6;
  overflow-y: auto;
  z-index: 1;
  .el-menu{
      box-sizing: border-box;
  }
}

</style>