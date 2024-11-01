import inputmask from "inputmask";

class Mask {
    inputs;
    areas;

    constructor() {
        this.inputs = document.querySelectorAll('input')
        this.areas = document.querySelectorAll('textarea')
        this.init()
    }

    init() {
        this.inputs.forEach(el => {
            if (el.type === 'tel') {
                inputmask({"mask": "+7 (999) 999-99-99"}).mask(el);
            } else if (el.hasAttribute('data-date')) {
                inputmask({ regex: "^(0[1-9]|[12][0-9]|3[01])\\.(0[1-9]|1[0-2])\\.(19\\d{2}|20\\d{2})$" }).mask(el);
            } else if (el.hasAttribute('data-email')) {
                inputmask({
                    mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
                    definitions: {
                        '*': {
                            validator: "[A-Za-z0-9_!#$%&'*+/=?^_`{|}~\\-]",
                            cardinality: 1,
                        },
                    },
                    greedy: false,
                    onBeforePaste: function (pastedValue, opts) {
                        pastedValue = pastedValue.toLowerCase();
                        return pastedValue.replace("mailto:", "");
                    },
                }).mask(el);
            }
        })
    }
}

export default Mask