<template>
    <div class="page-content">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="用户名">
                <el-input v-model="formInline.searchName" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="toSearch" icon="el-icon-search" size="small">搜索</el-button>
                <!-- <el-button type="primary" @click="addUser" size="small">新增</el-button> -->
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="userName" label="用户名">
            </el-table-column>
            <el-table-column prop="openId" label="openid">
            </el-table-column>
            <el-table-column prop="nickName" label="昵称">
            </el-table-column>
            <el-table-column label="性别" width="80">
                <template slot-scope="scope">
                    {{scope.row.gender == 1 ? "男":"女"}}
                </template>
            </el-table-column>
            <el-table-column label="头像" width="120">
                <template slot-scope="scope">
                    <img :src="scope.row.avatarUrl" style="width:50px;height:50px;"/>
                </template>
            </el-table-column>
            <el-table-column prop="city" label="地区">
                <template slot-scope="scope">
                    {{scope.row.country + " " + scope.row.province + " " + scope.row.city}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <!-- <el-button @click="editCb(scope.row)" type="primary" size="small">修改</el-button> -->
                    <el-button @click="deleteCb(scope.row)" type="primary" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-wrap">
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="changePageIndex">
            </el-pagination>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="20%">
            <span>确认删除吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmDelete">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :title="isAdd ? '新增':'修改'" :visible.sync="dialogFormVisible">
            <el-form :model="item">
                <el-form-item label="用户名" label-width="80px">
                    <el-input v-model="item.userName" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="80px">
                    <el-input v-model="item.password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveCb">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
  findUsers,
  deleteUser,
  addUpdateUser,
  findAllUsers,
  findUsersByPid
} from "@/apis/user";
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      isAdd: true,
      item: {
        userName: "",
        passsword: ""
      },
      dialogFormVisible: false,
      dialogVisible: false,
      formInline: {
        searchName: ""
      },
      tableData: []
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.toSearch();
  },
  methods: {
    /**
     * 搜索按钮
     */
    async toSearch() {
      let that = this;
      const res = await findUsers({
        nickName: that.formInline.searchName,
        pageIndex: that.pageIndex,
        pageSize: that.pageSize
      });
      if (res.code == 0) {
        that.tableData = res.data.list;
        that.total = res.data.total;
      }
    },
    /**
     * 分页点击回调
     */
    changePageIndex(index) {
      this.pageIndex = index;
      this.toSearch();
    },
    /**
     * 启用禁用回调
     */
    enableCb(item) {},
    /**
     * 修改按钮回调
     */
    editCb(item) {
      this.item = Object.assign({}, item);
      this.isAdd = false;
      this.dialogFormVisible = true;
    },
    /**
     * 确认删除
     */
    async confirmDelete(e) {
      let that = this;
      let item = this.item;
      that.dialogVisible = false;
      const res = await deleteUser(item);
      if (res.code == 0) {
        that.toSearch();
      }
    },
    /**
     * 点击列表删除按钮回调
     */
    deleteCb(item) {
      this.item = item;
      this.dialogVisible = true;
    },
    /**
     * 新增文章
     */
    addUser() {
      this.item = {};
      this.isAdd = true;
      this.dialogFormVisible = true;
    },
    /**
     * 新增修改保存
     */
    async saveCb() {
      let that = this;
      let item = that.item;
      that.dialogVisible = false;
      const res = await addUpdateUser(item);
      if (res.code == 0) {
        that.dialogFormVisible = false;
        that.toSearch();
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
</style>