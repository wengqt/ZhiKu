'use strict';

//滚动条在Y轴上的滚动距离
var state = 0;
var uploadPage = 1;
var downloadPage = 1;
var uploadDIv = 0;
var isLoading = false;
var upContent = '';
var downContent = '';
var mid, xid;
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
        if (state == 1) {

            if (!isLoading) {
                isLoading = true;
                uploadPage++;
                console.log(uploadPage);
                getUpLoadList();
            }
        } else if (state == 2) {

            if (!isLoading) {
                isLoading = true;
                downloadPage++;
                getDownLoadList();
            }
        }
    }
};

var username = $.cookie('username');

document.getElementById('saveInfo').onclick = function () {

    var nickname = document.getElementsByTagName('input')[0].value == '' ? null : document.getElementsByTagName('input')[0].value;
    var newpwd = document.getElementsByTagName('input')[3].value == '' ? null : document.getElementsByTagName('input')[3].value;
    var avator = '';
    var qq = document.getElementsByTagName('input')[2].value == '' ? null : document.getElementsByTagName('input')[2].value;

    // var email=document.getElementsByTagName('input')[1].value;
    var phone = document.getElementsByTagName('input')[1].value == '' ? null : document.getElementsByTagName('input')[1].value;
    var oldpwd = document.getElementsByTagName('input')[4].value;
    var obj = { nickname: nickname, oldpwd: oldpwd, newpwd: newpwd, avator: avator, phone: phone, qq: qq, xid: xid, mid: mid };
    if (newpwd != null) {
        if (newpwd.length < 6 || newpwd.length > 18) {
            console.log("密码长度必须是6-18位");
            new Toast().showMsg("密码长度必须是6-18位", 2000);
            return;
        }
    } else {
        obj = { nickname: nickname, oldpwd: oldpwd, avator: avator, phone: phone, qq: qq, xid: xid, mid: mid };
    }
    var reg1 = /^\d*$/g;
    if (phone != null) {
        if (phone.length !== 11 || !reg1.test(phone)) {
            console.log("手机号有误");
            new Toast().showMsg("手机号有误", 2000);
            return;
        }
    }

    var user = new AjaxHandler();
    if (oldpwd.trim() != '') {
        console.log(obj);
        user.modifyUserInfo(username, obj, function (data, state) {

            console.log(data);
            if (data.status == 200) {
                new Toast().showMsg('修改信息成功', 1000);
            } else if (data.status == 300) {
                new Toast().showMsg('密码输出错误', 1000);
            }
        }, function (data, state) {
            new Toast().showMsg('网络连接异常', 1000);
        });
    } else {
        console.log('请输入密码再修改信息');
        new Toast().showMsg('请输入密码再修改信息', 1000);
    }
};

function getInfo() {
    var user = new AjaxHandler();
    user.getUserInfo(username, function (data) {
        if (data.status == 200) {
            var info = data.data;
            console.log(info);
            document.getElementsByTagName('input')[0].placeholder = info.nickname;
            document.getElementsByTagName('input')[1].placeholder = info.phone;
            document.getElementsByTagName('input')[2].placeholder = info.qq;
            $('#dropdownMenu1').html(info.xname + '<span class="caret"></span>');
            $('#dropdownMenu2').html(info.mname + '<span class="caret"></span>');

            xid = info.xid;
            mid = info.mid;
            // document.getElementsByTagName('input')[3].placeholder = info.qq;
        } else if (data.status == 300) {
            new Toast().showMsg('获取个人信息失败', 1000);
        }
    }, function (data) {
        new Toast().showMsg('网络连接异常', 1000);
    });
}
getInfo();
function getUpLoadList() {
    var upload = new AjaxHandler();

    upload.getUploadList(username, uploadPage, function (data, state) {

        console.log(data);
        if (data.data == null) {
            data.data = [];
        }
        // var content='';
        // if(data.data.length==0) uploadPage--;
        for (var i = 0; i < data.data.length; i++) {
            uploadDIv++;
            upContent += '<div class="panel panel-default mt leftblue">\n                                        <div class="panel-body">\n                                            <div class=" firstLine">\n                                                <div class="col-xs-12 col-ms-4 bluefont">' + data.data[i].fileinfo.name + '</div>\n                                                <div class="col-xs-12 col-ms-5 small date">' + data.data[i].upuid + ' \u4E0A\u4F20\u4E8E ' + data.data[i].fileinfo.uptime + '</div>\n                                                <div class="col-xs-12 col-ms-3">\u8BFE\u4EF6' + data.data[i].fid + '</div>\n                                            </div>\n                                            <div class=" firstLine">\n                                                <div class="col-xs-9 date small">' + data.data[i].fileinfo.course + '</div>\n                                                <button type="button" onclick="deleteDoc(this)" class="btn btn-danger ">\u5220\u9664 </button>\n                                            </div>\n                                            \n                                        </div>\n                                    </div>';
        }
        document.getElementById('upload').innerHTML = upContent;
        isLoading = false;
    }, function (data, state) {
        console.log(data);
    });
}

