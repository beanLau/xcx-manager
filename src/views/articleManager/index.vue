<template>
    <div class="page-content">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="标题">
                <el-input v-model="formInline.title" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-cascader v-model="formInline.typeId" :options="options" :props="{value:'_id',label:'name', checkStrictly: true }" clearable></el-cascader>
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
            <el-table-column prop="readCount" label="阅读量">
            </el-table-column>
            <el-table-column prop="likeCount" label="喜欢量">
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
        <el-dialog :title="isAdd ? '新增':'修改'" :visible.sync="dialogFormVisible" width="80%">
            <el-form :model="item">
                <el-form-item label="标题" label-width="80px">
                    <el-input v-model="item.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" label-width="80px">
                    <el-cascader v-model="item.typeId" :options="options" :props="{value:'_id',label:'name', checkStrictly: true }" clearable></el-cascader>
                </el-form-item>
                <el-form-item label="图标" label-width="80px">
                    <el-upload class="avatar-uploader" action="/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="标签" label-width="80px">
                    <el-select v-model="item.tagId" placeholder="请选择文章标签">
                        <el-option :label="tag.name" :value="tag._id" v-for="(tag, index) in tagList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容" label-width="80px">
                    <mavon-editor v-model="item.content" @imgAdd="imgAdd" ref="md" />
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
import { getArticle,enableArticle,deleteArticle, findAllTags, findAllTypes, addUpdateArticle  } from "@/apis/article"
import { uploadFile } from "@/apis/utils"
export default {
    data() {
        return {
            options: [],
            pageIndex: 1,
            pageSize: 10,
            imageUrl: '',
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
        async initSelectData() {
            let that = this;
            const res = await findAllTags()
            if (res.code == 0) {
                that.tagList = res.data.list
            }

            const res2 = await findAllTypes()
            if (res2.code == 0) {
                that.options = that.setOptionsData(res2.data.list, '')
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
        /**
         * 搜索按钮
         */
        async toSearch() {
            let that = this;
            let typeId = that.formInline.typeId;
            if (typeId.length > 0) {
                typeId = typeId[typeId.length - 1]
            } else {
                typeId = ''
            }
            const res = await getArticle({
                title: that.formInline.title,
                typeId: typeId,
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
        async enableCb(item) {
            let that = this;
            that.dialogVisible = false;
            const res = await enableArticle({
                _id: item._id,
                enable: item.enable ? false : true
            })
            if (res.code == 0) {
                that.toSearch();
            }
        },
        /**
         * 修改按钮回调
         */
        editCb(item) {
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
            const res = await deleteArticle(item)
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
        addArticle() {
            this.item = {};
            this.imageUrl = '';
            this.isAdd = true;
            this.dialogFormVisible = true;
        },
        /**
         * 新增修改保存
         */
        async saveCb() {
            let that = this;
            let item = this.item;
            item.url = that.imageUrl;
            if (item.typeId) {
                item.typeId = item.typeId[item.typeId.length - 1 || 0]
            } else {
                item.typeId = ''
            }

            const res = await addUpdateArticle(item)
            if (res.code == 0) {
                that.dialogFormVisible = false;
                that.toSearch();
            }
        },
        async imgAdd(pos, $file) {
            let that = this;
            // 第一步.将图片上传到服务器.
            var formdata = new FormData();
            formdata.append('file', $file);

            const res = await uploadFile(formdata)
            if (res.code == 0) {
                that.$refs.md.$img2Url(pos, resData.data.url);
            }
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
  width: 160px;
  height: 160px;
  line-height: 160px;
  text-align: center;
}
.avatar {
  width: 160px;
  height: 160px;
  display: block;
}
.type-icon {
  width: 36px;
  height: 36px;
}
</style>