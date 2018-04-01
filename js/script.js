$(document).ready(function(){
    /*============================================
    Page Preloader
    ==============================================*/

    $(window).load(function(){
        $('#page-loader').fadeOut(500);
    });

    /*============================================
    Navigation Functions
    ==============================================*/
    if ($(window).scrollTop()< 10){
        $('#main-nav').removeClass('scrolled');
    }
    else{
        $('#main-nav').addClass('scrolled');
    }

    $(window).scroll(function(){
        if ($(window).scrollTop()< 10){
            $('#main-nav').removeClass('scrolled');
        }
        else{
            $('#main-nav').addClass('scrolled');
        }
    });

    $('a.scrollto').click(function(e){
        e.preventDefault();
        var target =$(this).attr('href');
        $('html, body').stop().animate({scrollTop: $(target).offset().top}, 1600, 'easeInOutExpo',
            function(){window.location.hash =target;});

        if ($('.navbar-collapse').hasClass('in')){
            $('.navbar-collapse').removeClass('in').addClass('collapse');
        }
    });

    /*============================================
    Tabs
    ==============================================*/

    $('.toggle-tabs').click(function(e){
        e.preventDefault()

        if($(this).is('.active')){return;}
        $(this).tab('show');

        $(this).siblings('.toggle-tabs').removeClass('active');
        $(this).addClass('active');
    })

    $('.toggle-tabs').on('shown.bs.tab', function (e) {
        $('.tab-content').addClass('fadeOut');

        setTimeout(function(){
            $('.tab-content').removeClass('fadeOut');
        },200)
    })

    /*============================================
    Skills
    ==============================================*/
    $('#skills').waypoint(function(){
        $('.chart').each(function(){
            $(this).easyPieChart({
                size:200,
                animate: 2000,
                lineCap:'butt',
                scaleColor: false,
                trackColor: 'transparent',
                barColor: "#00CCCB",
                lineWidth: 15
                //easing:'easeOutQuad'
            });
        });
    },{offset:'80%'});

    /*============================================
    Filter Projects
    ==============================================*/

    $('.project-count').each(function(){

        var filter = $(this).parent('.btn').attr('data-filter');
        $(this).text($('.project-item'+filter).length);

    });

    $('#filter-works .btn').click(function(e){
        e.preventDefault();

        $('#filter-works .btn').removeClass('active');
        $(this).addClass('active');

        var category = $(this).attr('data-filter');

        $('.project-item').addClass('filtered');
        $('.project-item').each(function(){
            if($(this).is(category)){
                $(this).removeClass('filtered');
            }
        });

        $('#projects-container').addClass('anim-out');

        setTimeout(function(){
            $('.project-item').show();
            $('.project-item.filtered').hide();
            $('#projects-container').removeClass('anim-out');
        },450);

        scrollSpyRefresh();
        waypointsRefresh();
    });

    /*============================================
    Project Viewer
    ==============================================*/

    $('#project-viewer').addClass('add-slider');

    $('.project-item').click(function(e){

        e.preventDefault();

        loadProject($(this));

        $('#project-viewer').modal({backdrop:false});

    })

    /*Prevent Navbar movement*/
    $('#project-viewer').on('show.bs.modal',function(){
        $('#main-nav').width($('#main-nav').width());

    });

    $('#project-viewer').on('hidden.bs.modal',function(){
        $('#main-nav').width('auto');
    });


    /*Projects navigation*/
    $('.project-nav .next-project').click(function(){
        var $newProject = $('.project-item.active').next('.project-item');
        $('#project-viewer .container').fadeOut(500,function(){loadProject($newProject);});
    });

    $('.project-nav .previous-project').click(function(){
        var $newProject = $('.project-item.active').prev('.project-item');
        $('#project-viewer .container').fadeOut(500,function(){loadProject($newProject);});
    });

    function loadProject($project){

        $('.project-item').removeClass('active');
        $project.addClass('active');

        var projectLink = $project.attr('href').replace(/[#?]/g, '');

        window.location.hash = '?'+projectLink;

        $('#project-viewer-content').load(projectLink,function(){
            $('#project-viewer .container').fadeIn(500);
            afterLoadFn();
        });

    }

    function afterLoadFn(){

        $('#project-viewer').scrollTop(0);

        /*Show-Hide Nav butttons*/
        if($('.project-item.active').index()==0){$('#project-viewer .previous-project').addClass('hidden');}
        else{$('#project-viewer .previous-project').removeClass('hidden');}

        if($('.project-item.active').index()== ($('.project-item').length -1)){$('#project-viewer .next-project').addClass('hidden');}
        else{$('#project-viewer .next-project').removeClass('hidden');}

        $('.project-slider').flexslider({
            animation:'slide',
            slideshowSpeed: 4000,
            useCSS: true,
            directionNav: false,
            pauseOnAction: false,
            pauseOnHover: true,
            smoothHeight: false
        });

        $('.video-container').fitVids();
    }

    /*Close project Modal*/

    $('#project-viewer').on('hidden.bs.modal',function(){
        $('#project-viewer-content').empty();
        $('#project-viewer .container').fadeOut();
    });

    $('#project-viewer').on('hide.bs.modal',function(){
        window.location.hash = 'portfolio';
    });

    /*Open project by url*/
    var reg = /^[#]+[?]/;

    if(reg.test(window.location.hash)){
        var $project = $('.project-item[href="'+window.location.hash+'"]');
        $project.trigger('click');
    }



    /*============================================
    Testimonials
    ==============================================*/
    $('#testimonials-slider').flexslider({
        slideshow: false,
        animationSpeed: 0,
        useCSS: true,
        directionNav: false,
        controlNav: false,
        pauseOnAction: false,
        pauseOnHover: true,
        smoothHeight: false
    });

    $('.testimonial-controls .previous').click(function(){
        $('#testimonials-slider').flexslider('previous');
    });

    $('.testimonial-controls .next').click(function(){
        $('#testimonials-slider').flexslider('next');
    });

    /*============================================
    Placeholder Detection
    ==============================================*/
    if (!Modernizr.input.placeholder) {
        $('#contact-form').addClass('no-placeholder');
    }

    /*============================================
    Tooltips
    ==============================================*/
    $("[data-toggle='tooltip']").tooltip({container: 'body'});

    /*============================================
    Waypoints Animations
    ==============================================*/
    $(window).load(function(){

        $('.scrollimation').waypoint(function(){
            $(this).addClass('in');
        },{offset:'95%'});

    });

    /*============================================
    Refresh scrollSpy function
    ==============================================*/
    function scrollSpyRefresh(){
        setTimeout(function(){
            $('body').scrollspy('refresh');
        },1000);
    }

    /*============================================
    Refresh waypoints function
    ==============================================*/
    function waypointsRefresh(){
        setTimeout(function(){
            $.waypoints('refresh');
        },1000);
    }



    /*============================================
   contact function
    ==============================================*/


    $('#contact-form .form-control').each(function () {

        if ($.trim($(this).val()) == '') {
            $(this).removeClass('input-filled');
        } else {
            $(this).addClass('input-filled');
        }
    });

    $('#contact-form .form-control').on('blur', function () {

        if ($.trim($(this).val()) == '') {
            $(this).removeClass('input-filled');
        } else {
            $(this).addClass('input-filled');
        }
    });

    $('#contact-form .form-control').on('focus', function () {
        $(this).parent('.controls').find('.error-message').fadeOut(300);
    });


    $('#contact-form').submit(function () {

        if ($('#contact-form').hasClass('clicked')) {
            return false;
        }

        $('#contact-form').addClass('clicked');

        var buttonCopy = $('#contact-form button').html(),
            errorMessage = $('#contact-form button').data('error-message'),
            sendingMessage = $('#contact-form button').data('sending-message'),
            okMessage = $('#contact-form button').data('ok-message'),
            hasError = false;

        $('#contact-form .error-message,#contact-form .contact-form-message').remove();

        $('.requiredField').each(function () {
            if ($.trim($(this).val()) == '') {
                var errorText = $(this).data('error-empty');
                $(this).next('label').append('<span class="error-message" style="display:none;">' + errorText + '.</span>').find('.error-message').fadeIn('fast');
                hasError = true;
            } else if ($(this).is("input[type='email']") || $(this).attr('name') === 'email') {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
                if (!emailReg.test($.trim($(this).val()))) {
                    var invalidEmail = $(this).data('error-invalid');
                    $(this).next('label').append('<span class="error-message" style="display:none;">' + invalidEmail + '.</span>').find('.error-message').fadeIn('fast');
                    hasError = true;
                }
            }
        });

        if (hasError) {
            $('#contact-form').append('<p class="contact-form-message">' + errorMessage + '</p>');
            $('#contact-form').removeClass('clicked');
        }
        else {
            $('#contact-form').append('<p class="contact-form-message"><i class="fa fa-spinner fa-pulse"></i>' + sendingMessage + '</p>');

            var formInput = $(this).serialize();
            var name = $("#contact-name").val();
            var email = $("#contact-mail").val();
            var content = $("#contact-message").val();
            if (!content) {
                content = $("#contact-message").text();
            }
            var form = {
                "toEmail": "bingchenglin@qq.com",
                "subject": name + "给你留言了",
                "content": "<p>留言者：" + name + "</p><p>邮箱：" + email + "</p><p>内容：" + content + "</p>"
            };

            $.post($(this).attr('action'), form, function (data) {
                $('#contact-form .contact-form-message').remove();
                $('#contact-form').append('<p class="contact-form-message">' + okMessage + '</p>');
                $('#contact-form').removeClass('clicked');
                $('#contact-form')[0].reset();
                $('#contact-form .form-control').removeClass('input-filled');
            });

        }
        return false;
    });

    var bigEvent =[{
        'year' : '至今',
        'events' :[
            {
                'mouths' : 2,
                'times' :'2018年03月',
                'even' :'加入论客科技(广州)有限公司'
            },{
                'mouths' : 4,
                'times' :'2016年07月',
                'even' :'从广东工业大学毕业'
            },{
                'mouths' : 6,
                'times' :'2016年03月',
                'even' :'加入亚信软件(广州)有限公司'
            },{
                'mouths' : 8,
                'times' :'2013年06月',
                'even' :'加入广东工业大学TOPVIEW工作室'
            },{
                'mouths' : 10,
                'times' :'2012年09月',
                'even' :'就读于广东工业大学计算机学院软件工程专业'
            }]
    },{
        'year' : '从业前',
        'events' :[
            {
                'mouths' : 3,
                'times' :'2012年07月',
                'even' :'从惠来慈云实验中学毕业'
            },{
                'mouths' : 6,
                'times' :'1993年010月',
                'even' :'出生在广东揭阳惠来县的一个小乡村'
            },
        ]
    }];
    $('.event_wrap').eventFlow({'events':bigEvent});
});

(function () {
    var radius = 280;
    var dtr = Math.PI/180;
    var d=300;
    var mcList = [];
    var active = false;
    var lasta = 1;
    var lastb = 1;
    var distr = true;
    var tspeed=10;
    var size=500;

    var mouseX=0;
    var mouseY=0;

    var howElliptical=1;

    var aA=null;
    var oDiv=null;

    window.onload=function ()
    {
        var i=0;
        var oTag=null;

        oDiv=document.getElementById('tagsList');

        aA=oDiv.getElementsByTagName('a');

        for(i=0;i<aA.length;i++)
        {
            oTag={};

            oTag.offsetWidth=aA[i].offsetWidth;
            oTag.offsetHeight=aA[i].offsetHeight;

            mcList.push(oTag);
        }

        sineCosine( 0,0,0 );

        positionAll();

        oDiv.onmouseover=function ()
        {
            active=true;
        };

        oDiv.onmouseout=function ()
        {
            active=false;
        };

        oDiv.onmousemove=function (ev)
        {
            var oEvent=window.event || ev;

            mouseX=oEvent.clientX-(oDiv.offsetLeft+oDiv.offsetWidth/2);
            mouseY=oEvent.clientY-(oDiv.offsetTop+oDiv.offsetHeight/2);

            mouseX/=5;
            mouseY/=5;
        };

        setInterval(change, 30);
    };

    function change()
    {
        var a;
        var b;

        if(active)
        {
            a = (-Math.min( Math.max( -mouseY, -size ), size ) / radius ) * tspeed;
            b = (Math.min( Math.max( -mouseX, -size ), size ) / radius ) * tspeed;
        }
        else
        {
            a = lasta * 0.98;
            b = lastb * 0.98;
        }

        lasta=a;
        lastb=b;

        if(Math.abs(a)<=0.01 && Math.abs(b)<=0.01)
        {
            return;
        }

        var c=0;
        sineCosine(a,b,c);
        for(var j=0;j<mcList.length;j++)
        {
            var rx1=mcList[j].cx;
            var ry1=mcList[j].cy*ca+mcList[j].cz*(-sa);
            var rz1=mcList[j].cy*sa+mcList[j].cz*ca;

            var rx2=rx1*cb+rz1*sb;
            var ry2=ry1;
            var rz2=rx1*(-sb)+rz1*cb;

            var rx3=rx2*cc+ry2*(-sc);
            var ry3=rx2*sc+ry2*cc;
            var rz3=rz2;

            mcList[j].cx=rx3;
            mcList[j].cy=ry3;
            mcList[j].cz=rz3;

            per=d/(d+rz3);

            mcList[j].x=(howElliptical*rx3*per)-(howElliptical*2);
            mcList[j].y=ry3*per;
            mcList[j].scale=per;
            mcList[j].alpha=per;

            mcList[j].alpha=(mcList[j].alpha-0.6)*(10/6);
        }

        doPosition();
        depthSort();
    }

    function depthSort()
    {
        var i=0;
        var aTmp=[];

        for(i=0;i<aA.length;i++)
        {
            aTmp.push(aA[i]);
        }

        aTmp.sort
        (
            function (vItem1, vItem2)
            {
                if(vItem1.cz>vItem2.cz)
                {
                    return -1;
                }
                else if(vItem1.cz<vItem2.cz)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
        );

        for(i=0;i<aTmp.length;i++)
        {
            aTmp[i].style.zIndex=i;
        }
    }

    function positionAll()
    {
        var phi=0;
        var theta=0;
        var max=mcList.length;
        var i=0;

        var aTmp=[];
        var oFragment=document.createDocumentFragment();

        for(i=0;i<aA.length;i++)
        {
            aTmp.push(aA[i]);
        }

        aTmp.sort
        (
            function ()
            {
                return Math.random()<0.5?1:-1;
            }
        );

        for(i=0;i<aTmp.length;i++)
        {
            oFragment.appendChild(aTmp[i]);
        }

        oDiv.appendChild(oFragment);

        for( var i=1; i<max+1; i++){
            if( distr )
            {
                phi = Math.acos(-1+(2*i-1)/max);
                theta = Math.sqrt(max*Math.PI)*phi;
            }
            else
            {
                phi = Math.random()*(Math.PI);
                theta = Math.random()*(2*Math.PI);
            }

            mcList[i-1].cx = radius * Math.cos(theta)*Math.sin(phi);
            mcList[i-1].cy = radius * Math.sin(theta)*Math.sin(phi);
            mcList[i-1].cz = radius * Math.cos(phi);

            aA[i-1].style.left=mcList[i-1].cx+oDiv.offsetWidth/2-mcList[i-1].offsetWidth/2+'px';
            aA[i-1].style.top=mcList[i-1].cy+oDiv.offsetHeight/2-mcList[i-1].offsetHeight/2+'px';
        }
    }

    function doPosition()
    {
        var l=oDiv.offsetWidth/2;
        var t=oDiv.offsetHeight/2;
        for(var i=0;i<mcList.length;i++)
        {
            aA[i].style.left=mcList[i].cx+l-mcList[i].offsetWidth/2+'px';
            aA[i].style.top=mcList[i].cy+t-mcList[i].offsetHeight/2+'px';

            aA[i].style.fontSize=Math.ceil(12*mcList[i].scale/2)+8+'px';

            aA[i].style.filter="alpha(opacity="+100*mcList[i].alpha+")";
            aA[i].style.opacity=mcList[i].alpha;
        }
    }

    function sineCosine( a, b, c)
    {
        sa = Math.sin(a * dtr);
        ca = Math.cos(a * dtr);
        sb = Math.sin(b * dtr);
        cb = Math.cos(b * dtr);
        sc = Math.sin(c * dtr);
        cc = Math.cos(c * dtr);
    }
})(window);

;(function($,window,document,undefined){
    var pluginName = 'eventFlow',
        defaults ={};
    function EventFlow(element,options){
        this.init(element,options);
    }
    EventFlow.prototype = {
        init : function(element,options){
            this.spliceHtml(element,options);
            var $text = $('.event_wrap .list .ev_text');
            var point = [];
            $text.each(function(index, el) {
                point.push($(this).offset().top)
            });
            $(window).scroll(function(event) {
                var s = $(this).scrollTop();
                for(var i =0;i<point.length;i++){
                    if(s+ $(document).height()*2/3 > point[i] ){
                        $($text[i]).addClass('aActiveWid');
                    }else{
                        $($text[i]).removeClass('aActiveWid')
                    }
                }
            });
        },
        spliceHtml :function(element,options){
            var $element = element;
            var $middleLine = $element.find('.middle_line');
            var middleLineI = '';
            var list = ''
            for(var i = 0;i<options.events.length;i++){
                middleLineI +='<i class="first"></i>'
                    +'<i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>'
                    +'<i class="last"></i>';
                if((i+1)%2 == 0){
                    list += '<div class="list_right list">'
                }else{
                    list +='<div class="list_left list">'
                }
                list +='<span class="big_squre"><i>'+options.events[i].year+'</i></span>';
                for(var j = 0;j < options.events[i].events.length;j++){
                    if((j+1)%2 == 0){
                        list +='<div class="ev_text_odd ev_text ev_t'+options.events[i].events[j].mouths+'">'
                    }else{
                        list +='<div class="ev_text ev_text_event ev_t'+options.events[i].events[j].mouths+'">'
                    }
                    list +=	'<span class="small_squire"><i></i></span>'
                        +'<span class="small_line"></span>'
                        +'<h3>'+options.events[i].events[j].times+'</h3>'
                        +'<p>'+options.events[i].events[j].even+'</p>'
                        +'</div>';
                }
                list += '</div>';
            };
            $element.append(list);
            $middleLine.html(middleLineI);
        }
    }
    $.fn[pluginName] = function(options){
        options = $.extend(true, options, defaults);
        return this.each(function(){
            new EventFlow($(this),options)
        });
    }
})(jQuery,window,document)















