$(function () {



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

    ajax('POST','all.json','json');
    var dataArr;

    //页面加载完毕请求数据
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
                    "<div class'header'>"+"<a href='#'>"+
                    "<img src='"+value.src+"'>"+"</a>"+
                    "</div>"+
                    "<a href='#'>"+value.title+"</a>"+
                    "<div class='bottom'>"+
                    "<div class='left'>"+
                    "<span>"+value.person+"</span>"+
                    "<span>"+value.leave+"</span>"+
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

    //数据请求成功后遍历数据同时添加给对应的元素
    $('#tab .tab_content .list-group .oul:eq(0) li').click(function(){
        var def = $(this).attr('data-def');
        $(this).addClass('current').siblings().removeClass('current');
        dataEmpty($('#c_content'));
        ajax('POST',''+def+'.json','json');
    })


    $('#tab .tab_content .list-group .oul:eq(1) li').click(function(){
        var def = $(this).attr('data-def');
        dataEmpty($('#c_content'));
        $.each(dataArr,function(index,obj){
            if(obj.grade === def){
                $('#c_content').append(
                    "<div class='data'>"+
                    "<div class'header'>"+"<a href='#'>"+
                    "<img src='"+obj.src+"'>"+"</a>"+
                    "</div>"+
                    "<a href='#'>"+obj.title+"</a>"+
                    "<div class='bottom'>"+
                    "<div class='left'>"+
                    "<span>"+obj.person+"</span>"+
                    "<span>"+obj.leave+"</span>"+
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
    //清空数据函数
    function dataEmpty(obj){
        obj.empty();
    }
});