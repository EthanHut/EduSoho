$(function () {
    //清空数据函数
    function dataEmpty(obj){
        obj.empty();
    }
    //封装的请求数据方法并根据数据创建内容
    function ajax(type,url,datatype){
        $.ajax({
            type:type,
            url:url,
            datatype:datatype,
            success:function(result){
                dataArr = result;
                addBox(result);
            }
        });
        function addBox(result){
            $.each(result,function(index,value){
                $('#c_content').append(
                    "<div class='data'>"+
                    "<div class'header'>"+"<a href="+value.url+">"+
                    "<img src='"+value.src+"'>"+"</a>"+
                    "</div>"+
                    "<a href="+value.url+">"+value.title+"</a>"+
                    "<div class='bottom'>"+
                    "<div class='left'>"+
                    "<span>"+"<i class='fa fa-users'>"+"</i>"+value.person+"</span>"+
                    "<span>"+"<i class='fa fa-commenting'>"+"</i>"+value.leave+"</span>"+
                    "</div>"+
                    "<div class='right'>"+
                    "<span>"+value.status+"</span>"+
                    "</div>"+
                    "</div>"+
                    "</div>"
                )
            })
        }
    }


    //状态变量
    var status = 0;


    //头部导航特效
    //鼠标放在第二个导航图标显示
    $('.nav li').eq(1).hover(function () {
        $('.class-name').show()
    },function () {
        $('.class-name').hide()
    });


//    搜索框放大
    $('.search').focus(function () {
        $(this).stop().animate({'width':'120px'},500).blur(function () {
            $(this).stop().animate({'width':'70px'},500)
        })
    })


//    二维码的显示和隐藏
    $('#last .last_content .right .bottom>span').mouseenter(function(){
        if(status===0){
            status = 1;
        }else{
            return;
        }
        $(this).children('div').fadeIn(200);
    }).mouseleave(function(){
        $(this).children('div').fadeOut(200,
            function(){
                status = 0;
            }
        );
    })
    //工具提示
    $('[data-toggle="tooltip"]').tooltip();

    //页面加载完毕请求数据
    ajax('POST','all.json','json');
    //数据存放的数组
    var dataArr;


    //一级分类点击筛选
    $('#tab .tab_content .list-group .oul:eq(0) li').click(function(){
        var def = $(this).attr('data-def');
        $(this).addClass('current').siblings().removeClass('current');
        dataEmpty($('#c_content'));
        ajax('POST',''+def+'.json','json');
    })

    //二级分类点击筛选
    $('#tab .tab_content .list-group .oul:eq(1) li').click(function(){
        var def = $(this).attr('data-def');
        $(this).addClass('current').siblings().removeClass('current');
        dataEmpty($('#c_content'));
        $.each(dataArr,function(index,obj){
            if(obj.grade === def){
                $('#c_content').append(
                    "<div class='data'>"+
                    "<div class'header'>"+"<a href="+obj.url+">"+
                    "<img src='"+obj.src+"'>"+"</a>"+
                    "</div>"+
                    "<a href="+obj.url+">"+obj.title+"</a>"+
                    "<div class='bottom'>"+
                    "<div class='left'>"+
                    "<span>"+"<i class='fa fa-users'>"+"</i>"+obj.person+"</span>"+
                    "<span>"+"<i class='fa fa-commenting'>"+"</i>"+obj.leave+"</span>"+
                    "</div>"+
                    "<div class='right'>"+
                    "<span>"+obj.status+"</span>"+
                    "</div>"+
                    "</div>"+
                    "</div>"
                )
            }
        })
    })

    //滚动条监听
    $('#backT').hide();
    $(window).scroll(function(event){
        //滚动距离大于150时显示返回顶部
        if($(window).scrollTop()>150){
            $('#backT').show();

        }else{
            $('#backT').hide();
        }
    })
    //返回顶部点击事件
    $('#backT').click(function(){
        $('html,body').animate({scrollTop:0},600)
    })
});