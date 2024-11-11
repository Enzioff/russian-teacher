import axios from "axios";

interface FileData {
    SRC: string;
    NAME: string;
    SIZE: string;
}

// Интерфейс для элемента данных
interface DataItem {
    text: string;
    datetime: string;
    file?: FileData;
}

// Интерфейс для основного массива данных
interface DataStructure {
    [key: number | string]: DataItem;
}

class Chat {
    chatBlock;
    sendAPI;
    getAPI;
    sendForm;
    sendButton;
    chatId;
    container;
    updateDelay;

    constructor(chatBlock: Element) {
        this.chatBlock = chatBlock
        this.sendAPI = '/local/ajax/send_message.php'
        this.getAPI = '/local/ajax/receive_message.php'
        this.updateDelay = 5000

        this.sendForm = this.chatBlock.querySelector('.chat-block__form')
        this.sendButton = this.sendForm.querySelector('button[type="submit"]')
        this.chatId = this.chatBlock.getAttribute('data-id')
        this.container = this.chatBlock.querySelector('.chat-block__list')

        this.init()
    }

    init() {
        this.sendForm.addEventListener('send', (evt) => evt.preventDefault())
        this.sendButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.sendMessage();
        })

        this.container.scrollTop = this.container.scrollHeight

        setInterval(() => {
            this.updateChat()
        }, this.updateDelay)
    }

    updateChat = () => {
        const data = new FormData()
        data.append('chat_id', this.chatId)

        axios.post(this.getAPI, data)
            .then(response => response.data)
            .then(data => {
                const newData = data.data;

                if (newData && newData.length > 0) {
                    newData.forEach((dataElement: DataItem) => {
                        this.render(dataElement, true)
                    })
                }

                this.container.scrollTop = this.container.scrollHeight
            })
            .catch(error => console.error(error))
    }

    render = (data: DataItem, flag: boolean) => {
        this.container.insertAdjacentHTML('beforeend', this.messageTemplate(data, flag))
    }

    messageTemplate = (data: DataItem, flag:boolean) => {
        const {text, datetime, file} = data;

        if (file) {
            const {SRC, NAME, SIZE} = file;

            return `
                <div class="message ${flag ? 'message--light' : ''}">
                    <a href="#" class="message__file">
                        <picture class="message__icon">
                            <img src="${SRC}" alt="">
                        </picture>
                        <div class="message__info">
                            <p class="message__text">${NAME}</p>
                            <p class="message__size">${SIZE}</p>
                        </div>
                    </a>
                    <time class="message__time">${datetime}</time>
                </div>
            `
        } else {
            return `
                <div class="message ${flag ? 'message--light' : ''}">
                    <div class="message__info">
                        <p class="message__comment">${text}</p>
                    </div>
                    <time class="message__time">${datetime}</time>
                </div>
            `
        }
    }

    sendMessage = () => {
        const data = new FormData();
        let file: File = null;
        let fileSrc = '';
        let text= '';

        const inputs = this.sendForm.querySelectorAll('input');

        const messageText = Array.from(inputs).filter(input => input.type === 'text');
        inputs.forEach(input => {
            const inputType = input.getAttribute('type');

            if (inputType === 'file') {
                file = input.files[0];
                console.log(input.files[0])
                data.append(input.name, input.files[0]);
            } else {
                data.append(input.name, input.value);
                text = input.value;
            }
        })

        data.append('chat_id', this.chatId)

        function formatDate(date: Date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            return `${day}.${month}.${year} | ${hours}:${minutes}`;
        }

        if (file) {
            axios.post(this.sendAPI, data)
                .then(response => response.data)
                .then(data => {
                    const innerData: DataItem = {
                        text: text,
                        datetime: formatDate(new Date()),
                        file: file && {
                            SRC: '/local/templates/russian-teacher.dnt-digital.ru/assets/images/icon-doc.svg',
                            NAME: file.name,
                            SIZE: `${(file.size / 1024).toFixed(2)} КБ`,
                        }
                    }

                    this.container.insertAdjacentHTML('beforeend', this.messageTemplate(innerData, false))

                    inputs.forEach(input => {
                        file = null;
                        input.value = '';
                    })
                })
                .catch(error => console.error(error))
        } else if (messageText[0].value.length >= 3) {
            axios.post(this.sendAPI, data)
                .then(response => response.data)
                .then(data => {
                    const innerData: DataItem = {
                        text: text,
                        datetime: formatDate(new Date()),
                        file: file && {
                            SRC: '/local/templates/russian-teacher.dnt-digital.ru/assets/images/icon-doc.svg',
                            NAME: file.name,
                            SIZE: `${(file.size / 1024).toFixed(2)} КБ`,
                        }
                    }

                    this.container.insertAdjacentHTML('beforeend', this.messageTemplate(innerData, false))

                    inputs.forEach(input => {
                        file = null;
                        input.value = '';
                    })
                })
                .catch(error => console.error(error))
        }
    }
}

export default Chat