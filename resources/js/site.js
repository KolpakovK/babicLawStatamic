// This is all you.

import sal from 'sal.js'

import { createApp } from "vue";
import Vue3Marquee from 'vue3-marquee';

import ButtonVue from "./components/ButtonVue.vue";
import ContactForm from "./components/ContactForm.vue";
import Navigation from "./components/Navigation.vue";

const app = createApp({});

app.component("button-vue", ButtonVue);
app.component("contact-form", ContactForm);
app.component("navigation", Navigation);


const mountedApp = app.use(Vue3Marquee).mount("#app");


window.onload = (event) => {
    sal();

    console.log("page is fully loaded");

    if (!getCookie("localization")){
        setCookie("localization","hr",30);
    }

    sessionStorage.setItem("localization",getCookie("localization"));

    new Glide('.glide').mount();

};

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, daysToExpire) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}