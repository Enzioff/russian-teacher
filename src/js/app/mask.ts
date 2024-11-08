import inputmask from "inputmask";

class Mask {
    inputs;

    constructor() {
        this.inputs = document.querySelectorAll('input')

        if (!this.inputs) return;

        this.init()
    }

    init() {
        // this.inputs.forEach((el: HTMLInputElement) => {
        //     if (el) {
        //         if (el.type === 'tel') {
        //             inputmask({"mask": "+7 (999) 999-99-99"}).mask(el);
        //         } else if (el.hasAttribute('data-email')) {
        //             inputmask({
        //                 mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
        //                 definitions: {
        //                     '*': {
        //                         validator: "[A-Za-z0-9_!#$%&'*+/=?^_`{|}~\\-]",
        //                         cardinality: 1,
        //                     },
        //                 },
        //                 greedy: false
        //             }).mask(el);
        //         }
        //     }
        // })
    }
}

export default Mask