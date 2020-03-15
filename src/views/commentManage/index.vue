<template>
    <div class="page-content">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="评论内容">
                <el-input v-model="formInline.searchName" placeholder="评论内容"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="refresh" icon="el-icon-search" size="small">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="nickName" label="评论人">
            </el-table-column>
            <el-table-column label="评论头像">
              <template slot-scope="scope">
                    <img :src="scope.row.avatarUrl" style="width:50px;height:50px;"/>
                </template>
            </el-table-column>
            <el-table-column prop="content" label="评论内容">
            </el-table-column>
            <el-table-column sortable prop="created_at" label="日期" width="200">
            </el-table-column>
            <el-table-column label="操作" width="160">
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
    </div>
</template>

<script>
import { findComments, deleteComment, addUpdateComment } from "@/apis/comment";

export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      isAdd: true,
      item: {
        name: ""
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
    refresh(){
        this.pageIndex = 1;
        this.toSearch();
    },
    /**
     * 搜索按钮
     */
    async toSearch() {
      let that = this;
      try {
        const res = await findComments({
          content: that.formInline.searchName,
          pageIndex: that.pageIndex,
          pageSize: that.pageSize
        });
        if (res.code == 0) {
          that.tableData = res.data.list;
          that.total = res.data.total;
        }
      } catch (error) {
        console.log(error)
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
     * 确认删除
     */
    async confirmDelete(e) {
      let that = this;
      let item = this.item;
      that.dialogVisible = false;
      const res = await deleteComment(item);
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