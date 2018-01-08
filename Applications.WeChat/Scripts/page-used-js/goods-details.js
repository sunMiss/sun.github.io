$(function () {
    var id = Common.getQueryString("goodsId");
    //console.log(id);
    showGoodsDetails(id);
    changeGoodsNum();
    getShoppingCartSum();
});
/*商品详情页展示*/
function showGoodsDetails(id) {
	$.showLoading();
    var par = { goodsId: id };
    $.ajax({
        url:Common.API_BASE_URL + Common.API_URL_GET_GOODS_DETAILS+'?',
        type: "GET",
        data: par,
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        success: getGoodsDetails,
        error: function (err) {
            $.hideLoading();
        }
    })
}
/*获取到所有的商品  一一对应*/
var goodsSKU;
/*用户选择的商品属性*/
var getGoodsData = {};
var getGoodsId = [];
var getSkuId;
var StoreProductId;
var StoreId;//立即购买-id

/*储存商品数据后面动态选择属性更改价格*/
var goodsPriceItem;

function getGoodsDetails(req) {
    goodsPriceItem = req.data;
    //console.log(goodsPriceItem)
    if (req) {
        if (req.status == Common.HTTP_VALUE_SUCCESS) {
            $.hideLoading();
            goodsSKU = req.data.goodsSKU;
            var data = req.data;
            var dataImg = req.data.goodsImages;
            /*banner图*/
            $("#index-banner-img").empty();
            var html = '';
            $.each(dataImg, function (index, item) {
                html += '<a class="swiper-slide">';
                html += '<img src=" ' + item.imageUrl + ' " alt="" class="img-responsive">';
                html += '</a>';
            });
            $("#index-banner-img").html(html);
            /*商品详情 图片*/
           var $body = '';
           $.each(data, function(i) {
               $body = '<div>' + data.details + '</div>';
           });
            $(".goods-info").empty();
            $(".goods-info").html($body);


            /*商品是否促销*/
            if (goodsPriceItem.IsPromotion) {
                var starTime = goodsPriceItem.PromotionStartTime;//开始时间戳
                var endTime = goodsPriceItem.PromotionEndTime;//结束时间戳
                var endtime = new Date(endTime);//结束时间
                $('.goods-discount').empty();
                var htmlDiscount = '';
                htmlDiscount += '<em>限时折扣</em><span>距结束还剩 <b></b></span>';
                $('.goods-discount').html(htmlDiscount);
                var timeNum = setInterval(function () {
                    var dayTime = '';
                    var nowtime = new Date();//当前时间
                    var nowstamp = Date.parse(new Date())/1000;//当前时间戳
                    var time = endtime - nowtime;
                    var day = parseInt(time / 1000 / 60 / 60 / 24);//天
                    var hour = parseInt(time / 1000 / 60 / 60 % 24);//时
                    var minute = parseInt(time / 1000 / 60 % 60);//分
                    var seconds = parseInt(time / 1000 % 60);//秒
                    
                    if (day < 0) {
                        dayTime = '';
                    } else {
                        dayTime = day + '天';
                    }
                    if (starTime < nowstamp) {
                        $('.goods-discount span').html('活动未开始');
                        clearInterval(timeNum);
                        return false;
                    }
                    if (time <= 0) {
                        $('.goods-discount span').html('促销结束');
                        clearInterval(timeNum);//清除定时器
                        return false;
                    }
                    $('.goods-discount span>b').html(dayTime + t(hour) + ":" + t(minute) + ":" + t(seconds));
                }, 1000);
            }

            //创建补0函数
            function t(s) {
                return s < 10 ? '0' + s : s;
            }
            

            /*商品信息*/
            $(".goods-information").empty();
            var htmlSection = '';
            htmlSection += '<h2>' + data.name + '</h2>';
            htmlSection += '<p>' + data.bref+ '</p>';
            $(".goods-information").html(htmlSection);

            /*商品特色*/
            $(".goods-new-box").empty();
            var htmlTags = '';
            $.each(data.tags, function (i, items) {
                htmlTags += '<span>' + items + '</span>';
            });
            $(".goods-new-box").html(htmlTags);

            /*商品价格*/
            $(".goods-prices-box").empty();
            var htmlPrices = '';
            htmlPrices += '<span> ￥<b class="goodsPriceItem">' + data.salePrice + '</b></span>';
            htmlPrices += '<span> ￥' + data.marketPrice + '</span>';
            htmlPrices += '<span>月销：<em>' + data.saleCount + '件</em></span>';
            $(".goods-prices-box").html(htmlPrices);

            /*商品收藏*/
            if (data.isCollect) {
                $('#house').attr('data-house', '1');
                $('#house').addClass('collection');
            }else{
                $('#house').attr('data-house', '2');
                $('#house').removeClass('collection');
            }

            /*商品规格*/
            $('#goodsSpec').empty();
            var $spec = (data.bref).split("\n");
            var $arr = new Array();//定义数组
            var htmlPSpec = "";
            for (var i = 0; i < $arr.length; i++) {
                htmlPSpec += '<li>' + $spec[i] + '</li>';
            }
            $('#goodsSpec').html(htmlPSpec);

            /*猜你喜欢*/
            var liveGoods = data.likeGoods;
            //console.log(liveGoods)
            var $love = '';
            $('#loveGoods').empty();
            $.each(liveGoods, function (i, item) {
                $love += '<li data-id=' + item.goodsId + '><a href="/Goods/GoodsDetails?goodsId='+item.goodsId+'"><div class="goods-img-show">';
                $love += '<img src=' + item.imageUrl + ' class="img-responsive">';
                $love += '</div><div class="goods-text-show"><p>' + item.goodsName + '</p>';
                $love += '<span class="normal-price">￥' + item.price + '</span>';
                $love += '</a></li>';
            })
            $('#loveGoods').html($love);
            var $width = $('.goods-img-show').find('img').width();
            $('.goods-img-show').find('img').css('height',$width+'px');


            /*弹窗内商品信息*/
            $(".pop-goods-info").empty();
            var popGoodsDetails = '';
            popGoodsDetails += '<li class="left-goods-img">';
            popGoodsDetails += '<img src="' + dataImg[0].imageUrl + '" alt="" class="img-responsive">';
            popGoodsDetails += '</li>';
            popGoodsDetails += '<li class="right-goods-des">';
            popGoodsDetails += '<h3>' + data.name + '</h3>';
            popGoodsDetails += '<p>' + data.bref + '</p>';
            popGoodsDetails += '<span>￥<b class="goodsPriceItem">' + data.salePrice + '</b></span>';
            popGoodsDetails += '</li>';
            $(".pop-goods-info").html(popGoodsDetails);

            /*颜色、尺寸选择弹窗*/
            $("#goods-color-select").empty();
            var dataSale = req.data.saleAttributes;
            // console.log("====="+dataSale);//颜色
            var htmlPop = '';
            $.each(dataSale, function (b, val) {
                htmlPop += '<h2>' + val.attributeName + '</h2>';
                htmlPop += '<div class="items attrItems attrItems' + val.attributeId + '" kid="' + val.attributeId + '">';
                var sizeData = val.attributeValues;
                $.each(sizeData, function (a, value) {
                    htmlPop += '<input type="checkbox" onclick="AttrClick(this)" name="spec_' + val.attributeId + '" value="' + value.valueId.toLowerCase() + '" id="spec_value_' + value.valueId.toLowerCase() + '" kid="' + val.attributeId + '">';
                    htmlPop += '<label for="spec_value_' + value.valueId.toLowerCase() + '" ' +
                        'class="spec_value_' + value.valueId.toLowerCase() + '">' + value.valueName + '</label>';
                });
                htmlPop += '</div>';
            });
            $("#goods-color-select").html(htmlPop);
            var $itemLen = $('#goods-color-select .items').length;
            if ($itemLen === 1) {
                //$('.items').eq(0).find('input').trigger('click');
                $('#addCartItem').attr('len', 1);
                $('#purchaseItem').attr('len', 1);
            }
            
           // alert($itemLen)
            //for (var i = 0; i < $itemLen; i++) {
            //    var $len = $('.items').eq(i).find('label').length;
            //    if ($len === 1) {
            //        $('.items').eq(i).find('label').trigger('click');
            //        var kid = $('.items').eq(i).find('input').val();
            //        $('.items').eq(i).find('input').attr("checked", "checked");
            //        AttrClick(kid);
            //        //alert(StoreProductId)
            //    }
            //}
            
        } else {
            $.hideLoading();
            $.toast(req.message, "forbidden"); 
        }
    }
}

