

window.onload=function(){
    document.getElementById('login-btn').addEventListener('click',function(){
    login();})
    document.getElementById('register-btn').addEventListener('click',function(){
        register();})
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
                document.getElementById("loginOption").innerHTML="<a href=personalCenter.html>个人中心</a>";
                // $.cookie('username', username, { expires: 7, path: '/' });
            }else{
                new Toast().showMsg("账号或密码错误",1000);
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
    if(username==""||phone==""||email==""||pw==""){
        new Toast().showMsg("输入信息有误",1000);

    }else {
        user.register({username,password:pw,mail:email,phone},function(data,state){
            console.log(data,state);
            if(data.message=="Mail has been used"){

                new Toast().showMsg("该邮箱已被注册",1000);
            }else if(data.message=="Username has been used"){

                new Toast().showMsg("用户名已存在",1000);
            }else if(data.status==200){

                new Toast().showMsg("注册成功",1000);
                document.getElementById("closeRegister").click();
            }



        },function(data,state){
            new Toast().showMsg("网络连接异常",1000);
            console.log(data,state);
        })
    }

}
