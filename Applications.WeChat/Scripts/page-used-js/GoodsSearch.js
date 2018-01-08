Common.headerTitle('搜索');

//监听搜索的值
$("#searchVal").bind("input propertychange change",function(event){
	var $val = $(this).val();
	$('#callShop').hide();
	if($val.length != 0 ){
		$('.searchClear').show();
	}else{
		$('.searchClear').hide();
	}
});

//清除input 方法
function clearInput(t){
	$("#searchVal").val('');
	$(t).hide();
}




//搜索
function searchBtn(){
	$('#searchList').html('');
	var $val = $('#searchVal').val();
	var param = {
		"SearchName": $val,
		"PageIndex": 1,
		"PageSize": 100
	}
	$.ajax({
    url: Common.API_BASE_URL + Common.API_URL_GET_GET_GOODS_SEARCH_BY_STORE,
    dataType: "json",
    contentType: "text/json",
    type: "POST",
        data: JSON.stringify(param),
        success: function (res) {
            if (res.status == '1') {
                var list = res.data;
                var html = '';
                if (list.items == 0 || list.items == null) {
                    $('#callShop').show();
                } else {
                    $.each(list.items, function (i, item) {
                        html += '<li><a href="/Goods/GoodsDetails?goodsId=' + item.goodsId + '" class="searchImg"><img src="' + item.imageUrl + '" alt="" />';
                        html += '<em>' + item.goodsName + '</em><span><b>￥</b>' + item.salePrice + '</span></a></li>';
                    })
                    $('#searchList').html(html);
                    var $widht = $('.searchImg').find('img').width();
                    $('.searchImg').find('img').css('height', $widht + 'px');
                }
            } else {
                $.toast(res.message, "forbidden");
            }
        	
        },
        error: function(err){
            $.toast(err.message, "forbidden");
        }
   })
}


$('#searchVal').bind('keypress', function(event) {   //回车事件绑定 
	if (event.keyCode == "13") {  //js监测到为为回车事件时 触发
    	searchBtn();       
    	document.activeElement.blur();  
    	event.preventDefault();   //阻止页面自动刷新，重复加载
   } 
})

