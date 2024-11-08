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
        window.addEventListener('click', (evt) => this.closeLoginForm(evt))
    }

    getLoginBlockStatus = () => {
        return this.loginBlock.classList.contains(this.activeClass)
    }

    activeLoginBlock = () => {
        if (this.btn) {
            this.btn.addEventListener('click', () => {
                if (!this.getLoginBlockStatus()) {
                    setTimeout(() => {
                        this.btn.setAttribute('data-login-btn-in', '');
                    }, 200)
                    this.loginBlock.classList.add(this.activeClass)
                }
            })
        }
    }
    closeLoginForm = (evt: MouseEvent) => {
        if (!this.loginBlock.contains(evt.target as Node)) {
            this.loginBlock.classList.remove(this.activeClass);
            if (this.btn) {
                if (this.btn.hasAttribute('data-login-btn-in')) {
                    this.btn.removeAttribute('data-login-btn-in');
                }
            }
        }
    }
}

export default HeaderLogin;