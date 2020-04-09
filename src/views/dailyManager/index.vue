<template>
    <div class="page-content">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="标题">
                <el-input v-model="formInline.searchName" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="toSearch" icon="el-icon-search" size="small">搜索</el-button>
                <el-button type="primary" @click="addType" size="small">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" row-key="_id" border style="width: 100%" :load="load" lazy :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="created_at" label="创建时间">
            </el-table-column>
            <el-table-column prop="testCount" label="练习人数">
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
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
import { findDailys,deleteDaily } from "@/apis/daily"
export default {
    data() {
        return {
            options: [],
            imageUrl: '',
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            isAdd: true,
            item: {
                name: '',
                url: '',
                pid: ''
            },
            dialogFormVisible: false,
            dialogVisible: false,
            formInline: {
                searchName: ''
            },
            tableData: []
        }
    },

    components: {},

    computed: {

    },

    mounted() {
        this.toSearch();
    },
    methods: {
        /**
         * 搜索按钮
         */
        async toSearch() {
            let that = this;
            const res = await findDailys({
                pageIndex: that.pageIndex,
                pageSize: that.pageSize
            })
            if (res.code == 0) {
                that.tableData = res.data.list
                that.total = res.data.total
            }

        },
        /**
         * 分页点击回调
         */
        changePageIndex(index) {
            this.pageIndex = index;
            this.toSearch()
        },
        /**
         * 启用禁用回调
         */
        enableCb(item) {

        },
        /**
         * 修改按钮回调
         */
        editCb(item) {
            this.initSelectData();
            this.item = Object.assign({}, item);
            this.imageUrl = item.url;
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
            const res = await deleteDaily(item)
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
        addType() {
            this.item = {};
            this.isAdd = true;
            this.imageUrl = '';
            this.dialogFormVisible = true;
            this.initSelectData();
        },
        /**
         * 新增修改保存
         */
        async saveCb() {
            let that = this;
            if (!that.imageUrl) { //如果没有上传图片
                this.$message.error('请上传类别图标！');
                return
            }
            let item = that.item;
            item.url = that.imageUrl;
            if (item.pid) {
                item.pid = item.pid[item.pid.length - 1 || 0]
            } else {
                item.pid = ''
            }
            const res = await addUpdateType(item)
            if (res.code == 0) {
                that.dialogFormVisible = false;
                that.toSearch();
            }
        },
        async initSelectData() {
            let that = this;
            const res = await findAllTypes()
            if (res.code == 0) {
                that.options = that.setOptionsData(res.data.list, '')
            }
        },
        setOptionsData(list, pid) {
            pid = pid || '';
            let filterData = list.filter((item) => {
                return item.pid == pid
            })
            filterData.forEach((item, index) => {
                item.children = this.setOptionsData(list, item._id)
            })
            return filterData;
        },
        getChildData(list, id) {
            return list.filter((item) => {
                return item.pid == id
            })
        },
        /**
        * 图片上传成功回调
        */
        handleAvatarSuccess(res, file) {
            this.imageUrl = res.data.url
        },
        /**
        * 上传前控制
        */
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        async load(tree, treeNode, resolve) {
            let that = this;
            const res = await findTypesByPid({
                    pid: tree._id
                })
            if (res.code == 0) {
                resolve(res.data.list)
            }
        }
    }
}

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