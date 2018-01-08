/**
* 加载方法
**/
$(function () {
    showBanner();
    showActivity();
    showHotTopic();
    showGoods();
});

/**
*  请求首页banner图
**/
function showBanner() {
    $.AjaxRequest({
        url: Common.API_BASE_URL + Common.API_URL_GET_BANNER,
        type: "GET",
        dataType: "json",
        async: true,
        success: getBanner
    });

}
function getBanner(req) {
    if (req) {
        var data = req.data;
        var html = '';
  
        $.each(data, function (index, item) {
            html += '<a class="swiper-slide">';
            html += '<img src="' + item.imageUrl + '" alt="" class="img-responsive">';
            html += '</a>';
        });
        $("#index-banner-img").html(html);
    }
}

/**
*   请求福利活动信息数据
**/
function showActivity() {
    $.AjaxRequest({
        url: Common.API_BASE_URL + Common.API_URL_GET_ACTIVITY,
        type: "GET",
        dataType: "json",
        async: true,
        success: getActivity
    });
}

/**
*   请求热门专题数据
**/
function showHotTopic() {
    $.AjaxRequest({
        url: Common.API_BASE_URL + Common.API_URL_GET_HOT_TOPIC,
        type: "GET",
        dataType: "json",
        async: true,
        success: getHotTopic
    });
}
function getHotTopic(req) {
    // console.log("getHotTopic." + req);
    if (req.status === Common.HTTP_VALUE_SUCCESS) {
        var data = req.data;
        var html = '';
        $.each(data, function (index, item) {
            html += '<li>';
            html += '<a href="#">';
            html += '<img src="' + item.imageUrl + '" alt="" class="img-responsive">';
            html += '</a>';
            html += '</li>';
        });
        $("#hot-topic-slide").html(html);
    }
}

/**
*   请求商品分类数据
**/
function showGoods() {
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_GET_GOODS,    //请求的url地址
        dataType: "json",   //返回格式为json
        async: true,//请求是否异步，默认为异步，这也是ajax重要特性
        contentType: "text/json",
        data: "{'CategoryCount': '1', 'GoodsCount': '2'}",
        type: "POST",   //请求方式
        success:getGoods
    })
}
function getGoods(req) {
    if (req.status === Common.HTTP_VALUE_SUCCESS) {
        var data = req.data;
        // console.log("getGoods." + data.length);
        //item.topicName
        var html = '';
        $.each(data, function (index, item) {
            var dataGoods = item.goods;
            html += '<section class="daily-use">';
            html += '<div class="home-item hot-topic-new">';
            html += '<h3 class="home-title"> ' + item.categoryName+ ' </h3>';
            html += '<a href="#">';
            html += '<span>更多</span>';
            html += '<p class="right-icon"></p>';
            html += '</a>';
            html += '</div>';
            html += '<div class="center-banner-img">';
            html += '<img src=" ' + item.imageUrl + '" alt="" class="img-responsive">';
            html += '</div>';
            html += '<nav class="swiper-container-new">';
            html += '<ul class="swiper-wrapper new-other-style">';
            $.each(dataGoods, function (i, itemGoods) {
                html += '<li class="swiper-slide">';
                html += '<a href="#">';
                html += '<div>';
                html += '<img src="' + itemGoods.imageUrl + '" alt="" class="img-responsive">';
                html += '</div>';
                html += '<p>' + itemGoods.goodsName + '</p>';
                html += '</a>';
                html += '</li>';
            });
            html += '</ul>';
            html += '</nav>';
            html += '</section>';
            html += '<div class="space-line"></div>';
            $("#max-wrap-goods").html(html);
            var mySwiper = new Swiper('.swiper-container-new', {
                slidesPerView: 3,
                paginationClickable: true,
                spaceBetween: 10,
                slidesOffsetBefore: 24,
                slidesOffsetAfter: 24,
                initialSlide: 0,
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true,//修改swiper的父元素时，自动初始化swiper
            });
        })

    }
}


/*首页所有商品懒加载*/
layui.use('flow', function () {
    var flow = layui.flow;
    //信息流
    flow.load({
        elem: '#goods-list-description',//流加载容器
        isAuto: true, //是否自动加载
        end : "",//现实没有跟多数据了
        isLazyimg: true,//懒加载图片
        done: function (page, next) { //到达临界点(默认哥滚动触发),下一页
            load_data(page, next);
        }
    });
});

/**
 * 加载商品数据
 * @param {} pageindex
 * @param {} call
 * @returns {}
 */
function load_data(pageindex, call) {
    setTimeout(function () {
        var item = {
            "PageIndex": pageindex, "PageSize": '4'
        }
        $.ajax({
            url: Common.API_BASE_URL + Common.API_URL_GET_ALL_GOODS,    //请求的url地址
            dataType: "json",   //返回格式为json
            async: true,//请求是否异步，默认为异步，这也是ajax重要特性
            contentType: "application/json",
            data:JSON.stringify(item),
            type: "POST",   //请求方式
            success: function getAllGoods(req) {
                // console.log("getAllGoods." + req.data.items.length);
                if (req.status === Common.HTTP_VALUE_SUCCESS) {
                    var data = req.data.items;
                    var total = req.data.totalPageCount;
                    //console.log("总页数=" + total);
                    var lis = [];

                    $.each(data, (function (index, item) {
                        var html = '';
                        html += '<li>';
                        html += '<a href="/Goods/GoodsDetails?goodsId=' + item.goodsId + '">';
                        html += '<div class="goods-img-show">';
                        html += '<img src="' + item.imageUrl + '" alt="" class="img-responsive">';
                        html += '</div>';
                        html += '<p>' + item.goodsName + '</p>';
                        html += '<span>￥' + item.salePrice + '</span>';
                        html += '</a>';
                        html += '</li>';
                        lis.push(html);
                    }));
                    //pageindex为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多  
                     call(lis.join(''), pageindex < total);
					var $width = $('.goods-img-show').find('img').width();
					$('.goods-img-show').find('img').css('height',$width+'px');
                }
            }
        });
    }, 500);
}


