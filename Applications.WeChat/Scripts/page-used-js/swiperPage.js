/*首页轮播*/
var swiperIndex = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    autoplay : 3000,
    autoplayDisableOnInteraction : false,
    observer: true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents: true,//修改swiper的父元素时，自动初始化swiper
});
/*热门专题*/
var mySwiper  = new Swiper('.swiper-container-slide', {
    slidesPerView:1.5,
    paginationClickable: true,
    spaceBetween: 20,
    slidesOffsetBefore:24,
    slidesOffsetAfter:24,
    observer: true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents: true,//修改swiper的父元素时，自动初始化swiper

});
/*商品分类*/
/*var mySwiper  = new Swiper('.swiper-container-new', {
    slidesPerView:3,
    paginationClickable: true,
    spaceBetween: 10,
    slidesOffsetBefore:24,
    slidesOffsetAfter:24,
    observer: true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents: true,//修改swiper的父元素时，自动初始化swiper
});*/
