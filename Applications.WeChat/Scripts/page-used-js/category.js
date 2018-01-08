$(function () {
    showCategoryNav();
    showGoodsDetails();
});

/*请求分类左侧导航数据*/
function showCategoryNav() {
    $.AjaxRequest({
        url: Common.API_BASE_URL + Common.API_URL_GET_GOODS_CATEGORY,
        type: "post",
        dataType: "json",
        async: true,
        success: getCategoryNav,
        error: function (err) {
            $.toast(err.message, "forbidden");
        }
    })
}

//左侧数据
function getCategoryNav(req) {
    if (req.status === Common.HTTP_VALUE_SUCCESS) {
        var data = req.data;
        var html = '';
        $("#left-navbar").empty();
        $.each(data, function (index, item) {
            if (index === 0) {
                html += '<li class="left-nav-click li-color" onclick="showGoodsDetails(\'' + item.categoryId + '\')" >';
                html += '<span class="left-nav-style"></span>';
                html += '<a>' + item.categoryName + '</a>';
                showGoodsDetails(item.categoryId);
            } else {
                html += '<li class="left-nav-click" onclick="showGoodsDetails(\'' + item.categoryId + '\')" >';
                html += '<span></span>';
                html += '<a>' + item.categoryName + '</a>';
            }
            html += '</li>';
        });
        $("#left-navbar").html(html);
    } else {
        $.toast(req.message, "forbidden");
    }
}

/**
 * *通过父级ID获取商品分类详情页
 */
function showGoodsDetails(categoryId) {
    if (categoryId) {
        item = {
            "ParentId": categoryId
        }
        $.ajax({
            url: Common.API_BASE_URL + Common.API_URL_GET_GET_GOODS_CATEGORY_BY_ID,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(item),
            dataType: "json",
            success: detail_page,
            err: function (err) {
                $.toast(err.message, "forbidden");
            }
        });
    }
}
function detail_page(req) {
    if (req) {
        //console.log(req);
        if (req.status == Common.HTTP_VALUE_SUCCESS) {
            var data = req.data;
            var html = '';
            $.each(data, function (index, item) {
                html += '<li>';
                html += '<a href="/Goods/GoodsShopList?categoryId=' + item.categoryId + '">';
                html += '<img src="' + item.imageUrl + '" alt="" class="img-responsive">';
                html += '<p>' + item.categoryName + '</p>';
                html += '</a>';
                html += '</li>';
            });
            $("#goods-category-list").html(html);
        } else {
            $.toast(req.message, "forbidden");
        }
    }
}



















