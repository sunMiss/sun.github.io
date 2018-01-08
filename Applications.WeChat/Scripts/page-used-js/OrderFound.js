$(function () {
    Common.headerTitle("添加地址");
    var shippingId = Common.getQueryString("shippingId");

    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_POST_USER_GET_SHIPPING_ADRESSID + '=' + shippingId,
        dataType: "json",
        contentType: "text/json",
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        data: JSON.stringify(),
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        success: function (res) {
            if (res.status === 1) {
                var data = res.data;
                addressList(data)
            } else {
               // $.toast(res.message, "forbidden");
            }
        },
        error: function (err) {
            $.toast(err.message, "forbidden");
        }
    })

})

function addressList(item) {
    if (item.isDefault == true) {
        $('.check-box').addClass('checked');
    }
    $('.cargoName').val(item.receiver);
    $('.cargoPhone').val(item.mobilePhone);
    $('.cargoRegion').html(item.province + ' ' + item.city + ' ' + item.county);
    $('.cargoCode').val(item.zipCode);
    $('.cargoCodeAress').val(item.street);
    $('.addressBtn').find('button').attr('data-save', 'comfig');
    $('#attrItem').attr('proAreaid', item.provinceId);
    $('#attrItem').attr('cityAreaid', item.cityId);
    $('#attrItem').attr('areaAreaid', item.countyId);
}





//设置默认
$('.foundlist').on('click', function () {
    var $on = $(this).attr('data-on');
    if ($on == 'false') {
        $(this).find('input').addClass('checked');
        $(this).attr('data-on', 'true');
    } else if ($on == 'true') {
        $(this).find('input').removeClass('checked');
        $(this).attr('data-on', 'false');
    }
})



//获取区域信息
function foundlist() {
    $('.masking').show();
    $('.CityBox').show();
    
    var param = {}
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_POST_USER_GET_AREA_LIST,
        dataType: "json",
        contentType: "text/json",
        type: "POST",
        data: JSON.stringify(param),
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        success: function (res) {
            if (res.status === 1) {
                var item = res.data;
                var $html = '';
                $.each(item, function (i, list) {
                    $html += '<li areaId=' + list.areaId + '>' + list.areaName + '</li>';
                })
                $('#province').html($html);
            }
        },
        error: function () {
            console.log("更新失败");
        }
    })
}

//选择市
$('#province').on('click', 'li', function () {
    $(this).addClass('cur').siblings().removeClass('cur');
    $('#cityitem').addClass('cur').siblings().removeClass('cur');
    var $txt = $(this).text();
    $('#proitem').html($txt);
    var $id = $(this).attr('areaid');
    $('#attrItem').attr('proAreaid', $id);
    var param = {
        "ParentId": $id,
    }
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_POST_USER_GET_AREA_LIST,
        dataType: "json",
        contentType: "text/json",
        type: "POST",
        data: JSON.stringify(param),
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        success: function (res) {
            if (res.status === 1) {
                var item = res.data;
                var $html = '';
                $.each(item, function (i, list) {
                    $html += '<li areaId=' + list.areaId + '>' + list.areaName + '</li>';
                })
                $('#city').html($html);
            }
        },
        error: function () {
            console.log("失败");
        }
    })
});


//选择区
$('#city').on('click', 'li', function () {
    $('#areaitem').addClass('cur').siblings().removeClass('cur');
    $(this).addClass('cur').siblings().removeClass('cur');
    var $txt = $(this).text();
    $('#cityitem').html($txt);
    $('#province').hide();
    $('#area').show();
    var $id = $(this).attr('areaid');
    $('#attrItem').attr('cityAreaid', $id);
    var param = {
        "ParentId": $id,
    }
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_POST_USER_GET_AREA_LIST,
        dataType: "json",
        contentType: "text/json",
        type: "POST",
        data: JSON.stringify(param),
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        success: function (res) {
            if (res.status === 1) {
                var item = res.data;
                var $html = '';
                $.each(item, function (i, list) {
                    $html += '<li areaId=' + list.areaId + '>' + list.areaName + '</li>';
                })
                $('#area').html($html);
            }
        },
        error: function () {
            console.log("失败");
        }
    })
})

$('#area').on('click', 'li', function () {
    var $txt = $(this).text();
    var $id = $(this).attr('areaid');
    $('#attrItem').attr('areaAreaid', $id);
    $(this).addClass('cur').siblings().removeClass('cur');
    $('#areaitem').html($txt);
})

//点击省名
$('#proitem').on('click', function () {
    $('#area').hide();
    $('#province').show();
})

