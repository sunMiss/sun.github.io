$(function () {
    Common.headerTitle("购物车");
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_GET_SHOPPINGCAR,
        dataType: "json",
        contentType: "text/json",
        type: "GET",
        beforeSend: function (request) {
            request.setRequestHeader('Authorization', 'Bearer ' + tokenObj);
        },
        success: function (data) {
            InitShoppingCart(data);
        },
        error: shoppingNull
    })
});

var ShopData;

//渲染购物车
function InitShoppingCart(data) {
    ShopData = data;
   
    if (data.data == "" && data.data.length == 0) {
        $('#shoppCarShow').show();
    } else {
        $('#shoppCarShow').hide();
        InitStoreInfo(data);
    }

        
}


//渲染店铺部分
function InitStoreInfo(storeJson) {
    var $body = '';
    InitStoreTitle(storeJson);
    $(storeJson.data).each(function (index, result) {
        $body += InitProductInfo(result.storeId, result.goods);
    });
    $('.goods-lis-item').append('<ul class="shop_list_content">' + $body + '</ul>');
}
//渲染购物车店铺标题部分
function InitStoreTitle(storeJson) {
    var $html = '';
   // console.log(storeJson.data)
    $.each(storeJson.data, function (i, item) {
        $html += '<div class="shop_list_header"><input type="checkbox" class="check-box title-box"  dat-id="' + item.storeId + '"  onclick="StoreSelectAll(this)"><em>' + item.storeName + '</em></div>';
    })
    $('#shopItem').html('<div class="goods-lis-item">' + $html + '</div>');
}
//渲染购物车商品部分
function InitProductInfo(storeId, goods) {
    var $body = '';
    $.each(goods, function (i, item) {
        var $stock = '';//库存不足遮罩
        var $check = '';
        var $inputadd = '';
        var $inputreduce = '';
        var $stockNum ='';
        if (item.stock < item.quantity) {
            $stock += '<p class="shop_content_num"><span>库存不足</span></p>';
            $check += '<input type="checkbox" disabled="disabled" class="check-box content-box not" onclick="SelectNum(this)">';
            $inputadd += '<input type="button" class="addBtn disabled" disabled="disabled" data-id=' + item.ShoppingCartId + ' max=' + item.stock + '  value="+" onclick="ShopNumChange(this,1)"/>';
        } else {
            $check += '<input type="checkbox" class="check-box content-box" onclick="SelectNum(this)">';
            $inputadd += '<input type="button" class="addBtn" data-id=' + item.ShoppingCartId + ' max=' + item.stock + '  value="+" onclick="ShopNumChange(this,1)"/>';
        }
        if(item.stock < 10 ){
            $stockNum += '<span class="tip_num">库存仅剩' + item.stock + '件</span>'
        }
        if (item.stock <= 1) {
            $inputreduce += '<input type="button" class="reduceBtn disabled" disabled="disabled" data-id=' + item.ShoppingCartId +'  value="-" onclick="ShopNumChange(this,-1)" />';
        } else {
            $inputreduce += '<input type="button" class="reduceBtn" value="-" data-id=' + item.ShoppingCartId + ' onclick="ShopNumChange(this,-1)" />';
        }

        $body += '<li data-id="' + item.ShoppingCartId + '">' + $check + '<div class="shop_content_img">';
        $body += '<a href="/Goods/GoodsDetails?goodsId=' + item.goodsId + '"><img src="' + item.imageUrl + '">' + $stock + '</a>';
        $body += '</div><div class="shop_content_textItem"><em class="shop_conten_name">' + item.name + '</em><p class="shop_conten_tip">';
        $body += '<span>' + item.attributeValues + '</span>' + $stockNum + '</p>';
        $body += '<div class="shop_conten_price"><strong>￥<b class="priceItem">' + item.price + '</b></strong><div class="shop_price_item">';
        $body += ''+$inputreduce+'<input type="text" value="' + item.quantity + '" readonly="readonly" class="numValue"/>' + $inputadd + ''
    });
    return $body;

    //SetGoodsState(goods.ShoppingCartId);
}
//刷新购物车商品部分
function UpdateProductInfo(storeId,goods) {
    $("#" + storeJson.storeId + " .asdlfjls").append("<div id='" + goods.ShoppingCartId + "'>adsflkdjasfkl</div>");
    SetGoodsState(goods.ShoppingCartId);
}

//商品维护状态
function SetGoodsState(shoppingCartId) {

}

