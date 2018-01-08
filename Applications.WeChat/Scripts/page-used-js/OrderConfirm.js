$(function () {
    Common.headerTitle("确认订单")
    var caridlist = Common.getQueryString("ids");
    caridlist = caridlist.split(",");
    var DeliveryAddressId = Common.getQueryString("DeliveryAddressId");

    var param = {
        "ShoppingCartIdList": caridlist,
        "DeliveryAddressId": DeliveryAddressId
    }
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_POST_ADD_PREVIEW_ORDER,
        dataType: "json",
        contentType: "text/json",
        type: "POST",
        data:JSON.stringify(param),
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        success: function (data) {
            if (data.status == '1') {
                InitShoppingOrder(data);
            } else {
                $.toast(data.message, "forbidden");
            } 
        },
        error: shoppingNull
    }) 
})


//渲染订单支付方式结构
function InitShoppingOrder(data) {
        InitUseraddress(data);
        InitOrderList(data);
        InitSum(data);
} 
//收获地址渲染
function InitUseraddress(addData) {
    if (addData.data.Address == null) {
        $('#addressNll').show();
        return;
    }
    $('#addressNll').hide();
    var item = addData.data.Address
    var $address = '<h2 class="info-name-phone"><span>收货人：<em>' + item.receiver + '</em></span><span>' + item.mobilePhone + '</span></h2><p class="info-address" add-id=' + item.addressId + '><a href="javascript:;" onclick="addAress()">' + item.province + item.city + item.county + item.street + '<i></i></a></p>'
    $('#address').html($address);
    
} 
//商品列表渲染
function InitOrderList(listData) {
    var listItem = listData.data.Orders;
    var $html = '';
    var $num = 0;
    var $total = 0;
    var $coupon = '';
    $.each(listItem, function (i, item) {
        if (item.CanUseCoupons.length>0) {
            $coupon = '<li class="pop-show-coupon" onclick="coupons(this)"><span>优惠卷</span><div><span class="shipname"></span><span></span></div></li>'
        } else {
            $coupon = ''
        }
        
        $total += item.OrderPrice;
        $html += '<section class="goods-list-company"><h2>' + item.StoreName + '</h2></section>';
        $html += '<div class="shop-goods-list-shop"><ul class="his-parents">';
        $.each(item.OrderItems, function (i, listDa) {
            var list = listDa;
            $num += parseInt(list.Quantity);
            $html += '<li class="hislist" cartid=' + list.ShoppingCartId + '><div class="goods-list-show-wrap"><a class="left-img-show">';
            $html += '<img src="' + list.GoodsImage+ '" alt="" class="img-responsive">';
            $html +='</a><div class="right-goods-details"><p class="details-name">'+list.GoodsName+'</p>';
            $html +='<p class="details-choice">'+list.AttibuteValueString+'</p><span class="prices-show">￥'+list.SalePrice+'</span>';
            $html += '<span class="details-num">x' + list.Quantity + '</span></div></div>';
            $html += '<div class="shopCarId" style="display:none" cartid=' + list.ShoppingCartId + ' price='+list.SalePrice+' num='+list.Quantity+' cannum='+list.CanPickUpQuantity+'></div></li>';
        });
        $html += '</div><ul class="size-num-box">' + $coupon + '<li class="pop-show-coupon" shippingid=' + item.ShippingType + '  onclick="Distribution(this)"><span>配送方式</span>';
        $html += '<div><span class="shipname Coupons">' + item.ShippingTypeName + '</span><span></span></div></li><li class="pop-message">';
        $html += '<span>买家留言:</span><div class="orCofmessage"><input type="text" value="' + item.CustomerNote + '" name="name" placeholder="留言信息" />';
        $html += '</div></li><li class="goods-counts"><span>共计<b class="subtotal">' + $num + '</b>件商品</span><span class="counts-money">小计：<em>￥' + (item.OrderPrice).toFixed(2) + '</em></span></li></ul>';
        $html += '<div class="dataItem" style="display:none" orderprice='+item.OrderPrice+' postage="' + item.Postage + '" storeid=' + item.StoreId + ' discountprice=' + item.DiscountPrice + ' goodstotalprice=' + item.GoodsTotalPrice + ' customernote=' + item.CustomerNote + '></div></section>';
        $html += '<div class="youhui"><ul class="youhuiList">';
        $.each(item.CanUseCoupons, function (j, t) {
            var $disabled = '';
            var $sChecked = '';
            if (!t.CanCheck) {
                $disabled = 'disabled="disable" ';
            }
            if (t.IsChecked) {
                $sChecked = 'checked'
            }
            $html += ' <li><div class="youhuiLeft"><em>￥<b>' + t.Dicount + '</b></em><span>' + t.Condition + '</span></div><div class="youhuiRight"><em>' + t.CouponName + '</em><span>' + t.StartDate + '-' + t.EndDate + '</span><input type="checkbox" ' + $disabled + ' couponId=' + t.CouponId + ' check="1" class="check-box couponLi ' + $sChecked + '" onclick="couponChek(this)"></div></li>';
        });
        $html += '</ul></div>'
    })
    $('.goods-list-max-wrap').html($html);

    DistriChooes(listData)
}
//渲染总价
function InitSum(listData) {
    var $total = 0;
    $(listData.data.Orders).each(function (i, o) {
        $total += o.OrderPrice;
    });
    $('#totalAll').html($total);
}

