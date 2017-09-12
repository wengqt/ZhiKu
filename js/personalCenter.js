
//滚动条在Y轴上的滚动距离
var page=0;
function getScrollTop(){
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if(document.body){
        bodyScrollTop = document.body.scrollTop;
    }
    if(document.documentElement){
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}
//文档的总高度
function getScrollHeight(){
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if(document.body){
        bodyScrollHeight = document.body.scrollHeight;
    }
    if(document.documentElement){
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}
//浏览器视口的高度
function getWindowHeight(){
    var windowHeight = 0;
    if(document.compatMode == "CSS1Compat"){
        windowHeight = document.documentElement.clientHeight;
    }else{
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}
window.onscroll = function(){
    console.log(getScrollTop());
    console.log(getWindowHeight());
    console.log(getScrollHeight());
    if(getScrollTop() + getWindowHeight()+1 >= getScrollHeight()){
        console.log(++page);

    }
};


var username=$.cookie('username');

document.getElementById('saveInfo').onclick=function () {

        var nickname='default';
        var newpwd='default';
        var avator='default';
        var qq='default';
        var xid='default';
        var mid='default';
        var email=document.getElementsByTagName('input')[0].value;
        var phoneNumber=document.getElementsByTagName('input')[1].value;
        var oldpwd=document.getElementsByTagName('input')[2].value;


        var user =new AjaxHandler();

        user.modifyUserInfo(username,{nickname,oldpwd,newpwd,avator,email,phoneNumber,qq,xid,mid},function (data,state) {

            console.log(data);
            if(data.status==200){
                new Toast().showMsg('修改信息成功',1000);
            }else if(data.status==300){
                new Toast().showMsg('密码输出错误',1000);
            }

        },function (data,state) {
            new Toast().showMsg('网络连接异常',1000);

        })
}
var option=document.getElementsByClassName("option");
for(var i=0;i<option.length;i++){
    (function(e) {
        option[e].onclick=function () {

            option[e].className="active option";
            option[(e+1)%option.length].className="option";
            option[(e+2)%option.length].className="option";
            option[(e+4)%option.length].className="option";
            switch(e){
                case 0:
                    document.getElementById("info").style.display="block";
                    document.getElementById("collect").style.display="none";
                    document.getElementById("download").style.display="none";
                    break;
                case 1:
                    document.getElementById("info").style.display="none";
                    document.getElementById("collect").style.display="block";
                    document.getElementById("download").style.display="none";
                    var upload=new AjaxHandler();
                    var uploadPage=1;
                    upload.getUploadList(username,uploadPage,function (data,state) {
                        console.log(data);

                    },function (data,state) {
                        console.log(data)
                    })

                    break;
                case 2:
                    document.getElementById("info").style.display="none";
                    document.getElementById("collect").style.display="none";
                    document.getElementById("download").style.display="block";
                    var download=new AjaxHandler();
                    var downloadPage=1;
                    download.getDownloadList(username,downloadPage,function (data,state) {
                        console.log(data);
                    },function (data,state) {
                        console.log(data);
                    })

                    break;
            }
        }
    })(i)

}
