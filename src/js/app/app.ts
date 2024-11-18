import Slider from "./slider";
import MobileMenu from "./mobileMenu";
import Password from "./password";
import CustomSelect from "./customSelect";
import HeaderLogin from "./headerLogin";
import UpdateUserPhoto from "./updateUserPhoto";
import CustomFile from "./customFile";
import CustomTags from "./customTags";
import Requests from "./requests";
import Mask from "./mask";
import CustomFancybox from "./Fancybox";
import Chat from "./Chat";
import ShowHiddenLine from "./ShowHiddenLine";
import AsyncUpdate from "./AsyncUpdate";

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
        this.createCustomTags()
        this.createRequests()
        this.createMask()
        this.createChat()
        this.createShowHiddenLine()
        this.createAsyncUpdate()
    }

    createSlider = () => {
        const sliders = document.querySelectorAll('[data-slider]')
        if (!sliders) return
        sliders.forEach(slider => {
            new Slider(slider)
        })
    }

    createRequests = () => {
        const forms = document.querySelectorAll('[data-form]');
        if (!forms) return;
        forms.forEach((form: HTMLFormElement) => {
            new Requests(form);
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
        const loginBlocks = document.querySelectorAll('.login-block');
        if (!loginBlocks) return

        loginBlocks.forEach(loginBlock => {
            new HeaderLogin(loginBlock)
        })
    }

    createUpdateUserPhoto = () => {
        const userPhotoBlock = document.querySelector('[data-user-photo]')
        if (!userPhotoBlock) return
        new UpdateUserPhoto(userPhotoBlock)
    }

    createFancyBox = () => {
        new CustomFancybox();
    }

    createCustomFile = () => {
        const fileBlocks = document.querySelectorAll('.file-block');
        if (!fileBlocks) return;
        fileBlocks.forEach(fileBlock => {
            new CustomFile(fileBlock)
        })
    }

    createSwitcher = () => {
        const switcherList = document.querySelectorAll('.switcher');
        if (!switcherList) return;
        switcherList.forEach(switcher => {
            const input = switcher.querySelector('input')
            const text = switcher.querySelector('[data-switcher-text]')
            input.addEventListener('change', () => {
                if (input.checked) {
                    input.value = 'Y'
                    if (text) {
                        text.textContent = 'Вкл.'
                    }
                } else {
                    input.value = 'N'
                    if (text) {
                        text.textContent = 'Выкл.'
                    }
                }
                console.log(input.value)
            })
        })
    }

    createCustomTags = () => {
        const customTags = document.querySelector('.custom-tags');
        if (!customTags) return;
        new CustomTags(customTags)
    }

    createMask = () => {
        new Mask()
    }

    createChat = () => {
        const chatBlock = document.querySelector('.chat-block');
        if (!chatBlock) return;
        new Chat(chatBlock)
    }

    createShowHiddenLine = () => {
        const tables = document.querySelectorAll('.table');
        if (!tables) return
        tables.forEach(table => {
            new ShowHiddenLine(table);
        })
    }
    
    createAsyncUpdate = () => {
        const asyncSelects = document.querySelectorAll('[data-select-async]');
        
        if (!asyncSelects) return;
        
        asyncSelects.forEach(element => {
            new AsyncUpdate(element);
        })
    }
}

export {App};

