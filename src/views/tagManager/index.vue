<template>
    <div class="page-content">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="标题">
                <el-input v-model="formInline.searchName" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="toSearch" icon="el-icon-search" size="small">搜索</el-button>
                <el-button type="primary" @click="addTag" size="small">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="name" label="标题">
            </el-table-column>
            <!-- <el-table-column prop="enable" label="状态">
                <template slot-scope="scope">
                    <el-tag effect="plain" size="mini">
                        {{ scope.row.enable ? '已启用':'已禁用' }}
                    </el-tag>
                </template>
            </el-table-column> -->
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveCb">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { findTags, deleteTag, addUpdateTag } from "@/apis/tag"

export default {
    data() {
        return {
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            isAdd: true,
            item: {
                name: ''
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
            const res = await findTags({
                name: that.formInline.searchName,
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
            this.item = Object.assign({}, item);
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
            const res = await deleteTag(item)
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
        addTag() {
            this.item = {};
            this.isAdd = true;
            this.dialogFormVisible = true;
        },
        /**
         * 新增修改保存
         */
        saveCb() {
            let that = this;
            let item = that.item;
            const res = await addUpdateTag(item)
            if (res.code == 0) {
                that.dialogFormVisible = false;
                that.toSearch();
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
</style>