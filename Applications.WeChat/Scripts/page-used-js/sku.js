/*
var goods_id = 962;
var goodsattr_style = 1;
var gmt_end_time = 0;
var day = "天";
var hour = "小时";
var minute = "分钟";
var second = "秒";
var end = "结束";
var goodsId = 962;
var now_time = 1505341045;*/

//商品属性checkbox点击事件 维护选中状态 并且 调用 刷新价格和库存方法
function AttrClick(obj){
    //如果属性被选中,就清空其他同级属性的选中状态
    var attid = $(obj).val();
    if($(obj).prop("checked")){
        $(obj).siblings("input").each(function(i,o){
            if($(o).val()!=attid){
                $(o).prop("checked",false);
            }
        });
    }
    //调用选择属性方法
    changeGoodsNum();
}
var goodsNums = [{goods_attr:'3333|3409|3410',product_number:'0'},
    {goods_attr:'3333|3409|3411',product_number:'0'},
    {goods_attr:'3333|2999|3412',product_number:'6'},
    {goods_attr:'3333|3006|3412',product_number:'8'},
    {goods_attr:'3333|3006|3413',product_number:'2'},
    {goods_attr:'2996|2999|3410',product_number:'1'},
    {goods_attr:'2996|2999|3411',product_number:'0'},
    {goods_attr:'2996|2999|3412',product_number:'4'},{goods_attr:'2996|2999|3413',product_number:'3'},{goods_attr:'2996|3006|3413',product_number:'1'},{goods_attr:'2996|3006|3410',product_number:'1'},{goods_attr:'2996|3006|3411',product_number:'0'},{goods_attr:'2996|3006|3412',product_number:'3'},{goods_attr:'2996|3409|3410',product_number:'9'},{goods_attr:'2996|3409|3411',product_number:'0'},{goods_attr:'3333|2999|3413',product_number:'8'}];
//如果只有一个商品属性就默认选中
var checkOne = $(".attrItems input:checkbox");
if(checkOne.length==1){
    $(".attrItems input:checkbox").prop("checked",true);
}
changeGoodsNum();
//刷新库存,没库存的属性禁选择
function changeGoodsNum(){
    /*三个步骤
     一 把所有属性过一遍,没有库存的禁用.
     二 把所有被选中的属性过一遍,验证其他属性是否有对应的库存,没有就禁用掉.
     三 计算出库存数据.
     */
    //一 把所有属性过一遍,没有库存的禁用.
    //循环所有的属性,如果库存对象里面显示没有库存,就禁用掉.
    $("div.attrItems input:checkbox").each(function(idx,obj){
        //循环判断是否有库存
        var gid = $(obj).val();
        var isExits = false;
        $(goodsNums).each(function(i,o){
            var tmpArr =o.goods_attr.split("|");
            $(tmpArr).each(function(i2,o2){
                if(gid==o2&&o.product_number!=0){
                    isExits = true;
                }
            });
        });
        //根据库存设置可选状态和颜色.
        if(isExits==false)
        {
            $(obj).attr("disabled","disabled").prop("checked",false);
            $(".spec_value_"+gid).css("border","1px dashed #ceced0");
        }else{
            $(obj).removeAttr("disabled");
            $(".spec_value_"+gid).css("border","1px solid green");
        }
    });
    //二 循环所有没选中的属性,把没选中的一个一个和选中组合去查看有没有库存,没有的就禁用
    $("div.attrItems").each(function(idx,obj){
        var kid = $(obj).attr("kid");
        //获取到除本属性以外的所有被选中属性
        var chosedItems = [];
        $("div.attrItems input:checkbox:checked").each(function(idx,ocd){
            if($(ocd).attr("kid")!=kid){
                chosedItems.push($(ocd).val());
            }
        });
        $(obj).find("input:checkbox").not("input:checked").each(function(ii,io){
            var tid = $(io).val();

            var hasNum = false;//最终是否有库存
            //循环库存信息对象
            $(goodsNums).each(function(gi,go){
                var hasNum1 = false;//是否包含当前未选中属性
                var	hasNum2 = false;//是否包含之前选中属性

                var tmpArr =go.goods_attr.split("|");
                hasNum1 = $.inArray(tid, tmpArr)!=-1;
                if(go.product_number>0){
                    $(chosedItems).each(function(ci,co){
                        hasNum2 = $.inArray(co, tmpArr)!=-1;
                        if(hasNum2 == false){
                            return false;
                        }
                    });
                }
                if(chosedItems.length==0){
                    hasNum2 = true;
                }
                if(hasNum1&&hasNum2){
                    hasNum = true;
                    return false;
                }
            });
            //如果这个属性不可选
            if(hasNum==false){
                $(io).attr("disabled","disabled").prop("checked",false);
                $(".spec_value_"+$(io).val()).css("border","1px dashed #ceced0");
            }

        });
    });
    //最后把选中的属性加红色边框
    $("div.attrItems input:checkbox:checked").each(function(index,obj){
        $(".spec_value_"+$(obj).val()).css("border","1px solid red");
    });
    //三 计算出库存数据.
    /*
     1 获取到所有被选中的属性id 存入数组A
     2 循环库存信息数组B,判断数组A的所有元素是否被数组B包含,如果包含就累加数组B的库存数.
     3 累加的总数就是库存,显示到页面上.
     */
    //1
    var ArrayChecked = [];
    $("div.attrItems input:checkbox:checked").each(function(index,obj){
        ArrayChecked.push($(obj).val());
    });
    //2
    var goodsNum = 0;
    $(goodsNums).each(function(gi,go){
        var tmpArr =go.goods_attr.split("|");
        //循环货品id列表
        var isContain = true;
        $(ArrayChecked).each(function(i,o){
            if(tmpArr.indexOf(o)==-1){
                isContain = false;
            }
        });
        if(isContain == true){
            goodsNum += parseInt(go.product_number);
        }
    });
    //3
    document.getElementById('shows_number').innerHTML = goodsNum;
    //刷新价格
    changePrice();
}
/**
 * 点选可选属性或改变数量时修改商品价格的函数
 */
function changePrice()
{
    //如果有完整的属性被选中,就调用刷新价格方法 否则把价格去掉
    var hasChoseAll=true;
    $("div.attrItems").each(function(i,o){
        var dkid =$(o).attr("kid");
        if($(".attrItems"+dkid+" input:checkbox:checked").length==0){
            hasChoseAll = false;
        }
    });
    if(hasChoseAll){
        var attr = getSelectedAttributes(document.forms['ECS_FORMBUY']);
        var qty = document.forms['ECS_FORMBUY'].elements['number'].value;
        Ajax.call('goods.php', 'act=price&id=' + goodsId + '&attr=' + attr + '&number=' + qty, changePriceResponse, 'GET', 'JSON');
    }else{
        document.getElementById('ECS_GOODS_AMOUNT').innerHTML = "";
    }
}
/**
 * 接收返回的信息
 */
function changePriceResponse(res)
{
    if (res.err_msg.length > 0)
    {
        alert(res.err_msg);
    }
    else
    {
        //document.forms['ECS_FORMBUY'].elements['number'].value = res.qty;
        if (document.getElementById('ECS_GOODS_AMOUNT'))
            document.getElementById('ECS_GOODS_AMOUNT').innerHTML = res.result;
    }
}


