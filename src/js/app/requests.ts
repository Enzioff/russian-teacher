import axios from "axios";
import inputmask from "inputmask";
import {Fancybox} from "@fancyapps/ui";

type inputType = HTMLInputElement | HTMLTextAreaElement

class Requests {
    form;
    api;
    inputs;
    buttons;
    selects;
    formAgreeCheckboxes;
    submitButton;
    switcher;
    closestSubmit;

    constructor(form: HTMLFormElement) {
        this.form = form;
        this.api = 'https://russian-teacher-dev3.dnt-digital.ru/local/ajax/actions_core.php';
        this.inputs = this.getTotalInputs();
        this.buttons = this.form.querySelectorAll('button');
        this.selects = this.form.querySelectorAll('[data-select]');
        this.formAgreeCheckboxes = this.form.querySelectorAll('[data-agree]');
        this.switcher = this.form.querySelector('.switcher');
        this.closestSubmit = this.form.parentElement.querySelector('button[type="submit"]')

        this.submitButton = this.form.querySelector('button[type="submit"]')

        this.init()
    }

    init() {
        this.checkAgreeButtons();

        if (this.submitButton) {
            this.submitButton.addEventListener('click', (evt) => {
                evt.preventDefault()
                if (this.validateForm()) return
                this.sendData()
            })
        } else if (this.closestSubmit) {
            this.closestSubmit.addEventListener('click', (evt) => {
                evt.preventDefault()
                const isLoginBtn = this.closestSubmit.hasAttribute('data-login-btn');
                if (isLoginBtn) {
                    if (this.closestSubmit.hasAttribute('data-login-btn-in')) {
                        if (this.validateForm()) return
                        this.sendData()
                    }
                } else {
                    if (this.validateForm()) return
                    this.sendData()
                }
            })
        }

        if (this.switcher) {
            this.switcher.addEventListener('change', (evt) => {
                evt.preventDefault()
                if (this.inputs.length <= 1) {
                    if (this.validateForm()) return
                    this.sendData()
                }
            })
        }

        if (this.selects) {
            this.selects.forEach(select => {
                const countrySelect = select.querySelector('[data-title="country_id_hide"]')

                if (countrySelect) {
                    const parentEl = countrySelect.closest('.form__item');
                    parentEl.classList.add('hidden')

                    if (countrySelect.hasAttribute('data-current-value')) {
                        parentEl.classList.remove('hidden')
                    }
                }
            })
        }

        // this.buttons.forEach(button => {
        //     button.addEventListener('click', (evt) => evt.preventDefault())
        // });

        this.form.addEventListener('send', (evt) => {
            evt.preventDefault()
        })
    }

    checkAgreeButtons = () => {
        const changeButtonStatus = (flag: boolean) => {
            if (this.submitButton) {
                if (!flag) {
                    this.submitButton.setAttribute('disabled', '')
                } else {
                    this.submitButton.removeAttribute('disabled');
                }
            }
        }

        if (this.formAgreeCheckboxes) {
            this.formAgreeCheckboxes.forEach((checkbox: HTMLInputElement) => {
                changeButtonStatus(checkbox.checked)

                checkbox.addEventListener('change', () => {
                    const allChecked = Array.from(this.formAgreeCheckboxes).every(
                        (checkbox: HTMLInputElement) => checkbox.checked
                    );
                    changeButtonStatus(allChecked)
                })
            })
        }
    }

    sendData = () => {
        console.log(Fancybox.getInstance())
        axios.post(this.form.hasAttribute('data-form-default') ? this.form.getAttribute('action') : this.api, this.getData())
            .then(response => response.data)
            .then(data => {
                if (data?.success) {
                    if (data?.data) {
                        window.location.replace(`https://${data.data}`);
                    } else if (data?.links) {
                        const links = data.links;
                        const downloadFile = (url: string): void => {
                            console.log(url)
                            const a = document.createElement('a');
                            a.setAttribute('href', url);
                            a.setAttribute('download', '');
                            document.body.appendChild(a);
                            a.click();
                            console.log(a)
                            document.body.removeChild(a);
                        }
                        
                        links.forEach((link: string) => {
                            downloadFile(window.location.origin + link);
                        })
                    } else {
                        window.location.reload()
                    }
                } else {
                    alert(data.message)
                }
                console.log(data)
            })
            .catch(error => console.error(error))
    }

    getTotalInputs = () => {
        const inputs: inputType[] = [
            ...Array.from(this.form.querySelectorAll('input')),
            ...Array.from(this.form.querySelectorAll('textarea')),
        ]

        return inputs
    }

