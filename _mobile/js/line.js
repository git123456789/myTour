//------人数价格计算
function IsNumeric(sText)
{
   var ValidChars = "0123456789.";
   var IsNumber=true;
   var Char;
   for (i = 0; i < sText.length && IsNumber == true; i++)
      {
      Char = sText.charAt(i);
      if (ValidChars.indexOf(Char) == -1)
         {
         IsNumber = false;
         }
      }
   return IsNumber;
};
function calcProdSubTotal() {
    var prodSubTotal = 0;
    $(".row-total-input").each(function(){
        var valString = $(this).val() || 0;
        prodSubTotal += parseInt(valString);
    });
    $("#product_subtotal").val(prodSubTotal);
};
function calcTotalPallets() {
    var totalPallets = 0;
    $(".num-pallets-input").each(function() {
        var thisValue = $(this).val();
        if ( (IsNumeric(thisValue)) &&  (thisValue != '') ) {
            totalPallets += parseInt(thisValue);
        };
    });
    $("#total-pallets-input").val(totalPallets);
};
function calcShippingTotal() {
    var totalPallets = $("#total-pallets-input").val() || 0;
    var shippingRate = $("#shipping-rate").text() || 0;
    var shippingTotal = totalPallets * shippingRate;
    $("#shipping-subtotal").val(shippingTotal);
};
function calcOrderTotal() {
    var orderTotal = 0;
    var productSubtotal = $("#product_subtotal").val() || 0;
    var shippingSubtotal = $("#shipping-subtotal").val() || 0;
    var orderTotal = parseInt(productSubtotal) + parseInt(shippingSubtotal);
    var orderTotalNice = "$" + orderTotal;
	//$("#order-total").val(orderTotalNice);
};

$(function(){


//=============================================儿童
	var t = $("#ordercarertong");
	//增加
	$("#_adda").click(function(){

		t.val(parseInt(t.val())+1);
		//$("input[name='metaId']:checked").
		$("input[name='ordercarertong']").focus();


	})
	//减少
	$("#_dela").click(function(){

		var eti=parseInt(t.val())-1;

		if(eti<0)
		{
			eti=0;
		}
		t.val(eti);
		//$("input[name='metaId']:checked").
		$("input[name='ordercarertong']").focus();
	})


//============================================成人
	

	var tb = $("#ordercarchengren");
	//增加
	$("#_addb").click(function(){

		tb.val(parseInt(tb.val())+1);
		//$("input[name='metaId']:checked").
		$("input[name='ordercarchengren']").focus();
	})
	//减少
	$("#_delb").click(function(){

		var cri=parseInt(tb.val())-1;

		if(cri<=0)
		{
			cri=1;
		}
		tb.val(cri);
		//$("input[name='metaId']:checked").
		$("input[name='ordercarchengren']").focus();
	})

	

    $('.num-pallets-input').focus(function(){
        var $this = $(this);
        var numPallets = $this.val();
        var multiplier = $this
                            .parent().parent()
                            .find("td.price-per-pallet span")
                            .text();
        if ( (IsNumeric(numPallets)) && (numPallets != '') ) {
            var rowTotal = numPallets * multiplier;
            $this
                .css("background-color", "white")
                .parent().parent()
                .find("td.row-total input")
                .val(rowTotal);
        } else {
            $this.css("background-color", "#ffdcdc");
        };
        calcProdSubTotal();
        calcTotalPallets();
        //calcShippingTotal();
       // calcOrderTotal();
    });


	$('.num-pallets-input').change(function(){
        var $this = $(this);
        var numPallets = $this.val();
        var multiplier = $this
                            .parent().parent()
                            .find("td.price-per-pallet span")
                            .text();
        if ( (IsNumeric(numPallets)) && (numPallets != '') ) {
            var rowTotal = numPallets * multiplier;
            $this
                .css("background-color", "white")
                .parent().parent()
                .find("td.row-total input")
                .val(rowTotal);
        } else {
            $this.css("background-color", "#ffdcdc");
        };
        calcProdSubTotal();
        calcTotalPallets();
        //calcShippingTotal();
       // calcOrderTotal();
    });

});

//------滚动导航
$(function() {
	//第一个节点了
	var fobj = $('.pkg-detail-tab').eq(0);
	//获取匹配元素在当前视口的相对偏移。返回的对象包含两个整形属性：top 和 left。此方法只对可见元素有效。 
	var fpos = fobj.offset();
	//$('#total_pirce').html(fpos.top);
	$(window).scroll(function(){checkPos(fobj,fpos);});
});

