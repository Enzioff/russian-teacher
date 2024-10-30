class CustomTags {
    container;
    input;
    list;

    constructor(container: Element) {
        this.container = container
        this.input = this.container.querySelector('input');
        this.list = this.container.querySelector('.tags')

        this.init();
    }

    init() {
        this.input.addEventListener('keydown', (evt) => {
            if (evt.key === "Enter") {
                evt.preventDefault();
                this.list.insertAdjacentHTML('beforeend', this.tagTemplate(this.input.value));
                this.input.value = '';
            }
        })
        this.input.addEventListener('change', () => {
            this.list.insertAdjacentHTML('beforeend', this.tagTemplate(this.input.value));
            this.input.value = '';
        })

        this.list.addEventListener('click', (evt: Event) => {
            const target = evt.target as HTMLElement;

            if (target.className === 'tags__item') {
                target.remove()
            }
        })
    }

    tagTemplate = (text: string) => {
        return `
            <span class="tags__item">
                ${text}
            </span>
        `
    }
}

export default CustomTags;