'use strict';

var searchPage = 1;
var method, course, xid, mid, page;
var keyword;
var isLoading = false;

function selectAct(a, num, id) {
    var s1 = a.innerText;
    var k = a.parentNode.parentNode.dataset.drop;
    $('#' + k).html(s1 + '<span class="caret"></span>');
    if (num == 1) {
        getMajorList(id);
        xid = id;
    } else {
        console.log(window.location.pathname);
        if (window.location.pathname == prefix + '/personalCenter.html') {

            changeMajor(xid, id);
        } else {
            searchBymajor(id);
        }
    }
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
    var param = url.substring(i + 1, i + 2);
    console.log(param);
    switchSourse(param);
    if (url.substr(-19) != 'searchResourse.html') {
        getCollegeList();
    }
};

function getCollegeList() {
    var user = new AjaxHandler();

    user.getCollegeList(function (data, state) {
        console.log(data.data);
        console.log("获取college success");
        var content = '';
        for (var i = 0; i < data.data.length; i++) {
            content += '<li><a href="javascript:void(0)"  onclick="selectAct(this,1,' + data.data[i].xid + ')">' + data.data[i].xname + '</a></li>';
        }
        document.getElementById('college').innerHTML = content;
    }, function () {
        console.log("获取college failed");
    });
}
var keyData; //存放搜索框数据
var docList; //存放搜索到的文档列表
var keycname;

var user = new AjaxHandler();
if (document.getElementById('dropdownMenu5')) {
    document.getElementById('dropdownMenu5').oninput = function () {
        var key = document.getElementById('dropdownMenu5').value;
        if (key.trim() != '') {} else {
            key = 'ALL';
            console.log(key);
        }
        user.courseSearch(key, function (data, state) {
            if (data.status == 200) {
                var innerList = '';
                keyData = data.data;
                // console.log(keyData);

                data.data.map(function (item, index) {

                    innerList += '<li><a href="javascript:void(0)" class="topOption" onclick=\'searchAll(1,' + item.cid + ',"' + item.cname + '")\'>' + item.cname + '</a></li>';
                });
                document.getElementById('dropdown5').innerHTML = innerList;
            } else if (data.status == 300) {
                new Toast().showMsg("没有该课程", 1000);
            }
        }, function (data, state) {
            new Toast().showMsg("网络连接异常", 1000);
        });
    };
    document.getElementById('searchBtn').onclick = function () {
        if (document.getElementById('dropdownMenu5').value.trim() == '') {
            new Toast().showMsg("请输入课程", 1000);
        } else {
            searchAll(3, undefined, document.getElementById('dropdownMenu5').value.trim());
        }
    };
}

function searchAll(meth, cid, kcnm) {
    console.log(meth);
    if (meth == 3) {
        console.log(kcnm);
        document.getElementById('dropdownMenu5').value = kcnm;
        console.log(document.getElementById('dropdownMenu5').value);
    }
    if (cid == undefined) {
        for (var i = 0; i < keyData.length; i++) {
            if (keyData[i].cname.toLowerCase() == document.getElementById('dropdownMenu5').value.toLowerCase()) {
                cid = keyData[i].cid;
                new Toast().showMsg("正在获取列表", 1000);

                docList = [];
                method = meth;
                course = cid;
                xid = 1;
                mid = 1001;
                searchPage = 1;
                searchDocument(searchPage);
                new Toast().showMsg("正在获取列表", 1000);
            }
        }
        if (cid == undefined) {
            //new Toast().showMsg("请输入有效课程",1000);
            docList = [];
            method = meth;
            searchPage = 1;
            keyword = kcnm;
            searchByTag(kcnm, searchPage);
        } else {}
    } else {
        docList = [];
        method = meth;
        course = cid;
        xid = 1;
        mid = 1001;
        searchPage = 1;
        searchDocument(searchPage);
        new Toast().showMsg("正在获取列表", 1000);
        // user.searchDoc(method,cid,1,1001,searchPage,function(data,state){
        //     docList = data.data;
        //     // console.log(data)

        //     showList();
        // },function(data,state){

        // })
    }
}
function searchBymajor(maid) {
    docList = [];
    method = 2;
    course = null;
    mid = maid;
    searchPage = 1;
    searchDocument(searchPage);
}

function searchByTag(kw, page) {
    var user = new AjaxHandler();
    console.log(method);
    user.searchTag(kw, page, function (data) {
        if (data.status == 200) {
            docList = docList.concat(data.data);
            console.log(data.data);
            console.log(docList);
            showList();
            isLoading = false;
        }
    }, function () {});
}

function searchDocument(page) {
    var user = new AjaxHandler();
    console.log(method);

    if (method != undefined) {
        user.searchDoc(method, course, xid, mid, page, function (data) {
            if (data.status == 200) {
                docList = docList.concat(data.data);
                console.log(data.data);
                console.log(docList);
                console.log(method, course, xid, mid, page);
                showList();
                isLoading = false;
            } else {
                console.log('no file');
            }
        }, function () {});
    }
}