function checkPos(fobj, fpos)
{
	if ('undefined' == typeof(document.body.style.maxHeight))
	{
		var scTop = $(window).scrollTop();
		scTop > fpos.top ? fobj.css({'position': 'absolute', 'z-index': 3, 'top': scTop - fpos.top}) : fobj.attr('style', '');
	}
	else
	{
		($(window).scrollTop() > fpos.top) ? fobj.css({'position': 'fixed', 'z-index': 3, 'top': 0}) : fobj.css({'position': 'static'});
	}
}

$(function() {
        var tab_a = $('.pkg-detail-tab-bd a');
        tab_a.click(function() {
                $(this).addClass('current').siblings().removeClass('current');
        });
        $(window).scroll(function() {
                var Scroll_tab = $('.pkg-detail-tab-bd').offset().top;//滚动切换
                $('.pkg-detail-infor').each(function(i, n) {
                        var tab_infor = $(n).offset().top;
                        if (tab_infor > 0 && Scroll_tab >= tab_infor - 10) {//决定浮动相应距离
                           $('.pkg-detail-tab-bd a').eq(i).addClass('current').siblings().removeClass('current');
                        }
                });
        });
});

//------星际评价处理
$(document).ready(function(){
	var oStar = $("#star")[0];
	var aLi = oStar.getElementsByTagName("li");
	var oUl = oStar.getElementsByTagName("ul")[0];
	var oSpan = oStar.getElementsByTagName("span")[1];
	var oP = oStar.getElementsByTagName("p")[0];
	var i = iScore = iStar = 0;
	var aMsg = [
				"很不满意|差得太离谱，与卖家描述的严重不符，非常不满",
				"不满意|部分有破损，与卖家描述的不符，不满意",
				"一般|质量一般，没有卖家描述的那么好",
				"满意|质量不错，与卖家描述的基本一致，还是挺满意的",
				"非常满意|质量非常好，与卖家描述的完全一致，非常满意"
				];
	
	for (i = 1; i <= aLi.length; i++){
		aLi[i - 1].index = i;
		
		//鼠标移过显示分数
		aLi[i - 1].onmouseover = function (){
			fnPoint(this.index);
			//浮动层显示
			oP.style.display = "block";
			//计算浮动层位置
			oP.style.left = oUl.offsetLeft + this.index * this.offsetWidth - 104 + "px";
			//匹配浮动层文字内容
			oP.innerHTML = "<em><b>" + this.index + "</b> 分 " + aMsg[this.index - 1].match(/(.+)\|/)[1] + "</em>" + aMsg[this.index - 1].match(/\|(.+)/)[1]
		};
		
		//鼠标离开后恢复上次评分
		aLi[i - 1].onmouseout = function (){
			fnPoint();
			//关闭浮动层
			oP.style.display = "none"
		};
		
		//点击后进行评分处理
		aLi[i - 1].onclick = function (){
			iStar = this.index;
			oP.style.display = "none";
			oSpan.innerHTML = "<strong>" + (this.index) + " 分</strong> (" + aMsg[this.index - 1].match(/\|(.+)/)[1] + ")";
			alert("感谢您的支持,我么会努力工作为您提供更优质的服务");
		};
	}
	
	//评分处理
	function fnPoint(iArg){
		//分数赋值
		iScore = iArg || iStar;
		for (i = 0; i < aLi.length; i++) aLi[i].className = i < iScore ? "on" : "";	
	};
	
});


