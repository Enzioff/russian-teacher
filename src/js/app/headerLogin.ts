class HeaderLogin {
    btn;
    loginBlock;
    activeClass: string;

    constructor(el: Element) {
        this.loginBlock = el;
        this.btn = this.loginBlock.querySelector('[data-login-btn]');
        this.activeClass = 'login-block--login';

        this.init()
    }

    init() {
        this.activeLoginBlock()
        window.addEventListener('click', this.closeLoginForm.bind(this))
    }

    getLoginBlockStatus = () => {
        return this.loginBlock.classList.contains(this.activeClass)
    }

    activeLoginBlock = () => {
        this.btn.addEventListener('click', () => {
            if (!this.getLoginBlockStatus()) {
                this.loginBlock.classList.add(this.activeClass)
            }
        })
    }
    closeLoginForm = (evt: MouseEvent) => {
        if (!this.loginBlock.contains(evt.target as Node)) {
            this.loginBlock.classList.remove(this.activeClass);
        }
    }
}

export default HeaderLogin;