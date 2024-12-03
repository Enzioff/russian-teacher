class AsyncUpdate {
    select;
    header;
    container;
    elements;
    searchForm;
    filteredEls: Element[];
    searchStr: string;
    
    constructor(select: Element) {
        this.select = select;
        this.header = select.querySelector('.select__header');
        this.container = document.querySelector('[data-async]');
        if (this.container) {
            this.elements = this.container.querySelectorAll('.table__line');
        }
        
        this.searchForm = document.querySelector('.search')
        
        this.init()
    }
    
    init() {
        this.observer()
        this.search()
    }
    
    observer = () => {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes') {
                    const newValue = this.header.getAttribute(mutation.attributeName);
                    
                    this.update(newValue)
                }
            }
        });
        
        const config = {attributes: true};
        
        observer.observe(this.header, config);
    }
    
    update = (newValue: string) => {
        const selects = document.querySelectorAll('.select__header');
        if (selects && selects.length > 1) {
            if (selects[0].getAttribute('data-current-value').length > 0 && selects[1].getAttribute('data-current-value').length <= 0) {
                this.searchStr = selects[0].getAttribute('data-current-value')
            } else if (selects[0].getAttribute('data-current-value').length <= 0 && selects[1].getAttribute('data-current-value').length > 0) {
                this.searchStr = selects[1].getAttribute('data-current-value')
            } else {
                this.searchStr = `${selects[1].getAttribute('data-current-value')}.${selects[0].getAttribute('data-current-value')}`
            }
        }
        
        if (this.elements) {
            this.elements.forEach(el => {
                const elId = el.getAttribute('data-country');
                if (elId) {
                    if (elId !== newValue) {
                        el.classList.add('hidden');
                    } else if (newValue === '0') {
                        el.classList.remove('hidden');
                    } else {
                        el.classList.remove('hidden');
                    }
                }
                const items = el.querySelectorAll('.table__item');
                if (items) {
                    items.forEach(item => {
                        const itemDate = item.hasAttribute('data-date');
                        if (itemDate) {
                            if (this.searchStr) {
                                if (item.textContent.split(' ')[0].includes(this.searchStr)) {
                                    el.classList.remove('hidden');
                                } else {
                                    el.classList.add('hidden');
                                }
                            } else {
                                if (item.textContent.includes(this.header.getAttribute('data-current-value'))) {
                                    el.classList.remove('hidden');
                                } else {
                                    el.classList.add('hidden');
                                }
                            }
                        }
                    })
                }
            })
            this.filteredEls = Array.from(this.elements).filter(el => !el.classList.contains('hidden'))
        }
    }
    
    search = () => {
        if (this.searchForm) {
            const input = this.searchForm.querySelector('input');
            
            input.addEventListener('input', () => {
                const value = input.value.toLowerCase();
                if (this.elements) {
                    if (this.filteredEls && this.filteredEls.length > 0) {
                        this.filteredEls.forEach(el => {
                            const avatar = el.querySelector('.avatar');
                            const name = avatar.nextElementSibling;
                            
                            if (name.textContent.toLowerCase().includes(value.toLowerCase())) {
                                el.classList.remove('hidden');
                            } else {
                                el.classList.add('hidden');
                            }
                        })
                    } else {
                        this.elements.forEach(el => {
                            const avatar = el.querySelector('.avatar');
                            const name = avatar.nextElementSibling;
                            
                            if (name.textContent.toLowerCase().includes(value.toLowerCase())) {
                                el.classList.remove('hidden');
                            } else {
                                el.classList.add('hidden');
                            }
                        })
                    }
                }
            })
        }
    }
}

export default AsyncUpdate;
