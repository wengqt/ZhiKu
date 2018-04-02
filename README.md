# ZhiKu
a set of pages for JiPengZhiKu

## 接口文档
https://github.com/baka719/jpidea/blob/master/interface.md



### 测试  
 
1.用户名密码不正确 ->300  
    1）用户名密码都不正确  
        {username:'b1',pw:'111111'}  
    2)用户名正确密码不正确  
        {username:'_a',pw:'111111'}  

2.用户名密码正确，邮箱未激活 ->300  
    {username:'aa',pw:'aaaaa0'}  
3.用户被禁用  
    {username:'_',pw:'aaaaa2'}  
4.用户正常登陆  
    {username:'_a',pw:'aaaaa1'}  

### 站内信接口  
1.获取用户通知  
url:`getNotification/${userid}.do`  
method:`GET`  
request:  
```
{
	
}
```
responce:  
```
{
	"status" : 200 ,
	"message" : "success" ,
	"data" : [{
        "title":"aaa",
        "time":"时间戳",
        "content":"",
        "from":"通知来源",
        "read":"是否已读true(已读)/false",
        "nid":"通知id"
    },{}]
}
{
	"status" : 300 ,
	"message" : "服务器错误" ,
	"data" : null
}
```
2.站内信已读  
url:`readNotification/${userid}.do`  
method:`GET`  
request:  
```
{
	"noticeId":""
}
```
responce:  
```
{
	"status" : 200 ,
	"message" : "success" ,
	
}
{
	"status" : 300 ,
	"message" : "服务器错误" ,
	
}
```