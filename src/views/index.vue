<template>
    <div>
        <xheader />
        <div class="big">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import xheader from '@/components/content/xheader'

export default {
    components : {
        xheader
    }
}
</script>

<style scoped>
.big{
    width: 100%;
    background-color: rgb(237, 237, 237);
}
</style>