//数量控制 + -
function ShopNumChange(t,item) {
    var $shopId = $(t).attr('data-id');
    var $val = parseInt($(t).siblings('.numValue').val());
    var $stock = parseInt($(t).attr('max'));
    if (item == '1') {
        $val++;
        if ($val >= $stock) {
            $(t).addClass('disabled').attr('disabled', true);
        }
        $(t).siblings('.reduceBtn').removeClass('disabled').attr('disabled', false);
        $(t).siblings('.numValue').val($val);
    } else if (item == '-1') {
        if ($val <= '2') {
            $(t).siblings('.numValue').val('1');
            $(t).addClass('disabled').attr('disabled', true);
            $val = 1;
        } else {
            $(t).removeClass('disabled').attr('disabled', false);
            $(t).siblings('.addBtn').removeClass('disabled').attr('disabled', false);
            $val--;
            $(t).siblings('.numValue').val($val);
        }
    }

    var param = {
        "ShoppingCartId": $shopId,
        "Quantity": $val
    };
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_POST_UPDATECART,
        dataType: "json",
        contentType: "text/json",
        type: "POST",
        data: JSON.stringify(param),
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        success: function (req) {
            if (req.status === 1) {
                //更新后获取购物车信息
                //showShoppingCar();
                totalMoney();
            }
        },
        error: function (err) {
            $.toast(err.message, "forbidden");
        }
    })
    
}

//店铺选择
function StoreSelectAll(t) {
    var $data = ShopData;
    var $res = $(this).attr('dat-id');
    var flag = false;
    $.each(function (i,$data) {
        var $id = $data.storeId;
        if ($res == $id) {
            flag = true;
        }
    })
    //console.log($data)
    if ($(t).hasClass('checked')) {
        $(t).removeClass('checked');
        $('#allCheckCho').removeClass('checked');
        $('#allCheckDel').removeClass('checked');
        $(t).parent().siblings('.shop_list_content').find('input[type=checkbox]').removeClass('checked');
    } else {
        $(t).addClass('checked');
        $(t).parent().siblings('.shop_list_content').find('input[type=checkbox]').not('.not').addClass('checked');
        //判断：店铺全选中，则全局全选按钮打对勾。
        var $len = $('.title-box').length;
        var num = 0;
        $('.title-box').each(function () {
            if ($(this).is(":checked")) {
                num++;
            }
        });
        if (num == $len) {
            $('#allCheckCho').addClass('checked');
            $('#allCheckDel').addClass('checked');
        } else {
            $('#allCheckCho').removeClass('checked');
            $('#allCheckDel').removeClass('checked');
        }
    }
    totalMoney();
}

//商品选择
function SelectNum(t) {
    if ($(t).hasClass('checked')) {
        $(t).removeClass('checked');
    } else {
        $(t).addClass('checked');
    }

    var goods = $(t).closest('.goods-lis-item').find('.content-box');//获取本店所有商品
    var goodc = $(t).closest('.goods-lis-item').find('.content-box.checked');//获取本店所有选中的商品
    var shops = $(t).closest('.goods-lis-item').find('.title-box');//获取本店铺的全选

    if (goods.length == goodc.length) {
        shops.addClass("checked");
        if ($('.title-box').length == $('.title-box.checked').length) {
            $('#allCheckCho').addClass('checked');
            $('#allCheckDel').addClass('checked');
        } else {
            $('.all input').prop('checked', false);
        }
    } else {//如果选中的商品不等于所有商品
        shops.removeClass("checked");
        $('#allCheckCho').removeClass('checked');
        $('#allCheckDel').removeClass('checked');
    }
    totalMoney();
}
//结算-全选
function allCheck(t) {
    if ($(t).hasClass('checked')) {
        $('#shopItem').find('input[type=checkbox]').not('.not').removeClass('checked');
        $(t).removeClass('checked');
    } else {
        $('#shopItem').find('input[type=checkbox]').not('.not').addClass('checked');
        $(t).addClass('checked');
    }
    totalMoney();
}
//删除-全选
function DelallCheck(t) {
    //StoreSelectAll(storeId);
    if ($(t).hasClass('checked')) {
        $('.goods-lis-item').find("input[type='checkbox']").each(function () {
            $(this).removeClass('checked');
        });
        $(t).removeClass('checked');
    } else {
        $('.goods-lis-item').find("input[type='checkbox']").each(function () {
            $(this).addClass('checked');
        });
        $(t).addClass('checked');
    }
    totalMoney();
}



