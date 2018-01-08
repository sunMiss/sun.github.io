$(function () {
    var orderId = Common.getQueryString("orderId");

    var param = {
        ShoppingCartIdList: orderId
    }
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_POST_ADD_PREVIEW_ORDER,
        dataType: "json",
        contentType: "text/json",
        type: "POST",
        data: JSON.stringify(param),
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        success: function (data) {
            InitLogisticsInfo(data);
        },
        error: function () {
            console.log("请求失败")
        }
    })
})


function InitLogisticsInfo(data) {


}




$('#LogisNav').on('click', 'li', function () {
    var i = $(this).index();
    $(this).addClass('cur').siblings().removeClass('cur');
    $('.Logis-item').eq(i).show().siblings().hide();
})















