import Slider from "./slider";
import MobileMenu from "./mobileMenu";
import Password from "./password";
import CustomSelect from "./customSelect";
import HeaderLogin from "./headerLogin";
import UpdateUserPhoto from "./updateUserPhoto";
import {Fancybox} from "@fancyapps/ui";
import CustomFile from "./customFile";

class App {
    constructor() {
        this.init();
    }

    init = () => {
        this.createSlider()
        this.createMobileMenu()
        this.createPassword()
        this.createCustomSelect()
        this.createHeaderLogin()
        this.createUpdateUserPhoto()
        this.createFancyBox()
        this.createCustomFile()
        this.createSwitcher()
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

    createHeaderLogin = () => {
        const loginBtn = document.querySelector('.login-block');
        if (!loginBtn) return

        new HeaderLogin(loginBtn)
    }

    createUpdateUserPhoto = () => {
        const userPhotoBlock = document.querySelector('[data-user-photo]')
        if (!userPhotoBlock) return
        new UpdateUserPhoto(userPhotoBlock)
    }

    createFancyBox = () => {
        Fancybox.bind('[data-fancybox]')
    }

    createCustomFile = () => {
        const fileBlocks = document.querySelectorAll('.file-block');
        if (!fileBlocks) return;
        fileBlocks.forEach(fileBlock => {
            new CustomFile(fileBlock)
        })
    }

    createSwitcher = () => {
        const switcherList = document.querySelectorAll('[data-switcher]');
        if (!switcherList) return;
        switcherList.forEach(switcher => {
            const input = switcher.querySelector('input')
            const text = switcher.querySelector('[data-switcher-text]')
            input.addEventListener('change', () => {
                if (input.checked) {
                    text.textContent = 'Вкл.'
                } else {
                    text.textContent = 'Выкл.'
                }
            })
        })
    }
}

export {App};

