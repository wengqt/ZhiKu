

var baseUrl = 'http://719daze.me:8080';
var API = {
    



    //common
    login:baseUrl+`/login`,
    logout:`${baseUrl}/logout`,
    register:`${baseUrl}/register`,
    mailcheck:`${baseUrl}/mailcheck`,


    //需要权限
    uploadFile:`${baseUrl}/upload`,
    downloadFile:`${baseUrl}/filedl/{fid}`,
    searchDoc:`${baseUrl}/document/search`,
    docDetail:`${baseUrl}/document/detail/{fid}`,
    majorSearch:`${baseUrl}/document/coltomajor`,
    courseSearch:`${baseUrl}/document/coursesearch`,
    modifyFile:`${baseUrl}/document/modify/{fid}`,
    modifyUserInfo:`${baseUrl}/usermodify/{uid}`,
    getCollege:`${baseUrl}/document/getcollege`







}