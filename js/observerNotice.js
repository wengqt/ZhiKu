var notice={
    data:[]
}

// {
//     "title":"aaa",
//     "time":"时间戳",
//     "content":"",
//     "from":"通知来源",
//     "read":false,
//     "nid":"111222"
// },{ "title":"bbb",
// "time":"时间戳",
// "content":"",
// "from":"通知来源",
// "read":true,
// "nid":"223223"}

Object.defineProperty(notice,"data",{
    get:function(){
        return data;
    },
    set:function(value){
        data=value;
        console.log("set:",data);
        updataNotice();
    }
})

function updataNotice(){
    var str = '';
    notice.data.map((item,index)=>{
        str+=`<div class="panel ${item.read?'panel-default':'panel-info'} ">
        <div class="panel-heading">
          <h3 class="panel-title">${item.title}</h3>
        </div>
        <div class="panel-body">
            <p>From:  ${item.from}    <small class="small-gray">${item.time}</small> </p>
            <p>${item.content}</p>              
            ${item.read?'':'<button class="btn btn-info left-bottom read" onclick="readNotice('+`${item.nid}`+')" >标记为已读</button>'}
        </div>
      </div>`
    })
    document.getElementById('notice').innerHTML=str;
}