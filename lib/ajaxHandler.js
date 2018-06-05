'use strict';

// console.log(API)

function checkLogin() {
    return !!localStorage.getItem('token');
}

function AjaxHandler() {
    function ajaxHandler() {}
    function getToken() {
        if (!!localStorage.getItem('token')) {
            return localStorage.getItem('token');
        }

        return null;
    }
    function handleTokenFailed(code) {
        if (code == 401) {
            localStorage.clear();
            new Toast().showMsg('登录信息已过期，请重新登录', 1000);
            setTimeout(function () {
                location.href = 'index.html';
            }, 1000);
        }
    }
    //无权限请求
    ajaxHandler.prototype.login = function (username, password, _success, failed) {
        _success = typeof _success === 'function' ? _success : new Function();
        failed = typeof failed === 'function' ? failed : new Function();

        // console.log({username,password})
        $.ajax({
            url: API.login,
            type: 'POST',
            data: { username: username, password: password },
            dataType: "JSON",
            // xhrFields: {
            //     withCredentials: true
            //  },
            success: function success(data, state) {
                _success(data, state);
            },
            error: function error(data, state) {
                failed(data, state);
            }
        });
    };

    ajaxHandler.prototype.logout = function (_success2, failed) {
        _success2 = typeof _success2 === 'function' ? _success2 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();
        $.ajax({
            url: API.logout,
            type: 'POST',
            data: { token: getToken() },
            dataType: "JSON",
            success: function success(data, state) {
                _success2(data, state);
            },
            error: function error(data, state) {
                failed(data, state);
            }
        });
    };

    ajaxHandler.prototype.register = function (_ref, _success3, failed) {
        var username = _ref.username,
            password = _ref.password,
            nickname = _ref.nickname,
            mail = _ref.mail,
            phone = _ref.phone,
            qq = _ref.qq,
            avator = _ref.avator;

        _success3 = typeof _success3 === 'function' ? _success3 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();

        $.ajax({
            url: API.register,
            type: 'POST',
            data: { username: username, password: password, nickname: null, mail: mail, phone: phone, qq: null, avator: null, xid: null, mid: null },
            dataType: "JSON",
            success: function success(data, state) {

                _success3(data, state);
            },
            error: function error(data, state) {

                failed(data, state);
            }
        });
    };

    ajaxHandler.prototype.news = function (num, _success4, failed) {
        _success4 = typeof _success4 === 'function' ? _success4 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();

        $.ajax({
            url: API.news,
            type: 'POST',
            data: { number: num },
            dataType: "JSON",
            success: function success(data, state) {

                _success4(data, state);
            },
            error: function error(data, state) {

                failed(data, state);
            }
        });
    };
    ajaxHandler.prototype.pushNews = function (url, date, title, details, _success5, failed) {
        _success5 = typeof _success5 === 'function' ? _success5 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();

        $.ajax({
            url: API.pushNews,
            type: 'POST',
            data: { url: url, date: date, title: title, details: details },
            dataType: "JSON",
            success: function success(data, state) {

                _success5(data, state);
            },
            error: function error(data, state) {

                failed(data, state);
            }
        });
    };

    ajaxHandler.prototype.mailcheck = function (_ref2, _success6, failed) {
        var username = _ref2.username,
            key = _ref2.key;

        _success6 = typeof _success6 === 'function' ? _success6 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();

        $.ajax({
            url: API.mailcheck,
            type: 'POST',
            data: { username: username, key: key },
            dataType: "JSON",
            success: function success(data, state) {
                _success6(data, state);
            },
            error: function error(data, state) {
                failed(data, state);
            }
        });
    };

    //有权限请求
    ajaxHandler.prototype.uploadFile = function (fileElelmentID, _ref3, _success7, failed) {
        var dname = _ref3.dname,
            teacher = _ref3.teacher,
            username = _ref3.username,
            origion = _ref3.origion,
            filedesc = _ref3.filedesc,
            course = _ref3.course;

        _success7 = typeof _success7 === 'function' ? _success7 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();
        var formData = new FormData();
        var file = document.getElementById('' + fileElelmentID).files[0];

        formData.append('file', file);
        formData.append('name', dname);
        formData.append('teacher', teacher);
        formData.append('upusername', username);
        formData.append('origin', origion);
        formData.append('desc', filedesc);
        formData.append('course', course);
        formData.append('token', getToken());

        // var sendData = {
        //     name:dname,
        //     file:formData,
        //     teacher,
        //     upusername:username,
        //     origin:origion,
        //     desc:filedesc,
        //     course,
        // };
        // console.log(document.getElementById(`${fileElelmentID}`).files[0]);
        // console.log(sendData)
        $.ajax({
            url: API.uploadFile,
            type: 'POST',
            data: formData,
            dataType: "JSON",
            contentType: false,
            processData: false, //为了保证formData能传过去 ，不加会报错
            success: function success(data, state) {
                handleTokenFailed(data.state);
                _success7(data, state);
            },
            error: function error(data, state) {
                failed(data, state);
            },
            xhr: function xhr() {
                this_xhr = $.ajaxSettings.xhr();
                if (this_xhr.upload) {
                    this_xhr.upload.addEventListener('progress', function (e) {
                        if (e.lengthComputable) {
                            var percent = Math.floor(e.loaded / e.total * 100);
                            if (percent <= 100) {
                                console.log('set progress', percent);
                                document.getElementById('pro').style.display = 'block';
                                $('#process').attr('aria-valuenow', percent).css('width', percent + '%').text(percent);
                            }
                            if (percent >= 100) {
                                console.log('文件上传完毕，请等待...');
                                document.getElementById('pro').style.display = 'none';
                            }
                        }
                    }, false);
                }
                return this_xhr;
            }
        });
    };
    ajaxHandler.prototype.getUserInfo = function (userName, _success8, failed) {
        _success8 = typeof _success8 === 'function' ? _success8 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();

        $.ajax({
            url: matchword(API.gerUserInfo, userName),
            type: 'GET',
            data: { token: getToken() },
            dataType: "JSON",
            // xhrFields: {
            //     withCredentials: true
            //  },
            success: function success(data, state) {
                handleTokenFailed(data.state);
                _success8(data, state);
            },
            error: function error(data, state) {
                failed(data, state);
            }
        });
    };
    ajaxHandler.prototype.getNotification = function (userName, _success9, failed) {
        _success9 = typeof _success9 === 'function' ? _success9 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();
        console.log(userName);
        $.ajax({
            url: matchword(API.getNotification, userName),
            type: 'GET',
            data: { token: getToken() },
            dataType: "JSON",
            // xhrFields: {
            //     withCredentials: true
            //  },
            success: function success(data, state) {
                handleTokenFailed(data.state);
                _success9(data, state);
            },
            error: function error(data, state) {
                failed(data, state);
            }
        });
    };
    ajaxHandler.prototype.readNotification = function (userName, nid, _success10, failed) {
        _success10 = typeof _success10 === 'function' ? _success10 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();

        $.ajax({
            url: matchword(API.readNotification, userName),
            type: 'GET',
            data: { "noticeId": nid, token: getToken() },
            dataType: "JSON",
            // xhrFields: {
            //     withCredentials: true
            //  },
            success: function success(data, state) {
                handleTokenFailed(data.state);
                _success10(data, state);
            },
            error: function error(data, state) {
                failed(data, state);
            }
        });
    };

    ajaxHandler.prototype.downloadFile = function (fileId, success, failed) {
        success = typeof success === 'function' ? success : new Function();
        failed = typeof failed === 'function' ? failed : new Function();
        console.log(matchword(API.filedownload, fileId));
        window.open(matchword(API.filedownload, fileId) + ('token=' + getToken()));
    };

    //弃用
    ajaxHandler.prototype.docDetail = function (fileId, _success11, failed) {
        _success11 = typeof _success11 === 'function' ? _success11 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();

        $.ajax({
            url: matchword(API.docDetail, fileId),
            type: 'GET',
            data: { token: getToken() },
            dataType: "JSON",
            success: function success(data, state) {
                handleTokenFailed(data.state);
                _success11(data, state);
            },
            error: function error(data, state) {
                failed(data, state);
            }
        });
    };
    //弃用
    ajaxHandler.prototype.modifyFile = function (fileId, _ref4, _success12, failed) {
        var name = _ref4.name,
            model = _ref4.model,
            teacher = _ref4.teacher,
            course = _ref4.course,
            docformat = _ref4.docformat,
            fileformat = _ref4.fileformat,
            upuid = _ref4.upuid,
            origin = _ref4.origin,
            desc = _ref4.desc;

        _success12 = typeof _success12 === 'function' ? _success12 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();
        $.ajax({
            url: matchword(API.modifyFile, fileId),
            type: 'POST',
            data: { name: name, model: model, teacher: teacher, course: course, docformat: docformat, fileformat: fileformat, upuid: upuid, origin: origin, desc: desc, token: getToken() },
            dataType: "JSON",
            success: function success(data, state) {
                handleTokenFailed(data.state);
                _success12(data, state);
            },
            error: function error(data, state) {
                failed(data, state);
            }
        });
    };

    ajaxHandler.prototype.modifyUserInfo = function (username, _ref5, _success13, failed) {
        var nickname = _ref5.nickname,
            oldpwd = _ref5.oldpwd,
            newpwd = _ref5.newpwd,
            avator = _ref5.avator,
            mail = _ref5.mail,
            phone = _ref5.phone,
            qq = _ref5.qq,
            xid = _ref5.xid,
            mid = _ref5.mid;

        _success13 = typeof _success13 === 'function' ? _success13 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();

        $.ajax({
            url: matchword(API.modifyUserInfo, username),
            type: 'POST',
            data: { nickname: nickname, oldpwd: oldpwd, newpwd: newpwd, avator: avator, mail: mail, phone: phone, qq: qq, xid: xid, mid: mid, token: getToken() },
            dataType: "JSON",
            success: function success(data, state) {
                handleTokenFailed(data.state);
                _success13(data, state);
            },
            error: function error(data, state) {
                failed(data, state);
            }
        });
    };

    ajaxHandler.prototype.getCollegeList = function (_success14, failed) {
        _success14 = typeof _success14 === 'function' ? _success14 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();
        $.ajax({
            url: API.getCollege,
            type: 'GET',
            data: {},
            dataType: "JSON",

            success: function success(data, state) {
                _success14(data, state);
            },
            error: function error(data, state) {
                failed(data, state);
            }
        });
    };

    //用于匹配{}
    function matchword(url, real) {
        var ind = url.indexOf('{');
        var sub = url.substring(0, ind);
        return sub + real + '.do';
    }

    //搜索接口待定
    //关键词搜索返回选项列表
    ajaxHandler.prototype.courseSearch = function (keyword, _success15, failed) {
        _success15 = typeof _success15 === 'function' ? _success15 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();
        $.ajax({
            url: API.courseSearch,
            type: 'GET',
            data: { keyword: keyword },
            dataType: "JSON",
            success: function success(data, state) {
                _success15(data, state);
            },
            error: function error(data, state) {
                failed(data, state);
            }
        });
    };

    ajaxHandler.prototype.searchDoc = function (method, course, college, major, page, _success16, failed) {
        _success16 = typeof _success16 === 'function' ? _success16 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();
        $.ajax({
            url: API.searchDoc,
            type: 'GET',
            data: { method: method, course: course, college: college, major: major, page: page },
            dataType: "JSON",
            success: function success(data, state) {
                // console.log(data,state)
                _success16(data, state);
            },
            error: function error(data, state) {
                failed(data, state);
            }
        });
    };
    ajaxHandler.prototype.majorSearch = function (xid, _success17, failed) {
        _success17 = typeof _success17 === 'function' ? _success17 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();
        $.ajax({
            url: API.majorSearch,
            type: 'get',
            data: { xid: xid },
            dataType: 'json',
            success: function success(data, state) {
                _success17(data, state);
            },
            error: function error(data, state) {
                failed(data, state);
            }
        });
    };
    //弃用
    ajaxHandler.prototype.fileDownload = function (fileId, _success18, failed) {
        _success18 = typeof _success18 === 'function' ? _success18 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();
        console.log(matchword(API.filedownload, fileId));
        $.ajax({
            url: matchword(API.filedownload, fileId),
            type: 'GET',
            data: {},
            dataType: "JSON",
            success: function success(data, state) {
                console.log(fileId);

                _success18(data, state);
            },
            error: function error(data, state) {
                failed(data, state);
            }
        });
    };

    ajaxHandler.prototype.getDownloadList = function (username, page, _success19, failed) {
        _success19 = typeof _success19 === 'function' ? _success19 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();
        $.ajax({
            url: API.getDownloadList,
            type: 'GET',
            data: { username: username, page: page, token: getToken() },
            dataType: "JSON",
            // xhrFields: {
            //     withCredentials: true
            //  },
            success: function success(data, state) {
                handleTokenFailed(data.state);
                _success19(data, state);
            },
            error: function error(data, state) {
                failed(data, state);
            }
        });
    };

    ajaxHandler.prototype.getUploadList = function (username, page, _success20, failed) {
        _success20 = typeof _success20 === 'function' ? _success20 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();

        $.ajax({
            url: API.getUploadList,
            type: 'GET',
            data: { username: username, page: page, token: getToken() },
            dataType: "JSON",
            // xhrFields: {
            //     withCredentials: true
            //  },
            success: function success(data, state) {
                handleTokenFailed(data.state);
                _success20(data, state);
            },
            error: function error(data, state) {
                failed(data, state);
            }
        });
    };

    ajaxHandler.prototype.deleteDocument = function (fid, _success21, failed) {
        _success21 = typeof _success21 === 'function' ? _success21 : new Function();
        failed = typeof failed === 'function' ? failed : new Function();
        console.log(matchword(API.deleteDocument, fid));
        $.ajax({
            url: matchword(API.deleteDocument, fid),
            type: 'GET',
            data: { token: getToken() },
            dataType: "JSON",
            // xhrFields: {
            //     withCredentials: true
            //  },
            success: function success(data, state) {
                handleTokenFailed(data.state);
                _success21(data, state);
            },
            error: function error(data, state) {
                failed(data, state);
            }
        });
    };

    return new ajaxHandler();
}