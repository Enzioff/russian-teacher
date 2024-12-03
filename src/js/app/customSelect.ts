class CustomSelect {
    el;
    headerEl;
    elements;
    current;
    selects;
    input;

    constructor(el: Element) {
        this.el = el;
        this.headerEl = this.el.querySelector('.select__header');
        this.elements = this.el.querySelectorAll('.select__item');
        this.current = this.headerEl.querySelector('.select__current')
        this.selects = document.querySelectorAll('.select');
        this.input = this.el.querySelector('input');

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
                this.current.textContent = el.textContent;
                if (this.input) {
                    this.input.value = el.getAttribute('data-value');
                }

                const countrySelect = document.querySelector('[data-title="country_id_hide"]')

                if (countrySelect) {
                    const parentEl: HTMLElement = countrySelect.closest('.form__item');

                    if (el.getAttribute('data-value') === 'country_teacher') {
                        if (parentEl.classList.contains('hidden')) {
                            parentEl.classList.remove('hidden')
                        }
                    } else if (parentEl.contains(el)) {
                        parentEl.classList.remove('hidden')
                    }
                }
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
