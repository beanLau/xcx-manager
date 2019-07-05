<template>
  <div id="app">
    <router-view name="top"></router-view>
    <router-view name="sidebar"></router-view>
    <router-view name="content"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  }
}
</script>

<style>
html body {
  font-size: 62.5%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
* {
  margin: 0;
  padding: 0;
}
.flex {
  display: flex;
}
.page-content {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow: auto;
  box-sizing: border-box;
}
</style>
