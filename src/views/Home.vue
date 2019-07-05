<template>
  <div class="page-session">
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
    
  }
}
</script>

<style lang='less' scoped>
.page-session{
  position: absolute;
  width: calc(100% - 200px);
  height: calc(100% - 80px);
  margin-left: 200px;
  overflow: auto;
  box-sizing: border-box;
}
</style>