//商品属性checkbox点击事件 维护选中状态 并且 调用 刷新价格和库存方法
function AttrClick(obj) {
    //如果属性被选中,就清空其他同级属性的选中状态
    var attid = $(obj).val();
    $(obj).attr("checked", "checked").siblings("input").removeAttr("checked", "checked");
    if ($(obj).prop("checked")) {
        //console.log("获取到商品属性ID："+ attid);
        $(obj).siblings("input").each(function (i, o) {
            if ($(o).val() != attid) {
                $(o).prop("checked", false);
            }
        });
    }
    //调用选择属性方法
    changeGoodsNum();
}
//如果只有一个商品属性就默认选中
var checkOne = $(".attrItems input:checkbox");
if (checkOne.length == 1) {
    $(".attrItems input:checkbox").prop("checked", true);
}
//changeGoodsNum();
//刷新库存,没库存的属性禁选择
function changeGoodsNum() {
    //一 把所有属性过一遍,没有库存的禁用.
    //循环所有的属性,如果库存对象里面显示没有库存,就禁用掉.
    $("div.attrItems input:checkbox").each(function (idx, obj) {
        //循环判断是否有库存
        var gid = ($(obj).val()).toLowerCase();
        
        var isExits = false;
        $(goodsSKU).each(function (i, o) {
            //拿到所有的商品
            // console.log(getSkuId.attributeValues);
            var tmpArr = o.attributeValues.split(",");
            $(tmpArr).each(function (i2, o2) {
                if (gid == o2 && o.stock != 0) {
                    isExits = true;
                    //console.log('id:' + gid);
                    //$('#addBtn').attr('max', o.stock);
                }
            });
        });
        //根据库存设置可选状态和颜色.
        if (isExits == false) {
            $(obj).attr("disabled", "disabled").prop("checked", false);
            $(".spec_value_" + gid).css({ "border": "1px solid #c5c4c0", "color": "#c5c4c0" });
        } else {
            $(obj).attr("disabled",false);
            $(".spec_value_" + gid).css({ "border": "1px solid #c5c4c0", "color": "#333", "background-color": "#ffffff" });
        }
    });
    //二 循环所有没选中的属性,把没选中的一个一个和选中组合去查看有没有库存,没有的就禁用
    
    $("div.attrItems").each(function (idx, obj) {
        var kid = $(obj).attr("kid");
        //获取到除本属性以外的所有被选中属性
        var chosedItems = [];
        $("div.attrItems input:checkbox:checked").each(function (idx, ocd) {
            if ($(ocd).attr("kid") != kid) {
                chosedItems.push($(ocd).val());
            }
        });
        $(obj).find("input:checkbox").not("input:checked").each(function (ii, io) {
            var tid = $(io).val();
            var hasNum = false;//最终是否有库存
            //循环库存信息对象
            $(goodsSKU).each(function (gi, go) {
                var hasNum1 = false;//是否包含当前未选中属性
                var hasNum2 = false;//是否包含之前选中属性
                var tmpArr = go.attributeValues.split(",");
                hasNum1 = $.inArray(tid, tmpArr) != -1;
                if (go.stock > 0) {
                    $(chosedItems).each(function (ci, co) {
                        hasNum2 = $.inArray(co, tmpArr) != -1;
                        if (hasNum2 == false) {
                            return false;
                        }
                    });
                }
                if (chosedItems.length == 0) {
                    hasNum2 = true;
                }
                if (hasNum1 && hasNum2) {
                    hasNum = true;
                    return false;
                }
            });
            //如果这个属性不可选
            if (hasNum == false) {
                $(io).attr("disabled", "disabled").prop("checked", false);
                $(".spec_value_" + $(io).val()).css({ "border": "1px solid #c5c4c0", "color": "#c5c4c0" });
            }
        });
    });
   
   //最后把选中的属性加红色边框
    $("div.attrItems input:checkbox:checked").each(function (index, obj) {
        $(".spec_value_" + $(obj).val()).css({ "background-color": "#BE394B", "color": "#ffffff" });
        $(".spec_value_" + $(obj).val()).siblings().css({ "background-color": "#ffffff" });
    });

    //三 计算出库存数据.
    //1
    var ArrayChecked = [];
    $("div.attrItems input:checkbox:checked").each(function (index, obj) {
        ArrayChecked.push($(obj).val());
    });
    //2
    var goodsNum = 0;
    $(goodsSKU).each(function (gi, go) {
        var tmpArr = go.attributeValues.split(",");
        //循环货品id列表
        var isContain = true;
        $(ArrayChecked).each(function (i, o) {
            if (tmpArr.indexOf(o) == -1) {
                isContain = false;
            }
        });
        if (isContain == true) {
            goodsNum += parseInt(go.stock);
            $('#numValue').text('1');
            var item = GetProduct();
            if (typeof (item) != "undefined") {
                var itemNum = item.stock;
                var itemData = item.attributeValues.split(",");
                var saleAttr = goodsPriceItem.saleAttributes;
                var lis = [];
                if (itemNum > 0) {
                    StoreId = item.StoreProductId;
                    $('#addBtn').attr('max', item.stock);
                    $('.goodsPriceItem').text(item.salesPrice);
                    $.each(itemData, function (i, to) {
                        var toItem = to.toLowerCase();
                        $.each(saleAttr, function (t, tol) {
                            $.each(tol.attributeValues, function (s, tool) {
                                var toolItem = tool.valueId.toLowerCase();
                                if (toItem == toolItem) {
                                    lis.push(tool.valueName);
                                    $('.confirmBtn').attr('data-confirm', 'submit');
                                }
                            })
                        })
                    })
                }
                $('.user-select-style').html('');
                $.each(lis, function (i,o) {
                    var $html = o;
                    $('.user-select-style').append($html);
                })
            } else {
                $('.goodsPriceItem').text(goodsPriceItem.salePrice);
                $('.confirmBtn').attr('data-confirm', 'cancel');
                $('.addBtn').attr('max', '99');
                $('.user-select-style').html('');
            }
        }
    });
    // document.getElementById('shows_number').innerHTML = "库存量："+goodsNum;
    //刷新价格
    // changePrice();
}
/**
 * 点选可选属性或改变数量时修改商品价格的函数
 */
