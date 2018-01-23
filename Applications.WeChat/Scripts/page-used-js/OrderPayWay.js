var OrderPayId = Common.getQueryString("orderPaylogId");
var orderPrice = 0, //订单价格
    orderNum = 0,   //订单编号
    orderPay = 0;   //支付方式默认为微信 0
        var param = {
            "OrderPayLogId": OrderPayId
        }
        Common.request({
            method: 'POST',
            url: Common.API_BASE_URL + Common.API_URL_POST_GTE_PAY_LOGINFO,
            param: JSON.stringify(param),
            header: { 'Authorization': 'Bearer ' + tokenObj},
            success(res) {
                var orderPayData = res.data;
                orderPrice = orderPayData.Price;
                orderNum = orderPayData.Code
                $('.orderPrice').html('￥'+orderPayData.Price);
                $('#orderCode').html(orderPayData.Code);
                $('#orderAddress').html(orderPayData.UserAddress);
            }, error(err) {

            }
        });


        //选择支付方式
        $('#choosePay').on('click', 'li', function () {
            $(this).addClass('active').siblings().removeClass('active');
            var $wy = $(this).attr('data-style');
            $('#submit').attr('data-style', $wy);
        })

        //支付订单
        function WechatPay(t) {
            var OrderPayId = Common.getQueryString("orderPaylogId");
            var $wy = $(t).attr('data-style');
            var param = {
                "OrderPayLogId": OrderPayId
            }
            if ($wy == 'wechat') {
                wechatPay(param);
                orderPay = 0;
            } else if ($wy == 'balance') {
                balancePay(param);
                orderPay = 1;
            }
        }

        //微信支付
        function wechatPay(param) {
            Common.request({
                method: 'POST',
                url: Common.API_BASE_URL + Common.API_URL_POST_WECHAT_PAY,
                param: JSON.stringify(param),
                header: { 'Authorization': 'Bearer ' + tokenObj },
                success(res) {
                    var $wacthData = res.data;
                    callpay($wacthData);
                },
                error(err) {}
            });
        }

        //余额支付
        function balancePay(param) {
            Common.request({
                method: 'POST',
                url: Common.API_BASE_URL + Common.API_URL_POST_MONEYPAY_PAY,
                param: JSON.stringify(param),
                header: { 'Authorization': 'Bearer ' + tokenObj },
                success(res) {
                    payDone();
                    //alert(JSON.stringify(res));
                    //window.location.href = "/Shopping/ShoppingPaymentSuccess?orderP=" + orderPrice + '&orderN=' + orderNum + '&orderW=' + orderPay;
                }, error(err) { }
            });
        }



        //调用微信支付
        function onBridgeReady($wacthData) {
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": $wacthData.AppId,     //公众号名称，由商户传入     
                    "timeStamp": $wacthData.TimeStamp,         //时间戳，自1970年以来的秒数     
                    "nonceStr": $wacthData.NonceStr, //随机串     
                    "package": $wacthData.Package,
                    "signType": $wacthData.SignType,         //微信签名方式：     
                    "paySign": $wacthData.PaySign //微信签名 
                },
                function (res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        payDone();
                        //window.location.href = "/Shopping/ShoppingPaymentSuccess?orderP=" + orderPrice + '&orderN=' + orderNum + '&orderW=' + orderPay;
                    }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                }
            );
        }

        function callpay($wacthData) {
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady($wacthData), false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady($wacthData));
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady($wacthData));
        }
    } else {
        onBridgeReady($wacthData);
    }
}

//支付回调
function payDone() {
    var param = {
        "OrderPayLogId": OrderPayId
    } 
    Common.request({
            method: 'POST',
            url: Common.API_BASE_URL + Common.API_URL_POST_MONEYPAY_PAYDONE,
            param: JSON.stringify(param),
            header: { 'Authorization': 'Bearer ' + tokenObj },
            success(res) {
                console.log(JSON.stringify(res));
                if (res.status == 1) {
                    if (res.data.PayDoneOperationType == -1)//支付失败
                        window.location.href = "/Shopping/ShoppingPaymentSuccess?orderP=" + orderPrice + '&orderN=' + orderNum + '&orderW=' + orderPay;
                    if(res.data.PayDoneOperationType==0)//默认支付
                        window.location.href = "/Shopping/ShoppingPaymentSuccess?orderP=" + orderPrice + '&orderN=' + orderNum + '&orderW=' + orderPay;
                    if(res.data.PayDoneOperationType==1)//拼团支付
                        window.location.href = "/Other/Pindetails?groupid=" + res.data.Parameter;
                }
            }, error(err) { }
        });
    }