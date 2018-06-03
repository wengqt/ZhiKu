"use strict";

var notice = {
    data: []

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

};Object.defineProperty(notice, "data", {
    get: function get() {
        return data;
    },
    set: function set(value) {
        data = value;
        console.log("set:", data);
        updataNotice();
    }
});

function updataNotice() {
    var str = '';
    notice.data.map(function (item, index) {
        str += "<div class=\"panel " + (item.read ? 'panel-default' : 'panel-info') + " \">\n        <div class=\"panel-heading\">\n          <h3 class=\"panel-title\">" + item.title + "</h3>\n        </div>\n        <div class=\"panel-body\">\n            <p>From:  " + item.from + "    <small class=\"small-gray\">" + item.time + "</small> </p>\n            <p>" + item.content + "</p>              \n            " + (item.read ? '' : '<button class="btn btn-info left-bottom read" onclick="readNotice(' + ("" + item.nid) + ')" >标记为已读</button>') + "\n        </div>\n      </div>";
    });
    document.getElementById('notice').innerHTML = str;
}