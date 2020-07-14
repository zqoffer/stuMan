<template>
    <div>
        <Topbar></Topbar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10  pt-3 px-4">
            <div class="table-responsive">
                <table class="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>姓名</th>
                        <th>年龄</th>
                        <th>性别</th>
                        <th>邮箱</th>
                        <th>专业</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="stu in students" >
                        <td v-text="stu.id" ></td>
                        <td v-text="stu.name"></td>
                        <td v-text="stu.age"></td>
                        <td v-text="stu.gender ===1?'男':'女'"></td>
                        <td v-text="stu.email"></td>
                        <td v-text="stu.major"></td>
                        <td>
                            <a type="button" class="btn btn-primary" @click.prevent="Edit(stu.id)" >
                                编辑
                            </a>
                            <a type="button" class="btn btn-danger" @click.prevent="Delete(stu.id)">
                                删除
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </main>
    </div>
</template>

<script>

    import qs from "qs";
    import Topbar from "../components/Topbar";

    export default {
        inject:['reload'],
        components: {Topbar},
        name:"Search",
        data() {
            return {
                ruleForm:{
                    name:''
                },
                students:[],
            };
        },
        created() {
            //在created函数中使用axios的get请求向后台获取用户信息数据
            //console.log("success");
            this.ruleForm=this.$route.query.ans;
            console.log(this.ruleForm);
            //this.students=qs.parse(this.$route.query.ans);
            this.$axios.post("http://localhost:8887/search",qs.stringify(this.ruleForm)).then(res=>{
                console.log(qs.stringify(this.ruleForm.name));
                this.students=res.data;
                console.log(this.students);
            })

            // console.log(this.students);
        },
        methods: {
            Edit(ediId){
                this.$axios.get("http://localhost:8887/add/"+ediId).then(res=>{
                    this.$router.push({
                        path: "/edit",
                        query:{ans: qs.stringify(res.data)}
                    })
                })
            },
            Delete(delId){
                this.$axios.get("http://localhost:8887/"+delId).then(res=>{
                });
                this.reload();
            }
        }
    }
</script>

<style scoped>

</style>