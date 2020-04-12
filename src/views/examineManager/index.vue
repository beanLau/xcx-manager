<template>
    <div class="page-content">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="" :model="config">
                <el-switch
                    v-model="config.isForceAuthorize"
                    active-text="开启强制用户授权" @change="changeAuthorization">
                    </el-switch>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { changeAuthorStatus, getConfig } from "@/apis/config";
export default {
  data() {
    return {
      config: {}
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.toSearch();
  },
  methods: {
    async changeAuthorization(val) {
      let that = this;
      const res = await changeAuthorStatus({
          isForceAuthorize: val
      });
      if (res.code == 0) {
          that.config.isForceAuthorize = val;
      }else{
          that.config.isForceAuthorize = !val;
      }
    },
    /**
     * 搜索按钮
     */
    async toSearch() {
      let that = this;
      const res = await getConfig();
      if (res.code == 0) {
        that.config = res.data;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.pagination-wrap {
  text-align: right;
  margin-top: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
.type-icon {
  width: 36px;
  height: 36px;
}
</style>