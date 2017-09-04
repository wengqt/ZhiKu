

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
    
    user.login(username,pw,function(data,state){
        console.log(state);
    },function(data,state){
        console.log(state);
    })

}

function register(){
    var user = new AjaxHandler();
    var username = document.getElementById('r-user');
    var phone = document.getElementById('r-phone');
    var email = document.getElementById('r-email');
    var pw = document.getElementById('r-pw');    
    
    user.register({username,password:pw,mail:email,phone},function(){

    },function(data,state){
        console.log(data,state)
    })
}