function getDownLoadList() {
    var download = new AjaxHandler();
    download.getDownloadList(username, downloadPage, function (data, state) {
        console.log(data.data);
        // var content='';
        console.log(downloadPage);
        if (data.data == null) {
            data.data = [];
        }
        // if(data.data.length==0) downloadPage--;
        for (var i = 0; i < data.data.length; i++) {
            downContent += '<div class="panel panel-default mt leftblue">\n                                        <div class="panel-body">\n                                            <div class=" firstLine">\n                                                <div class="col-xs-12 col-ms-4 bluefont">' + data.data[i].fileinfo.name + '</div>\n                                                <div class="col-xs-12 col-ms-5 small date">' + data.data[i].upuid + ' \u4E0A\u4F20\u4E8E ' + data.data[i].fileinfo.uptime + '</div>\n                                                <div class="col-xs-12 col-ms-3">\u8BFE\u4EF6</div>\n                                            </div>\n                                            <div class=" firstLine">\n                                                <div class="col-xs-9 date small">' + data.data[i].fileinfo.course + '</div>\n                                                <button type="button" onclick=\'downloadfile(' + data.data[i].fid + ')\' class="btn btn-success">\u4E0B\u8F7D </button>\n                                            </div>\n                                          \n                                        </div>\n                                    </div>';
        }

        document.getElementById('download').innerHTML = downContent;
        isLoading = false;
    }, function (data, state) {
        console.log(data);
    });
}
var da = [{
    text: '111',
    value: Math.random(),
    category: 'a'
}, {
    text: '333',
    value: Math.random(),
    category: 'b'
}, {
    text: '222',
    value: Math.random(),
    category: 'b'
}, {
    text: '444',
    value: Math.random(),
    category: 'a'
}, {
    text: '555',
    value: Math.random(),
    category: 'a'
}, {
    text: '555',
    value: Math.random(),
    category: 'a'
}, {
    text: '555',
    value: Math.random(),
    category: 'a'
}, {
    text: '555',
    value: Math.random(),
    category: 'a'
}, {
    text: '555',
    value: Math.random(),
    category: 'a'
}, {
    text: '555',
    value: Math.random(),
    category: 'a'
}, {
    text: '555',
    value: Math.random(),
    category: 'a'
}, {
    text: '555',
    value: Math.random(),
    category: 'a'
}, {
    text: '555',
    value: Math.random(),
    category: 'a'
}, {
    text: '555',
    value: Math.random(),
    category: 'a'
}];
var d2 = [{
    month: 'Jan',
    upload: 7.0,
    download: 3.9
}, {
    month: 'Feb',
    upload: 6.9,
    download: 4.2
}, {
    month: 'Mar',
    upload: 9.5,
    download: 5.7
}, {
    month: 'Apr',
    upload: 14.5,
    download: 8.5
}, {
    month: 'May',
    upload: 18.4,
    download: 11.9
}, {
    month: 'Jun',
    upload: 21.5,
    download: 15.2
}, {
    month: 'Jul',
    upload: 25.2,
    download: 17.0
}, {
    month: 'Aug',
    upload: 26.5,
    download: 16.6
}, {
    month: 'Sep',
    upload: 23.3,
    download: 14.2
}, {
    month: 'Oct',
    upload: 18.3,
    download: 10.3
}, {
    month: 'Nov',
    upload: 13.9,
    download: 6.6
}, {
    month: 'Dec',
    upload: 9.6,
    download: 4.8
}];
var da3 = [{
    item: '事例一',
    count: 40
}, {
    item: '事例二',
    count: 21
}, {
    item: '事例三',
    count: 17
}, {
    item: '事例四',
    count: 13
}, {
    item: '事例五',
    count: 9
}];
var option = document.getElementsByClassName("option");
for (var i = 0; i < option.length; i++) {
    (function (e) {
        option[e].onclick = function () {

            option[e].className = "active option";
            option[(e + 1) % option.length].className = "option";
            option[(e + 2) % option.length].className = "option";
            option[(e + 3) % option.length].className = "option";
            option[(e + 4) % option.length].className = "option";
            // console.log(option[(e+1)%option.length])
            switch (e) {
                case 0:
                    document.getElementById("info").style.display = "block";
                    document.getElementById("upload").style.display = "none";
                    document.getElementById("download").style.display = "none";
                    document.getElementById("notice").style.display = "none";
                    document.getElementById("data").style.display = "none";
                    break;
                case 1:
                    state = 1;
                    document.getElementById("info").style.display = "none";
                    document.getElementById("upload").style.display = "block";
                    document.getElementById("download").style.display = "none";
                    document.getElementById("notice").style.display = "none";
                    document.getElementById("data").style.display = "none";
                    upContent = '';
                    downContent = '';
                    uploadPage = 1;
                    downloadPage = 1;
                    getUpLoadList();

                    break;
                case 2:
                    state = 2;
                    document.getElementById("info").style.display = "none";
                    document.getElementById("upload").style.display = "none";
                    document.getElementById("notice").style.display = "none";
                    document.getElementById("download").style.display = "block";
                    document.getElementById("data").style.display = "none";
                    upContent = '';
                    downContent = '';
                    uploadPage = 1;
                    downloadPage = 1;
                    getDownLoadList();

                    break;
                case 3:
                    document.getElementById("info").style.display = "none";
                    document.getElementById("upload").style.display = "none";
                    document.getElementById("notice").style.display = "block";
                    document.getElementById("download").style.display = "none";
                    document.getElementById("data").style.display = "none";
                    getNotice();
                    break;
                case 4:
                    document.getElementById("info").style.display = "none";
                    document.getElementById("upload").style.display = "none";
                    document.getElementById("notice").style.display = "none";
                    document.getElementById("download").style.display = "none";
                    document.getElementById("data").style.display = "block";
                    // console.log('data')
                    document.getElementById('word').innerHTML = '<p style="font-size:30px;color:lightgray;text-align:center;margin-top:100px;">\u6B63\u5728\u83B7\u53D6\u8BCD\u4E91</p>';
                    document.getElementById('line').innerHTML = '<p style="font-size:30px;color:lightgray;text-align:center;margin-top:100px;">\u6B63\u5728\u83B7\u53D6\u4E0A\u4F20\u4E0B\u8F7D\u6570\u636E</p>';
                    document.getElementById('pie').innerHTML = '<p style="font-size:30px;color:lightgray;text-align:center;margin-top:100px;">\u6B63\u5728\u83B7\u53D6\u997C\u56FE</p>';
                    getCharts();
                    break;
            }
        };
    })(i);
}

