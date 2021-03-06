// Select all slides
const slides = document.querySelectorAll(".slide");
const slide_about = document.querySelector(".slide-about");
// maximum number of slides
const maxSlide = slides.length - 1;
// Select all images
const zoomable_images = document.querySelectorAll('img.zoomable')
// reverse the list
// also note slidesposition, it looks like: -200, -100, 0
const slidesreversed = [];
let i = maxSlide;
let slidesposition = [];
let slide_about_position = 100;
let showed_about = false;
slide_about.style.transform = `translateX(${slide_about_position}%)`;
while(i >= 0) {
    slidesreversed.push(slides[i])
    slidesposition.push(-100 * (i))
    i--
}
// loop through slides and set each slides translateX property to index * -100% 
slidesreversed.forEach((slide, indx) => {
    slide.style.transform = `translateX(${indx * -100}%)`;
});
// 0, -100, -200, etc.
// so the slides list looks like: -200, -100, 0
// select next slide button
const nextSlide = $("div.slider-next");
const nextSlidesvg = $("svg.slider-next");
// select prev slide button
const prevSlide = $("div.slider-prev");
const prevSlidesvg = $("svg.slider-prev");

// how much smaller the buttons become when you click on em
const svgTransform = 0.6

// current slide counter
let curSlide = slides.length * 2 - 1; // starting at the pre-last slide

function goToNSlide(n) {
    while(curSlide < n) {
        goToNextSlide()
    }
    while(curSlide > n) {
        goToPrevSlide()
    }
}

function goToNextSlide() {
    // remember this also includes slide_single
    if (curSlide === slides.length * 2 + 1) {
        return;
    } else {
        curSlide++;
    }
    if(curSlide === slides.length * 2 + 1) {
        nextSlidesvg.removeClass('active');
        if(!showed_about) {
            showed_about = true;
            const loadingtext = document.getElementById('about-text');
            const loadingtextflow = new TextFlow(loadingtext);
            let text_flow = "Hi! My name is Rina.< I'm a professional retoucher and post production artist specializing in fashion, beauty, commerce, people and product retouch.<< My clients are photographers and brands from all over the world. Including SKIMS, ASICS, Est??e Lauder and more.  I am constantly learning and practicing my craft to offer you a better services. Feel free to contact me for any details.< I'm looking forward to working with you!"
            loadingtextflow.setText(text_flow, 14)
        }
    }
    prevSlidesvg.addClass('active');
	nextSlidesvg.css('transform', `scale(${-svgTransform}, ${svgTransform})`)
	setTimeout(() =>  {
		nextSlidesvg.css('transform', 'scale(-1, 1)')
	}, 200);
    //   move slide by 50%
    //-50% <= 50 * -1 <= indx 0 - (curSlide 3 - 2 = 1)= -1
    //50% <= 50 * 1 <= indx 1 - (curSlide 3 - 2 = 1) = 2
    slides.forEach((slide, indx) => {
        slidesposition[indx] = slidesposition[indx] - 50
        slide.style.transform = `translateX(${slidesposition[indx]}%)`;
    });
    slide_about_position -= 50;
    slide_about.style.transform = `translateX(${slide_about_position}%)`;
}

function goToPrevSlide() {
    if (curSlide === 1) {
        return;
    } else {
        curSlide--;
    }
    if(curSlide === 1) prevSlidesvg.removeClass('active');
    nextSlidesvg.addClass('active');
	prevSlidesvg.css('transform', `scale(${svgTransform})`)
	setTimeout(() =>  {
		prevSlidesvg.css('transform', 'scale(1)')
	}, 200);
    //   move every slide by -100%
    slides.forEach((slide, indx) => {
        slidesposition[indx] = slidesposition[indx] + 50
        slide.style.transform = `translateX(${slidesposition[indx]}%)`;
    });
    slide_about_position += 50;
    slide_about.style.transform = `translateX(${slide_about_position}%)`;
}
// add event listener and navigation functionality
nextSlide.on("click", function () {
    if($("div.image-zoomed").css('display') === 'flex') {
        for (let index in zoomable_images) {
            if($('img.image-zoomed').attr('src').replace('-3x2', '') === zoomable_images[index].src && Number(index) !== (zoomable_images.length - 1)) {
                if($(zoomable_images[Number(index) + 1]).hasClass("3-2")) {
                    $('img.image-zoomed').attr('src', zoomable_images[Number(index) + 1].src.replace('.jpg', '-3x2.jpg'))
                } else {
                    $('img.image-zoomed').attr('src', zoomable_images[Number(index) + 1].src)
                }
                return;
            }
        }
    } else {
        goToNextSlide();
        goToNextSlide();
    }
});

