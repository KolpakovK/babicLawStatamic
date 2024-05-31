<template>
    <a class="btn" :class="type" :href="link">
        {{ text }}
        <i v-if="icon" :class="icon"></i>
    </a>
</template>

<script>
    export default{
        props:{
            type:String,
            text:String,
            icon:String,
            link:String
        },
        mounted(){
            
        }
    }
</script>