import slider from './modules/slider';

window.addEventListener("DOMContentLoaded", () => {
    
    slider({
        container: ".offer__slider", // общая обертка, куда обернуто всё
        wrapper: ".offer__slider-wrapper", //обертка, чтобы подключить слайдеру overflow
        field: ".offer__slider-inner", //обертка, уже для самих слайдов + чтобы растянуть слайды по горизонту 
        slide: '.offer__slide', // каждый слайд который имеется
        nextArrow: ".offer__slider-next", // кнопка следующего файла
        prevArrow: ".offer__slider-prev", // кнопка предыдущего файла
        totalCounter: "#total", // общее число слайдов
        currentCounter: "#current" // какой по счету открыт слайд прямо сейчас
    });
});