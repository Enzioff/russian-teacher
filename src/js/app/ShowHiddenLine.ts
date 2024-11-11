class ShowHiddenLine {
    table;
    showHiddenBtn;
    textLines;

    constructor(table: Element) {
        this.table = table;
        this.showHiddenBtn = this.table.querySelectorAll('[data-visible]')
        this.textLines = this.table.querySelectorAll('.table__line--info')

        this.init()
    }

    init() {
        this.showHiddenBtn.forEach((button, idx) => {
            button.addEventListener('click', (evt) => {
                evt.preventDefault()
                this.textLines[idx].classList.toggle('visible')
            })
        })
    }
}

export default ShowHiddenLine