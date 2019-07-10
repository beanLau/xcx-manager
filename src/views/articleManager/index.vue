<template>
    <div class="page-content">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="标题">
                <el-input v-model="formInline.title" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="formInline.typeId" clearable placeholder="类型">
                    <el-option :label="type.name" :value="type._id" v-for="(type, index) in typeList" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="toSearch" icon="el-icon-search" size="small">搜索</el-button>
                <el-button type="primary" @click="addArticle" size="small">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="title" label="标题">
            </el-table-column>
            <el-table-column prop="typeName" label="类型">
            </el-table-column>
            <el-table-column prop="tagName" label="标签">
            </el-table-column>
            <el-table-column prop="enable" label="状态">
                <template slot-scope="scope">
                    <el-tag effect="plain" size="mini">
                        {{ scope.row.enable ? '已启用':'已禁用' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column sortable prop="created_at" label="日期">
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button @click="enableCb(scope.row)" type="primary" size="small">{{scope.row.enable ? '禁用':'启用'}}</el-button>
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
                    <el-input v-model="item.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" label-width="80px">
                    <el-cascader v-model="item.typeId" :options="options" :props="{value:'_id',label:'name', checkStrictly: true }" clearable></el-cascader>
                </el-form-item>
                <el-form-item label="标签" label-width="80px">
                    <el-select v-model="item.tagId" placeholder="请选择文章标签">
                        <el-option :label="tag.name" :value="tag._id" v-for="(tag, index) in tagList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容" label-width="80px">
                    <mavon-editor v-model="item.content" />
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
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            isAdd: true,
            item: {
                title: '',
                typeId: '',
                tagId: '',
                content: ''
            },
            dialogFormVisible: false,
            dialogVisible: false,
            formInline: {
                title: '',
                typeId: ''
            },
            tagList: [],
            typeList: [],
            tableData: []
        }
    },

    components: {},

    computed: {

    },

    mounted() {
        this.initSelectData();
        this.toSearch();
    },
    methods: {
        /**
         * 初始化下拉框数据
         */
        initSelectData() {
            let that = this;
            fetch('http://localhost:3000/findAllTags', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (res) {
                    that.tagList = res.data.list
                });

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
                        that.options = that.setOptionsData(resData.data.list)
                    }
                });
        },
        setOptionsData(list){
            pid = pid || '';
            let filterData = list.filter((item)=>{
                return item.pid == pid
            })
            filterData.forEach((item,index)=>{
                item.children = this.setOptionsData(list,item._id)
            })
            return filterData;
        },
        /**
         * 搜索按钮
         */
        toSearch() {
            let that = this;
            fetch('http://localhost:3000/findArticles', {
                method: 'POST',
                body: JSON.stringify({
                    title: that.formInline.title,
                    typeId: that.formInline.typeId,
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
            let that = this;
            that.dialogVisible = false;
            fetch('http://localhost:3000/enableArticle', {
                method: 'POST',
                body: JSON.stringify({
                    _id: item._id,
                    enable: item.enable ? false:true
                }),
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
         * 修改按钮回调
         */
        editCb(item) {
            this.item = Object.assign({}, item);
            console.log(item)
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
            fetch('http://localhost:3000/deleteArticle', {
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
        addArticle() {
            this.item = {};
            this.isAdd = true;
            this.dialogFormVisible = true;
        },
        /**
         * 新增修改保存
         */
        saveCb() {
            let that = this;
            let item = this.item;
            fetch('http://localhost:3000/addUpdateArticle', {
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
        }
    }
}

</script>
<style lang='less' scoped>
.pagination-wrap {
  text-align: right;
  margin-top: 20px;
}
</style>