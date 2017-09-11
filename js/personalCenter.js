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
