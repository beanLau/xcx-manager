<template>
    <div class="page-content">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="标题">
                <el-input v-model="formInline.title" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item label="试题类型">
                <el-select v-model="formInline.questionType" placeholder="请选择" clearable>
                    <el-option v-for="item in questionTypeData" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="考点类型">
                <el-cascader v-model="formInline.typeId" :options="typeOptions" :props="{value:'_id',label:'name', checkStrictly: true }" clearable></el-cascader>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="toSearch" icon="el-icon-search" size="small">搜索</el-button>
                <el-button type="primary" @click="addQuestion" size="small">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="title" label="题干">
            </el-table-column>
            <el-table-column label="题型" width="80">
                <template slot-scope="scope">
                    <span>{{ questionTypeFormat[scope.row.questionType] }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="doCount" label="已做" width="80">
            </el-table-column>
            <el-table-column label="难度" width="180">
                <template slot-scope="scope">
                    <el-rate v-model="scope.row.difficulty" disabled show-score text-color="#ff9900" score-template="{value}">
                    </el-rate>
                </template>
            </el-table-column>
            <el-table-column prop="isTop" label="状态" width="80">
                <template slot-scope="scope">
                    <el-tag effect="plain" size="mini" v-if="scope.row.isTop">
                        已推荐
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column sortable prop="created_at" label="日期" width="120">
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button @click="enableCb(scope.row)" type="primary" size="small">{{scope.row.isTop ? '取消推荐':'首页推荐'}}</el-button>
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
        <el-dialog width="80%" :title="isAdd ? '新增':'修改'" :visible.sync="dialogFormVisible">
            <el-form :model="item">
                <el-form-item label="题干" label-width="80px">
                    <el-input type="textarea" :rows="2" placeholder="请输入题干" v-model="item.title">
                    </el-input>
                </el-form-item>
                <el-form-item label="题型" label-width="80px">
                    <el-select v-model="item.questionType" @change="changeQuestionType" clearable placeholder="请选择">
                        <el-option v-for="questionType in questionTypeData" :key="questionType.value" :label="questionType.name" :value="questionType.value">
                        </el-option>
                    </el-select>
                    <el-button v-if="item.questionType == 1 || item.questionType == 2" type="primary" size="mini" class="addoption-btn" @click="addOption">添加选项</el-button>
                </el-form-item>
                <!-- 如果是单选题 -->
                <el-form-item label="选项" label-width="80px" v-if="item.questionType == 1">
                    <el-row v-for="(option,index) in item.options" :key="index">
                        <el-col :span="2" style="text-align:center;">
                            <span>{{option.name}}</span>
                        </el-col>
                        <el-col class="alincenter" :span="15">
                            <el-input type="textarea" :rows="2" placeholder="请输入选项内容" v-model="option.content">
                            </el-input>
                        </el-col>
                        <el-col class="alincenter" :span="5">
                            <el-radio v-model="item.rightIndex" :label="index">正确选项</el-radio>
                        </el-col>
                        <el-col class="alincenter" :span="2">
                            <el-button type="primary" size="mini" @click="deleteOption(index)">删除</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <!-- 如果是判断题 -->
                <el-form-item label="选项" label-width="80px" v-if="item.questionType == 4">
                    <el-row v-for="(option,index) in item.options" :key="index">
                        <el-col :span="2" style="text-align:center;">
                            <span>{{option.name}}</span>
                        </el-col>
                        <el-col class="alincenter" :span="15">
                            <span>{{option.content}}</span>
                        </el-col>
                        <el-col class="alincenter" :span="5">
                            <el-radio v-model="item.rightIndex" :label="index">正确选项</el-radio>
                        </el-col>
                    </el-row>
                </el-form-item>
                <!-- 如果是多选题 -->
                <el-form-item label="选项" label-width="80px" v-if="item.questionType == 2">
                    <el-row v-for="(option,index) in item.options" :key="index">
                        <el-col :span="2" style="text-align:center;">
                            <span>{{option.name}}</span>
                        </el-col>
                        <el-col class="alincenter" :span="15">
                            <el-input type="textarea" :rows="2" placeholder="请输入选项内容" v-model="option.content">
                            </el-input>
                        </el-col>
                        <el-col class="alincenter" :span="5">
                            <el-switch active-text="正确选项" v-model="option.isRight">
                            </el-switch>
                        </el-col>
                        <el-col class="alincenter" :span="2">
                            <el-button type="primary" size="mini" @click="deleteOption(index)">删除</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="类型" label-width="80px">
                    <el-cascader v-model="item.typeId" :options="typeOptions" :props="{value:'_id',label:'name', checkStrictly: true }" clearable></el-cascader>
                </el-form-item>
                <el-form-item label="难度" label-width="80px">
                    <el-rate v-model="item.difficulty" style="line-height:40px;"></el-rate>
                </el-form-item>
                <el-form-item label="解析" label-width="80px">
                    <mavon-editor v-model="item.analysis" />
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
import { findAllTypes } from "@/apis/article"
import { addUpdateQuestion, findQuestions, recommendQuestion, deleteQuestion } from "@/apis/question"
export default {
    data() {
        return {
            questionTypeFormat: {
                1: '单选题',
                2: '多选题',
                3: '简答题',
                4: '判断'
            },
            optionsName: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
            questionTypeData: [{ //题型下拉数据
                value: 1,
                name: '单选题'
            }, {
                value: 2,
                name: '多选题'
            }, {
                value: 4,
                name: '判断'
            }, {
                value: 3,
                name: '简答题'
            }],
            typeOptions: [], //类型级联下拉数据
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            isAdd: true,
            item: {
                title: '',
                questionType: 1,
                typeId: '',
                typeName: '',
                analysis: '',
                difficulty: 0,
                rightIndex: -1,
                options: [{
                    name: 'A',
                    content: "",
                    isRight: false
                }]
            },
            dialogFormVisible: false,
            dialogVisible: false,
            formInline: {
                title: '',
                typeId: ''
            },
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
        addOption() {
            let name = this.optionsName[this.item.options.length]
            this.item.options.push({
                name: name,
                content: '',
                isRight: false
            })
        },
        /**
         * 初始化下拉框数据
         */
        async initSelectData() {
            let that = this;
            const res = await findAllTypes()
            if (res.code == 0) {
                that.typeOptions = that.setOptionsData(res.data.list, '')
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
            const res = await findQuestions({
                title: that.formInline.title,
                questionType: that.formInline.questionType,
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

            const res = await recommendQuestion({
                _id: item._id,
                isTop: item.isTop ? false : true
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
            if (item.questionType == 1 || item.questionType == 4) {
                let rightIndex = item.options.findIndex(option => {
                    return option.isRight
                })
                this.item.rightIndex = rightIndex
            }
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

            const res = await deleteQuestion(item)
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
         * 切换试题类型
         */
        changeQuestionType(value) {
            switch (value) {
                case 1: //单选题
                    this.item.options = [{
                        name: 'A',
                        content: "",
                        isRight: false
                    }]
                    break;
                case 2: //多选题
                    this.item.options = [{
                        name: 'A',
                        content: "",
                        isRight: false
                    }]
                    break;
                case 4: //判断题
                    this.item.options = [{
                        name: '√',
                        content: "是",
                        isRight: false
                    }, {
                        name: '×',
                        content: "否",
                        isRight: false
                    }]
                    break;
                case 3: //简答题
                    this.item.options = []
                    break;
            }
        },
        /**
         * 删除选项
         */
        deleteOption(index) {
            let options = this.item.options
            let optionsName = this.optionsName
            options.splice(index, 1);
            this.item.options = options
            this.item.options.map((item, index) => {
                item.name = optionsName[index]
            })
            if (this.item.rightIndex == index) {
                this.item.rightIndex = -1
            }
        },
        /**
         * 新增文章
         */
        addQuestion() {
            this.item = {
                title: '',
                questionType: 1,
                typeId: '',
                typeName: '',
                analysis: '',
                difficulty: 0,
                rightIndex: -1,
                options: [{
                    name: 'A',
                    content: "",
                    isRight: false
                }]
            };
            this.isAdd = true;
            this.dialogFormVisible = true;
        },
        /**
         * 新增修改保存
         */
        async saveCb() {
            let that = this;
            let item = Object.assign({}, this.item);
            if (item.typeId) {
                item.typeId = item.typeId[item.typeId.length - 1 || 0]
            } else {
                item.typeId = ''
            }

            //单选或判断
            if (item.questionType == 1 || item.questionType == 4) {
                item.options.map((option, index) => {
                    if (index == item.rightIndex) {
                        option.isRight = true
                    }
                })
            }

            if (item.questionType == 3) {
                delete item.options
            }
            const res = await addUpdateQuestion(item)
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
.alincenter {
  text-align: center;
}
.addoption-btn {
  margin-left: 40px;
}
</style>