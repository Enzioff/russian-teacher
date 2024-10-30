class customFile {
    fileBlock;
    uploadInput;
    text;

    constructor(fileBlock: Element) {
        this.fileBlock = fileBlock;
        this.uploadInput = this.fileBlock.querySelector('input');
        this.text = this.fileBlock.querySelector('.file-block__text');

        this.init()
    }

    init() {
        this.uploadInput.addEventListener('change', (evt: Event) => {
            const target = evt.target as HTMLInputElement;

            const file = target.files
            if (!file) {
                return false
            }

            this.uploadInput.files = target.files;
            this.text.textContent = this.uploadInput.files[0].name;
        })
    }
}

export default customFile