

document.getElementById('saveInfo').onclick=function () {

        var nickname='default';
        var newpwd='default';
        var avator='default';
        var qq='default';
        var xid='default';
        var mid='default';
        var email=document.getElementsByTagName('input')[0];
        var phoneNumber=document.getElementsByTagName('input')[1];
        var oldpwd=document.getElementsByTagName('input')[2];
        var username=document.location.search.substr(document.location.search.indexOf('=')+1);

        var user =new AjaxHandler();

        user.modifyUserInfo(username,{nickname,oldpwd,newpwd,avator,email,phoneNumber,qq,xid,mid},function (data,state) {

            new Toast('修改信息成功',1000);
        },function (data,state) {
            new Toast().showMsg('网络连接异常',1000);
        })
}
document.getElementById("downloadFile").onclick=function () {
    
}
document.getElementById("uploadFile").onclick=function () {

}