function changePrice() {
    //如果有完整的属性被选中,就调用刷新价格方法 否则把价格去掉
    if (hasChoseAll()) {
        var attr = GetProduct();
       
        Ajax.call('goods.php', 'act=price&id=' + goodsId + '&attr=' + attr + '&number=' + qty, changePriceResponse, 'GET', 'JSON');
    } else {
        //document.getElementById('ECS_GOODS_AMOUNT').innerHTML = "";
    }
}

function hasChoseAll() {
    var hasChoseAll = true;
    $("div.attrItems").each(function (i, o) {
        var dkid = $(o).attr("kid");
        if ($(".attrItems" + dkid + " input:checkbox:checked").length == 0) {
            hasChoseAll = false;
        }
    });
    return hasChoseAll;
}
function GetProduct() {
    var attrIds = GetAttrIds();
    var result;
    $(goodsSKU).each(function (i, o) {
        if (o.attributeValues == attrIds){
            result = o;
            return;
        }
    });
    return result;
}
function GetAttrIds() {
    var result = "";
    $(".attrItems").each(function (i, o) {
        var kid = $(o).attr("kid");
        var val = $(".attrItems" + kid + " input:checkbox:checked").val();
        if (result == "")
            result = val
        else
            result = result + "," + val;
    });
    return result;
}

