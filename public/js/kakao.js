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
                    document.getElementById('logout').style.display = 'block';
                    alert(response.kakao_account.profile.nickname + '님 로그인 되었습니다.')
                }
            })
        }
    })
}


function kakaoLogout() {
    if (Kakao.Auth.getAccessToken()) {
        Kakao.API.request({
            url: '/v1/user/unlink',
            success: function (response) {
                console.log(response);
                document.getElementById('user').style.display = 'none';
                document.getElementById('login2').style.display = 'block';
                document.getElementById('logout').style.display = 'none';
                alert(' 로그아웃 되었습니다.')
            },
            fail: function (error) {
                console.log(error);
            }
        })
    }
    Kakao.Auth.setAccessToken(undefined)
}


// 푸드회원가입 유효성 검사
function joinform_check() {
    var l_id = document.getElementById("l_id");
    var pw = document.getElementById("pw");
    var re_pw = document.getElementById("re_pw");
    var name = document.getElementById("name");
    var tel = document.getElementById("tel");


    if (l_id.value == "") { //해당 입력값이 없을 경우 같은말: if(!uid.value)
        alert("아이디를 입력하세요.");
        l_id.focus(); //focus(): 커서가 깜빡이는 현상, blur(): 커서가 사라지는 현상
        return false; //return: 반환하다 return false:  아무것도 반환하지 말아라 아래 코드부터 아무것도 진행하지 말것
    };

    if (pw.value == "") {
        alert("비밀번호를 입력하세요.");
        pw.focus();
        return false;
    };

    //비밀번호 영문자+숫자+특수조합(8~25자리 입력) 정규식
    var pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!pwdCheck.test(pw.value)) {
        alert("비밀번호는 영문자+숫자+특수문자 조합으로 8~25자리 사용해야 합니다.");
        pw.focus();
        return false;
    };

    if (re_pw.value !== pw.value) {
        alert("비밀번호가 일치하지 않습니다..");
        re_pw.focus();
        return false;
    };

    if (name.value == "") {
        alert("이름을 입력하세요.");
        name.focus();
        return false;
    };

    var reg = /^[0-9]+/g; //숫자만 입력하는 정규식

    if (!reg.test(tel.value)) {
        alert("전화번호는 숫자만 입력할 수 있습니다.");
        tel.focus();
        return false;
    }
    //입력 값 전송
    document.join_form.submit(); //유효성 검사의 포인트   
}





// 마켓회원가입
function m_joinform_check() {
    var m_id = document.getElementById("m_id");
    var m_pw = document.getElementById("m_pw");
    var re_m_pw = document.getElementById("re_m_pw");
    var m_name = document.getElementById("m_name");
    var m_tel = document.getElementById("m_tel");
    var m_food = document.getElementById("m_food");
    var m_store = document.getElementById("m_store");

    if (m_id.value == "") { //해당 입력값이 없을 경우 같은말: if(!uid.value)
        alert("아이디를 입력하세요.");
        m_id.focus(); //focus(): 커서가 깜빡이는 현상, blur(): 커서가 사라지는 현상
        return false; //return: 반환하다 return false:  아무것도 반환하지 말아라 아래 코드부터 아무것도 진행하지 말것
    };

    if (m_pw.value == "") {
        alert("비밀번호를 입력하세요.");
        m_pw.focus();
        return false;
    };

    //비밀번호 영문자+숫자+특수조합(8~25자리 입력) 정규식
    var pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!pwdCheck.test(m_pw.value)) {
        alert("비밀번호는 영문자+숫자+특수문자 조합으로 8~25자리 사용해야 합니다.");
        m_pw.focus();
        return false;
    };

    if (re_m_pw.value !== m_pw.value) {
        alert("비밀번호가 일치하지 않습니다..");
        re_m_pw.focus();
        return false;
    };

    if (m_name.value == "") {
        alert("이름을 입력하세요.");
        m_name.focus();
        return false;
    };

    var reg = /^[0-9]+/g; //숫자만 입력하는 정규식

    if (!reg.test(m_tel.value)) {
        alert("전화번호는 숫자만 입력할 수 있습니다.");
        m_tel.focus();
        return false;
    }

    if (m_birth.value == "") {
        alert("생년월일을 선택하세요.");
        m_birth.focus();
        return false;
    };


    if (m_food.value == "") {
        alert("판매상품을 입력하세요.");
        m_food.focus();
        return false;
    };


    if (m_store.value == "") {
        alert("매대이름을 입력하세요.");
        m_store.focus();
        return false;
    };


    //입력 값 전송
    document.join_form.submit(); //유효성 검사의 포인트   
}