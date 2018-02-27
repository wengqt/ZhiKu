

function testRegister(){
    var testCase = [
        {username:'aa',email:'w1906338209@gmail.com',phone:'13000000000',pw:'aaaaa0'},
        {username:'_a',email:'wengqt@foxmail.com',phone:'13000000001',pw:'aaaaa1'},
        {username:'_',email:'m17864154913@163.com',phone:'13000000002',pw:'aaaaa2'},
        {username:'',email:'1@0.cn',phone:'13010000000',pw:'aaaaaz'},
        {username:'aa',email:'w1906338209@gmail.com',phone:'13010001000',pw:'aaaaaa'},
        {username:'abcdeabcdeabcdeabcdea',email:'1@b.cn',phone:'13010002000',pw:'aaaaab'},
        {username:'~!@#$%^&*()_+-=',email:'1@c.cn',phone:'13010003000',pw:'aaaaac'},
        {username:'[];\',./<>?:"{}|\\',email:'1@d.cn',phone:'13010004000',pw:'aaaaad'},
        {username:'哈哈哈哈哈',email:'1@e.cnn',phone:'13010005000',pw:'aaaaae'},
        {username:'1a',email:'1@f.cn',phone:'13010006000',pw:'aaaaaf'},
        {username:'1',email:'1@g.cn',phone:'13010007000',pw:'aaaaag'},
        {username:'ba',email:'1@a.cn',phone:'13020001000',pw:'baaaaa'},
        {username:'ba',email:'',phone:'13020001000',pw:'baaaaa'},
        {username:'bb',email:'@b.cn',phone:'13020002000',pw:'baaaab'},
        {username:'bc',email:'2@.cn',phone:'13020003000',pw:'baaaac'},
        {username:'bd',email:'2@d.',phone:'13020004000',pw:'baaaad'},
        {username:'be',email:'2d.cn',phone:'13020005000',pw:'baaaae'},
        {username:'bf',email:'2@ecn',phone:'13020006000',pw:'baaaaf'},
        {username:'ca',email:'3@a.cn',phone:'',pw:'caaaaa'},
        {username:'cb',email:'3@b.cn',phone:'1303000200',pw:'caaaab'},
        {username:'cc',email:'3@c.cn',phone:'130300030000',pw:'caaaac'},
        {username:'cd',email:'3@d.cn',phone:'a3030004000',pw:'caaaad'},
        {username:'da',email:'4@a.cn',phone:'13040001000',pw:''},
        {username:'d2a',email:'4@a.cn',phone:'13040001000',pw:'wwe12345678901113546363'},
        {username:'da',email:'4@a.cn',phone:'13040001000',pw:'123'},
        {username:'da',email:'4@a.cn',phone:'13040001000',pw:'~!@#$%^&*()_+-='},
        {username:'da',email:'4@a.cn',phone:'13040001000',pw:'[];\',./<>?:"{}|\\'},
    ];

    testCase.map(function(item,index){
        console.log(item);
        document.getElementById('loginOption').children[0].click();
        $('[data-target="#regist"]').click();
        document.getElementById('r-user').value=item.username;
        document.getElementById('r-email').value=item.email;
        document.getElementById('r-phone').value=item.phone;
        document.getElementById('r-pw').value=item.pw;
        
        document.getElementById('register-btn').click();
        document.getElementById("closeRegister").click();

    })
    



}

function testLogin(){
    var testCase=[
        {username:'b1',pw:'111111'},
        {username:'_a',pw:'111111'},
        {username:'aa',pw:'aaaaa0'},
        {username:'_',pw:'aaaaa2'},
        {username:'_a',pw:'aaaaa1'}
    ];
    testCase.map(function(item,index){
        console.log(item);
        document.getElementById('userInput').value=item.username;
        document.getElementById('passwordInput').value = item.pw;
        document.getElementById('login-btn').click();
        if($.cookie(item.username)){
            logout();
        }
    })
    
    }