    validateForm = () => {
        let error = false;
        const errorTrace: string[] = [];

        const showError = (parentElement: HTMLElement) => {
            let timeout: ReturnType<typeof setTimeout> | null = null;
            if (parentElement) {
                parentElement.classList.add('error')
            }

            clearTimeout(timeout)

            timeout = setTimeout(() => {
                if (parentElement) {
                    parentElement.classList.remove('error')
                }
            }, 2000)
        }

        this.inputs.forEach(input => {
            const parentNode: HTMLElement = input.closest('.form__item') ? input.closest('.form__item') : input.closest('.login-form__item') ? input.closest('.login-form__item') : input.closest('label');
            const customTags = input.parentElement.classList.contains('custom-tags') ? input.parentElement : null;

            if (customTags && input.value.length >= 0) {
                const tagsList = customTags.querySelectorAll('.tags');
                if (tagsList.length <= 0) {
                    error = true;
                    errorTrace.push('Нет тегов')
                }
            } else if (input.hasAttribute('required')) {
                if (input.value.length < 1) {
                    error = true;
                    errorTrace.push(input.name)
                    if (parentNode) showError(parentNode)
                }
            }
            // else if (input instanceof HTMLInputElement && input.inputmask) {
            //     if (input.value.length > 1 && !input.inputmask.isComplete()) {
            //         error = true;
            //         errorTrace.push(input.value)
            //         if (parentNode) showError(parentNode)
            //     }
            // }
        })

        this.selects.forEach(select => {
            const parentNode = select.closest('.form__item') as HTMLElement;
            const selectHeader = select.querySelector('.select__header');
            const countrySelect = select.querySelector('[data-title="country_id_hide"]')

            const currentSelect = selectHeader.getAttribute('data-current-value');

            if (!currentSelect && !countrySelect) {
                error = true;
                showError(parentNode)
            }
        })

        if (this.formAgreeCheckboxes) {
            let allChecked = Array.from(this.formAgreeCheckboxes).every(
                (checkbox: HTMLInputElement) => checkbox.checked
            );

            this.formAgreeCheckboxes.forEach((checkbox: HTMLInputElement) => {
                checkbox.addEventListener('change', () => {
                    allChecked = Array.from(this.formAgreeCheckboxes).every(
                        (checkbox: HTMLInputElement) => checkbox.checked
                    );

                    if (!allChecked) {
                        error = true;
                    }
                })
            })

            if (!allChecked) {
                error = true;
            }
        }

        if (this.checkPasswords() !== 'not-found') {
            if (!this.checkPasswords()) {
                error = true
            }
        }

        if (error) console.log(`Ошибка: ${errorTrace.join(', ')}`);

        return error;
    }

    getData = () => {
        const data = new FormData();

        this.inputs.forEach(input => {
            const inputType = input.getAttribute('type');
            const customTags = input.parentElement.classList.contains('custom-tags') && input.parentElement;

            switch (inputType) {
                case 'type':
                    data.append(input.name, input.value)
                    break;
                case 'file':
                    input = input as HTMLInputElement;
                    console.log(input.files)
                    if (input.files.length > 1) {
                        // @ts-ignore
                        data.append(input.name, [...input.files]);
                    } else {
                        data.append(input.name, input.files[0]);
                    }
                    break;
                case 'checkbox':
                    const parent = input.closest('.switcher');
                    if (parent) {
                        const currentInput = parent.querySelector('input')
                        data.append(input.name, currentInput.checked ? 'Y' : 'N');
                    } else {
                        input = input as HTMLInputElement
                        if (input.checked) {
                            data.append(input.name, input.value);
                        }
                    }
                    break;
                case 'search':
                    data.append(input.name, input.value);
                    break;
                case 'hidden':
                    if (input.name === 'user_ids') {
                        data.append(input.name, JSON.stringify([input.value]))
                    } else {
                        data.append(input.name, input.value)
                    }
                    break;
                default:
                    if (customTags) {
                        const tagsList = customTags.querySelector('.tags');
                        if (!tagsList) return
                        const tags = tagsList.querySelectorAll('.tags__item')
                        const tagsArray: string[] = Array.from(tags).map(el => el.textContent.trim())

                        data.append(input.name, tagsArray.join(', '))
                    }
                    data.append(input.name, input.value);
                    break;
            }
        })

        this.selects.forEach(select => {
            const selectHeader = select.querySelector('.select__header');
            const currentSelect = selectHeader.getAttribute('data-current-value');
            const currentSelectName = selectHeader.getAttribute('data-title');

            if (currentSelect) {
                if (currentSelect.length > 0) {
                    data.append(currentSelectName, currentSelect)
                }
            }
        })

        data.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        return data;
    }

    checkPasswords = () => {
        const mainPassword = this.form.querySelector('[data-password]')
        const secondPassword = this.form.querySelector('[data-password-accept]')

        if (!mainPassword || !secondPassword) return 'not-found';

        const mainPasswordInput = mainPassword.querySelector('input') as HTMLInputElement
        const secondPasswordInput = secondPassword.querySelector('input') as HTMLInputElement

        if (mainPasswordInput.value.length > 0) {
            if (secondPasswordInput.value !== mainPasswordInput.value) {
                secondPassword.classList.add('error')
                setTimeout(() => {
                    secondPassword.classList.remove('error')
                }, 2000)
                return false;
            } else {
                return true;
            }
        }
    }
}

export default Requests