//------表单验证处理
var happy = {
	// matches mm/dd/yyyy (requires leading 0's (which may be a bit silly, what do you think?)
	date: function (val) {return /^(?:0[1-9]|1[0-2])\/(?:0[1-9]|[12][0-9]|3[01])\/(?:\d{4})/.test(val);},
	email: function (val){return /^(?:\w+\.?\+?)*\w+@(?:\w+\.)+\w+$/.test(val);},
	tel:function(val){return /^1[3|4|5|8][0-9]\d{8,8}$/.test(val);},
	realname:function(val){return /^[\u4e00-\u9fa5]{2,6}$/.test(val);},
	youprice:function(val){return /^[0-9]*[1-9][0-9]*$/.test(val);},//正整数
	answername:function(val){return /^[\s\S]{1,100}$/.test(val);},
};
$(function(){

	//表单验证-------------------------------------------------------------------------------
	$('#awesomeForm').isHappy({
		fields: {
			// reference the field you're talking about, probably by `id`
			// but you could certainly do $('[name=name]') as well.
			'#yourName': {
				required: true,
				message: '请输入您的姓名(2-6个汉字)?',
				test: happy.realname
			},
			'#youtel': {
				required: true,
				message: '请输入11位有效手机号码?',
				test: happy.tel
			},
				'#godata': {
				required: true,
				message: '请选择出发日期?'
			},
				'#ordercarchengren': {
				required: true,
				message: '请选择成人数?',
				test:happy.youprice
			}
		}
	});

	//表单验证2-------------------------------------------------------------------------------
	$('#rlyd_form').isHappy({
		fields: {
			// reference the field you're talking about, probably by `id`
			// but you could certainly do $('[name=name]') as well.
			'#adult': {
				required: true,
				message: '请输入成人数?',
				test: happy.youprice
			},
			'#rlydyourName': {
				required: true,
				message: '请输入您的姓名(2-6个汉字)?',
				test: happy.realname
			},
			'#rlydyoutel': {
				required: true,
				message: '请输入11位有效手机号码?',
				test: happy.tel
			}
		}
	});

	//表单验证3-------------------------------------------------------------------------------
	$('#tour_answer_form').isHappy({
		fields: {
			// reference the field you're talking about, probably by `id`
			// but you could certainly do $('[name=name]') as well.
			'#tour_content': {
				required: true,
				message: '只能输入汉字、英文、数字和下划线，且字数不能小于5个,超过400汉字!',
				test: happy.answername
			},
			'#tour_email': {
				required: true,
				message: '请输入有效电子邮箱?',
				test: happy.email
			}
		}
	});

	//左侧菜单显示隐藏
	$(".line-left h2").toggle(function(){
			$(this).next(".tourlink,.tourlinkimg").animate({height:'toggle',opacity:'toggle'},"fast");
			$(this).children("h2 span").html("+");
		},function(){
			$(this).next(".tourlink,.tourlinkimg").animate({height:'toggle',opacity:'toggle'},"fast");
			$(this).children("h2 span").html("—");
	});
	//左侧菜单显示隐藏
	$("._jj h3").toggle(function(){
			$(this).next(".navbox").animate({height:'toggle',opacity:'toggle'},"fast");
			$(this).children("h3 span").html("+");
		},function(){
			$(this).next(".navbox").animate({height:'toggle',opacity:'toggle'},"fast");
			$(this).children("h3 span").html("—");
	});

	//右侧行程安排显示隐藏
	$(".pkg-detail-infor h3").toggle(function(){
			$(this).next(".pkg-detail-style").animate({height:'toggle',opacity:'toggle'},"fast");
			$(this).children("h3 span").html("+");
		},function(){
			$(this).next(".pkg-detail-style").animate({height:'toggle',opacity:'toggle'},"fast");
			$(this).children("h3 span").html("—");
	});

	//------qtip信息提示
	$("#tj").qtip({
		position: {my: 'bottom center',at: 'top center',adjust: {mouse: false,scroll: false}},
		content: {text: "本起价是可选出发日期中，按双人出行共住一间房核算的最低单人价格。产品价格会根据您所选择的出发日期、出行人数、入住酒店房型、航班或交通以及所选附加服务的不同而有所差别", title: {text: "起价说明", button:true}},
		hide: { event: 'click',	inactive: 10000}
	});

	$("#tb").qtip({
		position: {my: 'bottom center',at: 'top center',adjust: {mouse: false,scroll: false}},
		content: {text: "儿童价标准：年龄2~6周岁（不含），不占床，不含早餐，其余服务标准同成人", title: {text: "儿童标准", button:true}},
		hide: { event: 'click',	inactive: 10000}
	});
	$("#datatb").qtip({
		position: {my: 'bottom center',at: 'top center',adjust: {mouse: false,scroll: false}},
		content: {text: "根据您的选择的日期来安排您的具体出发时间,请提前7天预订", title: {text: "出发日期", button:true}},
		hide: { event: 'click',	inactive: 10000}
	});

	$("#lkyd").qtip({
		position: {my: 'bottom center',at: 'top center',adjust: {mouse: false,scroll: false}},
		content: {text: "我们的客服24小时为您咨询服务，如不在线请直接拨打预订电话:029-86699655 或者 029-86699611", title: {text: "24在线客服", button:true}},
		hide: { event: 'click',	inactive: 10000}
	});
});

//------日历价格处理
function rili()
{
	//背景换色
	$('.e-rili').hover(
		function(){
			$(this).addClass('e-rili-over');
		},
		function(){
			$(this).removeClass('e-rili-over');
			//$("#hidden_div").hide("fast");
		}
	);
	//$(".e-rili").mouseover(function(e){$("#hidden_div").css({"top": e.pageY+30,"left": e.pageX-160}).show("fast");}).mouseout(function(e){$("#hidden_di444v").remove();});
}
function openrlyd(y,m,d){
	var dateinfo=y+"-"+m+"-"+d;
	$(".day-text").click(function(e){$("#hidden_div").css({"top": e.pageY+30,"left": e.pageX-160}).show("fast");$(".J_datetxt").html(dateinfo);$("#rlyd_input_hidden").attr("value",dateinfo);}).mouseout(function(e){$("#hidden_di444v").remove();});
}
function closerlyd(){$("#hidden_div").hide();}


 