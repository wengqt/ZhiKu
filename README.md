# ZhiKu
a set of pages for JiPengZhiKu

## 接口文档
https://github.com/baka719/jpidea/blob/master/interface.md



###测试
 
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
    {username:'_a',pw:'aaaaa1'},