// 카카오 로그인
Kakao.init('4169f24b838b75e164208f2d4095211d');
Kakao.isInitialized();
document.getElementById('logout').style.display = 'none';

function kakaoLogin() {
    Kakao.Auth.login({
        success: function (response) {
            Kakao.API.request({
                url: '/v2/user/me',
                success: function (response) {
                    console.log(response);
                    document.getElementById('user').innerText =
                        response.kakao_account.profile.nickname;
                    document.getElementById('login2').style.display = 'none';
                    alert(response.kakao_account.profile.nickname + '님 로그인 되었습니다.')
                }
            })
        }
    })
}


function kakaoLogout() {
    if (!Kakao.Auth.getAccessToken()) {
        Kakao.API.request({
            url: '/v2/user/me',
            success: function (response) {
                console.log(response);
                document.getElementById('user').style.display = 'none';
                document.getElementById('login2').style.display = 'block';
                document.getElementById('logout').style.display = 'none';
                alert('로그아웃 되었습니다.')
            }
        })
    }
    Kakao.Auth.setAccessToken(undefined)
}