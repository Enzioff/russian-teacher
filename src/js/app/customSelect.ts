class CustomSelect {
    el;
    headerEl;
    elements;
    current;

    constructor(el: Element) {
        this.el = el;
        this.headerEl = this.el.querySelector('.select__header');
        this.elements = this.el.querySelectorAll('.select__item');
        this.current = this.headerEl.querySelector('.select__current')

        this.init();
    }

    init() {
        this.headerEl.addEventListener('click', () => {
            this.toggleDropdown();
        })
        this.elements.forEach(el => {
            el.addEventListener('click', () => {
                this.toggleDropdown();
                this.headerEl.setAttribute('data-current-value', el.getAttribute('data-value'))
                this.current.textContent = el.textContent
            })
        })
    }

    toggleDropdown = () => {
        this.el.classList.toggle('active')
    }
}

export default CustomSelect;