prevSlide.on("click", function () {
    if($("div.image-zoomed").css('display') === 'flex') {
        for (let index in zoomable_images) {
            if($('img.image-zoomed').attr('src').replace('-3x2', '') === zoomable_images[index].src && Number(index) !== 0) {
                if($(zoomable_images[Number(index) - 1]).hasClass("3-2")) {
                    let newImage = new Image;
                    newImage.onload = function() {
                        $('img.image-zoomed').attr('src', zoomable_images[Number(index) - 1].src.replace('.jpg', '-3x2.jpg'))
                    }
                    newImage.src = zoomable_images[Number(index) - 1].src.replace('.jpg', '-3x2.jpg')
                } else {
                    let newImage = new Image;
                    newImage.onload = function() {
                        $('img.image-zoomed').attr('src', zoomable_images[Number(index) - 1].src)
                    }
                    newImage.src = zoomable_images[Number(index) - 1].src
                }
                return;
            }
        }
    } else {
        goToPrevSlide();
        goToPrevSlide();
    }
});

$(".swipe-about").on("click", function () {
    this.style.transition = '0.3s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform';
    this.style.transform = 'scale(0.95)';
    setTimeout(() =>  {
        this.style.transform = 'scale(1)';
    }, 200);
    goToNSlide(slides.length * 2 + 1);
});

$(".swipe-contact").on("click", function () {
    this.style.transition = '0.3s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform';
    this.style.transform = 'scale(0.95)';
    setTimeout(() =>  {
        this.style.transform = 'scale(1)';
    }, 200);
    goToNSlide(slides.length * 2 - 1);
});

$(".swipe-works").on("click", function () {
    this.style.transition = '0.3s cubic-bezier(0.75, -1.27, 0.3, 2.33) transform';
    this.style.transform = 'scale(0.95)';
    setTimeout(() =>  {
        this.style.transform = 'scale(1)';
    }, 200);
    goToNSlide(slides.length * 2 - 3);
});

$( "body" ).keydown(function(e) {
    if(e.which === 39) {
        if($("div.image-zoomed").css('display') === 'flex') {
            for (let index in zoomable_images) {
                if($('img.image-zoomed').attr('src').replace('-3x2', '') === zoomable_images[index].src && Number(index) !== (zoomable_images.length - 1)) {
                    if($(zoomable_images[Number(index) + 1]).hasClass("3-2")) {
                        $('img.image-zoomed').attr('src', zoomable_images[Number(index) + 1].src.replace('.jpg', '-3x2.jpg'))
                    } else {
                        $('img.image-zoomed').attr('src', zoomable_images[Number(index) + 1].src)
                    }
                    return;
                }
            }
            return;
        } else {
            goToNextSlide();
            goToNextSlide();
        }
    }
    else if(e.which === 37) {
        if($("div.image-zoomed").css('display') === 'flex') {
            for (let index in zoomable_images) {
                if($('img.image-zoomed').attr('src').replace('-3x2', '') === zoomable_images[index].src && Number(index) !== 0) {
                    if($(zoomable_images[Number(index) - 1]).hasClass("3-2")) {
                        let newImage = new Image;
                        newImage.onload = function() {
                            $('img.image-zoomed').attr('src', zoomable_images[Number(index) - 1].src.replace('.jpg', '-3x2.jpg'))
                        }
                        newImage.src = zoomable_images[Number(index) - 1].src.replace('.jpg', '-3x2.jpg')
                    } else {
                        let newImage = new Image;
                        newImage.onload = function() {
                            $('img.image-zoomed').attr('src', zoomable_images[Number(index) - 1].src)
                        }
                        newImage.src = zoomable_images[Number(index) - 1].src
                    }
                    return;
                }
            }
            return;
        } else {
            goToPrevSlide();
            goToPrevSlide();
        }
    }
});
    
let getEvent = function() {
    return event.type.search('touch') !== -1 ? event.touches[0] : event;
    // p.s. event - ???????????????? ???? ?????????????????? ?? ??????????????
}
let posInit = 0;
let posX1 = 0;
let posFinal = 0;
let slideWidth = slides[0].offsetWidth;
let posThreshold = slideWidth * .01;
function swipeStart() {
    let evt = getEvent();
  
    // ?????????? ?????????????????? ?????????????? ?????????????? ???? ?????? ??
    posInit = posX1 = evt.clientX;
  
    // ?? ?????????? ???????????????? ?????????????????????? ???????????? ?????????????? ???? ??????????????????
    document.addEventListener('touchmove', swipeAction);
    document.addEventListener('touchend', swipeEnd);
    document.addEventListener('mousemove', swipeAction);
    document.addEventListener('mouseup', swipeEnd);
}
function swipeAction() {
    let evt = getEvent();
    posX1 = evt.clientX;
}
function swipeEnd() {
    // ?????????????????? ?????????????? ??????????????
    posFinal = posInit - posX1;
  
    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);
  
    // ?????????????? ???????? ?????????? ?? ???????????????????? ?? ?????????????? ???????????? ????????????
    if (Math.abs(posFinal) > posThreshold) {
        
        // ???????? ???? ???????????? ????????????, ???? ?????????????????? ?????????? ???????????????? ????????????
        if (posInit < posX1) {
            goToPrevSlide();
            goToPrevSlide();
        // ???????? ???? ???????????? ??????????, ???? ?????????????????????? ?????????? ???????????????? ????????????
        } else if (posInit > posX1) {
            goToNextSlide();
            goToNextSlide();
        }
    }
}

$('.slider').on('touchstart', swipeStart);
$('.slider').on('mousedown', swipeStart);
