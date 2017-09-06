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



     class Toast{

         constructor(){

         }



         showMsg(msg,delay){
             var body = document.body;
             var Dom = document.createElement('div');
              Dom.innerHTML = `<section id="toast">
                            <div class="toast-item">
                                ${msg}
                        
                            </div>
                        </section>`;
             body.appendChild(Dom);
             if(delay){
                 setTimeout(function () {
                     document.getElementById('toast').remove();
                 },delay)
             }
         }
         removeMsg(){
             document.getElementById('toast').remove();
         }





     }













