	var categoryId = Common.getQueryString("categoryId");
	Common.headerTitle('商品列表')
	
	PageSize=10,PageIndex=1; 
	var param = {
      "CategoryId": categoryId,
	  "Type":0,
	  "Sort": 0,
	  "PageIndex": PageIndex,
	  "PageSize": PageSize,
	  "StoreId": ""
    }
    //进入页面加载  
    load(PageIndex,param);    
//滚动加载更多
    var loading = false;  //状态标记 
    $(window).on('scroll',function(){
        if(scrollTop() + windowHeight() >= (documentHeight() - 50/*滚动响应区域高度取50px*/)){
            $(document.body).infinite().on("infinite", function () {
                if (loading) {
                    return false;
                } else {
                    loading = true;
                    setTimeout(function () {
                        PageIndex++;
                        param.PageIndex = PageIndex;
                        load(PageIndex, param);
                        loading = false;
                    }, 500);   //模拟延迟   
                }
                 
            });
        }
    });
    //获取页面顶部被卷起来的高度
    function scrollTop(){
        return Math.max(
         //chrome
         document.body.scrollTop,
         //firefox/IE
         document.documentElement.scrollTop);
    }
    //获取页面文档的总高度
    function documentHeight(){
        //现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
        return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
    }
    //获取页面浏览器视口的高度
    function windowHeight(){
        //document.compatMode有两个取值。BackCompat：标准兼容模式关闭。CSS1Compat：标准兼容模式开启。
        return (document.compatMode == "CSS1Compat")?
        document.documentElement.clientHeight:
        document.body.clientHeight;
    }

        

//根据类别分类展示
$('#wrapTitle').on('click','span',function(){
	$(document.body).infinite();
	$("#loadings").css("display","block");
	$("#loadend").css("display","none"); 
	$('#wrapList').empty();
	$('#wrapTitle').find('.srort i').removeClass('active');
	$('#wrapTitle').find('.srort i').attr('data-s','1');
	var $on =$(this).attr('data-on');
	$(this).addClass('cur').siblings().removeClass('cur');
	PageSize=10,PageIndex=1;  
	
	switch($on){
		case '0':
		  var param = {
		      "CategoryId": categoryId,
			  "Type": 0,
			  "Sort": 0,
			  "PageIndex": PageIndex,
			  "PageSize": PageSize,
			  "StoreId": ""
		    }
		  load(PageIndex,param);
		  break;
		case '1':
			var param = {
		      "CategoryId": categoryId,
			  "Type": 1,
			  "Sort": 0,
			  "PageIndex": PageIndex,
			  "PageSize": PageSize,
			  "StoreId": ""
		    }
		  load(PageIndex,param);
		  break;
		case '2':
		  var param = {
		      "CategoryId": categoryId,
			  "Type": 2,
			  "Sort": 0,
			  "PageIndex": PageIndex,
			  "PageSize": PageSize,
			  "StoreId": ""
		    }
		  load(PageIndex,param);
		  break;
		case '3':
			var param = {
		      "CategoryId": categoryId,
			  "Type": 3,
			  "Sort": 0,
			  "PageIndex": PageIndex,
			  "PageSize": PageSize,
			  "StoreId": ""
		    }
		   $(this).find('.srort i').removeClass('active');
			var $s = $(this).find('.srort').attr('data-s');
			if($s == '1'){
				$(this).find('.srort .down').addClass('active');
				$(this).find('.srort').attr('data-s','2');
				param.Sort=0;
			}else if($s == '2'){
				$(this).find('.srort .up').addClass('active');
				$(this).find('.srort').attr('data-s','1');
				param.Sort=1;
			}
			load(PageIndex,param);
		  break;  
	}
})

//ajax加载数据  
    function load(p,param) {
    	$.ajax({
	        url: Common.API_BASE_URL + Common.API_URL_GET_GET_GOODS_BY_STORE,
	        dataType: "json",
	        contentType: "text/json",
	        type: "POST",
	        data: JSON.stringify(param),
	        headers: {
	            'Authorization': 'Bearer ' + tokenObj,
	        },
	        success: function (res) {
	            if (res.status == '1') {
	                initShopList(p, res);
	            } else {
	                $.toast(res.message, "forbidden");
	                $("#loadings").css("display", "none");
	                $("#loadend").css("display", "block");
	            }
	            
	        },
	        error: function(err){
	            $.toast(err.message, "forbidden");
	        	$("#loadings").css("display","none");
	        	$("#loadend").css("display","block"); 
	        }
	    })
    }  

function initShopList(page,data){
	var $data = data.data.items;
	var $len = data.data.items;
	var $tolNum = data.data.totalPageCount;
	var html='';
	if($len != 0){
		$.each($data, function(i,item) {
			html +='<li><a href="/Goods/GoodsDetails?goodsId='+item.goodsId+'" class="imgLink"><img src="'+item.imageUrl+'" alt="" />';
			html += '<em>'+item.goodsName+'</em><span><b>￥</b>'+item.salePrice+'</span></a></li>'
		});
		$('#wrapList').append(html);
		var $width = $('.imgLink').find('img').width();
		$('.imgLink').find('img').css({'height':$width+'px'});
		if(page >= $tolNum){
			$("#loadings").css("display","none");
        	$("#loadend").css("display","block"); 
        	loading = true;
        	$(document.body).destroyInfinite();
        	return false;
		}
	}else{
		$("#loadings").css("display","none");
        $("#loadend").css("display","block"); 
	}
	
}

