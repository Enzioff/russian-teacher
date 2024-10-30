class customFile {
    fileBlock;
    uploadInput;
    text;
    parentElement;
    uploadList;

    constructor(fileBlock: Element) {
        this.fileBlock = fileBlock;
        this.uploadInput = this.fileBlock.querySelector('input');
        this.text = this.fileBlock.querySelector('.file-block__text');
        this.parentElement = this.fileBlock.parentNode;
        this.uploadList = this.parentElement.querySelector('.uploaded-list');


        this.init()
    }

    init() {
        this.uploadInput.addEventListener('change', (evt: Event) => {
            const target = evt.target as HTMLInputElement;

            const file = target.files
            if (!file) {
                return false
            }

            if (this.uploadList) {
                Array.from(file).forEach(el => {
                    console.log(el)
                    if (FileReader && el) {
                        const fr = new FileReader();
                        fr.onload = () => {
                            this.uploadList.insertAdjacentHTML('beforeend', this.uploadPictureTemplate(fr.result as string, el.name))
                            this.removeUploadFile()
                        }
                        fr.readAsDataURL(el);
                    }
                })
                this.uploadInput.files = target.files;
            } else {
                this.uploadInput.files = target.files;
                this.text.textContent = this.uploadInput.files[0].name;
            }
        })
    }

    uploadPictureTemplate = (src: string, name: string) => {
        return `
            <div class="uploaded-list__item" data-name="${name}">
                <picture class="uploaded-list__picture">
                    <img src="${src}" alt="">
                </picture>
                <button class="uploaded-list__remove" type="button">Удалить</button>
            </div>
        `
    }

    removeUploadFile = () => {
        // Удалять из input файл
        const uploadFiles = this.uploadList.querySelectorAll('.uploaded-list__item');
        if (!uploadFiles) return;
        uploadFiles.forEach(uploadElement => {
            const removeBtn = uploadElement.querySelector('.uploaded-list__remove');
            const uploadElementName = uploadElement.getAttribute('data-name');

            removeBtn.addEventListener('click', () => {
                uploadElement.remove()
            })
        })
    }
}

export default customFile