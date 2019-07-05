<template>
    <div class="page-content">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="标题">
                <el-input v-model="formInline.user" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="formInline.region" placeholder="类型">
                    <el-option label="javascrpit" value="1"></el-option>
                    <el-option label="css" value="2"></el-option>
                    <el-option label="vue" value="3"></el-option>
                    <el-option label="node" value="4"></el-option>
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
            <el-table-column prop="type" label="类型">
            </el-table-column>
            <el-table-column prop="tag" label="标签">
            </el-table-column>
            <el-table-column prop="enable" label="状态">
                <template slot-scope="scope">
                    <el-tag effect="plain" size="mini">
                        {{ scope.row.enable ? '已启用':'已禁用' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column sortable prop="date" label="日期">
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
            <el-pagination background layout="prev, pager, next" :total="1000" @current-change="changePageIndex">
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
                    <el-select v-model="item.typeId" placeholder="请选择文章类型">
                        <el-option label="javascrpit" value="1"></el-option>
                        <el-option label="css" value="2"></el-option>
                        <el-option label="vue" value="3"></el-option>
                        <el-option label="node" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签" label-width="80px">
                    <el-select v-model="item.tagId" placeholder="请选择文章标签">
                        <el-option label="javascrpit" value="1"></el-option>
                        <el-option label="css" value="2"></el-option>
                        <el-option label="vue" value="3"></el-option>
                        <el-option label="node" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容" label-width="80px">
                    <mavon-editor v-model="item.editorValue" />
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
            isAdd: true,
            item: {
                title: '',
                typeId: 1,
                tagId: 1
            },
            dialogFormVisible: false,
            dialogVisible: false,
            formInline: {
                user: '',
                region: ''
            },
            tableData: [{
                date: '2016-07-05',
                title: 'javascript实现继承',
                type: 'javascript',
                typeId: 1,
                tagId: 1,
                tag: '基础知识',
                enable: true,
                editorValue: ''
            }, {
                date: '2016-07-04',
                title: 'javascript闭包',
                type: 'javascript',
                typeId: 1,
                tagId: 1,
                tag: '基础知识',
                enable: false,
                editorValue: ''
            }, {
                date: '2016-07-03',
                title: 'flex布局详解',
                type: 'css',
                typeId: 1,
                tagId: 1,
                tag: 'css基础',
                editorValue: ''
            }, {
                date: '2016-07-02',
                title: 'display属性妙用',
                type: 'css',
                typeId: 1,
                tagId: 1,
                tag: 'css基础',
                enable: true,
                editorValue: ''
            }, {
                date: '2016-07-01',
                title: 'koa2搭建服务器',
                type: 'css',
                typeId: 1,
                tagId: 1,
                tag: 'node',
                enable: true,
                editorValue: ''
            }]
        }
    },

    components: {},

    computed: {

    },

    mounted() {

    },
    methods: {
        /**
         * 搜索按钮
         */
        toSearch() {

        },
        /**
         * 分页点击回调
         */
        changePageIndex(index) {

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
            this.item = item;
            this.isAdd = false;
            this.dialogFormVisible = true;
        },
        /**
         * 确认删除
         */
        confirmDelete(e) {
            console.log(this.item)
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
            let item = this.item;
            console.log(item)
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