//<li class="pop-show-size"><span>优惠券</span><div><span>现金：￥5.00</span><span></span></div></li>

//配送方式渲染
function DistriChooes(str){
    var item = str.data.Orders;
    var $li = '';
    $.each(item, function (i,setItem) {
        var $dis = setItem.ShippingList
        $.each($dis,function (t,putItem) {
            $li += '<li dataShip="' + putItem.ShippingType + '" onclick="DistriOpen(this)" ><span>' + putItem.Name + '</span><input type="radio" class="content-box" value="' + putItem.Name + '"></li>';
        })
        $('#distribution').html($li);
    })
} 

$('.body-masking').click(function(){
	$('.body-masking').hide();
    $('.choose-distribution-way').hide();
})


var dataArr = [];
var peisong;//配送储存数据
//配送打开方式
function Distribution(t) {
    $(".body-masking").css("display", "block");
    $(".choose-distribution-way").css("display", "block");
    $('.goods-list-max-wrap').attr('goods-list-max-wrap');
    $(t).parent().parent('.goods-list-max-wrap').attr('class', 'goods-list-max-wrap shipping');
}

//配送选择方式
function DistriOpen(t) {
    var $shopingid = $(t).attr('dataShip');//获取配送方式ID
    $(t).addClass('active').siblings().removeClass('active');

    $('#max-wrap-goods-order').each(function () {
        if ($('.goods-list-max-wrap').hasClass('shipping')) {
            $(this).find('.pop-show-coupon').attr('shippingid', $shopingid);
        }
    })
}

//配送信息选择完成
function DistriEnd(t) {
    var $total = 0;
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_POST_PREVIEW_AGIN,
        dataType: "json",
        contentType: "text/json",
        type: "POST",
        data: JSON.stringify(getParameter()),
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        success: function (result) {
            if (result.status == 1) {
                var $item = result.data.Orders;
                $.each($item, function (i, list) {
                    $total += (list.OrderPrice - list.DiscountPrice) + list.Postage;
                    $('.pop-show-coupon').attr('shippingid', list.ShippingId);
                    $('.pop-show-coupon').find('.shipname').html(list.ShippingTypeName);
                    $('.goods-counts').find('.counts-money em').html(list.OrderPrice.toFixed(2));
                    $('.orCofmessage input').val(list.CustomerNote);
                })
                $('#totalAll').html($total);
                $('.body-masking').hide();
                $('.choose-distribution-way').hide();
            }
            
        },
        error: shoppingNull
    })
}



//提交订单
function submitOrder() {
    //var $len = $('#address').html;
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_POST_SUBMIT_ORDER,
        dataType: "json",
        contentType: "text/json",
        type: "POST",
        data: JSON.stringify(getParameter()),
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        success: function (res) {
            if (res.status == 1) {
                var OrderIds = res.data.OrderIds;
                var OrderCode = {
                    "OrderCode": OrderIds
                }
                CreateOderPay(OrderCode);
            } else {
                $.toast(res.message, "forbidden");
            }
            
        },
        error: shoppingNull
    })
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
        error: shoppingNull
    })
}



//数据请求失败
function shoppingNull() {
   // console.log('数据请求失败')
}