function GetSelectdProductId() {
    //var attrIds = "";
    //$(".attrItems").each(function (i, o) {
    //
    //});
    //
    //var hasChoseAll = true;
    //$("div.attrItems").each(function (i, o) {
    //    var dkid = $(o).attr("kid");
    //    if ($(".attrItems" + dkid + " input:checkbox:checked").length == 0) {
    //        hasChoseAll = false;
    //    }
    //});
    //if (!hasChoseAll) {
    //    alert("请选择商品属性！");
    //    return false;
    //}

}
/**
 * 接收返回的信息
 */
function changePriceResponse(res) {
    if (res.err_msg.length > 0) {
        alert(res.err_msg);
    }
    else {
        //document.forms['ECS_FORMBUY'].elements['number'].value = res.qty;
        if (document.getElementById('ECS_GOODS_AMOUNT'))
            document.getElementById('ECS_GOODS_AMOUNT').innerHTML = res.result;
    }
}

//加入购物车
function addShopCar() {
    //console.log(GetProduct());
    //return false;
    $('body').css('overflow', 'hidden');
    $(".items input").each(function () {
        if ($(this).is(":checked") == true) {
            //console.log($(this).val());
            getGoodsId.push($(this).val());
        }
    });
    getSkuId = goodsSKU;
    $.each(getSkuId, function (i, v) {
        var index = $.inArray(getGoodsId[0], v.attributeValues.split(","));
        var index1 = $.inArray(getGoodsId[1], v.attributeValues.split(","));
        if (index >= 0 && index1 >= 0) {
            // productId = v.productId;   
            StoreProductId = v.StoreProductId;
        }
    });
    getShopCar();
    $('body').css('overflow', 'auto');
}




