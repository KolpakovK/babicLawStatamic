<template>

<div class="flex justify-center fixed top-0 left-0 w-full z-50 duration-500" :class="[{ 'bg-white': isScrolled },{ 'bg-white': isMobileOpened }]">
    <div v-if="!isMobileOpened" class="container flex justify-between items-center py-2">
        <a :href="localization=='hr' ? '/' : '/en/home-page'">
            <img :src="!isScrolled ? logoWhite : logoColored" alt="logo" class="h-10">
        </a>

        <div class="hidden lg:flex items-center gap-6">
            <a v-for="tab in nav" :href="tab.url" class="py-1 font-body text-xl text-white duration-500 hover:font-bold" :class="[{ '!text-black/80': isScrolled },{ ' border-b border-b-blue-500': tab.isCurrent }]">{{ tab.name }}</a>
        </div>

        <div class="hidden lg:flex items-center gap-2">
            <a @click="setCookie('localization','hr',30)" href="/" class="font-body text-xl text-white duration-500 hover:font-bold opacity-40" :class="[{ '!opacity-100': localization=='hr' },{ '!text-black': isScrolled }]">Hr</a>
            <a @click="setCookie('localization','en',30)" href="/en/home-page" class="font-body text-xl text-white duration-500 hover:font-bold opacity-40" :class="[{ '!opacity-100': localization=='en' },{ '!text-black': isScrolled }]">En</a>
        </div>

        <button class="btn btn-icon btn-light lg:hidden" @click="isMobileOpened=true"><i class="ri-menu-3-line"></i></button>
    </div>
    <div v-if="isMobileOpened" class="container flex flex-col gap-8 pt-2 pb-16 h-screen">
        <div class="flex justify-between items-center">
            <a :href="localization=='hr' ? '/' : '/en/home-page'">
                <img :src="!isScrolled ? logoWhite : logoColored" alt="logo" class="h-10">
            </a>

            <button class="btn btn-icon btn-light lg:hidden" @click="isMobileOpened=false"><i class="ri-close-line"></i></button>
        </div>

        <div class="flex flex-col gap-2 text-center flex-1">
            <a v-for="tab in nav" :href="tab.url" class="py-1 font-display text-2xl text-black/80 duration-500 hover:font-bold" :class="[{ ' border-b border-b-blue-500': tab.isCurrent }]">{{ tab.name }}</a>
        </div>

        <div class="flex justify-center items-center gap-2">
            <a @click="setCookie('localization','hr',30)" href="/" class="font-body text-xl text-black duration-500 hover:font-bold opacity-40" :class="[{ '!opacity-100': localization=='hr' }]">Hr</a>
            <a @click="setCookie('localization','en',30)" href="/en/home-page" class="font-body text-xl text-black duration-500 hover:font-bold opacity-40" :class="[{ '!opacity-100': localization=='en' }]">En</a>
        </div>
    </div>
</div>

</template>


<script>

export default{
    props:{
        content:{}
    },
    data(){
        return{
            localization:"hr",
            nav:[],
            logoWhite:"",
            logoColored:"",
            isScrolled:false,
            isMobileOpened:false
        }
    },
    mounted(){
        this.logoWhite = this.content.logoWhite;
        this.logoColored = this.content.logoColored;

        this.localization = this.getCookie("localization");
        if (!this.localization) this.localization =  "hr";
        
        this.nav = this.localization=="hr" ? this.content.hrNav : this.content.enNav;

        this.isScrolled = window.scrollY > 0; // Закреплять, если прокрутка больше 0
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods:{
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        },
        handleScroll() {
            this.isScrolled = window.scrollY > 0; // Закреплять, если прокрутка больше 0
        },
        setCookie(name, value, daysToExpire) {
            const date = new Date();
            date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
            const expires = "expires=" + date.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
        }
    }
}

</script>