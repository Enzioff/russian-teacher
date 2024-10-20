class CustomSelect {
    el;
    headerEl;
    elements;
    current;
    selects;

    constructor(el: Element) {
        this.el = el;
        this.headerEl = this.el.querySelector('.select__header');
        this.elements = this.el.querySelectorAll('.select__item');
        this.current = this.headerEl.querySelector('.select__current')
        this.selects = document.querySelectorAll('.select');

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
        if (this.el.classList.contains('active')) {
            if (this.selects) {
                this.selects.forEach(temp => temp.classList.remove('active'))
            }
        } else {
            if (this.selects) {
                this.selects.forEach(temp => temp.classList.remove('active'))
            }
            this.el.classList.add('active')
        }
    }
}

export default CustomSelect;