function showList() {
    var list = '';
    docList.map(function (item, index) {
        list += '<div class="panel panel-default mt leftblue">\n\n            <div class="panel-body">\n                <div class=" firstLine">\n                    <div class="col-xs-12 col-ms-4 bluefont">' + item.fileinfo.name + '</div>\n                    <div class="col-xs-12 col-ms-5 small date">' + item.upperinfo.nickname + ' \u4E0A\u4F20\u4E8E ' + item.fileinfo.uptime + '</div>\n                    <div class="col-xs-12 col-ms-3">\u8BFE\u4EF6 \u4E0B\u8F7D\u91CF' + item.fileinfo.dncnt + '</div>\n                    \n                </div>\n                <div class=" firstLine">\n                    <div class="col-xs-8 date small">' + item.fileinfo.desc + '</div>\n                    <button type="button" onclick=\'preview(' + item.fid + ')\' class="btn btn-info" style="margin-right:5px"> \u9884\u89C8 </button>\n                    <button type="button" onclick=\'downloadfile(' + item.fid + ')\' class="btn btn-success">\u4E0B\u8F7D </button>\n                </div>\n            </div>\n        </div>';
    });
    document.getElementById('doc').innerHTML = list;
}
function topInput(i) {
    document.getElementById('dropdownMenu5').value = document.getElementsByClassName('topOption')[i].innerText;
}

function getMajorList(xid) {
    var user = new AjaxHandler();
    user.majorSearch(xid, function (data) {
        if (data.status == 200) {
            console.log(data.data);
            var majorList = '';
            for (var j = 0; j < data.data.length; j++) {
                majorList += '<li><a href="javascript:void(0)"  onclick="selectAct(this,2,' + data.data[j].mid + ')">' + data.data[j].mname + '</a></li>';
            }
            document.getElementById('majorList').innerHTML = majorList;
        }
    }, function () {});
}

//瀑布流加载


function getScrollTop() {
    var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}
//文档的总高度
function getScrollHeight() {
    var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = bodyScrollHeight - documentScrollHeight > 0 ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}
//浏览器视口的高度
function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}
window.onscroll = function () {

    if (getScrollTop() + getWindowHeight() + 0.1 >= getScrollHeight()) {

        if (!isLoading) {
            isLoading = true;
            searchPage++;
            console.log(searchPage);
            if (method == 3) {
                searchByTag(keyword, searchPage);
            } else {
                searchDocument(searchPage);
            }
        }
    }
};
function downloadfile(fid, open) {
    if (!checkLogin()) {
        new Toast().showMsg('请先登录', 1000);
        return;
    }

    var user = new AjaxHandler();
    console.log(fid);
    user.downloadFile(fid, function (data, state) {

        console.log(data, state);
        // var a = document.createElement('a');
        // var url = API.fileDownload+`${fid}.do`;
        // a.href = url;
        //  a.download = fileName;
        // a.click();
    }, function () {});
    if (arguments.length == 2) {
        return;
    }
    user.getRecommend(fid, function (data, state) {
        var files = data.data.files;
        var blogs = data.data.blogs;
        if (data.status == 300) {
            new Toast().showMsg('暂无推荐', 1500);
        }
        if (Array.isArray(files) && files.length != 0) {
            var doc_div = document.getElementById('doc-list');
            doc_div.innerHTML = '';
            files.map(function (item) {

                var temp = '<a href="javascript:downloadfile(' + item.fid + ',1)" class="list-group-item ">\n                <h4 class="list-group-item-heading">' + item.fileinfo.name + '</h4>\n                <p class="list-group-item-text">\u4E0A\u4F20\u81EA\uFF1A' + item.nickname + '\t\t\u4E0B\u8F7D\uFF1A' + item.fileinfo.dncnt + '\u6B21</p>\n                <p class="list-group-item-text">\u63CF\u8FF0\uFF1A' + item.fileinfo.desc + '</p>\n            </a>';
                doc_div.innerHTML += temp;
            });
        } else {
            var doc_div = document.getElementById('doc-list');
            doc_div.innerHTML = '<a class="list-group-item ">\n            <h4 class="list-group-item-heading" style="color:lightgray">\u6682\u65E0\u63A8\u8350\u6587\u6863</h4></a>';
        }
        if (Array.isArray(blogs) && blogs.length != 0) {
            var blog_div = document.getElementById('blog-list');
            blog_div.innerHTML = '';
            blogs.map(function (item) {
                var temp = '<a href="javascript:openPage(\'' + item.url + '\')" class="list-group-item ">\n                <h4 class="list-group-item-heading">' + item.title + '</h4>\n                <p class="list-group-item-text">\u65F6\u95F4\uFF1A' + item.date + '\t\t\u4F5C\u8005\uFF1A' + item.auth + '\t\t\u6D4F\u89C8\u91CF\uFF1A' + item.scancut + '\u6B21</p>\n                <p class="list-group-item-text">\u94FE\u63A5\uFF1A' + item.url + '</p>\n            </a>';
                blog_div.innerHTML += temp;
            });
        } else {
            var blog_div = document.getElementById('blog-list');
            blog_div.innerHTML = '<a class="list-group-item ">\n            <h4 class="list-group-item-heading" style="color:lightgray">\u6682\u65E0\u63A8\u8350\u535A\u5BA2</h4></a>';
        }

        // var blog_h = document.getElementById('blog-recom').offsetHeight;
        // var file_h = document.getElementById('doc-recom').offsetHeight;
        // var all_h =  blog_h>file_h?blog_h:file_h;
        // document.getElementById('blog-recom').style.height=all_h+'px';
        // document.getElementById('doc-recom').style.height=all_h+'px';
        $('#recommend-btn').click();
    }, function (data) {
        new Toast().showMsg("网络异常,推荐失败", 1500);
    });
}

function preview(fid) {
    window.open('preview.html?' + fid);
}
function openPage(url) {
    window.open(url);
}