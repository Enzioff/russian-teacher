import axios from "axios";

type inputType = HTMLInputElement | HTMLTextAreaElement

class Requests {
    forms;

    constructor() {
        this.forms = document.querySelectorAll('form');

        this.init()
    }

    init() {
        this.formRequests()
    }

    formRequests = () => {
        if (this.forms) {
            this.forms.forEach(form => {
                const url = form.getAttribute('action');
                const submitBtn = form.querySelector('button[type="submit"]');
                const parent = form.parentNode;
                const closestSubmit = parent.querySelectorAll('button[type="submit"]');
                const inputs: inputType[] = [
                    ...Array.from(form.querySelectorAll('input')),
                    ...Array.from(form.querySelectorAll('textarea'))
                ];

                console.log(closestSubmit)

                form.addEventListener('send', (evt) => {
                    evt.preventDefault();
                })

                if (inputs) {
                    inputs.forEach(input => {
                        const switcher = input.closest('.switcher');
                        if (switcher && input.type === 'checkbox') {
                            input.addEventListener('change', (evt) => {
                                evt.preventDefault()
                            })
                        }
                    })
                }

                if (closestSubmit) {
                    closestSubmit.forEach(button => {
                        button.addEventListener('click', (evt) => {
                            evt.preventDefault()

                            this.send(url, form, inputs)
                        })
                    })
                }

                // if (submitBtn) {
                //     submitBtn.addEventListener('click', () => {
                //         this.send(url, form, inputs)
                //     })
                // }
            })
        }
    }

    send = (url: string, form: HTMLElement, inputs: inputType[]) => {
        let error = false;
        inputs.forEach(el => {
            if (el.value.length <= 0) {
                error = true;
            }
        })

        if (!error) {
            axios.post(url, this.getData(form, inputs))
                .then(response => response.data)
                .then(data => console.log(data))
                .catch(error => console.error(error));
        }
    }

    checkPasswords = (form: HTMLElement) => {
        const mainPassword = form.querySelector('[data-password]')
        const secondPassword = form.querySelector('[data-password-accept]')

        if (!mainPassword || !secondPassword) return

        const mainPasswordInput = mainPassword.querySelector('input') as HTMLInputElement
        const secondPasswordInput = secondPassword.querySelector('input') as HTMLInputElement

        console.log(secondPasswordInput.value !== mainPasswordInput.value)
        if (secondPasswordInput.value !== mainPasswordInput.value) {
            secondPassword.classList.add('error')
            setTimeout(() => {
                secondPassword.classList.remove('error')
            }, 3000)
            return false;
        } else {
            return true;
        }
    }

    getData = (form: HTMLElement, inputs?: inputType[]) => {
        let error = false;
        const regexp = /^[a-zA-Z0-9а-яА-Я._%+-]+@[a-zA-Z0-9а-яА-Я.-]+\.[a-zA-Zа-яА-Я]{2,}$/;
        const data = new FormData();

        const showError = (item: Element) => {
            item.classList.add('error')

            setTimeout(() => {
                item.classList.remove('error')
            }, 3000)
        }

        inputs.forEach(item => {
            let itemParent = item.closest('.form__item');
            if (!itemParent) {
                itemParent = item.closest('.login-form__item')
            }

            if (item.inputmask) {
                if (item.value.length >= 1 && !item.inputmask.isComplete()) {
                    error = true;
                    if (itemParent) {
                        showError(itemParent)
                    }
                } else if (item.value !== "") {
                    itemParent.classList.remove('error')
                }
            }

            if (item.hasAttribute("data-email") && !regexp.test(item.value)) {
                error = true;
                if (itemParent) {
                    showError(itemParent)
                }
            } else if (item.value.length <= 1) {
                error = true;
                if (itemParent) {
                    showError(itemParent)
                }
            } else {
                data.append(item.name, item.value)
            }
        })

        if (!this.checkPasswords(form)) {
            error = true;
        }

        return !error ? data : false
    }
}

export default Requests