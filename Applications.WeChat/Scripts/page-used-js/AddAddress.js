$(function () { 
    Common.headerTitle("地址管理");
    var param = {}
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_GET_USER_GET_ADDRESS_LIST,
        dataType: "json",
        contentType: "text/json",
        type: "GET",
        data: JSON.stringify(param),
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        success: function (res) {
            if (res.status === 1) {
                var data = res.data;
                addressList(data)
            } else {
                $.toast(res.message, "forbidden");
            }
        },
        error: function (err) {
            $.toast(err.message, "forbidden");
        }
    })
})

var orderList = Common.getQueryString("orderList");
//展示收货地址列表
function addressList(data) {
    var $html='';
    if (data == null) {
        $('.addressNull').show();
        return false;
    } else {
        $('.addressNull').hide();
    }

    $.each(data, function (i, list) {
        var $checked = '';
        var $default = '';
        var $address = '';
        if(list.isDefault){
            $checked = 'checked';
            $default = "default='true'";
        }
        if(orderList != null) {
            $address = '';
        } else {
            $address = '<div class="addressItem" zipcode=' + list.zipCode + ' ' + $default + ' ><input type="checkbox" onclick="check(this)" class="check-box ' + $checked + '">默认收货地址<span><a href="/Order/FoundAddress?shippingId=' + list.addressId + '" class="edit">编辑</a><a href="javascript:;" onclick="delAddress(this)" class="dal">删除</a></span></div>';
        }
        $html += '<li><div class="addItems" onclick="AddressSelection(this)"><p class="addressName" addId=' + list.addressId + '><em>收货人:<strong class="name">' + list.receiver + '</strong></em><span class="tel">' + list.mobilePhone + '</span></p>';
        $html += '<p class="addressText"><span proid=' + list.provinceId + ' class="pro">' + list.province + '</span><span class="city" city=' + list.cityId + '>' + list.city + '</span><span class="county" county=' + list.countyId + '>' + list.county + '</span><span class="street">' + list.street + '</span></p></div>';
        $html += ''+$address+'</li>';
    })
    $('#addAdminList').html($html);
}


//删除地址
function delAddress(t) {
    var $addid = $(t).parents('li').find('.addressName').attr('addId');
    var $img = '<img src="../../Content/dxpImages/img_shop_delet.png" style="display:block;width:3rem;height:3rem;margin:auto;"/>';
    var param = {
        "ShippingAddressId": $addid
    }
    $.confirm({
	  title: $img,
	  text: '确认删除该地址?',
	  onOK: function () {
			$.ajax({
	           url: Common.API_BASE_URL + Common.API_URL_POST_USER_GET_DEL_ADDRESS,
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
	  },
	  onCancel: function () {
	  }
	});
}

//修改默认收货地址
function check(t) {
	var caridlist = Common.getQueryString("orderList");
	caridlist = caridlist.split(",");
    var $addid = $(t).parents('li').find('.addressName').attr('addId');
    $('#addAdminList').find('.check-box').removeClass('checked');
    $(t).addClass('checked');

    var param = {
        "ShippingAddressId": $addid
    }
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_POST_USER_SET_ADDRESS,
        dataType: "json",
        contentType: "text/json",
        type: "POST",
        data: JSON.stringify(param),
        headers: {
            'Authorization': 'Bearer ' + tokenObj,
        },
        success: function (res) {
            if (res.status === 1) {
               // location.href = "/Order/OrderConfirm?ids="+caridlist;
            } else {
                $.toast(res.message, "forbidden");
            }
        },
        error: function (err) {
            $.toast(err.message, "forbidden");
        }
    })
}

//地址选择
function AddressSelection(t) {
    var $addid = $(t).parents('li').find('.addressName').attr('addId');
    var caridlist = Common.getQueryString("orderList");
    location.href = "/Order/OrderConfirm?ids=" + caridlist + "&DeliveryAddressId="+$addid;
}

//添加地址
function addAddress() {
	var caridlist = Common.getQueryString("orderList");
	if(caridlist ==  null || caridlist == undefined || caridlist == ''){
		caridlist = 0;
	}else{
		caridlist = caridlist.split(",");
	}
	
    location.href = "/Order/FoundAddress?addURL="+caridlist;
}



