function getShopCar() {
    if (StoreProductId == undefined) {
        $.toast("请选择商品属性", "text");
        return false;
    }else{
        var goodsNum = parseInt($("#numValue").html());
        var param = {
            "StoreProductId": StoreProductId,
            "JoinType": Common.API_JOINTYPE_SHOPPING_CART,
            "Quantity": goodsNum
        }
        $.ajax({
            url: Common.API_BASE_URL + Common.API_URL_POST_ADD_SHOPPING_CAR,    //请求的url地址
            dataType: "json",   //返回格式为json
            async: true,
            contentType: "application/json",
            data: JSON.stringify(param),
            type: "POST",
            headers: {
                'Authorization': 'Bearer ' + tokenObj,
            },
            success: function (req) {
                if (req.status === 1) {
                    $.toast("加入购物车成功", "text");
                    removeProductIds();
                    //获取购物车数量
                    getShoppingCartSum();
                
                } else {
                    $.toast(req.message, "forbidden");
                }
                $('#pop-up').hide();
                $('.body-masking').hide();
            },
            error: function () {
                console.log('Bearer ' + tokenObj);
            }
        })
    }
}

/*清空商品id*/

function removeProductIds() {
    if (getGoodsId.length != 0) {
        getGoodsId.splice(0, getGoodsId.length);
        //console.log("商品ID已清空：" + getGoodsId.length)
    }
}

//获取购物车数量(动态改变购物车数量)
function getShoppingCartSum() {
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_GET_SHOPPINGCART_SUM,
        dataType: "json",
        contentType: "text/json",
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        success: function (req) {
            if (req.status === 1) {
                var data = req.data;
                //console.log("获取成功" + data);
                if(data>0){
            	    $("#shoppingCartNum").show().html(data);	
                }       
            }
        },
        error: function () {
            console.log("获取失败");
            $("#shoppingCartNum").hide();
        }
    })
}


//商品收藏
function collection(t) {
    var $num = $(t).find('span').attr('data-house');
    var house;
    if ($num  == '1') {
        $(t).find('span').removeClass('collection');
        $(t).find('span').attr('data-house', '2');
        house = '2'
        collItem(house);
        $.toast("取消成功");
    } else if ($num == '2') {
        $(t).find('span').addClass('collection');
        $(t).find('span').attr('data-house', '1');
        house = '1';
        collItem(house);
        $.toast("收藏成功");
    }
}

//添加收藏商品
function collItem(house) {
    var id = Common.getQueryString("goodsId");
    var param = {
        GoodsId: id,
        IsCollect: house
    }
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_POST_BUY_NOW,
        dataType: "json",
        contentType: "text/json",
        type: "POST",
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        data: JSON.stringify(param),
        success: function (res) {
            if (res.status == '1') {
            }
        },
        err: function () {
            console.log("获取失败");
        }
    })
}


/*立即购买--提交订单*/
function placeOrder(t) {
    var $confirm = $(t).attr('data-confirm');
    var $shopNum = $('#numValue').html();
    param = {
        "StoreProductId": StoreId,
        "JoinType": 1,
        "Quantity": $shopNum
    }
    if ($confirm == 'submit') {
        $.ajax({
            url: Common.API_BASE_URL + Common.API_URL_POST_ADD_SHOPPING_CAR,
            dataType: "json",
            contentType: "text/json",
            type: "POST",
            headers: {
                'Authorization': 'Bearer ' + tokenObj,
            },
            data: JSON.stringify(param),
            success: function (res) {
                if (res.status == 1) {
                    var ShopCartId = res.data.ShoppingCartId;
                    location.href = "/Order/OrderConfirm?ids=" + ShopCartId;
                }else {
                    $.toast(res.message, "forbidden");
                }
            },
            err:function(err) {
                $.toast(err.message, "forbidden");
            }
        })
    } else {
        $.toast("请选择商品属性","text");
    }
}



//购物车数量加减
function addChange(on){
	var $val = parseInt($('#numValue').html());
	var $max = parseInt($('#addBtn').attr('max'));
	$('#addBtn').removeClass('disabled');
	$('.reduceBtn ').removeClass('disabled');
	if(on == '1'){
		if($val >= $max){
			$val = $max;
			$('#addBtn').addClass('disabled');
		}else{
			$val++;
		}
		$val = $('#numValue').html($val);
	}else if(on == '-1'){
		if($val <= 1 ){
			$val = 1;
			$('.reduceBtn ').addClass('disabled');
		}else{
			$val--;
		}
		$val = $('#numValue').html($val);
	}
}


//规格只有一个时直接添加或购买
function showBox(t, obj) {
    var $len = $(t).attr('len');
    if ($len == '1') {
        if (obj == 'cart') {
            addShopCar();
        } else if (obj == 'buy') {
            $('.items input').eq(0).trigger('click');
            placeOrder(t);
        }

    } else {
        $('body').css('overflow', 'hidden');
        $(".body-masking").show();
        $("#pop-up").show();
        $("#pop-up").removeClass('bombEn').addClass('bombAn');
    }
}