function deleteDoc(e) {
    var user = new AjaxHandler();
    var fid = e.parentNode.previousSibling.previousSibling.lastChild.previousSibling.innerHTML.substr(2);
    console.log(fid);
    user.deleteDocument(fid, function (data, state) {
        console.log(data);
        if (data.status == 200) {
            new Toast().showMsg('删除成功', 1000);
            e.innerText = '已删除';
        } else if (data.status == 300) {
            new Toast().showMsg('文件不存在或已删除', 1000);
        }
    }, function (data, state) {
        console.log(data);
        new Toast().showMsg('网络连接超时', 1000);
    });
    console.log(e.parentNode.previousSibling.previousSibling.lastChild.previousSibling.innerHTML.substr(2));
}

function downloadfile(fid) {
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
}

function changeMajor(xxid, mmid) {
    xid = xxid;
    mid = mmid;
}

function getNotice() {
    new AjaxHandler().getNotification($.cookie('username'), function (data) {
        if (data.status === 200) {
            notice.data = data.data;
        } else {
            new Toast().showMsg(data.message, 1000);
        }
    }, function () {
        new Toast().showMsg('网络异常', 1000);
    });
}

function readNotice(nid) {
    new AjaxHandler().readNotification($.cookie('username'), nid, function (data) {
        if (data.status === 200) {
            new Toast().showMsg(data.message, 1000);
            getNotice();
        } else {
            new Toast().showMsg(data.message, 1000);
        }
    }, function () {
        new Toast().showMsg('网络异常', 1000);
    });
}