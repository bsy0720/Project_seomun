// 메인사진 스와이퍼 슬라이드
var swiper = new swiper(".mySwiper", {
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


// 카카오 로그인
Kakao.init('4169f24b838b75e164208f2d4095211d');
Kakao.isInitialized();

function kakaoLogin() {
    Kakao.Auth.login({
        success: function (response) {
            Kakao.API.request({
                url: '/v2/user/me',
                success: function (response) {
                    console.log(response);
                    document.getElementById('user').innerHTML =
                        response.kakao_account.profile.nickname;
                }
            })
        }
    })
}


function kakaoLogout() {

}