$(function () {
    userInfoed();
})
/*用户信息*/
function userInfoed() {
    var token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).info : null;
    var objHeader = { "Authorization": 'Bearer ' + token };
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_GET_USER_INFO,
        type: "GET",
        headers: objHeader,
        dataType: "json",
        success: function (res) {
            if (res.status == Common.HTTP_VALUE_SUCCESS) {
                var data = res.data;
                $('#imgUser').attr('src', data.avatar);
                $('#nameUser').text(data.nickName);
                //$('#vipUser').text(data.levelName);
            } else {
                $.toast(res.message, "forbidden");
            }
        },
        error: function (err) {
            localStorage.clear();
        }
    })
}