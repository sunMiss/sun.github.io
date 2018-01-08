//编辑中的全选框
var $allCheckbox = $('input[type="checkbox"]'),       //全局的全部checkbox
    $allCheckDel = $("#allCheckDel"),                 //删除全选
    $allCheckCho = $("#allCheckCho"),                 //已选全选
    $cartBox = $('.goods-list-max-wrap'),             //每个商铺盒子
    $shopCheckbox = $('.title-box'),                  //每个商铺checkbox
    $sonCheckBox = $('.content-box');                 //每个商品的checkbox


$(function () {
    showShoppingCar();
    Common.headerTitle("未使用");
//setTimeout(function () {


    /*点击编辑按钮页面变化*/
    $(".edit-order").click(function () {
        var $edit = $(this).attr('data-in');
        if($edit == "edit") {
            $(this).text("完成");
            $(this).attr('data-in','finish');
            clearInputCheck();
            $("#deleteGoodsBtn").show();
            $("#accountGoodsBtn").hide();
            
        }else if ($edit == "finish") {
            $(this).text("编辑");
            $(this).attr('data-in', 'edit');
            clearInputCheck();
            $("#deleteGoodsBtn").hide();
            $("#accountGoodsBtn").show();
        }
        $('.accounts-result-tips').addClass('accounts-result-disabled');
        $('.accounts-result-tips').attr('data-on', 'cancel');
    })

    //编辑 完成切换时 清除选中效果
    function clearInputCheck() {
        var $checkboxs = $cartBox.find("input[type='checkbox']");
        $checkboxs.prop("checked", false);
        $checkboxs.removeClass("has-select-icon");
        $('#allCheckCho').prop("checked", false);
        $('#allCheckDel').prop("checked", false);
        $('#allCheckCho').removeClass("has-select-icon");
        $('#allCheckDel').removeClass("has-select-icon");
        $('#checkNum').text(0);
        $('.accounts-total em').text('￥'+0);
    }

    

//}, 500)

})



//获取购物车信息
function showShoppingCar() {
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_GET_SHOPPINGCAR,
        dataType: "json",
        contentType: "text/json",
        type: "GET",
        beforeSend: function (request) {
            request.setRequestHeader('Authorization', 'Bearer ' + tokenObj);
        },
        success: showShopping,
        error: shoppingNull

    })

}

//购物车为空
function shoppingNull() {
    $(".shopping-car-null-show").show();
    $("#edit-order").css("display", "none");
    $("#accountGoodsBtn").css("display", "none");   
}

