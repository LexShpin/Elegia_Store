
let video = document.querySelector('.slider__video'); // Достаем видео
video.play();

$(document).ready(function() {
    
    // Slider
    $('.slider__inner').slick({        
        dots: true,
        infinite: true,
        arrows: false,
        autoplay: false,
        autoplaySpeed: 5000,
        cssEase: 'linear',
        fade: true,
        draggable: true
    });

    // slides 
    $('.slider__inner').on('afterChange', function(event, slick, currentSlide){
        if (currentSlide == 0) {
            $(".slider__text_0").attr('class', 'slider__text slider__text_0 slider__text_active animated fadeInUp');
            $(".slider__text_1").attr('class', 'slider__text slider__text_1');
            $(".slider__text_2").attr('class', 'slider__text slider__text_2');
        } else if (currentSlide == 1) {
            $(".slider__text_0").attr('class', 'slider__text slider__text_0');
            $(".slider__text_1").attr('class', 'slider__text slider__text_1 slider__text_active animated fadeInUp');
            $(".slider__text_2").attr('class', 'slider__text slider__text_2');
        } else if (currentSlide == 2) {
            $(".slider__text_0").attr('class', 'slider__text slider__text_0');
            $(".slider__text_1").attr('class', 'slider__text slider__text_1');
            $(".slider__text_2").attr('class', 'slider__text slider__text_2 slider__text_active animated fadeInUp');
        } 
    });

    $('.slider__inner').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        // Text animation in slider
        if (currentSlide == 0 && nextSlide == 1 || currentSlide == 0 && nextSlide == 2) {
            $('.slider__text_0').attr('class', 'slider__text slider__text_0 slider__text_active animated fadeOutDown');
        } else if (currentSlide == 1 && nextSlide == 0 || currentSlide == 1 && nextSlide == 2) {
            $('.slider__text_1').attr('class', 'slider__text slider__text_1 slider__text_active animated fadeOutDown');
        } else if (currentSlide == 2 && nextSlide == 0 || currentSlide == 2 && nextSlide == 1) {
            $('.slider__text_2').attr('class', 'slider__text slider__text_2 slider__text_active animated fadeOutDown');
        }

        // Кнопка play / pause только для видео
        
        if (currentSlide == 0 && nextSlide == 1 || currentSlide == 1 && nextSlide == 0 || currentSlide == 2 && nextSlide == 0 || currentSlide == 2 && nextSlide == 1) {
            $('.slider__video__btn__play').attr('class', 'slider__video__btn__play hidden');
            $('.slider__video__btn__pause').attr('class', 'slider__video__btn__pause hidden');
        } else {
            $('.slider__video__btn__play').attr('class', 'slider__video__btn__play hidden');
            $('.slider__video__btn__pause').attr('class', 'slider__video__btn__pause');
        }
    });

   
    
    // Поставить на паузу и переключить кнопку
    

    $('.slider__video__btn__pause').on('click', function() {

        video.pause();
        $('.slider__video__btn__play').attr('class', 'slider__video__btn__play');
        $('.slider__video__btn__pause').attr('class', 'slider__video__btn__pause hidden');
    });

    $('.slider__video__btn__play').on('click', function() {
        video.play();
        $('.slider__video__btn__play').attr('class', 'slider__video__btn__play hidden');
        $('.slider__video__btn__pause').attr('class', 'slider__video__btn__pause');
    });

    // Changing images of products

    function btn(i) {
        let button = $(`.bestseller__item__options__list_${i}>li>a`);
        return button; 
    }

    function size(i) {
        let sizes = $(`.bestseller__item__sizes__list_${i}>li`);
        return sizes;
    }

    function cloth() {
        let clothes = $('.bestseller__item__cloth__list>li>a');
        return clothes;
    }
    
    function material() {
        let materials = $('.bestseller__item__material__list>li');
        return materials;
    }

    function colorChange(i) {
        btn(i).click(function(e) {
            e.preventDefault();
            if($(this).hasClass('bestseller__item__options__opt_active')) return false;
            
            btn(i).removeClass('bestseller__item__options__opt_active');
            $(this).addClass('bestseller__item__options__opt_active');

            // Changing backgrounds of images

            if ($(this).hasClass('bestseller__item__options__opt_active')) {
                let picBg = $(`.bestseller__item__pic_${i}`);
                let optionBg = $(this).css('background-image');

                console.log(optionBg);
                
                picBg = $(picBg).attr('src', optionBg);
            }
          });
    }

    function sizesChange(i) {
        size(i).click(function(e) {
            e.preventDefault();
            if($(this).hasClass('active')) return false;

            size(i).removeClass('active');
            $(this).addClass('active');
        });
    }

    function clothChange(i) {
        cloth(i).click(function(e) {
            e.preventDefault();
            if($(this).hasClass('bestseller__item__cloth__element_active')) return false;

            cloth(i).removeClass('bestseller__item__cloth__element_active');
            $(this).addClass('bestseller__item__cloth__element_active');
        })
    }

    function materialChange(i) {
        material(i).click(function(e) {
            e.preventDefault();
            if($(this).hasClass('active')) return false;

            material(i).removeClass('active');
            $(this).addClass('active');
        })
    }

    for (let i = 0; i < 4; i++) {
        sizesChange(i);
    }

    for (let i = 0; i <= 8; i++) {
        colorChange(i);
    }

    for (let i = 0; i <= 3; i++) {
        clothChange(i);
    }

    for (let i = 0; i <= 3; i++) {
        materialChange(i);
    } 

    // // Timer

    let deadline = '2020-04-21';

    function getRemainingTime(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()),
        seconds = Math.floor((t / 1000) % 60),
        minutes = Math.floor((t / 1000 / 60) % 60),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        days = Math.floor((t / (1000 * 60 * 60 * 24)));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            days= timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds');
        let timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getRemainingTime(endTime);
            days.textContent = t.days;
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;
    
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        } 
    };

    setClock('timer', deadline);

    // Burger-menu for 1024 & less
    $('.burger__link').on('click', function() {
        // open the menu
        $('.mobile-menu').css('left', '0');
        $('.overlay').css('display', 'block');
        $('body').css('overflow', 'hidden');
        
        // close the menu
        $('.mobile-menu__close').on('click', function() {
            $('.mobile-menu').css('left', '-500%');
            $('.overlay').css('display', 'none');
            $('body').css('overflow', 'visible');
        });
    });
});
