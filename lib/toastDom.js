'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by weng on 2017/9/5.
 * 通知系统
 * 每当有事件响应或者后台数据的传入的时候
 * 都会弹出一个黑色的toast框来告诉用户
 * 当前的状态
 *
 * delay可有可无 单位ms
 *
 * 如果无delay 一定记住要调用toast.removeMsg()
 *
 *
 *
 * 使用时一定要引入toast.css
 */

var Toast = function () {
    function Toast() {
        _classCallCheck(this, Toast);
    }

    _createClass(Toast, [{
        key: 'showMsg',
        value: function showMsg(msg, delay) {
            var body = document.body;
            var Dom = document.createElement('div');
            Dom.innerHTML = '<section id="toast">\n                            <div class="toast-item">\n                                ' + msg + '\n                        \n                            </div>\n                        </section>';
            body.appendChild(Dom);
            if (delay) {
                setTimeout(function () {
                    document.getElementById('toast').remove();
                }, delay);
            }
        }
    }, {
        key: 'removeMsg',
        value: function removeMsg() {
            document.getElementById('toast').remove();
        }
    }]);

    return Toast;
}();