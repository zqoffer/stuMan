<template>
    <div>
        <Topbar></Topbar>
        <body>
        <div class="jumbotron">
            <div class="container">
                <h1>查找错误!</h1>
                <p>无法找到您输入的ID账号，请重新输入...</p>
                <p><a class="btn btn-primary btn-lg" href="/" role="button">返回</a></p>
            </div>
        </div>

        </body>
    </div>
</template>

<script>
    import Topbar from "../components/Topbar";
    export default {
        name: "Error",
        components: {Topbar}
    }
</script>

<style scoped>

</style>