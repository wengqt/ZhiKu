
window.onload=function(){
    document.getElementById('login-btn').addEventListener('click',function(){
        login();
    });
    document.getElementById('register-btn').addEventListener('click',function(){
        register();
    });
    loadNews();
    if(checkLogin()){
        var username=$.cookie('username');
        document.getElementById("loginOption").className = 'dropdown';
        document.getElementById("loginOption").innerHTML=`
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">hi,${username} <span class="caret"></span></a>
        <ul class="dropdown-menu" style="z-index:1111">
            <li><a href="personalCenter.html" >个人中心</a></li>
            <li><a href="javascript:logout()" >退出登录</a></li>
        </ul>
      `;}

}

function login(){
    var user = new AjaxHandler();
    var username = document.getElementById('userInput').value;
    var pw = document.getElementById('passwordInput').value;
    if(username==""||pw==""){
        new Toast().showMsg("账号或密码不能为空",1000);
    }else{
        user.login(username,pw,function(data,state){
            console.log(data);
            if(data.status==200){
                
                new Toast().showMsg("登录成功",1000);
                localStorage.setItem('token', data.token);
                // $.cookie('username', username,{path:"/"});
                document.getElementById("closeLogin").click();
                document.getElementById("loginOption").className = 'dropdown';
                document.getElementById("loginOption").innerHTML=`
                
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">hi,${$.cookie('username')} <span class="caret"></span></a>
                <ul class="dropdown-menu" style="z-index:1111">
                    <li><a href="personalCenter.html" >个人中心</a></li>
                    <li><a href="javascript:logout()" >退出登录</a></li>
                </ul>
              `;

                

            }else{
                new Toast().showMsg(data.message,1000);
            }
        },function(data,state){
            console.log(state);
            new Toast().showMsg("网络连接异常",1000);
        })
    }


}

function register(){
    var user = new AjaxHandler();
    var username = document.getElementById('r-user').value;
    var phone = document.getElementById('r-phone').value;
    var email = document.getElementById('r-email').value;
    var pw = document.getElementById('r-pw').value;
    // var id = document.getElementById('r-c').value;
    // if(id.length!=12){
    //     new Toast().showMsg("学号格式不正确",2000);
    //     return;
    // }
    if(username==""||phone==""||email==""||pw==""){
        console.log("输入信息不完全");
        new Toast().showMsg("输入信息不完全",2000);

    }else {
        if (username.length > 20) {
            console.log("用户名过长");
            new Toast().showMsg("用户名过长", 2000);
            return;
        }
        var reg1 = /^\d*$/g;
        if (phone.length !== 11 || !reg1.test(phone)) {
            console.log("手机号有误");
            new Toast().showMsg("手机号有误", 2000);
            return;
        }
        if (pw.length < 6 || pw.length > 18) {
            console.log("密码长度必须是6-18位");
            new Toast().showMsg("密码长度必须是6-18位", 2000);
            return;
        }
        var reg = /^[A-Za-z_][A-Za-z_0-9]*/;
        if (!reg.test(username)) {
            console.log("用户名只能使用字母数字下划线，并且不能以数字开头");
            new Toast().showMsg("用户名只能使用字母数字下划线，并且不能以数字开头", 2000);
            return;
        }
        var reg2 = /\w+@\w+\.\w+/;
        if (!reg2.test(email)) {
            console.log("邮箱格式不正确");
            new Toast().showMsg("邮箱格式不正确", 2000);
            return;
        }
        var reg3 = /^[A-Za-z_0-9][A-Za-z_0-9]*/;
        if (!reg3.test(pw)) {
            console.log("密码带有非法字符");
        }
        user.register({username, password: pw, mail: email, phone}, function (data, state) {
            console.log(data, state);
            if (data.message == "Mail has been used") {

                new Toast().showMsg("该邮箱已被注册", 2000);
            } else if (data.message == "Username has been used") {

                new Toast().showMsg("用户名已存在", 2000);
            } else if (data.status == 200) {


                new Toast().showMsg("注册成功,请前往邮箱激活", 2000);
                document.getElementById("closeRegister").click();
                setTimeout(function () {
                    document.getElementsByTagName('body')[0].style.paddingRight = 0;
                }, 400)


            } else {

                new Toast().showMsg(data.message, 1000);

            }
        }, function (data, state) {
            new Toast().showMsg("网络连接异常", 2000);
            console.log(data, state);
        })
    }

}
document.getElementById("closeRegister").onclick=function(){
    setTimeout(function(){
        document.getElementsByTagName('body')[0].style.paddingRight=0
    },400)
}

    function logout() {
        var user=new AjaxHandler();

        user.logout(function (data,state) {
            console.log(data);
            new Toast().showMsg("成功退出登录",1000);
            console.log("退出登录");
            $.removeCookie('username');
            localStorage.clear();
            document.getElementById("loginOption").innerHTML='<a href="#" data-toggle="modal" data-target="#login">登录/注册</a>';

        },function(data,state){
            console.log(data);
            new Toast().showMsg("网络连接异常",1000);
        })
    }



document.getElementById('return-login').onclick=function(){
    document.getElementById("closeRegister").click();
}
document.getElementById('findPassword').onclick=function () {
    document.getElementById("closeRegister").click();
}

document.getElementById('findBtn').onclick=function () {
    let email=document.getElementById('findEmail').value;
    if(email==''){
        new Toast().showMsg('输入不能为空',1000)
        document.getElementById('findEmail').focus();
        return;
    }
    const reg =/\w+@\w+\.\w+/;
    if(!reg.test(email)){
        new Toast().showMsg('邮箱格式有误',1000)
        document.getElementById('findEmail').focus();
        return;
    }
    
    $.ajax({
        url:API.forgetPwd,
        type:'POST',
        data:{mail:email},
        dataType:"JSON",
        success:function(data,state){
            if(data.status==300){
                new Toast().showMsg('输入邮箱有误',1000)
                return;
            }
            new Toast().showMsg('请前往个人邮箱查看',1000)

        },
        error:function(data,state){
            new Toast().showMsg('找回失败',1000);
        console.log(data)
        }
    })
}

// document.getElementById("loginOption").onmouseover=function(){


//     if(document.getElementById("loginOption").innerText.trim()=="个人中心"){

//         // document.getElementById("exitLogin").style.display="inline";
//     }
// }

// document.getElementById("loginOption").onmouseout=function(){
//     if(document.getElementById("loginOption").innerText.trim()=="个人中心\n退出登录"){
//         document.getElementById("exitLogin").style.display="none";
//     }
// }


function loadNews(){
    var dom = document.getElementById('activity');
      AjaxHandler().news(3,function(data,state){
        if(data.status==200){
            if(data.data===null){
                return;
            }
            data.data.map(function(item,index){
                var div = document.createElement('div');
                div.innerHTML=`<div class="row row-line">
                <div class="col-xs-12 col-sm-6" >
                    <h3>${item.title}</h3>
                    <small class="that-blue">${new Date(item.date).toLocaleString()}</small>
                    <p class="details">${item.details}</p>
                </div>
                <div class="col-xs-12 col-sm-6">
                    <img src="${item.url}" alt="" style="width: 80%;height: auto;">
                </div>
            </div>`
            dom.appendChild(div);
            })
        }
    },function(){
        new Toast().showMsg('网络连接异常,获取动态失败',2000)
    })
}