//提交订单所需参数
function getParameter() { 
    //提交订单
    var sunmbitArr = {};
    var ItemsArr = [];
    var orderitemsArr = [];

    var addressId = $('#address .info-address').attr('add-id');//收货地址ID
    TotalPrice = $('#totalAll').text();//价格合计
    ItemsArr.splice(0, ItemsArr.length);
    orderitemsArr.splice(0, orderitemsArr.length);

    $('.goods-list-max-wrap').each(function () {
        //取出数据
        //Items	订单列表
        var $storelist = $(this).find('.dataItem');
        StoreId = $storelist.attr('storeid'),  //店铺ID
        ShippingId = $(this).find('.pop-show-coupon').attr('shippingid'),	//配送方式ID
        Postage = $storelist.attr('postage'),	//订单邮费
        DiscountPrice = $storelist.attr('discountprice'),	//订单优惠金额
        GoodsTotalPrice = $storelist.attr('goodstotalprice'),	//订单商品总价
        OrderPrice = $storelist.attr('orderprice'),	//订单金额小计
        //OrderItems //订单明细
        CustomerNote = $(this).find('.orCofmessage input').val(),	//客户留言
        CustomerCouponIds = [];
        $(this).find('.couponLi.checked').each(function(i,o){
            CustomerCouponIds.push($(o).attr('couponid'));//优惠卷
        });
   
        TotalPrice = $('#totalAll').text();//价格合计
        $('.his-parents li').each(function () {
            var $that = $(this).find('.shopCarId');
            var cartid = $that.attr('cartid');//购物车编号
            var price = $that.attr('price');//销售价格
            var num = $that.attr('num');//数量
            var cannum = $that.attr('cannum');//自数量
            orderitemsArr.push({ 'ShoppingCartId': cartid, 'SalePrice': price, 'Quantity': num, 'CanPickUpQuantity': cannum });
        });
        ItemsArr.push({ "StoreId": StoreId, "ShippingType": ShippingId, "Postage": Postage, "DiscountPrice": DiscountPrice, "GoodsTotalPrice": GoodsTotalPrice, "OrderPrice": OrderPrice, "OrderItems": orderitemsArr, "CustomerNote": CustomerNote, "CustomerCouponIds": CustomerCouponIds });
    });
    sunmbitArr.DeliveryAddressId = addressId;
    sunmbitArr.Items = ItemsArr;
    sunmbitArr.TotalPrice = TotalPrice;
    return sunmbitArr;
}


//添加地址
function addAress(){
	var caridlist = Common.getQueryString("ids");
	caridlist = caridlist.split(",");
	location.href = "/Order/AddAddress?orderList="+caridlist;
}

//优惠卷显示
function coupons(t) {
    $('.makeItem').show();
    $(t).parent().siblings('.youhui').show();
}

//优惠卷选择
function couponChek(t) {
    if ($(t).hasClass('checked')) {
        $(t).removeClass('checked');
    } else {
        $(t).addClass('checked');
        
    }

    var $total = 0;
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_POST_PREVIEW_AGIN,
        dataType: "json",
        contentType: "text/json",
        type: "POST",
        data: JSON.stringify(getParameter()),
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        success: function (result) {
            if (result.status == 1) {
                var $item = result.data.Orders;
                $.each($item, function (i, list) {
                    $total += list.OrderPrice;
                    $('.pop-show-coupon').attr('shippingid', list.ShippingId);
                    $('.pop-show-coupon').find('.Coupons').html(list.ShippingTypeName);
                    $('.goods-counts').find('.counts-money em').html(list.OrderPrice.toFixed(2));
                    $('.orCofmessage input').val(list.CustomerNote);
                    var $coupon = list.CanUseCoupons;
                    $('.youhuiList').html('');
                    var $cou = '';
                    $.each($coupon, function (j, t) {
                        var $disabled = '';
                        var $sChecked = '';
                        if (!t.CanCheck) {
                            $disabled = 'disabled="disable" ';
                        }
                        if (t.IsChecked) {
                            $sChecked = 'checked'
                        }
                        $cou += ' <li><div class="youhuiLeft"><em>￥<b>' + t.Dicount + '</b></em><span>' + t.Condition + '</span></div><div class="youhuiRight"><em>' + t.CouponName + '</em><span>' + t.StartDate + '-' + t.EndDate + '</span><input type="checkbox" ' + $disabled + ' couponId=' + t.CouponId + ' check="1" class="check-box couponLi ' + $sChecked + '" onclick="couponChek(this)"></div></li>';
                    })
                    $('.youhuiList').html($cou);
                })
                $('#totalAll').html($total);
            }
        },
        error: shoppingNull
    })
    
}






















