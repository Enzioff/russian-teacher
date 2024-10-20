class UpdateUserPhoto {
    el;
    input;
    photo;

    constructor(el: Element) {
        this.el = el;
        this.photo = this.el.querySelector('img')
        this.input = this.el.querySelector('input')

        this.init()
    }

    init() {
        this.input.addEventListener('change', (evt: Event) => {
            const target = evt.target as HTMLInputElement;
            const files = target.files;
            if (FileReader && files && files.length) {
                const fr = new FileReader();
                fr.onload = () => {
                    this.photo.setAttribute('src', fr.result as string)
                }
                fr.readAsDataURL(files[0]);
            }
        })
    }
}

export default UpdateUserPhoto