var shopListId = [];
//计算数量及价格
function totalMoney() {
    shopListId.splice(0, shopListId.length);
    var total_money = 0;//总价格
    var total_count = 0;//总数量
    var calBtn = $('.accounts-result-tips');

    $('.content-box').each(function () {
        if ($(this).hasClass('checked')) {
            var shopId = $(this).parents('li').attr('data-id');
            var goods = parseFloat($(this).parents('li').find('.priceItem').html());//价格(提取字符串)
            var numGs = parseInt($(this).parents('.shop_list_content').find('.numValue').val()); 
            var num = parseInt($(".content-box.checked").length);//数量
            total_money += goods * numGs;
            total_count = num;
            shopListId.push(shopId);
        }
    })

    if ($('#allCheckCho').hasClass('checked')) {
        $('#checkNum').html('已选:(<em class="goodsNum">' + total_count + '</em>)');
    } else {
        $('#checkNum').html('全选');
    }

    $('#delNum').text(total_count);
    $('.accounts-total em').text('￥' + (total_money).toFixed(2));

    //判断数量为0并且价格为0
    if (total_money != 0 && total_count != 0) {
        if (calBtn.hasClass('accounts-result-disabled')) {
            calBtn.removeClass('accounts-result-disabled');
            $('#confirmBtn').attr('data-on', 'confirm');
            $('#deleteBtn').attr('data-on', 'confirm');
        }
    } else {
        if (!calBtn.hasClass('accounts-result-disabled')) {
            calBtn.addClass('accounts-result-disabled');
            $('#confirmBtn').attr('data-on', 'cancel');
            $('#deleteBtn').attr('data-on', 'cancel');
        }
    }
}


//编辑菜单
function editOrder(t) {
    var $edit = $(t).attr('data-in');
    if ($edit == 'edit') {
        $(t).text("完成");
        $(t).attr('data-in', 'finish');
        clearInputCheck();
        $("#deleteGoodsBtn").show();
        $("#accountGoodsBtn").hide();
        $('.shop_price_item').hide();
    } else if ($edit == 'finish') {
        $(t).text("编辑");
        $(t).attr('data-in', 'edit');
        clearInputCheck();
        $("#deleteGoodsBtn").hide();
        $("#accountGoodsBtn").show();
        $('.shop_price_item').show();
    }
    $('.accounts-result-tips').addClass('accounts-result-disabled');
    $('.accounts-result-tips').attr('data-on', 'cancel')
}

//编辑 完成切换时 清除选中效果
function clearInputCheck() {
    var $checkboxs = $('.goods-lis-item').find('.checked').removeClass('checked');
    $('#allCheckCho').removeClass('checked');
    $('#allCheckDel').removeClass('checked');
    $('#checkNum').text(0);
    $('.accounts-total em').text('￥' + 0);
}


//提交订单
function submitOrder(t) {
    var $attr = $(t).attr('data-on');
    var param = {
        "ShoppingCartIdList": shopListId
    };
    if ($attr == 'confirm') {
        location.href = "/Order/OrderConfirm?ids=" + shopListId.join(',');
        //清除商品数组
        shopListId.splice(0, shopListId.length);
    }    
}


//删除商品
function deleteShoppingGoods(t) {
    var $attr = $(t).attr('data-on');
    var $img = '<img src="../../Content/dxpImages/img_shop_delet.png" class="detalImg"/>';
    var param = {
        "ShoppingCartIdList": shopListId
    };
    if ($attr == 'confirm') {
    	$.confirm({
		  title: $img,
		  text: '确认删除该商品?',
		  onOK: function () {
		    $.ajax({
		        url: Common.API_BASE_URL + Common.API_URL_POST_DELETESHOPPING_CARTS,
		        dataType: "json",
		        contentType: "text/json",
		        type: "POST",
		        data: JSON.stringify(param),
		        headers: {
		            'Authorization': 'Bearer ' + tokenObj,
		        },
		        success: function (req) {
		            if (req.status === 1) {
		                //清除商品数组
		                shopListId.splice(0, shopListId.length);
		                window.location.reload();
		            }
		        },
		        error: function () {
		            console.log("更新失败");
		        }
		    })
		  },
		  onCancel: function () {
		  }
		}); 
    }
}


//购物车为空
function shoppingNull() {
    $(".shopping-car-null-show").show();
    $("#edit-order").css("display", "none");
    $("#accountGoodsBtn").css("display", "none");
}


