$(function () {
    $.showLoading();
	$.ajax({
        url: Common.API_BASE_URL + Common.API_URL_GET_NEW_HOME,
        dataType: "json",
        contentType: "text/json",
        type: "GET",
        success: function (res) {
            $.hideLoading();
            //console.log(res)
            if (res.status === 1) {
               InitHomeData(res);
            } else {
                $.toast(res.message, "forbidden");
            }
        },
        error: function (err) {
            $.hideLoading();
            $.toast(err.message, "forbidden");
        }
	})
	
})


function InitHomeData(res){
	var data = res.data;
	//一张自定义丿图片
	Index01Scroll(data.Index01Scroll)
	//拼图
	Index02Puzzle(data.Index02Puzzle)
	//三张自定义图片
	Index03Banner(data.Index03Banner)
	//秒杀
	Index04Skill(data.Index04Skill)
	//六张拼图
	Index05Puzzle(data.Index05Puzzle)

    //显示全部商品按钮
	$('.home-all-shop').show();
	//类目商品
	Index06CatoegoryGoods(data.Index06CatoegoryGoods)
	//类目导航
	Index07CatoegoryModel(data.Index07CatoegoryModel)
	//多种图片
	Index08Banner(data.Index08Banner)
}
	//一张自定义丿图片
	function Index01Scroll(data){
	    if (data.length > 0) {
	        if (data[0].Type == '0') {
	            var $html = '<p class="home-head-img"><a href="/Goods/GoodsDetails?goodsId=' + data[0].Data + '"><img src=' + data[0].ImgUrl + ' /></a></p>'
	        } else if (data[0].Type == '1') {
	            var $html = '<p class="home-head-img"><a href="/Goods/GoodsShopList?categoryId=' + data[0].Data + '"><img src=' + data[0].ImgUrl + ' /></a></p>'
	        } else if (data[0].Type == '2') {
	            var $html = '<p class="home-head-img"><a href="/Goods/GoodsShopListBaner?categoryId=' + data[0].Data + '"><img src=' + data[0].ImgUrl + ' /></a></p>'
	        }
			$('#home-article').append($html);
		}
	}
	
	//拼图
	function Index02Puzzle(data){
		var $html= '';
		if(data.length>0){
			$html +='<p class="home-head-img"><span class="home-head-imgDiv">';
			$.each(data[0], function (j, t) {
			    if (t.Type == '0') {
			        $html += '<a href="/Goods/GoodsDetails?goodsId=' + t.Data + '"><img src=' + t.ImgUrl + ' /></a>';
			    } else if (t.Type == '1') {
			        $html += '<a href="/Goods/GoodsShopList?categoryId=' + t.Data + '"><img src=' + t.ImgUrl + ' /></a>';
			    } else if (t.Type == '2') {
			        $html += '<a href="/Goods/GoodsShopListBaner?categoryId=' + t.Data + '"><img src=' + t.ImgUrl + ' /></a>';
			    }
			});
			$html +='</span></p>';
			$('#home-article').append($html);
		}
	}
	
	//三张自定义图片
	function Index03Banner(data){
		if(data.length>0){
		    $.each(data, function (i, item) {
		        if (item.Type == '0') {
		            var $html = '<p class="home-head-img"><a href="/Goods/GoodsDetails?goodsId=' + item.Data + '"><img src=' + item.ImgUrl + ' /></a></p>'
		        } else if (item.Type == '1') {
		            var $html = '<p class="home-head-img"><a href="/Goods/GoodsShopList?categoryId=' + item.Data + '"><img src=' + item.ImgUrl + ' /></a></p>'
		        } else if (item.Type == '2') {
		            var $html = '<p class="home-head-img"><a href="/Goods/GoodsShopListBaner?categoryId=' + item.Data + '"><img src=' + item.ImgUrl + ' /></a></p>'
		        }
				$('#home-article').append($html);
			});
		}
	}
	
	//秒杀
	function Index04Skill(data){
	    var	$html ='';
		if(data.length>0){
		    $.each(data, function (i, item) {
		        if (item.Type == '0') {
		            $html += '<li><a href="/Goods/GoodsDetails?goodsId=' + item.Data + '"><img src=' + item.ImgUrl + ' /></a></li>';
		        } else if (item.Type == '1') {
		            $html += '<li><a href="/Goods/GoodsShopList?categoryId=' + item.Data + '"><img src=' + item.ImgUrl + ' /></a></li>';
		        } else if (item.Type == '2') {
		            $html += '<li><a href="/Goods/GoodsShopListBaner?categoryId=' + item.Data + '"><img src=' + item.ImgUrl + ' /></a></li>';
		        }
			});
			$('#homeSeckill').html($html);
		}
	}
	
	//六张拼图
	function Index05Puzzle(data){
		var	$html ='';
		if(data.length>0){
			$.each(data, function(i,item) {
			  $html += '<li>';
			  $.each(item, function(j,p) {
			      if (p.Type == '0') {
			          $html += '<a href="/Goods/GoodsDetails?goodsId=' + p.Data + '"><img src=' + p.ImgUrl + ' /></a>';
			      } else if (p.Type == '1') {
			          $html += '<a href="/Goods/GoodsShopList?categoryId=' + p.Data + '"><img src=' + p.ImgUrl + ' /></a>';
			      }else if(p.Type == '2'){
			          $html += '<a href="/Goods/GoodsShopListBaner?categoryId=' + p.Data + '"><img src=' + p.ImgUrl + ' /></a>';
			      }
			  });
			  $html += '</li>';
			});
			$('#homeShopImg').html($html);
		}
	}
	
	//类目商品
	function Index06CatoegoryGoods(data){
		var $html = '';
		if(data.length > 0){
			$.each(data, function(i,item) {
				$html += '<article class="home-shop-item"><h3 class="home-groom">';
				$html += '<a href="/Goods/GoodsShopList?categoryId=' + item.TitleData + '"><em>' + item.Title + '</em></a><span></span></h3></figure><ul class="home-shop-list">';
				$.each(item.GoodsList,function(j,p){
				    $html += '<li><a href=/Goods/GoodsDetails?goodsId=' + p.Id + '><img src=' + p.ImgUrl + ' alt="" /><em>' + p.Title + '</em><span>￥' + p.Price + '</span></a></li>';
				})
				$html += '</ul></article>';
			});
			$('#homeShop').html($html);
		};
	}
	
	
	//类目导航
	function Index07CatoegoryModel(data){
		var $html ='';
		if(data.length>0){
			$.each(data, function(i,item) {
				$html +='<li><a href=/Goods/GoodsShopList?categoryId='+item.Id+'><em>'+item.Title+'</em></a></li>';
			});
			$('#homeHotList').html($html);
		}
	}
	
	//多种图片
	function Index08Banner(data){
		$html='';
		if(data.length>0){
		    $.each(data, function (i, item) {
		        if (item.Type == '0') {
		            $html = '<a href="/Goods/GoodsDetails?goodsId=' + item.Data + '"><img src=' + item.ImgUrl + ' /></a>'
		        }else if(item.Type == '1') {
		            $html = '<a href="/Goods/GoodsShopList?categoryId=' + item.Data + '"><img src=' + item.ImgUrl + ' /></a>'
		        } else if (item.Type == '2') {
		            $html = '<a href="/Goods/GoodsShopListBaner?categoryId=' + item.Data + '"><img src=' + item.ImgUrl + ' /></a>'
		        }
			})
			$('#homeFooterImg').html($html);
		}
	}



//顶部导航
	function iconDown() {
	    $('.homeAllNav').show();
	    $('.home-mask').show();
	}
	function iconUp() {
	    $('.homeAllNav').hide();
	    $('.home-mask').hide();
	}

	$('#homeAll').on('click', 'li', function () {
	    var $i = $(this).index();
	    var $id = $(this).attr('id');
	    $(this).addClass('find_nav_cur').siblings().removeClass('find_nav_cur');
	    $('#pagenavi1 li[id="' + $id + '"] a').trigger("click");  //让系统自动执行单击事件
	    iconUp();
	})















