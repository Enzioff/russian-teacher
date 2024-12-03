import {Fancybox} from "@fancyapps/ui";
import axios from "axios";

interface peopleData {
    PERSONAL_PHOTO: string,
    NAME: string,
    LAST_NAME: string,
    ID: string,
}

class CustomFancybox {
    getPeopleListUrl;
    sendPeopleListUrl;

    constructor() {
        this.sendPeopleListUrl = '/local/ajax/actions_core.php'
        this.getPeopleListUrl = '/local/ajax/get_free_teachers.php/'

        this.init()
    }

    init() {
        Fancybox.bind('[data-fancybox]', {
            on: {
                init: () => {
                    const peopleList = document.querySelector('.select-account--list')
                    if (!peopleList) return
                    const form = peopleList.querySelector('form')
                    const submitForm = form.querySelector('button[type="submit"]')
                    const container = peopleList.querySelector('.select-account__list')

                    this.getPeopleList(container)

                    submitForm.addEventListener('click', (evt) => {
                        evt.preventDefault()
                        evt.stopPropagation()

                        this.sendData(form)
                    })
                },
            }
        })
    }

    getPeopleList = (container: Element) => {
        axios.get(`${this.sendPeopleListUrl}?action=get_free_teachers`)
            .then(response => response.data)
            .then(data => {
                const successData = data.data;
                if (!successData) return
                container.innerHTML = '';
                successData.forEach((element: peopleData) => {
                    console.log(element)
                    if (element) {
                        container.insertAdjacentHTML('beforeend', this.peopleTemplate(element))
                    }
                })
            })
            .catch(error => console.error(error))
    }

    peopleTemplate = (data: peopleData) => {
        const {
            PERSONAL_PHOTO,
            NAME,
            LAST_NAME,
            ID,
        } = data;

        return `
            <label class="select-account__item">
                <input type="checkbox" hidden="" name="ID" value="${ID}" tabindex="-1">
                <span class="select-account__info">
                    <picture class="select-account__picture">
                        <img src="${PERSONAL_PHOTO}" alt="">
                    </picture>
                    <span>${NAME} ${LAST_NAME}</span>
                    <svg class="select-account__icon">
                        <use xlink:href="/local/templates/russian-teacher.dnt-digital.ru/assets/sprite.svg#icon-accept"></use>
                    </svg>
                </span>
            </label>
        `
    }

    sendData = (form: HTMLElement) => {
        const data = new FormData();
        const inputs = form.querySelectorAll('input')
        const url = form.getAttribute('action')
        const idsArray: string[] = [];

        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                if (input.checked) {
                    idsArray.push(input.value)
                }
            }
        })

        if (idsArray && idsArray.length >= 1) {
            data.append('user_ids', JSON.stringify(idsArray))
            data.append('action', 'add_teachers_to_me')
            axios.post(url, data)
                .then(response => response.data)
                .then(data => {
                    console.log(data)
                    if (data.success) {
                        window.location.reload();
                    }
                })
                .catch(error => console.error(error))
        }
    }
}

export default CustomFancybox
