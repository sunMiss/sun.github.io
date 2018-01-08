$(function () {
    //顶部导航条
    $.ajax({
        url: Common.API_BASE_URL + Common.API_URL_GET_HOMEPAGE_CATEGORY,
        dataType: "json",
        contentType: "text/json",
        type: "GET",
        success: function (res) {
            if (res.status === 1) {
                InitHomeNav(res);
            } else {
                $.toast(res.message, "forbidden");
            }
        },
        error: function (err) {
            setTimeout(function () {
                $.toast(err.responseJSON.Message, "forbidden");
            }, 1000)
        }
    })


    // 给li定义高度，配合css使li独立滚动
    var $window = $(window);
    var initialWindowHeight = null;

    $window.resize(function () {
        sliderHeight();
    });


    function sliderHeight() {
        var wHeight = $(window).height();
        var sliderHeight = wHeight - 90
        var bottomNavbar = $('.bottom-navbar').height();
        var searchHead = $('.search-head').height();
        $("#slider1 .li_list").height(sliderHeight - searchHead);
        $("#slider1").height(wHeight - searchHead - bottomNavbar - 40 + 'px')
    }


    $(".find_nav_list").css("left", 0);

    $(".find_nav_list li").each(function () {
        $(".sideline").css({ left: 0 });
        $(".find_nav_list li").eq(0).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
    });
    var nav_w = $(".find_nav_list li").first().width();
    $(".sideline").width(nav_w);


    var $isNum = 0;
    PageSize = 10, PageIndex = 1;
    $(".find_nav_list").on('click', 'li', function () {
        var $i = $(this).index();
        var categoryId = $(this).attr('id');
        $isNum = $i;
        nav_w = $(this).width();
        $(".sideline").stop(true);
        $(".sideline").animate({ left: $(this).position().left }, 300);
        $(".sideline").animate({ width: nav_w });
        $(this).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
        var fl_w = $(".find_nav_list").width();
        var flb_w = $(".find_nav_left").width();
        var fn_w = ($(".find_nav").width() - nav_w) / 2;
        var fnl_l;
        var fnl_x = parseInt($(this).position().left);
        if (fnl_x <= fn_w) {
            fnl_l = 0;
        } else if (fn_w - fnl_x <= flb_w - fl_w) {
            fnl_l = flb_w - fl_w;
        } else {
            fnl_l = fn_w - fnl_x;
        }
        $(".find_nav_list").animate({
            "left": fnl_l
        }, 300);

        var $width = $(window).width();
        $('.box01_list').css('left', -$width * $i);
        var param = {
            "CategoryId": categoryId,
            "Type": 0,
            "Sort": 0,
            "PageIndex": PageIndex,
            "PageSize": PageSize,
            "StoreId": ""
        }
        homeShopItem(PageIndex, param, $i);
    });

    $(".find_nav_list").on('touchstart', function (e) {
        var touch1 = e.originalEvent.targetTouches[0];
        x1 = touch1.pageX;
        y1 = touch1.pageY;
        ty_left = parseInt($(this).css("left"));
    });
    $(".find_nav_list").on('touchmove', function (e) {
        var touch2 = e.originalEvent.targetTouches[0];
        var x2 = touch2.pageX;
        var y2 = touch2.pageY;
        if (ty_left + x2 - x1 >= 0) {
            $(this).css("left", 0);
        } else if (ty_left + x2 - x1 <= flb_w - fl_w) {
            $(this).css("left", flb_w - fl_w);
        } else {
            $(this).css("left", ty_left + x2 - x1);
        }
        if (Math.abs(y2 - y1) > 0) {
            e.preventDefault();
        }
    });

    function setTimefun() {
        var $len = $('#pagenavi1 li').length - 2;
        var fl_w = $(".find_nav_list").width();
        var flb_w = $(".find_nav_left").width();
        for (n = 1; n < $len; n++) {
            var page = 'pagenavi' + n;
            var mslide = 'slider' + n;
            var mtitle = 'emtitle' + n;
            arrdiv = 'arrdiv' + n;
            var as = $("#" + page + "").find("a");
            var tt = new TouchSlider({
                id: mslide, 'auto': '-1', fx: 'ease-out', direction: 'left', speed: 600, timeout: 5000, 'before': function (index) {
                    var as = document.getElementById(this.page).getElementsByTagName('a');
                    //as[this.p].className = '';
                    this.p = index;

                    fnl_x = parseInt($(".find_nav_list li").eq(this.p).position().left);

                    nav_w = $(".find_nav_list li").eq(this.p).width();
                    $(".sideline").stop(true);
                    $(".sideline").animate({ left: $(".find_nav_list li").eq(this.p).position().left }, 300);
                    $(".sideline").animate({ width: nav_w }, 100);
                    $(".find_nav_list li").eq(this.p).addClass("find_nav_cur").siblings().removeClass("find_nav_cur");
                    var fn_w = ($(".find_nav").width() - nav_w) / 2;
                    var fnl_l;
                    if (fnl_x <= fn_w) {
                        fnl_l = 0;
                    } else if (fn_w - fnl_x <= flb_w - fl_w) {
                        fnl_l = flb_w - fl_w;
                    } else {
                        fnl_l = fn_w - fnl_x;
                    }
                    $(".find_nav_list").animate({
                        "left": fnl_l
                    }, 300);

                    var categoryId = $('#pagenavi1').find('li.find_nav_cur').attr('id');
                    if (categoryId == 001) return;
                    var param = {
                        "CategoryId": categoryId,
                        "Type": 0,
                        "Sort": 0,
                        "PageIndex": PageIndex,
                        "PageSize": PageSize,
                        "StoreId": ""
                    }
                    homeShopItem(PageIndex, param, index);
                }
            });
            tt.page = page;
            tt.p = 0;
            //console.dir(tt); console.dir(tt.__proto__);

            for (var i = 0; i < as.length; i++) {
                (function () {
                    var j = i;
                    as[j].tt = tt;
                    as[j].onclick = function () {
                        this.tt.slide(j);
                        return false;
                    }
                })();
            }
        }
    }
    //顶部导航条
    function InitHomeNav(res) {
        if (res.status == '1') {
            var $data = res.data;
            var $li = '';
            var $lif = '<li class="find_nav_cur" id="001"><a href="#">推荐</a></li>';
            var $lis = '';
            var $latli = '<li class="sideline"></li>';
            $('#homeAll').html('');
            $('#pagenavi1').html('');
            $('#pagenavi1').append($lif);
            $.each(res.data, function (i, item) {
                $li += '<li id=' + item.categoryId + '><a href="javascript:;">' + item.categoryName + '</a></li>'
            })
            $('#pagenavi1').append($li);
            $('#homeAll').html($lif + $li);
            $('#pagenavi1').append($latli);
            InitHomeCenter(res);
            setTimefun();
        } else {
            $.toast(res.message, "forbidden");
        }
    }


    function InitHomeCenter(res) {
        $.each(res.data, function (i, item) {
            var $li = '';
            var param = {
                "CategoryId": item.categoryId,
                "Type": 0,
                "Sort": 0,
                "PageIndex": 1,
                "PageSize": 10,
            }

            var $list = '';
            $list += '<li class="li_list" style="width:100%;"><section class="home-content" id="catSection' + item.categoryId + '"></section><ul class="home-shop-list homeShopItem"></ul><div class="weui-loadmore" id="loadings">';
            $list += '<i class="weui-loading"></i><span class="weui-loadmore__tips">正在加载</span></div><p class="weui-endmore" id="loadend" style="display: none;">已经没有更多商品了</p><div class="homeBtn' + item.categoryId + '" homeShopItemTag="false" pageIndex="1" style="height:1px"></div></li>';
            $('.box01_list').append($list);
            $.ajax({
                url: Common.API_BASE_URL + Common.API_URL_GET_HOME_CATEGORY,
                type: "POST",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(param),
                success: function (res) {
                    $li += '<article class="home-article"><div class="home-banner"><a href="#"><img src=' + res.data.Banner.ImgUrl + ' alt=""></a></div><div class="home-list-a">';
                    $.each(res.data.Category, function (j, t) {
                        $li += '<a href="/Goods/GoodsShopList?categoryId=' + t.categoryId + '"><img src=' + t.imageUrl + ' alt=""><span class="home-list-name">' + t.categoryName + '</span></a>';
                    })
                    $li += '</div></article>';
                    $("#catSection" + param.CategoryId).append($li);
                    homeShopItem(PageIndex, param, i);
                },
                error: function (err) {
                    $.toast(err.message, "forbidden");
                }
            });
        })
        sliderHeight();
    }

    //进入页面分页加载  
    function homeShopItem(p, param, $i) {
        var homeShopItemTag = $('.homeBtn' + param.CategoryId).attr("homeShopItemTag");
        param.PageIndex = parseInt($('.homeBtn' + param.CategoryId).attr("pageIndex"));
        var $top = $('.homeBtn' + param.CategoryId).offset().top;
        var $scrollTop = $('.homeBtn' + param.CategoryId).parent().scrollTop();
        var x = $top - $scrollTop;
        console.log($top + "--" + $scrollTop + "--" + x);
        // 如果大于0 即该元素能被浏览者看到，则将暂存于自定义属性loadpic的值赋值给真正的src   
        if (x > 1500 || homeShopItemTag == "true") {
            return false;
        }
        $('.homeBtn' + param.CategoryId).attr("homeShopItemTag", "true");
        $.ajax({
            url: Common.API_BASE_URL + Common.API_URL_GET_GETHOME_GOODS_BY_CATEGORY,
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (res) {
                $('.homeBtn' + param.CategoryId).attr("homeShopItemTag", "false").attr("pageIndex", param.PageIndex + 1);
                if (res.status == '1') {
                    initShopList(res, $i, param);
                } else {
                    $.toast(res.message, "forbidden");
                    $('.li_list').eq($i).find('.weui-loadmore').css("display", "none");
                    $('.li_list').eq($i).find('.weui-endmore').css("display", "block");
                }
            },
            error: function (err) {
                $.toast(err.message, "forbidden");
                $('.li_list').eq($i).find('.weui-loadmore').css("display", "none");
                $('.li_list').eq($i).find('.weui-endmore').css("display", "block");
            }
        });
    }

    //加载商品列表
    function initShopList(data, $i, param) {
        var $data = data.data.items;//数据
        var $len = data.data.currentPageIndex;//当前页码
        var $tolNum = data.data.totalPageCount;//总页数
        var $li = '';
        if ($data != 0) {
            $.each($data, function (j, t) {
                $li += '<li><a href="/Goods/GoodsDetails?goodsId=' + t.goodsId + '"><img src=' + t.imageUrl + ' alt=""><em>' + t.goodsName + '</em><span>' + t.salePrice + '</span></a></li>';
            })
            $('.li_list').eq($i).find('.homeShopItem').append($li);
            var $width = $('.imgLink').find('img').width();
            $('.imgLink').find('img').css({ 'height': $width + 'px' });
            if ($len >= $tolNum) {
                $('.li_list').eq($i).find('.weui-loadmore').css("display", "none");
                $('.li_list').eq($i).find('.weui-endmore').css("display", "block");
                loading = true;
                $('.homeBtn' + param.CategoryId).attr("homeShopItemTag", "true")
                $(document.body).destroyInfinite();
                return false;
            }
        } else {
            $('.li_list').eq($i).find('.weui-loadmore').css("display", "none");
            $('.li_list').eq($i).find('.weui-endmore').css("display", "block");
        }
    }


    //获取页面顶部被卷起来的高度
    function scrollTop() {
        return Math.max(
         //chrome
         document.body.scrollTop,
         //firefox/IE
         document.documentElement.scrollTop);
    }
    //获取页面文档的总高度
    function documentHeight() {
        //现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
    //获取页面浏览器视口的高度
    function windowHeight() {
        //document.compatMode有两个取值。BackCompat：标准兼容模式关闭。CSS1Compat：标准兼容模式开启。
        return (document.compatMode == "CSS1Compat") ?
        document.documentElement.clientHeight :
        document.body.clientHeight;
    }

})


