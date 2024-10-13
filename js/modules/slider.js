function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide), //все слайды на стр
    slider = document.querySelector(container), //общий wrapper
    prev = document.querySelector(prevArrow), // предыдущая кнопка
    next = document.querySelector(nextArrow), // следующая кнопка
    total = document.querySelector(totalCounter), // всего число слайдов
    current = document.querySelector(currentCounter), // какой сейчас слайд
    slidesWrapper = document.querySelector(wrapper), //общая обертка
    slidesField = document.querySelector(field), //поле с нашими слайдами
    width = window.getComputedStyle(slidesWrapper).width; //ширина которая приминилась css

    let slideIndex = 1; //изначальный индекс
    let offset = 0; //отступ

    if (slides.length < 10) { // условие на общее количество слайдов чтобы прописать в начале
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + "%"; //задаем ширину четырех слайдов
    slidesField.style.display = "flex"; //ставим дисплей флекс, чтобы было всё в полоску
    slidesField.style.transition = "0.9s all"; //ставим плавность перемещения слайдов

    slidesWrapper.style.overflow = "hidden"; //скрываем все элементы которые не попадают в область видимости

    slides.forEach(slide => {
        slide.style.width = width; //устанавливаем каждому слайду одинаковую ширину width
    });

     // точки навигации для слайдов

     slider.style.position = "relative";

     const indicators = document.createElement("ol"), //создаем список
           dots = [];
 
     indicators.classList.add("carousel-indicators"); //добавляем класс и стили к нему
     indicators.style.cssText = `
         position: absolute;
         right: 0;
         bottom: 0;
         left: 0;
         z-index: 15;
         display: flex;
         justify-content: center;
         margin-right: 15%;
         margin-left: 15%;
         list-style: none;
     `;
     slider.append(indicators); //добавляем в слайдер новый список
 
     for (let i = 0; i < slides.length; i++) { 
         const dot = document.createElement('li'); //создаем элемент списка
         dot.setAttribute("data-slide-to", i + 1); // создаем уникальный атрибут
         dot.style.cssText = `
             box-sizing: content-box;
             flex: 0 1 auto;
             width: 30px;
             height: 6px;
             margin-right: 3px;
             margin-left: 3px;
             cursor: pointer;
             background-color: #fff;
             background-clip: padding-box;
             border-top: 10px solid transparent;
             border-bottom: 10px solid transparent;
             opacity: .5;
             transition: opacity .6s ease;
         `;
 
         if (i == 0) {
             dot.style.opacity = 1;
         }
 
         indicators.append(dot); //аппендим в индикатор dot
         dots.push(dot); //пушим дот в массив
     }
 
     // конец точек навигации
 
     function deleteNotDigits(str) {
         return +str.replace(/\D/g, "");
     }
 
 
     next.addEventListener("click", () => {
         if (offset == deleteNotDigits(width) * (slides.length - 1)) { //убираем все буквы из width
                                                                                  // Если offset равняется ширине 4ого слайда, то на первый
             offset = 0;
         } else {
             offset += deleteNotDigits(width);
         }
 
         slidesField.style.transform = `translateX(-${offset}px)`; //смещаем на один слайд вперед
 
         if (slideIndex == slides.length) { //если слайд = макс числу слайдов, то возвращаем на 1 слайд
             slideIndex = 1;
         } else {
             slideIndex ++; //иначе добавляем 1
         }
 
         if (slides.length < 10) { //проверка на приписку нуля
             current.textContent = `0${slideIndex}`;
         } else {
             current.textContent = slideIndex;
         }
 
         //точки навигации
 
         dots.forEach(dot => {
             dot.style.opacity = ".5"; //всем ставим 0.5 опасити
         });
         dots[slideIndex - 1].style.opacity = 1; //кроме текущего, ему ставим 1
 
 
     });
 
     prev.addEventListener("click", () => {
         if (offset == 0) { //убираем из width PX и если offset на первом слайде => переходим на 4
             offset = deleteNotDigits(width) * (slides.length - 1);
         } else {
             offset -= deleteNotDigits(width);
         }
 
         slidesField.style.transform = `translateX(-${offset}px)`; //смещаем на один слайд вперед
 
         if (slideIndex == 1) { //если слайд 1, перемещаемся на 4
             slideIndex = slides.length; //смещаемся в конец
         } else {
             slideIndex --; //иначе добавляем 1
         }
 
         if (slides.length < 10) { //проверка на приписку нуля
             current.textContent = `0${slideIndex}`;
         } else {
             current.textContent = slideIndex;
         }
 
          //точки навигации
 
         dots.forEach(dot => {
             dot.style.opacity = ".5"; //всем ставим 0.5 опасити
         });
         dots[slideIndex - 1].style.opacity = 1; //кроме текущего, ему ставим 1
     });
 
     //кликабельность точек навигации слайдера
 
     dots.forEach(dot => {
         dot.addEventListener("click", (e) => {
             const slideTo = e.target.getAttribute("data-slide-to"); //ищем атрибут data-slide-to
 
             slideIndex = slideTo; //slideTo - атрибут data-slide-to
             offset = deleteNotDigits(width) * (slideTo - 1); //устанавливаем offset на slideTo - 1
 
             slidesField.style.transform = `translateX(-${offset}px)`; //смещаем на один слайд вперед
 
             if (slides.length < 10) { //проверка на приписку нуля
                 current.textContent = `0${slideIndex}`;
             } else {
                 current.textContent = slideIndex;
             }
 
             dots.forEach(dot => {
                 dot.style.opacity = ".5"; //всем ставим 0.5 опасити
             });
             dots[slideIndex - 1].style.opacity = 1; //кроме текущего, ему ставим 1
 
         });
     }); 

    // SLIDER EASY

    // let slideIndex = 1; //изначальный индекс

    // showSlides(slideIndex); //функция чтобы показать изначально первый слайд

    // if (slides.length < 10) { // условие на общее количество слайдов чтобы прописать в начале
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) { //функция показа слайдов. Перебирает все слайды и прибавляет или отнимает индекс
    //     if (n > slides.length) { // если номер становится больше максимального, то перескакивает на первый индекс
    //         slideIndex = 1;
    //     }

    //     if (n < 1) { // аналогично верхнему
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = "none"); // перебирает все слайды и ставит им дисплей нан

    //     slides[slideIndex - 1].style.display = "block"; // ставит первый слайд на показ следующий или предыдущий

    //     if (slides.length < 10) { // если число меньше 10, то приписывает 0
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // function plusSlides(n) { //вызов дополнительной функции чтобы передавать индекс + или -
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener("click", () => { //навешиваем обработчик события на клик, чтобы возвращался назад
    //     plusSlides(-1);
    // });

    // next.addEventListener("click", () => { //навешиваем обработчик события на клик, чтобы возвращался вперед
    //     plusSlides(1);
    // });
}

export default slider;