<template>
    <form action="/!/forms/contact_us" method="POST" class="flex flex-col gap-6" @submit.prevent="applyForm" ref="formDOM">
        <slot></slot>
        <input type="text" name="honeypot" class="hidden" />
        <div class="flex flex-col lg:flex-row gap-5 w-full">
            <input type="text" v-model="value.name" name="full_name" :placeholder="fields[localization].name" class="text-xl font-body text-black px-2 h-10 bg-white border border-black/20 lg:flex-1">
            <input type="email" v-model="value.mail" name="email" :placeholder="fields[localization].mail" class="text-xl font-body text-black px-2 h-10 bg-white border border-black/20 lg:flex-1">
        </div>
        <input type="text" v-model="value.subject" name="theme" :placeholder="fields[localization].subject" class="text-xl font-body text-black px-2 h-10 bg-white border border-black/20">
        <textarea name="message" v-model="value.message" :placeholder="fields[localization].message" rows="6" class="text-xl font-body text-black px-2 py-2 bg-white border border-black/20"></textarea>
        
        <div v-if="success" class="p-4 bg-green-50 text-green-700">
            <p class="font-display text-xl">{{ fields[localization].success }}</p>
        </div>
        <div v-if="error" class="p-4 bg-red-50 text-red-700">
            <p class="font-display text-xl">{{ error }}</p>
        </div>

        <button type="submit" class="btn w-fit" :class="[ darktheme ? '!btn-light' : '!btn-primary' ]">{{ fields[localization].send }}</button>
    </form> 
</template>

<script>

export default{
    props:{
        darktheme:{
            type:Boolean,
            default:true
        },
    },
    data(){
        return{
            localization:"hr",
            success:false,
            error:"",
            value:{
                name:"",
                mail:"",
                subject:"",
                message:"",
            },
            fields:{
                hr:{
                    name:"Ime",
                    mail:"Email",
                    subject:"Naslov",
                    message:"Poruka",
                    send:"Pošalji upit",
                    success:"Thank you for your submission!"
                },
                en:{
                    name:"Full name",
                    mail:"Email",
                    subject:"Subject",
                    message:"Message",
                    send:"Send",
                    success:"Thank you for your submission!"
                }
            }
        }
    },
    mounted(){
        let localization = this.getCookie("localization");
        this.localization = localization ? localization : "hr";
    }, 
    methods:{
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        },
        applyForm(){

            let form = this.$refs.formDOM;
            this.success = false;
            this.error = "";

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With':'XMLHttpRequest'
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success){
                    this.success = true
                }
                else{
                    this.error = data.errors[0];
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        }
    }
}

</script>