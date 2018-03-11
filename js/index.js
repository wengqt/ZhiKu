

window.onload=function(){
    document.getElementById('login-btn').addEventListener('click',function(){
        login();
    });
    document.getElementById('register-btn').addEventListener('click',function(){
        register();
    });
    if($.cookie('username')!==undefined){
        var username=$.cookie('username');
        document.getElementById("loginOption").className = 'dropdown';
        document.getElementById("loginOption").innerHTML=`
        
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">个人中心 <span class="caret"></span></a>
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
            console.log(data,state);
            if(data.status==200){
                new Toast().showMsg("登录成功",1000);
                document.getElementById("closeLogin").click();
                document.getElementById("loginOption").className = 'dropdown';
                document.getElementById("loginOption").innerHTML=`
                
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">个人中心 <span class="caret"></span></a>
                <ul class="dropdown-menu" style="z-index:1111">
                    <li><a href="personalCenter.html" >个人中心</a></li>
                    <li><a href="javascript:logout()" >退出登录</a></li>
                </ul>
              `;

                $.cookie('username', username,{path:"/"});

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

        user.register({username,password:pw,mail:email,phone},function(data,state){
            console.log(data,state);
           if(data.status==200){

                new Toast().showMsg("注册成功",1000);
                document.getElementById("closeRegister").click();
                setTimeout(function(){
                             document.getElementsByTagName('body')[0].style.paddingRight=0
                        },400)

            }else{

               new Toast().showMsg(data.message,1000);
            }
        },function(data,state){
            new Toast().showMsg("网络连接异常",1000);
            console.log(data,state);
        })


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
        document.getElementById("loginOption").innerHTML='<a href="#" data-toggle="modal" data-target="#login">登录/注册</a>';

    },function(data,state){
        console.log(data);
        new Toast().showMsg("网络连接异常",1000);
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