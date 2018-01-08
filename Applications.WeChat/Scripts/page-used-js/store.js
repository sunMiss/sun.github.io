

var storeId = $wy.getSession('StoreId');



 	max=6,page=1;
    //进入页面加载  
    var item = {
        "PageIndex": page, "PageSize": '4', "storeId": 'DFC38A64-4931-4C02-AC87-BBF6970A0CC5'
    }
    load(page,item);    
    //滚动加载更多  
    //var loading = false;  //状态标记  
    //$(document.body).infinite().on("infinite", function() {    
    //    if(loading) return;    
    //    loading = true;    
    //    setTimeout(function() {    
    //       page++;
    //       item.PageIndex = page;
    //        load(page,item);  
    //        loading = false;    
    //    }, 500);   //模拟延迟    
    //}); 

function load(page,item){
	$.ajax({
	    url: Common.API_BASE_URL + Common.API_URL_POST_GET_GBRANCH + '?storeId=' + item.storeId,    //请求的url地址
	    dataType: "json",   //返回格式为json
	    async: true,//请求是否异步，默认为异步，这也是ajax重要特性
	    contentType: "application/json",
	    data:JSON.stringify(item),
	    type: "POST",   //请求方式
	    success: function getAllGoods(req) {
	        if (req.status === Common.HTTP_VALUE_SUCCESS) {
	            var data = req.data.goodsModels;
	            var total = req.data.totalPageCount;
	            Common.headerTitle(req.data.storeName);
	            $('.shopName').html(req.data.storeName);
	            //req.data.goodsModels == null || req.data.currentPageIndex == req.data.totalPageCount
	            if (req.data.goodsModels.length <= 0) {
	                //没有数据时  
	                $(document.body).destroyInfinite();
	                $('#loadings').hide();
	                $('#loadend').show();
	            } else {
	                var html = '';
	                for (var i = 0; i < data.length; i++) {
	                    html = '<li><a href="/Goods/GoodsDetails?goodsId=' + data[i].id + '" class="c-list"><img src="' + data[i].imgUrl + '" alt="" /><em>' + data[i].title + '</em><span><b>￥</b>' + data[i].price + '</span></a></li>';
	                    $('#shopList').append(html);
	                }
	                var $cateW = $('.c-list').find('img').width();
	                $('.c-list').find('img').css({ 'height': $cateW + 'px' });
	                $('#loadings').hide();
	                $('#loadend').show();
	            }
	        } else {
	            $.toast(req.Message, "forbidden");
	        }
	    }
	});
}

//input 搜索框
$('#search_input').bind('keypress', function(event) {
	if (event.keyCode == "13") {  //js监测到为为回车事件时 触发  
	    event.preventDefault();   //阻止页面自动刷新，重复加载
	   
	}  
});

