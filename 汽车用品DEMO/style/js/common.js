// JavaScript Document
$(function(){
	// loading
	/* $("body").append("<div class='loading'><p class='loading-prompt'>正在拼命加载中。。。</p></div>")
	setInterval(function(){
		$(".loading").fadeOut("slow");	
	},3000);*/
	
	// 导航在手机与平板的界面下的滑入/滑出
	$(".navbar-toggle").click(function(){
		$(".nav").slideToggle("1000");	
	});
	
	// 页面初始化 判断浏览器窗体高度大于页面body高度 底部.footer 固定带底部 添加.footer-fixed
	$(window).on("load resize", function(){
		if($(".footer").hasClass("footer-fixed")){
			if($(window).height() > $(document.body).height() + $(".footer").height() + 30){
				$(".footer").addClass("footer-fixed");
			} else {
				$(".footer").removeClass("footer-fixed");
			}
		}else{
			if($(window).height() > $(document.body).height()){
				$(".footer").addClass("footer-fixed");
			} else {
				$(".footer").removeClass("footer-fixed");
			}
		}
	});
	
	// tab 
	$(".tab-hd .tab-hd-con").click(function () {  
		$(this).addClass("active");  
		$(this).siblings().removeClass("active");
		var parentsEl = $(this).parents(".tab");  
		parentsEl.find(".tab-bd .tab-bd-con").addClass("hide").removeClass("active");  
		var ary = parentsEl.find(".tab-hd .tab-hd-con"); 
		parentsEl.find(".tab-bd .tab-bd-con:eq(" + $.inArray(this, ary) + ")").addClass("active").removeClass("hide");
	});
	
	// dialog 
	$(".dialog-link").click(function(){
		var id=this.id;
		$(".dialog").hide();
		id=id.replace('view','dialog');
		$("#" +id ).height($(document.body).height());
		$("#" +id ).show();
		center($("#" +id).find(".dialog-infobg"));
	});
	$(".dialog-close").click(function(){
		$(".dialog").hide();
		$(this).prev(".dialog-info").css("width","");
	});
	
	// fancybox 
	$(".fancybox").fancybox();
	
	//表单校验
	// 同步开发代码 本地无需加载
	/* if($(this).find("form").length > 0){
		$.each($(this).find("form"), function(index, value){
			$(this).validate({
				onfocusout: function(element){
					$(element).valid();
				}
			});
		});
	}*/
	
});

// dialog 居中显示 
function center(obj) { 
	var screenWidth = $(window).width(), screenHeight = $(window).height(); //当前浏览器窗口的 宽高 
	var scrolltop = $(document).scrollTop();//获取当前窗口距离页面顶部高度 
	obj.find(".dialog-bd").css("max-height",screenHeight-150);
	obj.find(".dialog-info").css("width",obj.width());
	var objLeft = (screenWidth - obj.width())/2 ; 
	var objTop = (screenHeight - obj.height())/2; 
	obj.css({left: objLeft + 'px', top: objTop + 'px'}); 
	
	// 浏览器窗口 
	$(window).resize(function() { 
		var screenWidth = $(window).width(); 
		var screenHeight = $(window).height();
		obj.find(".dialog-bd").css("max-height",screenHeight-150);
		var scrolltop = $(document).scrollTop(); 
		var objLeft = (screenWidth - obj.width())/2 ; 
		var objTop = (screenHeight - obj.height())/2; 
		obj.css({left: objLeft + 'px', top: objTop + 'px'}); 
	}); 
	// 滚动条 
	$(window).scroll(function() { 
		var screenWidth = $(window).width(); 
		var screenHeight = $(window).height();
		obj.find(".dialog-bd").css("max-height",screenHeight-150);
		var scrolltop = $(document).scrollTop(); 
		var objLeft = (screenWidth - obj.width())/2 ; 
		var objTop = (screenHeight - obj.height())/2; 
		obj.css({left: objLeft + 'px', top: objTop + 'px'}); 
	}); 	
}


//---------获取手机验证码倒计时start----------------
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
//alert("aaa"+GetCookieByName("countName"));
if(!isNaN(GetCookieByName("countName")) && GetCookieByName("countName")!="0"){
	curCount = GetCookieByName("countName");
    InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
}

function SetRemainTime() {
	/*
    if (curCount == 0) {                
        window.clearInterval(InterValObj);// 停止计时器
        $("#btnSendCode").removeAttr("disabled");// 启用按钮
        $("#btnSendCode").removeClass("disable");
        $("#btnSendCode").text("获取验证码");
    } else {
        curCount--;
        $("#btnSendCode").text("再次获取(" + curCount + ")");
    }
    */
    if (curCount == 0) {                
        window.clearInterval(InterValObj);// 停止计时器
        $("#btnSendCode").removeAttr("disabled");// 启用按钮
        $("#btnSendCode").removeClass("disable");
        $("#btnSendCode").text("获取验证码");
    } else {
        curCount--;
        $("#btnSendCode").attr("disabled", "disabled");
        $("#btnSendCode").addClass("disable");
        $("#btnSendCode").text("再次获取(" + curCount + ")");
        document.cookie = "countName=" + curCount;
    }
}

function GetCookieByName(name) {
     //获取cookie字符串 
     var strCookie = document.cookie;
     //将多cookie切割为多个名/值对 
     var arrCookie = strCookie.split(";");
     //alert(arrCookie);
     var countValue;
     //遍历cookie数组，处理每个cookie对 
     for (var i = 0; i < arrCookie.length; i++) {
         var arr = arrCookie[i].split("=");
         //找到名称为name的cookie，并返回它的值 
         if (name == arr[0]) {
             countValue = arr[1];
             break;
         }
     }
     return countValue; 
}
//---------获取手机验证码倒计时end----------------