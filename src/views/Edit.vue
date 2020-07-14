<template>
    <div>
        <Topbar></Topbar>
        <form class="form-horizontal required-validate" id="stuForm" @submit.prevent="submit">


            <div class="form-group">
                <label for="inputID" class="col-sm-2 control-label">学号</label>
                <div class="has-feedback col-sm-8" >
                    <input type="number" name="id" class="form-control" id="inputID" placeholder="ID" @mouseleave="idTest" v-model="stu.id" >
                    <span class="glyphicon form-control-feedback" ></span>
                    <p class="text-danger" v-if="errors.error_id!=''">{{errors.error_id}}</p>
                </div>
            </div>

            <div class="form-group">
                <label for="inputName" class="col-sm-2 control-label">姓名</label>
                <div class="col-sm-8">
                    <input type="text" name="name" class="form-control" id="inputName" placeholder="姓名" v-model="stu.name">
                    <p class="text-danger" v-if="errors.error_name!=''">{{errors.error_name}}</p>
                </div>
            </div>

            <div class="form-group">
                <label for="inputAge" class="col-sm-2 control-label">年龄</label>
                <div class="col-sm-8">
                    <input type="number" name="age" class="form-control" id="inputAge" placeholder="年龄" v-model="stu.age" >
                    <p class="text-danger" v-if="errors.error_age!=''">{{errors.error_age}}</p>
                </div>
            </div>

            <div class="form-group">
                <label  class="col-sm-2 control-label">性别</label>
                <div class="col-sm-8" >
                    <label class="radio-inline">
                        <input type="radio"  name="gender" value="1" v-model="stu.gender"> 男
                    </label>
                    <label class="radio-inline">
                        <input type="radio"  name="gender" value="0" v-model="stu.gender"> 女
                    </label>
                    <br>
                    <p class="text-danger" v-if="errors.error_gender!=''">{{errors.error_gender}}</p>
                </div>

            </div>

            <div class="form-group">
                <label for="inputEmail" class="col-sm-2 control-label">邮箱</label>
                <div class="col-sm-8">
                    <input type="email" name="email" class="form-control" id="inputEmail" placeholder="邮箱" v-model="stu.email">
                </div>
            </div>


            <div class="form-group">
                <label for="inputMajor" class="col-sm-2 control-label">专业</label>
                <div class="col-sm-8">
                    <select class="form-control" v-model="stu.major" id="inputMajor" name="major" placeholder="请选择">
                        <option value="计算机">计算机</option>
                        <option value="通信工程" >通信工程</option>
                        <option value="数学">数学</option>
                        <option value="电气工程">电气工程</option>
                    </select>
                </div>

            </div>

            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn has-feedback"  >提交</button>
                </div>
            </div>


        </form>
    </div>
</template>

<script>
    import qs from "qs";
    import Topbar from "../components/Topbar";
    export default {
        name: "Edit",
        components: {Topbar},
        data() {
            return {
                stu:{
                    id:'',
                    name:'',
                    age:'',
                    gender:'',
                    email:'',
                    major:''
                },
                errors:{
                    error_id:'',
                    error_name:'',
                    error_age:'',
                    error_gender:''
                },
                test:'0',
                orignalId:''

            };
        },
        created() {
            //在created函数中使用axios的get请求向后台获取用户信息数据
            //console.log("success");
            this.stu= qs.parse(this.$route.query.ans);
            this.originalId=qs.parse(this.$route.query.ans).id;
            // console.log(this.students);
        },
        methods: {
            submit() {
                console.log(this.stu.name);
                this.errors=[];
                if (this.test ==='1')
                    this.errors.error_id='该ID已存在，请重新输入';
                if (this.stu.id==='') {
                    this.errors.error_id='请填写ID';
                }

                if (this.stu.name==='') {
                    this.errors.error_name='请填写姓名';
                }else if(this.stu.name.length>4){
                    this.errors.error_name='姓名格式错误';
                }
                if (this.stu.id==='') {
                    this.errors.error_age='请填写年龄';
                }
                if (this.stu.id==='') {
                    this.errors.error_gender='请选择性别';
                }
                console.log(this.errors);
                if(qs.stringify(this.errors)==='' && this.test === '0'){
                    this.$axios.post("http://localhost:8887/edit", qs.stringify(this.stu)).then(res => {
                        console.log(this.stu);
                    });
                    this.$router.push("/");
                    //this.reload();
                }


            },
            idTest(){
                    this.$axios.get("http://localhost:8887/test/"+this.stu.id).then(res=>{
                        console.log(qs.stringify(res.data).id);
                        console.log(res.data);
                        if (qs.stringify(res.data)!=''&&res.data.id!=this.originalId){
                            this.test='1';
                            this.errors.error_id='该ID已存在，请重新输入';
                            console.log(this.errors.error_id);
                        }else{
                            this.errors=[];
                            this.test='0';
                            console.log(this.errors.error_id);
                        }
                    })

            }
        }
    }
</script>