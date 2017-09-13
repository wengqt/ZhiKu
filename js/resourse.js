var searchPage = 1;
function selectAct(a) {
    var s1 = a.innerText;
    var k = a.parentNode.parentNode.dataset.drop;
    $(`#${k}`).html(s1+'<span class="caret"></span>')
}
function switchSourse(indx) {
    var inner = document.getElementById('innerRescouse');
    // var outer = document.getElementById('outerResourse');

    // switch(parseInt(indx)){
    // case 1:
    //     inner.style.display = 'block';
    //     outer.style.display = 'none';
    //         document.getElementById('inner').className = 'active';
    //         document.getElementById('outer').className = '';
    //     break;
    // case 2:

    //     outer.style.display = 'block';
    //     inner.style.display = 'none';
    //     document.getElementById('outer').className = 'active';
    //     document.getElementById('inner').className = '';
    //     break;

    // }

}
window.onload = function () {
    var url = window.location.href;
    var i = url.indexOf("=");
    var param = url.substring(i+1,i+2);
    console.log(param);
    switchSourse(param);
    getCollegeList();
}

function getCollegeList() {
    var user =new AjaxHandler();

    user.getCollegeList(function (data,state) {
        console.log(data.data);
        console.log("获取college success");
        var content='';
         for(var i=0;i<data.data.length;i++){
             content+=`<li><a href="javascript:void(0)"  onclick="selectAct(this)">${data.data[i].xname}</a></li>`;
         }
         document.getElementById('college').innerHTML=content;
    },function () {
        console.log("获取college failed");
    })
}
var keyData ;//存放搜索框数据
var docList ;//存放搜索到的文档列表
var user = new AjaxHandler();
document.getElementById('dropdownMenu5').oninput= function(){
    var key = document.getElementById('dropdownMenu5').value;

    user.courseSearch(key,function(data,state){
        if(data.status == 200){
            console.log(data.data);
            var innerList ='';
            var keyData = data.data;
            data.data.map((item,index)=>{
                console.log(item);
                innerList +=`<li><a href="javascript:void(0)" class="topOption" onclick='searchAll(1,${item.cid})'>${item.cname}</a></li>`
            })
            console.log(document.getElementById('dropdown5'));
            document.getElementById('dropdown5').innerHTML = innerList;
            console.log(innerList)
        }else if(data.status == 300){
            new Toast().showMsg("没有该课程",1000);
        }
    },function(data,state){
        new Toast().showMsg("网络连接异常",1000);
    })
}


function searchAll(method,cid){

    if(cid==undefined){
        for(var i =0;i<keyData.length;i++){
            if(keyData[i].cname==document.getElementById('dropdownMenu5').value){
                cid=keyData[i].cid;
            }
        }
        if(cid==undefined){
            new Toast().showMsg("请输入有效课程",1000);
        }else{

        }
    }else{
        user.searchDoc(method,cid,1,1001,searchPage,function(data,state){
            docList = data.data;
            console.log(data)
            showList();
        },function(data,state){

        })
    }
}
function showList(){
    var list ='';
    docList.map((item,index)=>{
        list +=`<div class="panel panel-default mt leftblue">

            <div class="panel-body">
                <div class="row firstLine">
                    <div class="col-xs-4 bluefont">${item.fileinfo.name}</div>
                    <div class="col-xs-5 small date">${item.upperinfo.nickname} 上传于 ${item.fileinfo.uptime}</div>
                    <div class="col-xs-3">课件</div>
                </div>
                <div class="row firstLine">
                    <div class="col-xs-9 date small">${item.fileinfo.desc}</div>
                    <button type="button" class="btn btn-success col-xs-1">下载 </button>
                </div>
            </div>
        </div>`
    });
    document.getElementById('doc').innerHTML = list;
}
function topInput(i) {
    document.getElementById('dropdownMenu5').value=document.getElementsByClassName('topOption')[i].innerText
}