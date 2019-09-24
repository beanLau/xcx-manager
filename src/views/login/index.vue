<template>
    <div class="login-content">
        <div class="form-wrap">
            <div class="form-top">
                <div class="form-top-left">
                    <h3>Login to our site</h3>
                    <p>Enter your username and password to log on:</p>
                </div>
                <img class="form-top-right" src="../../assets/unlocking.png" alt="">
            </div>
            <div class="form-body">
                <div>
                    <input type="text" placeholder="Username...">
                </div>
                <div>
                    <input type="password" name="" id="" placeholder="Password...">
                </div>
                <div class="login-btn">coding</div>
            </div>
        </div>
        <div class="page-bg"></div>
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
<style scoped>
.login-content{
    position: absolute;
    width: 100%;
    height: 100%;
}
.form-wrap{
    opacity: .95;
    width: 560px;
    background: #eee;
    left: 50%;
    position: absolute;
    margin-left: -280px;
    top: 50%;
    margin-top: -200px;
    box-sizing: border-box;
    border-radius: 10px;
}
.form-top{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 25px;
    background-color: #fff;
    border-radius: 10px 10px 0 0;
}
.form-top-left h3{
    font-size: 22px;
    font-weight: 300;
    color: #555;
    line-height: 30px;
}
.form-top-left p{
    margin-top: 20px;
    font-size: 14px;
    color: #666;
}
.form-top-right{
    width: 66px;
    height: 66px;
}
.form-body{
    padding: 25px;
}
.form-body input{
    height: 50px;
    margin: 0;
    padding: 0 20px;
    background: #f8f8f8;
    border: 3px solid #ddd;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 50px;
    color: #888;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    -o-transition: all .3s;
    -moz-transition: all .3s;
    -webkit-transition: all .3s;
    -ms-transition: all .3s;
    transition: all .3s;
    display: block;
    width: 100%;    
    box-sizing: border-box;
    margin-bottom: 20px;
}
.form-body input:hover{
    border: 3px solid #aaa;
}
.form-body input:focus{
    outline: 0;
	background: #fff;
    border: 3px solid #ccc;
    -moz-box-shadow: none; -webkit-box-shadow: none; box-shadow: none;
}
.login-btn{
    cursor: pointer;
    font-size: 16px;
    color: #fff;
    background: #4aaf51;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
}
.page-bg{
    position: absolute;
    z-index: -1;
    left: 0;
    background-image: url("../../assets/login-bg.png");
    background-size: cover;
    background-repeat: no-repeat;
    top: 0;
    bottom: 0;
    right: 0;
}
</style>