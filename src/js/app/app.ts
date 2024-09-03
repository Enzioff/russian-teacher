import Slider from "./slider";
import {Fancybox} from "@fancyapps/ui";
import MobileMenu from "./mobileMenu";
import password from "./password";
import Password from "./password";
import CustomSelect from "./customSelect";

class App {
    constructor() {
        this.init();
    }

    init = () => {
        this.createSlider()
        this.createMobileMenu()
        this.createPassword()
        this.createCustomSelect()
    }

    createSlider = () => {
        const sliders = document.querySelectorAll('[data-slider]')
        if (!sliders) return
        sliders.forEach(slider => {
            new Slider(slider)
        })
    }

    createMobileMenu = () => {
        const mobileMenu = document.querySelector('.mobile-menu');

        if (!mobileMenu) return

        new MobileMenu(mobileMenu);
    }

    createPassword = () => {
        const passwordBlocks = document.querySelectorAll('.password-block');

        if (!passwordBlocks) return;

        passwordBlocks.forEach(el => {
            new Password(el);
        })
    }

    createCustomSelect = () => {
        const selectList = document.querySelectorAll('[data-select]')

        if (!selectList) return;

        selectList.forEach(el => {
            new CustomSelect(el);
        })
    }
}

export {App};

