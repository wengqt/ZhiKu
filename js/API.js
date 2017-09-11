

var baseUrl = 'http://719daze.me:8080/JPidea';
var API = {

    //common
    login:baseUrl+`/login.do`,//
    logout:`${baseUrl}/logout.do`,//
    register:`${baseUrl}/register.do`,//
    mailcheck:`${baseUrl}/mailcheck.do`,//


    //需要权限
    uploadFile:`${baseUrl}/upload.do`,//
    downloadFile:`${baseUrl}/getdld`,//
    searchDoc:`${baseUrl}/document/search.do`,//
    docDetail:`${baseUrl}/document/detail/{fid}`,//
    majorSearch:`${baseUrl}/document/coltomajor.do`,//
    courseSearch:`${baseUrl}/document/coursesearch.do`,//
    modifyFile:`${baseUrl}/document/modify/{fid}`,//
    modifyUserInfo:`${baseUrl}/usermodify/{username}`,//
    getCollege:`${baseUrl}/document/getcollege.do`,//
    fileDownload:`${baseUrl}/filedl/{fid}`,
    getDownloadList:`${baseUrl}/getdld`,
    getUploadList:`${baseUrl}/getupld`,
    deleteDocument:`${baseUrl}/getupld\del\{fid}`,
}