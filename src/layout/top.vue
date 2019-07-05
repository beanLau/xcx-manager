<template>
    <div class="top-content flex">
        <div class="top-left">
            <img class="logo" src="../assets/logo.png" alt="">
        </div>
        <div class="top-right flex">
            <img class="user-pic" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562317532727&di=d42029012caae5f947c1b515f3b6eedc&imgtype=0&src=http%3A%2F%2Fwww.5694.com%2Fu%2Fe%2F1489756958485.jpg" alt="">
            <div class="user-name">欢迎您，齐天大爷！</div>
            <div class="login-out">退出</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        };
    },

    components: {},

    computed: {},

    mounted() {

    },
    methods: {}
}

</script>
<style lang='less' scoped>
.top-content {
  height: 80px;
    box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.1rem solid #ccc;
  .top-left {
    padding-left: 20px;
    font-size: 24px;
    color: #666;
    .logo {
      height: 48px;
      width: 160px;
      border-radius: 10px;
    }
  }
  .top-right {
    padding: 10px 20px;
    align-items: center;
  }
  .user-pic {
    width: 36px;
    height: 36px;
    border-radius: 18px;
    margin-right: 10px;
  }
  .user-name {
    color: #666;
    font-size: 12px;
    margin-right: 10px;
  }
  .login-out {
    color: #999;
    font-size: 12px;
  }
}
</style>