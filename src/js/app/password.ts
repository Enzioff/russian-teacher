class Password {
    el;
    input;
    visibleBtn;
    icons;

    constructor(el: Element) {
        this.el = el;
        this.input = this.el.querySelector('.input');
        this.visibleBtn = this.el.querySelector('.password-block__btn');
        this.icons = this.el.querySelectorAll('use');

        this.init()
    }

    init() {
        this.visibleBtn.addEventListener('click', () => {
            this.changeInputType();
            this.changeVisibleIcon();
        })
    }

    changeVisibleIcon = () => {
        if (this.icons[1].hasAttribute('hidden')) {
            this.icons[1].removeAttribute('hidden')
            this.icons[0].setAttribute('hidden', '');
        } else {
            this.icons[1].setAttribute('hidden', '');
            this.icons[0].removeAttribute('hidden');
        }
    }

    changeInputType = () => {
        const currentType = this.input.getAttribute('type');

        if (currentType === 'password') {
            this.input.setAttribute('type', 'text')
        } else {
            this.input.setAttribute('type', 'password')
        }
    }
}

export default Password