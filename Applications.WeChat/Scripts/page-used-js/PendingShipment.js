$(function () {
    Common.headerTitle('待付款订单');

    var param = {
        "OrderState":3,
        "IsAll": false
    }

    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_GET_USER_ORDER,
        dataType: "json",
        contentType: "text/json",
        type: "POST",
        data: JSON.stringify(param),
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        success: function (res) {
            if (res.status === 1) {
                var listData = res.data;
                GetOrderForm(listData)
            } else {
                $.toast(res.message, "forbidden");
            }
        },
        error: function (err) {
            $.toast(err.message, "forbidden");
        }
    }) 

})


//展示所有订单
function GetOrderForm(listData) {
    var item = listData;
   // console.log(item);
    var $html = '';
    $.each(item, function (i, list) {
        var orderstate = '';
        switch (list.state){
            case 0:
                orderstate = '待付款';
                break;
            case 1:
                orderstate = '待发货';
                break;
            case 2:
                orderstate = '发货中';
                break;
            case 3:
                orderstate = '待收货';
                break;
            case 4:
                orderstate = '已完成';
                break;
            case 5:
                orderstate = '已取消';
                break;
            case 6:
                orderstate = '退货中';
                break;
            case 7:
                orderstate = '已退货';
                break;
        }
        $html += '<div class="obligList" orderId="' + list.orderId + '"><h3 class="other-package-info"><span class="package-store-name">' + list.storeName + '</span>';
        $html += '<span class="package-state">' + orderstate + '</span></h3><ul class="package-one white-background">';
        $.each(list.orderItems, function (t, Goods) {
            var item = Goods;
            $html += '<li><div class="goods-list-show-wrap"><a href="javascript:;" class="left-img-show"><img src="' + item.imageUrl + '"  alt="" class="img-responsive"></a>';
            $html += '<div class="right-goods-details"><p class="details-name">' + item.productName + '</p><p class="details-choice">' + item.attributeValues + '</p>';
            $html += '<span class="prices-show">￥' + item.price + '</span><span class="details-num">X ' + item.quantity + '</span></div></div></li>';
        })
        $html += '</ul><p><span class="package-store-name">共<em>' + list.quantity + '</em>件商品</span><span class="package-state actual-payment">实付款<em>￥' +list.orderPrice + '</em></span></p>';
        $html += '<div class="other-package-info package-operate"><a href="javascript:;" onclick="OrderCancel(this)">取消订单</a><a href="/Order/OrderConfirm?ids=' + list.orderId + '">立即付款</a></div></div>';
    })
    $('#obligList').html($html);


}



//取消订单
function OrderCancel(t) {
    var orderid = $(t).parents('.obligList').attr('orderid');

    var param = {
        "OrderId": orderid
    };
    layer.open({
        content: '确认取消该订单？',
        btn: ['确认', '取消'],
        yes: function (index) {
           $.ajax({
               url: Common.API_BASE_URL + Common.API_URL_GET_USER_CENTER_ORDER,
               dataType: "json",
               contentType: "text/json",
               type: "POST",
               data: JSON.stringify(param),
               headers: {
                   'Authorization': 'Bearer ' + tokenObj,
               },
               success: function (res) {
                   if (res.status === 1) {
                       location.reload();
                   } else {
                       $.toast(res.message, "forbidden");
                   }
               },
               error: function (err) {
                   $.toast(err.message, "forbidden");
               }
           })
         }
    });

}


























