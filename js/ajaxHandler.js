console.log(API)
function AjaxHandler(){
    function ajaxHandler(){

    }
    //无权限请求
    ajaxHandler.prototype.login = function(username,password,success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();
        
        console.log({username,password})
        $.ajax({
            url:API.login,
            type:'POST',
            data:{username,password},
            dataType:"JSON",
            success:function(data,state){
                success(data,state)},
            error:function(data,state){
                failed(data,state)}
        })
    }

    ajaxHandler.prototype.logout = function(success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();
        $.ajax({
            url:API.logout,
            type:'POST',
            data:{},
            dataType:"JSON",
            success:function(data,state){
                success(data,state)},
            error:function(data,state){
                failed(data,state)}
        })
    }

    ajaxHandler.prototype.register = function({username,password,nickname,mail,phone,qq,avator},success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();

        $.ajax({
            url:API.register,
            type:'POST',
            data:{username,password,nickname:"111",mail,phone,qq:"1111",avator:"aaa",xid:1,mid:1001},
            dataType:"JSON",
            success:function(data,state){
                
                success(data,state)},
            error:function(data,state){
                
                failed(data,state)}
        })
    }



    ajaxHandler.prototype.mailcheck = function({username,key},success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();

        $.ajax({
            url:API.mailcheck,
            type:'POST',
            data:{username,key},
            dataType:"JSON",
            success:function(data,state){
                success(data,state)},
            error:function(data,state){
                failed(data,state)}
        })
    }


    //有权限请求
    ajaxHandler.prototype.uploadFile = function(fileElelmentID,success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();
        var formData = new FormData($( `#${fileElelmentID}` )[0]);
        $.ajax({
            url:API.uploadFile,
            type:'POST',
            data:formData,
            dataType:"JSON",
            success:function(data,state){
                success(data,state)},
            error:function(data,state){
                failed(data,state)}
        })
    }

    ajaxHandler.prototype.downloadFile = function(fileId,success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();
        window.open(matchword(API.downloadFile,fileId))
    }
     

    ajaxHandler.prototype.docDetail = function(fileId,success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();

        $.ajax({
            url:matchword(API.docDetail,fileId),
            type:'GET',
            data:{},
            dataType:"JSON",
            success:function(data,state){
                success(data,state)},
            error:function(data,state){
                failed(data,state)}
        })


    }

    ajaxHandler.prototype.modifyFile = function(fileId,{name,model,teacher,course,docformat,fileformat,upuid,origin,desc},success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();
        $.ajax({
            url:matchword(API.modifyFile,fileId),
            type:'POST',
            data:{name,model,teacher,course,docformat,fileformat,upuid,origin,desc},
            dataType:"JSON",
            success:function(data,state){
                success(data,state)},
            error:function(data,state){
                failed(data,state)}
        })


    }

    ajaxHandler.prototype.modifyUserInfo = function(userId,{nickname,oldpwd,newpwd,avator,mail,phone,qq,xid,mid},success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();
        $.ajax({
            url:matchword(API.modifyUserInfo,userId),
            type:'POST',
            data:{name,model,teacher,course,docformat,fileformat,upuid,origin,desc},
            dataType:"JSON",
            success:function(data,state){
                success(data,state)},
            error:function(data,state){
                failed(data,state)}
        })

    }


    ajaxHandler.prototype.getCollegeList = function(){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();
        $.ajax({
            url:API.getCollege,
            type:'GET',
            data:{},
            dataType:"JSON",
            success:function(data,state){
                success(data,state)},
            error:function(data,state){
                failed(data,state)}
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