function showShopping(req) {
    //console.log("进入购物车");
    if (req.status === Common.HTTP_VALUE_SUCCESS) {
        var data = req.data;
        //console.log(data);
        $('#checkNum').text('0');
        $('.accounts-total em').text('￥ 0.00');
        if (data.length == 0) {
            $(".shopping-car-null-show").show();
            $("#edit-order").css("display", "none");
            $("#accountGoodsBtn").css("display", "none");
        } else {
            var ghtml = "";
            //var evalText = doT.template($("#goods-list-wrap").html());
            //$(".goods-list-wrap").html(evalText(data));
            $.each(data, function (i, items) {
                ghtml+='<section class="goods-list-max-wrap"><section class="goods-list-company">';
                ghtml += '<input type="checkbox" class="check-box title-box"><h2>' + items.storeName + '</h2></section>';
                ghtml+='<div class="shop-goods-list-shop"><ul class="his-parents">';
                var res = data[i].goods
                $.each(res, function (i, sitems) {
                    var item = sitems;
                    var $body = '';
                    var $stockNum = '';
                    var $sign = '';
                    if (item.stock <= 2) {
                        $sign = 'data-sign= "signNum"';
                        $body = '<div class="maseSotck"><span>库存不足</span></div>';
                        $stockNum = '<b class="stockNum">库存剩余' + item.stock + '件</b>';
                    }
                    ghtml += '<li class="goods-list-show" ' + $sign + '><div class="goods-list-show-wrap"><input type="checkbox" name="checkbox" ' + $sign + ' value="' + item.ShoppingCartId + '" class="check-box content-box">';
                    ghtml += '<a class="left-img-show"><img src="' + item.imageUrl + '" alt="" class="img-responsive">' + $body + '</a>';
                    ghtml += '<div class="right-goods-details"><p class="details-name">' + item.name + '</p><p class="details-choice">' + item.attributeValues + $stockNum+'</p>';
                    ghtml += '<span class="details-price">￥<b>' + item.price + '</b></span></div><div class="add-reduce-btn">';
                    ghtml += '<span class="reduceBtn disabled" onclick="updateShoppingCart(this)" data-on="reduce">－</span>';
                    ghtml += '<span class="numValue">1</span>';
                    ghtml += '<span class="addBtn" onclick="updateShoppingCart(this)" data-on="add" max="' + item.stock + '">＋</span></div></div></li>';
                })
                ghtml += '</ul></div></section>';
            })
            $("#itemss").html(ghtml);
        }
        //单选
        $('input[type="checkbox"]').click(function () {
            var $stock = $(this).attr('data-sign');
            if ($stock != 'signNum') {
                
                if ($(this).is(":checked")) {
                    $(this).addClass("has-select-icon");
                } else {
                    $(this).removeClass("has-select-icon");
                }
            }
        })

        //全选-结算
        $allCheckCho.click(function () {
            allCheckItem(this);
            totalMoney();
        })
        //全选-删除
        $allCheckDel.click(function () {
            allCheckItem(this)
        });
        function allCheckItem(t) {
            var $checkboxs = $cartBox.find("input[type='checkbox']");
            $('.shop-goods-list-shop').find('li').each(function () {
                var $signNum = $(this).attr('data-sign');
                if ($signNum != 'signNum') {
                    if ($(t).is(':checked')) {
                        $(t).addClass("has-select-icon");
                        $checkboxs.prop("checked", true);
                        $checkboxs.addClass("has-select-icon");
                    } else {
                        $checkboxs.prop("checked", false);
                        $(t).removeClass("has-select-icon");
                        $checkboxs.removeClass("has-select-icon");
                    }
                }
            });
        }

        //每个商品的checkbox
        $('.content-box').each(function () {
            $('.content-box').click(function () {
                var $stock = $(this).attr('data-sign');
                if ($stock != 'signNum') {
                    
                    if ($(this).is(':checked')) {
                        //判断：所有单个商品是否勾选
                        var len = $('.content-box').length;
                        var num = 0;
                        $('.content-box').each(function () {
                            if ($(this).is(':checked')) {
                                num++;
                            }
                        });
                        if (num == len) {
                            $allCheckCho.prop("checked", true);
                            $allCheckCho.addClass('has-select-icon');
                            $allCheckDel.prop("checked", true);
                            $allCheckDel.addClass('has-select-icon');
                        }
                    } else {
                        //单个商品取消勾选，全局全选取消勾选
                        $allCheckCho.prop("checked", false);
                        $allCheckCho.removeClass('has-select-icon');
                        $allCheckDel.prop("checked", false);
                        $allCheckDel.removeClass('has-select-icon');
                    }
                }
            })
        })

        //每个店铺checkbox与全选checkbox的关系
        $('.title-box').each(function () {
            $(this).click(function () {
                if ($(this).is(":checked")) {
                    s
                    if (num == len) {
                        $allCheckCho.prop("checked", true);
                        $allCheckCho.addClass('has-select-icon');
                        $allCheckDel.prop("checked", true);
                        $allCheckDel.addClass('has-select-icon');
                    }
                    //店铺下的checkbox选中状态
                    $(this).parent().siblings('.shop-goods-list-shop').find('li').each(function () {
                        var $signNum = $(this).attr('data-sign');
                        if ($signNum != 'signNum') {
                            $(this).find('.content-box').prop("checked", true);
                            $(this).find('.content-box').addClass('has-select-icon');
                        }
                    });
                    
                } else {
                    //否则，店铺全选取消
                    $allCheckCho.prop("checked", false);
                    $allCheckCho.removeClass('has-select-icon');
                    $allCheckDel.prop("checked", false);
                    $allCheckDel.removeClass('has-select-icon');
                    $(this).parents('.goods-list-max-wrap').find('.content-box').prop("checked", false);
                    $(this).parents('.goods-list-max-wrap').find('.content-box').removeClass('has-select-icon');
                }
                totalMoney();
            })
        })

        //每个店铺checkbox与其下商品的checkbox的关系=
        $cartBox.each(function () {
            var $this = $(this);
            var $sonChecks = $this.find('.content-box');
            $sonChecks.each(function () {
                $(this).click(function () {
                    var $stock = $(this).attr('data-sign');
                    if ($stock != 'signNum') {
                        if ($(this).is(':checked')) {
                            //判断：如果所有的$sonChecks都选中则店铺全选打对勾！
                            var len = $sonChecks.length;
                            var num = 0;
                            $sonChecks.each(function () {
                                if ($(this).is(":checked")) {
                                    num++;
                                }
                            })
                            if (num == len) {
                                $(this).parents('.goods-list-max-wrap').find('.title-box').prop("checked", true);
                                $(this).parents('.goods-list-max-wrap').find('.title-box').addClass('has-select-icon');
                            }
                        } else {
                            //否则，店铺全选取消
                            $(this).parents('.goods-list-max-wrap').find('.title-box').prop("checked", false);
                            $(this).parents('.goods-list-max-wrap').find('.title-box').removeClass('has-select-icon');
                        }
                        totalMoney();
                    }
                })
            })
        })    
    } else {
        $.toast(req.message, "forbidden");
    }

}

