class MobileMenu {
    el;
    burger;
    body;

    constructor(el: Element) {
        this.el = el;
        this.burger = document.querySelector('.burger');
        this.body = document.querySelector('body');

        this.init();
    }

    init() {
        this.toggleMenu();
    }

    toggleMenu = () => {
        this.burger.addEventListener('click', () => {
            this.el.classList.toggle('active')
            this.burger.classList.toggle('active')
            this.body.classList.toggle('fixed')
        })
    }
}

export default MobileMenu;