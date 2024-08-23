import Slider from "./slider";
import {Fancybox} from "@fancyapps/ui";

class App {
    constructor() {
        this.init();
    }

    init = () => {
        this.createSlider()
    }

    createSlider = () => {
        const sliders = document.querySelectorAll('[data-slider]')
        if (!sliders) return
        sliders.forEach(slider => {
            new Slider(slider)
        })
    }
}

export {App};

