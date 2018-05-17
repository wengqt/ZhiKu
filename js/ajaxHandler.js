// console.log(API)
function AjaxHandler(){
    function ajaxHandler(){

    }
    //无权限请求
    ajaxHandler.prototype.login = function(username,password,success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();
        
        // console.log({username,password})
        $.ajax({
            url:API.login,
            type:'POST',
            data:{username,password},
            dataType:"JSON",
            // xhrFields: {
            //     withCredentials: true
            //  },
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
            data:{username,password,nickname:null,mail,phone,qq:null,avator:null,xid:null,mid:null},
            dataType:"JSON",
            success:function(data,state){
                
                success(data,state)},
            error:function(data,state){
                
                failed(data,state)}
        })
    }

    ajaxHandler.prototype.news = function(num,success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();

        $.ajax({
            url:API.news,
            type:'POST',
            data:{number:num},
            dataType:"JSON",
            success:function(data,state){
                
                success(data,state)},
            error:function(data,state){
                
                failed(data,state)}
        })
    }
    ajaxHandler.prototype.pushNews = function(url,date,title,details,success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();

        $.ajax({
            url:API.pushNews,
            type:'POST',
            data:{url,date,title,details},
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
    ajaxHandler.prototype.uploadFile = function(fileElelmentID,{dname,teacher,username,origion,filedesc,course},success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();
        var formData = new FormData();
        var file = document.getElementById(`${fileElelmentID}`).files[0];

        formData.append('file',file);
        formData.append('name',dname);
        formData.append('teacher',teacher);
        formData.append('upusername',username);
        formData.append('origin',origion);
        formData.append('desc',filedesc);
        formData.append('course',course);

        var sendData = {
            name:dname,
            file:formData,
            teacher,
            upusername:username,
            origin:origion,
            desc:filedesc,
            course,
        };
        // console.log(document.getElementById(`${fileElelmentID}`).files[0]);
        // console.log(sendData)
        $.ajax({
            url:API.uploadFile,
            type:'POST',
            data:formData,
            dataType:"JSON",
            contentType:false,
            processData:false,//为了保证formData能传过去 ，不加会报错
            success:function(data,state){
                success(data,state)},
            error:function(data,state){
                failed(data,state)}
        })
    }
    ajaxHandler.prototype.getUserInfo = function(userName,success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();

        $.ajax({
            url:matchword(API.gerUserInfo,userName),
            type:'GET',
            data:{},
            dataType:"JSON",
            // xhrFields: {
            //     withCredentials: true
            //  },
            success:function(data,state){
                success(data,state)},
            error:function(data,state){
                failed(data,state)}
        })

    }
    ajaxHandler.prototype.getNotification = function(userName,success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();
        console.log(userName)
        $.ajax({
            url:matchword(API.getNotification,userName),
            type:'GET',
            data:{},
            dataType:"JSON",
            // xhrFields: {
            //     withCredentials: true
            //  },
            success:function(data,state){
                success(data,state)},
            error:function(data,state){
                failed(data,state)}
        })

    }
    ajaxHandler.prototype.readNotification = function(userName,nid,success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();

        $.ajax({
            url:matchword(API.readNotification,userName),
            type:'GET',
            data:{"noticeId":nid},
            dataType:"JSON",
            // xhrFields: {
            //     withCredentials: true
            //  },
            success:function(data,state){
                success(data,state)},
            error:function(data,state){
                failed(data,state)}
        })

    }

    ajaxHandler.prototype.downloadFile = function(fileId,success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();
        console.log(matchword(API.filedownload,fileId))
            window.open(matchword(API.filedownload,fileId))
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

    ajaxHandler.prototype.modifyUserInfo = function(username,{nickname,oldpwd,newpwd,avator,mail,phone,qq,xid,mid},success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();

        $.ajax({
            url:matchword(API.modifyUserInfo,username),
            type:'POST',
            data:{nickname,oldpwd,newpwd,avator,mail,phone,qq,xid,mid},
            dataType:"JSON",
            success:function(data,state){

                success(data,state);

            },
            error:function(data,state){
                failed(data,state)
            }
        })

    }


    ajaxHandler.prototype.getCollegeList = function(success,failed){
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
        return sub+real+'.do';
    }



           //搜索接口待定
           //关键词搜索返回选项列表
    ajaxHandler.prototype.courseSearch = function(keyword,success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();
        $.ajax({
            url:API.courseSearch,
            type:'GET',
            data:{keyword:keyword},
            dataType:"JSON",
            success:function(data,state){
                success(data,state)},
            error:function(data,state){
                failed(data,state)}
        })
    }

    ajaxHandler.prototype.searchDoc = function(method,course,college,major,page,success,failed){
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();
        $.ajax({
            url:API.searchDoc,
            type:'GET',
            data:{method,course,college,major,page},
            dataType:"JSON",
            success:function(data,state){
                success(data,state)},
            error:function(data,state){
                failed(data,state)}
        })
    }
    ajaxHandler.prototype.majorSearch=function (xid,success,failed) {
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();
        $.ajax({
            url:API.majorSearch,
            type:'get',
            data:{xid:xid},
            dataType:'json',
            success:function(data,state){
                success(data,state)},
            error:function(data,state){
                failed(data,state)}
        })
    }
    ajaxHandler.prototype.fileDownload=function (fileId,success,failed) {
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();
        console.log(matchword(API.filedownload,fileId));
        $.ajax({
            url:matchword(API.filedownload,fileId),
            type:'GET',
            data:{},
            dataType:"JSON",
            success:function(data,state){
            onsole.log(fileId);
        
                success(data,state)},
            error:function(data,state){
                failed(data,state)}
        })
    };

    ajaxHandler.prototype.getDownloadList=function (username,page,success,failed) {
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();
        $.ajax({
            url:API.getDownloadList,
            type:'GET',
            data:{username,page},
            dataType:"JSON",
            // xhrFields: {
            //     withCredentials: true
            //  },
            success:function(data,state){
                success(data,state)},
            error:function(data,state){
                failed(data,state)}
        })
    };

    ajaxHandler.prototype.getUploadList=function (username,page,success,failed) {
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();

        $.ajax({
            url:API.getUploadList,
            type:'GET',
            data:{username,page},
            dataType:"JSON",
            // xhrFields: {
            //     withCredentials: true
            //  },
            success:function(data,state){
                success(data,state)},
            error:function(data,state){
                failed(data,state)}
        })
    }

    ajaxHandler.prototype.deleteDocument=function (fid,success,failed) {
        success = typeof success ==='function'?success:new Function();
        failed = typeof failed ==='function'?failed:new Function();
        console.log(matchword(API.deleteDocument,fid));
        $.ajax({
            url:matchword(API.deleteDocument,fid),
            type:'GET',
            data:{},
            dataType:"JSON",
            // xhrFields: {
            //     withCredentials: true
            //  },
            success:function(data,state){
                success(data,state)},
            error:function(data,state){
                failed(data,state)}
        })
    }


    return new ajaxHandler();

}