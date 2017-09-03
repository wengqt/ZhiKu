function AjaxHandler(){
    function ajaxHandler(){

    }
    //无权限请求
    ajaxHandler.prototype.login = function({username,password},success,faild){
        $.ajax({
            url:API.login,
            type:'POST',
            data:{username,password},
            dataType:"JSON",
            success:success(),
            error:faild()
        })
    }

    ajaxHandler.prototype.logout = function(success,faild){
        $.ajax({
            url:API.logout,
            type:'POST',
            data:{},
            dataType:"JSON",
            success:success(),
            error:faild()
        })
    }

    ajaxHandler.prototype.register = function({username,password,nickname,mail,phone,qq,avator},success,faild){
        $.ajax({
            url:API.register,
            type:'POST',
            data:{username,password,nickname,mail,phone,qq,avator},
            dataType:"JSON",
            success:success(),
            error:faild()
        })
    }



    ajaxHandler.prototype.mailcheck = function({username,key},success,faild){
        $.ajax({
            url:API.mailcheck,
            type:'POST',
            data:{username,key},
            dataType:"JSON",
            success:success(),
            error:faild()
        })
    }


    //有权限请求
    ajaxHandler.prototype.uploadFile = function(fileElelmentID,success,faild){
        var formData = new FormData($( `#${fileElelmentID}` )[0]);
        $.ajax({
            url:API.uploadFile,
            type:'POST',
            data:formData,
            dataType:"JSON",
            success:success(),
            error:faild()
        })
    }

    ajaxHandler.prototype.downloadFile = function(fileId,success,faild){
        window.open(matchword(API.downloadFile,fileId))
    }
     

    ajaxHandler.prototype.docDetail = function(fileId,success,faild){

        $.ajax({
            url:matchword(API.docDetail,fileId),
            type:'GET',
            data:{},
            dataType:"JSON",
            success:success(),
            error:faild()
        })


    }

    ajaxHandler.prototype.modifyFile = function(fileId,{name,model,teacher,course,docformat,fileformat,upuid,origin,desc},success,faild){

        $.ajax({
            url:matchword(API.modifyFile,fileId),
            type:'POST',
            data:{name,model,teacher,course,docformat,fileformat,upuid,origin,desc},
            dataType:"JSON",
            success:success(),
            error:faild()
        })


    }

    ajaxHandler.prototype.modifyUserInfo = function(userId,{nickname,oldpwd,newpwd,avator,mail,phone,qq,xid,mid},success,faild){

        $.ajax({
            url:matchword(API.modifyUserInfo,userId),
            type:'POST',
            data:{name,model,teacher,course,docformat,fileformat,upuid,origin,desc},
            dataType:"JSON",
            success:success(),
            error:faild()
        })

    }


    ajaxHandler.prototype.getCollegeList = function(){

        $.ajax({
            url:API.getCollege,
            type:'GET',
            data:{},
            dataType:"JSON",
            success:success(),
            error:faild()
        })


    }


    //用于匹配{}
    function matchword(url,real){
        var ind = url.indexOf('{');
        var sub = url.substring(0,ind);
        return sub+real;

    }



           //搜索接口待定
    ajaxHandler.prototype.search = function(){
            
    }
    
    return new ajaxHandler();

}