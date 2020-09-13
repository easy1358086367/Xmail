<template>
    <div class="shelf">
        <div class="title">
            <h2>{{title}}</h2>
        </div>
        <div>
            <!-- 具名插槽 -->
            <slot name="content">

            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            title:{
                type:String,
                default: 'shelf'
            }
        }
    }
</script>

<style scoped>
.title{
    width: 100%;
    background:linear-gradient(to right bottom, rgb(250,250,250), rgb(235,235,235));
    height: 60ox;
    line-height: 60px;
    padding-left: 20px;
    border: 1px solid rgb(219, 219, 219);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    box-sizing: border-box;
}
</style>