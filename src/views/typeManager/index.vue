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
            <el-table-column prop="name" label="标题">
            </el-table-column>
            <el-table-column prop="enable" label="图标">
                <template slot-scope="scope">
                    <img :src="scope.row.url" alt="" class="type-icon">
                </template>
            </el-table-column>
            <el-table-column sortable prop="created_at" label="日期">
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button @click="editCb(scope.row)" type="primary" size="small">修改</el-button>
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
                <el-form-item label="标题" label-width="80px">
                    <el-input v-model="item.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="父级" label-width="80px">
                    <el-cascader v-model="item.pid" :options="options" :props="{value:'_id',label:'name', checkStrictly: true }" clearable></el-cascader>
                </el-form-item>
                <el-form-item label="图标" label-width="80px">
                    <el-upload class="avatar-uploader" action="http://localhost:3000/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
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
        toSearch() {
            let that = this;
            fetch('http://localhost:3000/findTypes', {
                method: 'POST',
                body: JSON.stringify({
                    name: that.formInline.searchName,
                    pageIndex: that.pageIndex,
                    pageSize: that.pageSize
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (res) {
                    if (res.code == 0) {
                        that.tableData = res.data.list
                        that.total = res.data.total
                    }
                });
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
        confirmDelete(e) {
            let that = this;
            let item = this.item;
            that.dialogVisible = false;
            fetch('http://localhost:3000/deleteType', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (resData) {
                    if (resData.code == 0) {
                        that.toSearch();
                    }
                });
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
        saveCb() {
            let that = this;
            if (!that.imageUrl) { //如果没有上传图片
                this.$message.error('请上传类别图标！');
                return
            }
            let item = that.item;
            item.url = that.imageUrl;
            if(item.pid){
                item.pid = item.pid[0]
            }else{
                item.pid = ''
            }
            fetch('http://localhost:3000/addUpdateType', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (resData) {
                    if (resData.code == 0) {
                        that.dialogFormVisible = false;
                        that.toSearch();
                    }
                });
        },
        initSelectData() {
            let that = this;
            fetch('http://localhost:3000/findAllTypes', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (resData) {
                    if (resData.code == 0) {
                        console.log(resData.data)
                        that.options = resData.data.list;
                        //console.log(resData.data.list)
                        //let tree = that.filterArray(resData.data.list);
                        //console.log(tree)
                    }
                });
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
        load(tree,treeNode,resolve){
            let that = this;
            fetch('http://localhost:3000/findTypesByPid', {
                method: 'POST',
                body: JSON.stringify({
                    pid: tree._id
                }),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (res) {
                    if (res.code == 0) {
                        resolve(res.data.list)
                    }
                });
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
.type-icon{
    width: 36px;
    height: 36px;
}
</style>