
//滚动条在Y轴上的滚动距离
var state=0;
var uploadPage=1;
var downloadPage=1;
var uploadDIv=0;
var isLoading = false;
var upContent='';
var downContent='';
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

    if(getScrollTop() + getWindowHeight()+0.1 >= getScrollHeight()){
        if(state==1){
            
            if(!isLoading){
                isLoading = true;
                uploadPage++
                console.log(uploadPage)
                getUpLoadList();
            }
            
        }else if(state==2){
            
            
            if(!isLoading){
                isLoading = true;
                downloadPage++
                getDownLoadList();
            }
        }
            
    }
};



var username=$.cookie('username');


document.getElementById('saveInfo').onclick=function () {

        var nickname=document.getElementsByTagName('input')[0].value;
        var newpwd='';
        var avator='';
        var qq=document.getElementsByTagName('input')[3].value;
        var xid='';
        var mid='';
        var email=document.getElementsByTagName('input')[1].value;
        var phoneNumber=document.getElementsByTagName('input')[2].value;
        var oldpwd=document.getElementsByTagName('input')[4].value;


        var user =new AjaxHandler();
        if(oldpwd.toString().trim!=''){
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
        }else{
            new Toast().showMsg('请输入密码再修改信息',1000);
        }
        
}

function getInfo (){
    var user = new AjaxHandler();
    user.getUserInfo(username,function(data){
        if(data.status==200){
            var info = data.data;
            document.getElementsByTagName('input')[0].placeholder = info.nickname;
            document.getElementsByTagName('input')[1].placeholder = info.mail;
            document.getElementsByTagName('input')[2].placeholder = info.phone;
            document.getElementsByTagName('input')[3].placeholder = info.qq;

        }else if(data.status==300){
            new Toast().showMsg('获取个人信息失败',1000);
        }
    },function(data){
        new Toast().showMsg('网络连接异常',1000);
    })
}
getInfo();
function getUpLoadList() {
    var upload=new AjaxHandler();

    upload.getUploadList(username,uploadPage,function (data,state) {

        console.log(data)
        // var content='';
        // if(data.data.length==0) uploadPage--;
        for(var i=0;i<data.data.length;i++){
            uploadDIv++;
            upContent+=`<div class="panel panel-default mt leftblue">
                                        <div class="panel-body">
                                            <div class=" firstLine">
                                                <div class="col-xs-12 col-ms-4 bluefont">${data.data[i].fileinfo.course}</div>
                                                <div class="col-xs-12 col-ms-5 small date">${data.data[i].upuid} 上传于 ${data.data[i].fileinfo.uptime}</div>
                                                <div class="col-xs-12 col-ms-3">课件${data.data[i].fid}</div>
                                            </div>
                                            <div class=" firstLine">
                                                <div class="col-xs-9 date small">${data.data[i].fileinfo.name}</div>
                                                <button type="button" onclick="deleteDoc(this)" class="btn btn-danger ">删除 </button>
                                            </div>
                                            
                                        </div>
                                    </div>`
        }
        document.getElementById('upload').innerHTML=upContent;
        isLoading = false;
    },function (data,state) {
        console.log(data)
    })
}

function getDownLoadList() {
    var download=new AjaxHandler();
    download.getDownloadList(username,downloadPage,function (data,state) {
        console.log(data.data);
        // var content='';
        console.log(downloadPage);
        // if(data.data.length==0) downloadPage--;
        for(var i=0;i<data.data.length;i++){
            downContent+=`<div class="panel panel-default mt leftblue">
                                        <div class="panel-body">
                                            <div class=" firstLine">
                                                <div class="col-xs-12 col-ms-4 bluefont">${data.data[i].fileinfo.name}</div>
                                                <div class="col-xs-12 col-ms-5 small date">${data.data[i].upuid} 上传于 ${data.data[i].fileinfo.uptime}</div>
                                                <div class="col-xs-12 col-ms-3">课件</div>
                                            </div>
                                            <div class=" firstLine">
                                                <div class="col-xs-9 date small">${data.data[i].fileinfo.course}</div>
                                                <button type="button" onclick='downloadfile(${data.data[i].fid})' class="btn btn-success">下载 </button>
                                            </div>
                                          
                                        </div>
                                    </div>`
        }
        
        document.getElementById('download').innerHTML=downContent;
        isLoading = false;
    },function (data,state) {
        console.log(data);
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
                    document.getElementById("upload").style.display="none";
                    document.getElementById("download").style.display="none";
                    break;
                case 1:
                    state=1;
                    document.getElementById("info").style.display="none";
                    document.getElementById("upload").style.display="block";
                    document.getElementById("download").style.display="none";
                    upContent='';
                    downContent='';
                    uploadPage=1;
                    downloadPage=1;
                    getUpLoadList();



                    break;
                case 2:
                    state=2;
                    document.getElementById("info").style.display="none";
                    document.getElementById("upload").style.display="none";
                    document.getElementById("download").style.display="block";
                    upContent='';
                    downContent='';
                    uploadPage=1;
                    downloadPage=1;
                    getDownLoadList();

                    break;
            }
        }
    })(i)

}


function deleteDoc(e) {
    var user =new AjaxHandler();
    var fid=e.parentNode.previousSibling.previousSibling.lastChild.previousSibling.innerHTML.substr(2);
    console.log(fid)
    user.deleteDocument(fid,function (data,state) {
        console.log(data)
        if(data.status==200){
            new Toast().showMsg('删除成功',1000);
            e.innerText='已删除';

        }else if(data.status==300){
            new Toast().showMsg('文件不存在或已删除',1000)
        }
    },function (data,state) {
        console.log(data);
        new Toast().showMsg('网络连接超时',1000)
    })
    console.log(e.parentNode.previousSibling.previousSibling.lastChild.previousSibling.innerHTML.substr(2))
}


function downloadfile(fid){
    var user =new AjaxHandler();
    console.log(fid);
    user.downloadFile(fid,function(data,state){
        
        console.log(data,state);
        // var a = document.createElement('a');
        // var url = API.fileDownload+`${fid}.do`;
        // a.href = url;
       //  a.download = fileName;
        // a.click();
    },function(){})
    
}