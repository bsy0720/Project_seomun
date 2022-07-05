// 메뉴드롭다운
$(document).on('mouseover', '.topMenu a', function () {
    $('.dept01').slideDown(300);
});
$(document).on('mouseover', 'div', function () {
    if (!$(this).hasClass('topMenu')) {
        $('dept01').slideUp(300);
    }
})





// 메인 사진 슬라이드 스와이퍼
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});