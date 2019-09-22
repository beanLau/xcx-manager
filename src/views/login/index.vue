<template>
    <div class="login-content">
        <el-form>
            <el-form-item label="用户名" label-width="80px">
                <el-input v-model="username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="80px">
                <el-input type="password" v-model="password" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveCb">确 定</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: 1,
            password: 10
        }
    },

    components: {},

    computed: {

    },

    mounted() {
        //this.toSearch();
    },
    methods: {
        /**
         * 搜索按钮
         */
        toSearch() {
            let that = this;
            fetch('http://localhost:3000/findTags', {
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
                    if(res.code == 0){
                        that.tableData = res.data.list
                        that.total = res.data.total
                    }
                });
        }
    }
}

</script>
<style lang='less' scoped>
</style>