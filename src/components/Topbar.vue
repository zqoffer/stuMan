<template>
    <nav class="navbar navbar-inverse" >
        <div class="container-fluid">
            <!-- 导航条 -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                </button>
                <a class="navbar-brand" href="/">首页</a>
            </div>
            <!-- /.container-fluid -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><a @click.prevent="Add">添加</a></li>
                </ul>
                <form class="navbar-form navbar-left" rel="ruleForm" :model="ruleForm">
                    <div class="form-group">
                        <input  type="text" class="form-control" placeholder="请输入姓名" v-model="ruleForm.name">
                        <button type="primary" class="btn btn-default" @click.prevent="submit" >搜索</button>
                    </div>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
    import  qs from "qs";
    export default {
        name:"Topbar",
        inject:['reload'],
        data() {
            return {
                ruleForm:{
                    name:''
                }
                    ,
                searchres:[]
            };
        },
        methods: {
            submit(){
                //console.log(this.ruleForm);
                console.log(this.ruleForm.name);
                //后台传数据时，
                //1、后台javaBean，前端传jason转换后的数据封装
                //2、@RequestParam，前端传jason转换后的数据封装
                //前端只能传封装，传具体成员数据时以上两种方式都接收不到
                this.$axios.post("http://localhost:8887/search",qs.stringify(this.ruleForm)).then(res=>{
                    console.log(qs.stringify(this.ruleForm.name));
                    this.searchres=this.ruleForm;
                    console.log(qs.stringify(this.searchres));
                    if(qs.stringify(this.searchres)!=''){
                        this.$router.push({
                            path: "/search",
                            name:"Search",
                            query: {ans: this.searchres}
                        })
                    }else{
                        this.$router.push({
                            path: "/error",
                        })
                    }
                    this.reload();

                })

            },
            Add(){
                this.$axios.get("http://localhost:8887/add").then(res=>{
                    this.$router.push({
                        path: "/add"
                    })
                })
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

