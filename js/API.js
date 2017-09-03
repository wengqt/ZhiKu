

var baseUrl = 'http://123.206.229.207:8080/jpidea';
var API = {
    base:baseUrl,



    //common
    login:`${this.base}/login`,
    logout:`${this.base}/logout`,
    register:`${this.base}/register`,
    mailcheck:`${this.base}/mailcheck`,


    //需要权限
    uploadFile:`${this.base}/upload`,
    downloadFile:`${this.base}/filedl/{fid}`,
    searchDoc:`${this.base}/document/search`,
    docDetail:`${this.base}/document/detail/{fid}`,
    majorSearch:`${this.base}/document/coltomajor`,
    courseSearch:`${this.base}/document/coursesearch`,
    modifyFile:`${this.base}/document/modify/{fid}`,
    modifyUserInfo:`${this.base}/usermodify/{uid}`,
    getCollege:`${this.base}/document/getcollege`







}