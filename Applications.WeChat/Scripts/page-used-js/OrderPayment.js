$(function () {
    var state = Common.getQueryString("OrderState");
    
    var stateAll = false;
    if (state == '100') {
        stateAll = true;
    }

    var param = {
        "OrderState": state,
        "IsAll": stateAll
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
                GetOrderForm(listData, state)
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
function GetOrderForm(listData, state) {
    $('#obligShow').hide();
    if (listData == null) {
        $('#obligShow').show();
    }
    var item = listData;
    //console.log(item);
    var $html = '';

    $.each(item, function (i, list) {
        var orderstate = '';
        var htmlBtn = ''
        switch (list.state){
            case 0:
                Common.headerTitle('待付款');
                orderstate = '待付款';
                htmlBtn = '<a href="javascript:;" onclick="OrderCancel(this)">取消订单</a><a href="javascript:;"onclick="PaymentOrder(this)">立即付款</a>';
                break;
            case 1:
                Common.headerTitle('待发货');
                orderstate = '待发货';
                break;
            case 2:
                orderstate = '发货中';
                htmlBtn = '<a href="javascript:;" onclick="logisticsLook(this)">查看物流</a><a href="javascript:;" onclick="ReceiptConfirm(this)">确认收货</a>';
                break;
            case 3:
                Common.headerTitle('待收货');
                orderstate = '待收货';
                htmlBtn = '<a href="javascript:;" onclick="logisticsLook(this)">查看物流</a><a href="javascript:;" onclick="ReceiptConfirm(this)">确认收货</a>';
                break;
            case 4:
                Common.headerTitle('全部订单');
                orderstate = '已完成';
                htmlBtn = '<a href="javascript:;" onclick="logisticsLook(this)">查看物流</a><a href="javascript:;" onclick="DeleteOreder(this)">删除订单</a>';
                break;
            case 5:
                Common.headerTitle('全部订单');
                orderstate = '已取消';
                break;
            case 6:
                Common.headerTitle('全部订单');
                orderstate = '退货中';
                break;
            case 7:
                Common.headerTitle('全部订单');
                orderstate = '已退货';
                break;
        }
        $html += '<div class="obligList" orderId="' + list.orderId + '"><h3 class="other-package-infos"><span class="package-store-name">' + list.storeName + '</span>';
        $html += '<span class="package-state">' + orderstate + '</span></h3><ul class="package-one white-background">';
        $.each(list.orderItems, function (t, Goods) {
            var item = Goods;
            $html += '<li><div class="goods-list-show-wrap"><a href="/Order/OrderOarticulars?orderId=' + list.orderId + '"><span  class="left-img-show"><img src="' + item.imageUrl + '"  alt="" class="img-responsive"></span>';
            $html += '<div class="right-goods-details"><p class="details-name">' + item.productName + '</p><p class="details-choice">' + item.attributeValues + '</p>';
            $html += '<span class="prices-show">￥' + item.price + '</span><span class="details-num">X ' + item.quantity + '</span></div></div></a></li>';
        })
        $html += '</ul><p><span class="package-store-name">共<em>' + list.quantity + '</em>件商品</span><span class="package-state actual-payment">实付款<em>￥' +list.orderPrice + '</em></span></p>';
        $html += '<div class="other-package-info package-operate"><div class="other-package-div">' + htmlBtn + '</div></div></div>';
    })
    $('#obligList').html($html);


}



//取消订单
function OrderCancel(t) {
    var orderid = $(t).parents('.obligList').attr('orderid');
    var param = {
        "OrderId": orderid
    };
    $.confirm("确认取消该订单?", function() {
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
    }, function() {
    //点击取消后的回调函数
    });
}


//立即付款
function PaymentOrder(t) {
    var orderids = $(t).parents('.obligList').attr('orderid');
    
    var OrderCode = {
        "OrderCode": [orderids]
    }
    CreateOderPay(OrderCode);
}
//创建支付订单
function CreateOderPay(OrderCode) {
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_POST_CREATE_ORDER_PAY_LOG,
        dataType: "json",
        contentType: "text/json",
        type: "POST",
        data: JSON.stringify(OrderCode),
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        success: function (res) {
            var OrderPayLogId = res.data;
            location.href = "/Order/OrderPayWay?orderPaylogId=" + OrderPayLogId;
        },
        error: function (err) {
            $.toast(err.message, "forbidden");
        }
    })
}

//查看物流
function logisticsLook(t) {
    var orderids = $(t).parents('.obligList').attr('orderid');
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_GET_USER_DELIVERY_DETAIL+'=',
        dataType: "json",
        contentType: "text/json",
        type: "POST",
        data: JSON.stringify(orderids),
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        success: function (res) {
            var OrderPayLogId = res.data;
            if (res.status == '1') {

            } else {
                $.toast(res.message, "forbidden");
            }
            //location.href = "/Order/OrderPayWay?orderPaylogId=" + OrderPayLogId;
        },
        error: function (err) {
            $.toast(err.message, "forbidden");
        }
    })
}

//确认收货
function ReceiptConfirm() {

}


//删除订单
function DeleteOreder() {
    var orderids = $(t).parents('.obligList').attr('orderid');
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_GET_USER_DELETE_ORDER ,
        dataType: "json",
        contentType: "text/json",
        type: "POST",
        data: JSON.stringify(OrderCode),
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        success: function (res) {
            var OrderPayLogId = res.data;
            //location.href = "/Order/OrderPayWay?orderPaylogId=" + OrderPayLogId;
        },
        error: function (err) {
            $.toast(err.message, "forbidden");
        }
    })
}



