//点击确定
$('.Cityheader').on('click', '.comfig', function () {
    var $proitem = $('#proitem').text();
    var $cityitem = $('#cityitem').text();
    var $areaitem = $('#areaitem').text();
    $('.masking').hide();
    $('.CityBox').hide();
    $('.cargoRegion').html($proitem + ' ' + $cityitem + ' ' + $areaitem);
})



//保存
function addSaveBtn(t) {
    var $comfig = $(t).attr('data-save');
    var shippingId = Common.getQueryString("shippingId");
    var addNum = Common.getQueryString("addURL");

    var cargoName = $('.cargoName').val(),
        cargoPhone = $('.cargoPhone').val(),
        cargoRegion = $('.cargoRegion').text();
        cargoCode = $('.cargoCode').val(),
        cargoCodeAress = $('.cargoCodeAress').val();
        var $default = $('.foundlist').attr('data-on');

        cargoRegion = cargoRegion.split(' ');

        if (cargoName == "") {
        	$.toast("收货人不能为空", "text");
            return false;
        } else if (cargoPhone == "") {
        	$.toast("手机号码不能为空", "text");
            return false;
        } else if (!(/^1[34578]\d{9}$/.test(cargoPhone))) {
        	$.toast("手机号码格式不正确", "text");
            return false;
        } else if (cargoRegion == "" || cargoRegion[0] == "请选择省市") {
        	$.toast("区域选择格式不正确", "text");
            return false;
        } else if (cargoCode == "") {
        	$.toast("邮编不能为空", "text");
            return false;
        } else if (! /^[0-9][0-9]{5}$/.test(cargoCode)) {
        	$.toast("邮编格式不正确", "text");
            return false;
        } else if (cargoCodeAress == "") {
        	$.toast("地址不能为空", "text");
            return false;
        }

        var $proAreaid = $('#attrItem').attr('proAreaid');
        var $cityAreaid = $('#attrItem').attr('cityAreaid');
        var $areaAreaid = $('#attrItem').attr('areaAreaid');

        var param = {
            "Receiver": cargoName,
            "ContactNumber": cargoPhone,
            "MobilePhone": cargoPhone,
            "ProvinceId": $proAreaid,
            "Province": cargoRegion[0],
            "CityId": $cityAreaid,
            "City": cargoRegion[1],
            "CountyId": $areaAreaid,
            "County": cargoRegion[2],
            "Street": cargoCodeAress,
            "ZipCode": cargoCode,
            "IsDefault": $default
        };
        
        if ($comfig == 'comfig') {//更新
            param.ShippingAddressId = shippingId;
            $.ajax({
                url: Common.API_BASE_URL + Common.API_URL_POST_USER_GET_UPDATE_ADRESS,
                dataType: "json",
                contentType: "text/json",
                type: "POST",
                data: JSON.stringify(param),
                headers: {
                    'Authorization': 'Bearer ' + tokenObj,
                },
                success: function (res) {
                    if (res.status === 1) {
                    	$.toast("保存成功", "text");
                        setTimeout(function () {
                            location.href = "/Order/OrderConfirm";
                        }, 1000);
                    }
                },
                error: function () {
                    console.log("更新失败");
                }
            })

        } else {
            $.ajax({//添加
                url: Common.API_BASE_URL + Common.API_URL_POST_USER_ADD_SHOPPING_ADDRESS,
                dataType: "json",
                contentType: "text/json",
                type: "POST",
                data: JSON.stringify(param),
                headers: {
                    'Authorization': 'Bearer ' + tokenObj,
                },
                success: function (res) {
                    if (res.status === 1) {
                    	$.toast("保存成功", "text");
                        setTimeout(function () {
                        	var caridlist = Common.getQueryString("addURL");
								caridlist = caridlist.split(",");
                        	if(addNum  !=  '0'){
                        	    //location.href = "/Order/OrderConfirm?ids="+caridlist+ "&DeliveryAddressId="+$addid;
                        	}else{
                        		location.href = "/Personal/Personal";
                        	}
                        }, 1000);
                    }
                },
                error: function () {
                    console.log("更新失败");
                }
            })
        } 
    
}



$('.masking').click(function () {
    $(this).hide();
    $('.CityBox').hide();
})

//修改微信Title
function headerTitle(title) {
    var $body = $('body');
    document.title = title;
    var $iframe = $('<iframe src="/favicon.ico"></iframe>');
    $iframe.on('load', function () {
        setTimeout(function () {
            $iframe.off('load').remove();
        }, 0);
    }).appendTo($body);
}