//计算数量及价格
function totalMoney() {
    var total_money = 0;
    var total_count = 0;
    var calBtn = $('.accounts-result-tips');
    $('.content-box').each(function () {
        if ($(this).is(':checked')) {
            var goods = parseFloat($(this).parents('.goods-list-show').find('.details-price b').text());//价格(提取字符串)
            var numGs = parseInt($(this).parents('.goods-list-show').find('.numValue').text());
            var num = parseInt($(".content-box[type='checkbox']:checked").length);//数量
            total_money += goods * numGs;
            total_count = num;
        }
    })

    $('#checkNum').text(total_count);
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


//删除购物车
function deleteShoppingGoods(t) {
    var Items = [];
    var $item = $(t).attr('data-on');
    if ($item == 'confirm') {
        $(".his-parents input").each(function () {
            if ($(this).is(":checked") == true) {
                Items.push($(this).val());
            }
        });
        var param = {
            "ShoppingCartIdList": Items
        }
        $.ajax({
            url: Common.API_BASE_URL + Common.API_URL_POST_DELETESHOPPING_CARTS,
            dataType: "json",
            contentType: "text/json",
            type: "POST",
            data: JSON.stringify(param),
            beforeSend: function (request) {
                request.setRequestHeader('Authorization', 'Bearer ' + tokenObj);
            },
            success: function (req) {
                if (req.status === 1) {
                    console.log("删除成功");
                    //删除后获取购物车信息
                    showShoppingCar();
                    $(".goods-list-wrap input").each(function () {
                        if ($(this).is(":checked") == true) {
                            $(this).parents(".goods-list-show").remove();
                            $(this).parent(".goods-list-company").remove();
                        }
                    });
                }
            },
            error: function () {
                console.log("删除购物车失败");
            }
        })
    } else if ($item == 'cancel') {
        return;
    } 
}

//更新购物车 -- 数量加减 
function updateShoppingCart(obj) {
    var $item = $(obj).attr('data-on');
    var $max = parseInt($(obj).attr('max'));
    var goodsQuantity = parseInt($(obj).siblings(".numValue").text());
    var ShoppingCartId = $(obj).parents(".goods-list-show-wrap").children(".content-box").val();
    if ($item == 'reduce') {
        if(goodsQuantity <= 2) {
            goodsQuantity = 1;
            $(obj).addClass('disabled');
        } else {
            goodsQuantity--;
        }
        $(obj).siblings('.addBtn ').removeClass('disabled')
    } else if ($item == 'add') {
        if (goodsQuantity >= $max-1) {
            goodsQuantity = $max;
            $(obj).addClass('disabled');
        } else {
            goodsQuantity++;
        }
        $(obj).siblings('.reduceBtn').removeClass('disabled');
    }
    $(obj).siblings('.numValue').text(goodsQuantity);
    var param = {
        "ShoppingCartId": ShoppingCartId,
        "Quantity": goodsQuantity
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
        error: function () {
            console.log("更新失败");

        }

    })
}


