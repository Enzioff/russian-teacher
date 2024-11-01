import {Fancybox} from "@fancyapps/ui";
import axios from "axios";

interface peopleData {
    id: number,
    name: string,
    src: string
}

class CustomFancybox {
    getPeopleListUrl;
    sendPeopleListUrl;
    constructor() {
        this.sendPeopleListUrl = '/local/ajax/add_teacher_to_me.php'
        this.getPeopleListUrl = '/local/ajax/get_free_teachers_test.php/'

        this.init()
    }


    init() {
        Fancybox.bind('[data-fancybox]', {
            on: {
                init: () => {
                    const peopleList = document.querySelector('.select-account--list')
                    if (!peopleList) return
                    const container = peopleList.querySelector('.select-account__list')

                    this.getPeopleList(container)
                }
            }
        })
    }

    getPeopleList = (container: Element) => {
        axios.get('')
            .then(response => response.data)
            .then(data => {
                console.log(data)
            })
            .catch(error => console.error(error))

        const tempData: peopleData[]  = []
        tempData.forEach(data => {
            if (data) {
                container.insertAdjacentHTML('beforeend', this.peopleTemplate(data))
            }
        })
    }

    peopleTemplate = (data: peopleData) => {
        const {
            src,
            name,
            id,
        } = data;

        return `
            <label class="select-account__item">
                <input type="checkbox" hidden="" name="ID" value="${id}" tabindex="-1">
                <span class="select-account__info">
                    <picture class="select-account__picture">
                        <img src="${src}" alt="">
                    </picture>
                    <span>${name}</span>
                    <svg class="select-account__icon">
                        <use xlink:href="./assets/sprite.svg#icon-accept"></use>
                    </svg>
                </span>
            </label>
        `
    }
}

export default CustomFancybox