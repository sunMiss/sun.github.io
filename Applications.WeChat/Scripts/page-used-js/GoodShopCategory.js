$(function(){
    Common.headerTitle('商品分类');
	
	var param = {
	    "StoreId": "DFC38A64-4931-4C02-AC87-BBF6970A0CC5"
	}
	
	$.ajax({
	    url: Common.API_BASE_URL + Common.API_URL_GET_GOODS_STORE_CATEGORY,    //请求的url地址
	    dataType: "json",   //返回格式为json
	    async: true,//请求是否异步，默认为异步，这也是ajax重要特性
	    contentType: "application/json",
	    data:JSON.stringify(param),
	    type: "POST",   //请求方式
	    success:function(res){
	        if (res.status === '1') {
	            getAllGoods(res.data);
	        } else {
	            $.toast(res.message, "forbidden");
	        }
	    },
	    error:function(err){
	        $.toast(err.message, "forbidden");
	    }
	});
})



function getAllGoods(data){
	var html = '';
	$.each(data, function(i,item) {
		html+= '<div class="shopItem"><h3 class="shop"><em>'+item.categoryName+'</em><a href="/Goods/GoodsStoreList?categoryId='+item.categoryId+'">查看全部</a></h3><ul class="shopList">';
		$.each(item.parentCategoryData,function(j,list){
			html+='<li><a href="/Goods/GoodsStoreList?categoryId='+list.categoryId+'">'+list.categoryName+'</a></li>';
		})
		html+='</ul></div>';
	});
	$('.goodsShopItem').html(html);       
}





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
