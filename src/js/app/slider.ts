import Swiper from "swiper";
import {Navigation, Pagination, Thumbs} from "swiper/modules";

class Slider {
    el;
    sliderType;
    buttonPrev;
    buttonNext;
    slidesCount;
    pagination;
    desktopOnly;
    mobileOnly;
    media;

    constructor(el: Element) {
        this.el = el;
        this.sliderType = this.el.getAttribute('data-slider');
        this.slidesCount = this.el.getAttribute('data-slides')

        this.buttonPrev = this.el.querySelector('.slider__btn--prev');
        this.buttonNext = this.el.querySelector('.slider__btn--next');
        this.pagination = this.el.querySelector('.swiper-pagination');

        this.media = matchMedia('(max-width: 1199px)');
        this.desktopOnly = this.el.hasAttribute('data-desktop-only');
        this.mobileOnly = this.el.hasAttribute('data-mobile-only');

        this.init()
    }

    init() {
        switch (this.sliderType) {
            case 'default':
                this.initDefaultSlider();
                break;
            case 'thumbs':
                this.initThumbsSlider();
                break;
        }
    }

    initDefaultSlider() {
        const slider = this.el.querySelector('.swiper');
        const swiperOptions = {
            modules: [Navigation],
            slidesPerView: 'auto',
            spaceBetween: 10,
            navigation: {
                prevEl: this.buttonPrev,
                nextEl: this.buttonNext,
                disabledClass: 'slider__btn--disabled'
            },
            breakpoints: {
                1199: {
                    slidesPerView: this.slidesCount ? this.slidesCount : 1,
                    spaceBetween: 30,
                }
            }
        }

        let swiperSlider = this.mobileOnly ? this.media.matches ? new Swiper(slider, swiperOptions) : null : new Swiper(slider, swiperOptions);
        if (this.mobileOnly && !this.media.matches) {
            this.el.classList.add('slider--grid')
        } else {
            this.el.classList.remove('slider--grid')
        }

        this.media.addEventListener('change', (event) => {
            const {matches} = event;

            if (matches && this.desktopOnly) {
                swiperSlider.destroy(true, true)
            } else {
                swiperSlider = new Swiper(slider, swiperOptions)
            }
        })
    }

    initThumbsSlider() {
        const slider = this.el.querySelector('.swiper');
        const thumb = document.querySelector('[data-slider="thumb"]');
        const thumbSwiper = thumb.querySelector('.swiper');

        const thumbSlider = new Swiper(thumbSwiper, {
            slidesPerView: 'auto',
            spaceBetween: 10,
            breakpoints: {
                1199: {
                    spaceBetween: 30,
                }
            }
        })

        new Swiper(slider, {
            modules: [Navigation, Pagination, Thumbs],
            slidesPerView: this.slidesCount ? this.slidesCount : 1,
            spaceBetween: 10,
            navigation: {
                prevEl: this.buttonPrev,
                nextEl: this.buttonNext,
            },
            pagination: {
                el: this.pagination,
                clickable: true,
            },
            thumbs: {
                swiper: thumbSlider,
            },
        })
    }
}

export default Slider