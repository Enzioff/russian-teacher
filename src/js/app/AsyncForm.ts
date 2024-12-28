import axios from "axios";

class AsyncForm {
    form;
    inputs;
    url;
    selects;
    
    constructor(form: Element) {
        this.form = form;
        this.inputs = [
            ...Array.from(this.form.querySelectorAll('input')),
            ...Array.from(this.form.querySelectorAll('textarea'))
        ];
        this.url = this.form.getAttribute('action');
        this.selects = this.form.querySelectorAll('.select');
        
        this.init()
    }
    
    init() {
        this.inputs.forEach(input => {
            input.addEventListener('change', () => {
                this.sendData()
            })
        })
        
        this.selects.forEach(select => {
            const header = select.querySelector('.select__header');
            
            this.observer(header, header.getAttribute('data-current-value'));
        })
    }
    
    observer = (selector: Element, data?: string) => {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes') {
                    const newValue = selector.getAttribute(mutation.attributeName);
                    
                    this.sendData(data)
                }
            }
        });
        
        const config = {attributes: true};
        
        observer.observe(selector, config);
    }
    
    getData = (data?: string) => {
        const formData = new FormData();
        
        this.inputs.forEach((input) => {
            if (input.type === 'file') {
                if ("files" in input) {
                    formData.append(input.name, input.files[0]);
                }
            } else {
                formData.append(input.name, input.value);
            }
        })
        
        if (data) {
            formData.append('status', data);
        }
        
        return formData;
    }
    
    sendData = (data?: string) => {
        axios.post(this.url, this.getData(data))
            .then(response => response.data)
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }
}

export default AsyncForm
