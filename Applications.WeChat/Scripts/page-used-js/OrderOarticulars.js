$(function () {
    var orderId = Common.getQueryString("orderId");

    var param = {
        "OrderId": orderId
    }
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_GET_USER_ORDER_DETAIL,
        dataType: "json",
        contentType: "text/json",
        type: "POST",
        data: JSON.stringify(param),
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        success: function (data) {
            if (data.status === 1) {
                InitOrderDetail(data);
            } else {
                $.toast(data.message, "forbidden");
            }
        },
        error: function (err) {
            $.toast(err.message, "forbidden");
        }
    })
})


//初始化订单详情
function InitOrderDetail(data) {
    var itme = data.data;
    switch (itme.state) {
        case 0:
            orderstate = '待付款';
            $('.address-Btn').show();
            break;
        default:
            $('.address-Btn').hide();
    }
    var $html = '';
    $('#detailName').html(itme.receiver);
    $('#detailPhone').html(itme.mobilePhone);
    $('#detailAress').html(itme.address);
    $('#detaiOrderNum').html(itme.orderCode);
    $('#detaiPayMent').html(itme.payWay);
    $('#detaiPayTime').html(itme.paymentTime);
    $('#detaiDeliverTime').html(itme.deliveryTime);
    $('#detaiShopName').html(itme.storeName);
    $('#detaiShopTotal').html(itme.goodsTotalPrice);
    $('#detaiShopDiscount').html(itme.discountPrice);
    $('#detaiShopPay').html(itme.orderPrice);
    $('.address-Btn').attr('orderId', itme.orderId);
    $.each(itme.orderItems, function (i,list) {
        $html += '<li><img src="'+list.imageUrl+'" /><div class="detaiList-txt"><p class="name">'+list.productName+'</p><span class="label">'+list.attributeValues+'</span>';
        $html += '<p class="price">￥<strong>' + list.price + '</strong><b class="num">' + list.quantity + '</b></p> </div></li>';
    })
    $('#detaiList').html($html);
}


//取消订单
function OrderCancel(t) {
    var orderid = $(t).parent().attr('orderId');
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
                        location.href = "/Order/ObligationOrderForm?OrderState=0";
                        
                    }
                },
                error: function () {
                    console.log("更新失败");
                }
            })
        }
    });
}


//立即付款
function PaymentOrder(t) {
    var orderid = $(t).parent().attr('orderId');
    var OrderCode = {
        "OrderCode": [orderid]
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
        error: function () {
            console.log('请求是失败');
        }
    })
}











