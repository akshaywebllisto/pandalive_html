function searchLayerDis(){
	$('#commSearch').hide();
	$('.search').removeClass('open');
	$('#Lightbox').remove();
	$('html, body').removeAttr('style')
}
mozillaForceKeyup = function(target) {
	var isIntervalRunning, target;
	if (jQuery.browser.mozilla) {
		isIntervalRunning = null;
		target.bind('keydown', function(e) {
			var forceKeyup;
			if (e.which === 229) {
				forceKeyup = function() {
					return target.trigger('keyup');
				};
				if (!isIntervalRunning) {
				return isIntervalRunning = setInterval(forceKeyup, 100);
				}
			}
		});
		return target.bind('blur', function(e) {
			if (isIntervalRunning) {
				clearInterval(isIntervalRunning);
				return isIntervalRunning = null;
			}
		});
	}
};

var prevTxt=null;
var nextTxt=null;
var searchInterval;

checkVal=function(obj){
    searchInterval=setInterval(function(){
        nextTxt=obj.val();
            if(prevTxt != nextTxt){
                clearInterval(searchInterval);
                return obj.trigger('keyup');                
            }
    },100);
};

var isSearchOpen=false;

(function($){
$.fn.extend({
	

	searchLayer:function(){
		if(!this){return false;}
		var _wrap = $(this);
		var openLength = 2;
		var TimerId;
		//if(!$('#query').get(0)){return false;}
		//var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; 2012-06-27
		//var check = /[ㄱ-힣]/;
		//mozillaForceKeyup($('#query'));
		//alert($('.searchInput').width());



		_wrap.find('fieldset input.searchInput').bind({
			'focus':function(){
				isSearchOpen= true;
				var _this = $(this);
				if(_this.is(".noneFocus")){
					_this.removeClass("noneFocus")
				};
				if($.browser.mozilla){
                    prevTxt=$(this).val();
                    checkVal($(this));
                }
			},
			'keyup':function(){
				var _this = $(this);
				if(_this.get(0).value.length > 0){
					if(!$('#Lightbox').get(0)){
						
						$('#commSearch').show();
						_wrap.addClass('open');
							var txtP=$('div.layersBottom div').find('li');
							txtP.each(function(){
								if(parseInt($(this).width()) > 84){
									$(this).css({'width':'84px','overflow':'hidden','text-overflow':'ellipsis','white-space':'nowrap','word-break':'break-all'});
								}	
							});

						$(window).scrollTop();
						//$('html, body').css('overflow','hidden');
						$('<div id="Lightbox"></div>').prependTo($('body'))
						//$('.search').css('background','#F4F2ED url("../img/common/bg_retrieve.gif") no-repeat scroll 18px 10px')
					}
					if($('#commSearch').css('display') != 'none'){
						//setTimeout(function(){_wrap.addClass('open');},500);
					}
					
				}		
			},
			'focusout':function(){
				var _this = $(this);
				if(_this.get(0).value.length == 0){
					_this.addClass("noneFocus")
				}
			}
		})


		//close
		_wrap.find('.close').click(function(){
			$('#commSearch').hide();
			_wrap.removeClass('open');
			$('#Lightbox').remove();
			$('body').remove($('#Lightbox'));
			$('html, body').removeAttr('style')
		});
		

		$('#commSearch').bind({
			'mouseleave':function(){
				isSearchOpen= false;
			},
			'mouseover':function(){
				isSearchOpen= true;
			}
		});	
		$('html').bind('click',function(){
			if(isSearchOpen == false){
				$('#commSearch').hide();
				_wrap.removeClass('open');
				$('#Lightbox').remove();
				//$('html, body').removeAttr('style')
			}
		});

		//init and open
		var focusSearch = $('input.noneFocus');
		if($('input:focus').prop('id') =="gnbQuery"){
			var focusSearch = $('input:focus');
			$('#gnbQuery').removeClass("noneFocus")
		}
		if(focusSearch.get(0) && focusSearch.attr('value').length > 0){
			$('#gnbQuery').removeClass("noneFocus")
		}
		
	},

	thumbnailSlide:function(opt){
		var _this = $(this);
		if(!_this.get(0)){ return false;}
		var wrap = _this.find('ul');
		var itemsWidth=0;
		_this.find('li').each(function(){
		        itemsWidth += $(this).outerWidth(true);
		})
		var viewportW = _this.outerWidth(true);
		var items = _this.find('li').length
		var newIdx = 0;
		var btnPrev = $('#prev');
		var btnNext = $('#next');
		var mleft;
		var moveWid;
		var startTF=0;
		var notpass = 0;
		btnPrev.click(function(e){e.preventDefault()}); 
		btnNext.click(function(e){e.preventDefault()}); 
		
		function dimmd(obj){//딤드용 버튼으로 교체기능
			obj.each(function(){
				if($(this).find('img').get(0).src.indexOf('_d.png') == -1){
					$(this).find('img').get(0).src = $(this).find('img').get(0).src.replace('.png','_d.png')
					$(this).css('cursor','default');
				}
			})
		}
		function dimmdcure(obj){//기본 버튼으로 교체기능
			obj.each(function(){
				if($(this).find('img').get(0).src.indexOf('_d.png') != -1){
					$(this).find('img').get(0).src = $(this).find('img').get(0).src.replace('_d.png','.png')
					$(this).css('cursor','pointer');
				}
			})
		}
		/*	init()
			로드된 아이템 개체수를 기준으로 슬라이딩 기능이 필요하지않을경우 딤드처리후 실행취소.
		*/
		function init(){
			wrap.find('li').each(function(){//로드된 아이템 총 너비 체크
				var item = $(this);
				startTF += parseInt(item.outerWidth(true));
			})
			if(startTF < _this.width()){
				dimmd($('#prev, #next'));
				notpass = 1;
			}
		}
		init();
		if(notpass){ return false;}
		/*	arrowStats()
			최초 로드시 and 화살표 버튼 클릭이벤트 발생시
			딤드처리가 필요한지를 체크후 적용하는 함수
		*/
		function arrowStats(w){
			dimmdcure($('#prev, #next'))
			if(newIdx==0){ //좌측끝이라면, 
				dimmd($('#prev'));
				return false;
			}
			if(itemsWidth-w < viewportW){ //우측끝이라면,
				dimmd($('#next'));
				return false;
			}
		}
		arrowStats();//딤드처리 호출
		/*	prevFuc() ,nextFuc()
			각각 좌,우측 버튼 클릭시 호출되는 함수
		*/
		function prevFuc(){
			mleft = parseInt(wrap.css('marginLeft'));
			if(!mleft){return false;}
			btnPrev.unbind("click",prevFuc);
			moveWid = _this.find('li').eq(newIdx-1).outerWidth(true);
			newIdx--;
			arrowStats()
			wrap.stop().animate({marginLeft:mleft+moveWid},{duration:opt.speed,easing:'easeOutCirc',complete:function(){			
				btnPrev.bind('click',prevFuc)
				itemsWidth+=moveWid;
			}})
			return false;
		}
		function nextFuc(){
			if(itemsWidth < viewportW){return false;}
			btnNext.unbind("click",nextFuc);
			mleft = parseInt(wrap.css('marginLeft'));
			moveWid = _this.find('li').eq(newIdx).outerWidth(true);
			newIdx++;
			arrowStats(moveWid) 
			wrap.stop().animate({marginLeft:mleft-moveWid},{duration:opt.speed,easing:'easeOutCirc',complete:function(){
				btnNext.bind('click',nextFuc)
				itemsWidth-=moveWid;
			}})
			
			return false;
		}
		
		btnPrev.bind('click',prevFuc)
		btnNext.bind('click',nextFuc)
	},
		
	popupBg:function(){
		if(!$('#Lightbox').get(0)){$('<div id="Lightbox"></div>').prependTo($('body'))}
		else{$('#Lightbox').remove()}
	}


})
})(jQuery);




var crn=0;
var interval;
var showWid=600;
var showHei=400;

$.fn.extend({
	imgRotation:function(num){
		if($(this).css('margin-left') != '0px' && crn == 0){
	//		 $(this).css('margin-left',0.7*showWid);
		}
		var tr=-1*num*crn;
		$(this).stop().animate({'margin-left':tr},0,'easeInOutQuad');
	},

	imgShow:function(num){
		if($(this).css('margin-left') != '0px' && crn == 0){
	//		 $(this).css('margin-left',0.7*showWid);
		}
		var tr=-1*num*crn;
		$(this).css('opacity',0);
		$(this).stop().animate({'opacity':1},0,'linear');
		$(this).css('margin-left',tr);
	},

	thumbOn:function(){
		var list=$(this).find('li');
		list.each(function(){		
			if($(this).index() == crn){				
				$(this).prepend('<span class="borderSpan"></span>');
				
				if($(this).index() == (list.length-1)){					
				//	$(this).width('59px');
					//alert($(this).width());
				}
			}else{
				$(this).children('.borderSpan').remove();
			}
		});
	},

	intervalSet:function(){/*imgRotation 인수 주의*/
		$(this).bind({
			mouseout: function() {
				imgMove($(this).parent().children('.viewerBody').children('.bigImg'),$(this).parent().children('.viewerBody').find('.bigImg ul li').length);
			 },
			mouseover: function() {
				clearInterval(interval);
			  }
		});
	},
	
	intervalSet2:function(){
		$(this).bind({
			mouseout: function() {
				imgMove($(this).parent().parent().parent().parent().children('.viewerBody').children('.bigImg'),$(this).parent().parent().parent().parent().children('.viewerBody').find('.bigImg ul li').length);
			 },
			mouseover: function() {
				clearInterval(interval);
			  }
		});
	},

	btnCheck:function(num){
			if(crn == 0){
				$(this).parent().children('.prevBtn').css('display','none');
			}else{
				$(this).parent().children('.prevBtn').css('display','block');
			}
			if(crn > $(this).parent().children('.viewerBody').find('.bigImg ul li').length-2){
				$(this).parent().children('.nextBtn').css('display','none');
			}else{
				$(this).parent().children('.nextBtn').css('display','block');
			}
	
	},

	btnCheck2:function(num){
			if(crn == 0){
				$(this).parent().parent().parent().parent().children('.prevBtn').css('display','none');
			}else{
				$(this).parent().parent().parent().parent().children('.prevBtn').css('display','block');
			}
			if(crn > $(this).parent().parent().parent().parent().children('.viewerBody').find('.bigImg ul li').length-2){
				$(this).parent().parent().parent().parent().children('.nextBtn').css('display','none');
			}else{
				$(this).parent().parent().parent().parent().children('.nextBtn').css('display','block');
			}
	
	},

	btnCheck3:function(num){
			if(crn == 0){
				$(this).parent().children('.prevBtn').css('display','none');
			}else{
				$(this).parent().children('.prevBtn').css('display','block');
			}
			if(crn > $(this).parent().children('.popCon').find('.bigImg ul li').length-2){
				$(this).parent().children('.nextBtn').css('display','none');
			}else{
				$(this).parent().children('.nextBtn').css('display','block');
			}
	
	},

	leftBtnSet:function(){		
	//	$(this).intervalSet();
		$(this).bind('click',function(e){
			crn--;
			if(crn < 0){
				//crn=$(this).parent().children('.viewerBody').find('.bigImg ul li').length-1;
				crn=0;
			}		
			
			$(this).btnCheck();

			$(this).parent().children('.viewerBody').children('.bigImg').imgRotation(600);
		    $(this).parent().children('.viewerBody').children('.thumbImg').thumbOn();
		
			
			
			e.preventDefault();
		});
	},

	rightBtnSet:function(){
	//	$(this).intervalSet();
		$(this).bind('click',function(e){
			crn++;
			if(crn > $(this).parent().children('.viewerBody').find('.bigImg ul li').length-1){
				//crn=0;
				crn=$(this).parent().children('.viewerBody').find('.bigImg ul li').length-1;
			}
			
			$(this).btnCheck();

			$(this).parent().children('.viewerBody').children('.bigImg').imgRotation(600);
		    $(this).parent().children('.viewerBody').children('.thumbImg').thumbOn();

			
			
			e.preventDefault();
		});
		
	},

	popLeftBtnSet:function(){		
		$(this).bind('click',function(e){
			crn--;
			if(crn < 0){
				crn=0;
			}		
			$(this).btnCheck3();
			$(this).parent().children('.popCon').children('.bigImg').imgRotation(694);
			e.preventDefault();
		});
	},

	popRightBtnSet:function(){
		$(this).bind('click',function(e){			
			crn++;
			if(crn > $(this).parent().children('.popCon').find('.bigImg ul li').length-1){
				//crn=0;
				crn=$(this).parent().children('.popCon').find('.bigImg ul li').length-1;
			}
			$(this).btnCheck3();
			$(this).parent().children('.popCon').children('.bigImg').imgRotation(694);
			e.preventDefault();
		});
		
	}

});

function imgMove(obj,num){	
	interval=setInterval(function () {
		crn++;

	   if(crn>num-1){		  
		   crn=0;
	   }
       obj.imgRotation(600);
	   obj.parent().children('.thumbImg').thumbOn();
	  
	},3000);
}


$(document).ready(function(){	
	var imgV=$('div.imageViewer');
	var vBody=imgV.find('.viewerBody');
	var lBtn=imgV.find('.prevBtn');
	var rBtn=imgV.find('.nextBtn');

	function bigImgSet(obj,num){
		//alert(obj.prop( "tagName" ));
		var img=obj.find('img');
		var m=num-img.height();
		if(m >1){
			img.css('margin-top',Math.round(0.5*m));			
		}
	}
	function bigImgSet2(obj,num){
		//alert(obj.prop( "tagName" ));
		var img=obj.children(0);
		var m=num-img.height();
		if(m >1){
			img.css('margin-top',Math.round(0.5*m));		
		}
		var wid=img.width();
		var n=Math.round(0.5*(694-img.width()));
		popCloseBtnSet(obj,n);
	}

	function close(){
		$('.popELCon').find('.popMask').unbind('click',function(){close();});
		$('.popELCon').css('display','none');
		$('html, body').css('overflow-y','auto');
		$('html, body').height(document.body.clientHeight);
	}

	function popCloseBtnSet(obj,n){
		var cBtn=obj.find('a.closeBtn');
		cBtn.css('right',n+'px');

		cBtn.bind('click',function(){
			close();
		});
	}


	function viewerBody(){	
		
		var bigBody=vBody.find('.bigImg');

		var bigImg=bigBody.find('ul li');
		var len=bigImg.length;

		bigBody.width((showWid*len)+'px');

		bigImg.each(function(){
			var img=$(this).find('img');

			img.each(function(){
				var i=$(this);

				/* ie */
				if($.browser.msie){
					bigImgSet(i.parent(),showHei);
				}
				
				var tmpImg=new Image();
				tmpImg.src=$(this).attr('src');
				tmpImg.onload=function(){
					bigImgSet(i.parent(),showHei);
				};			
			});	

			$(this).bind('click',function(){
				$('.popELCon').css('display','block');
				//var top=$('.imageViewer').offset().top;
                var top=0.5*($(window).height()-$('.popELCon').find('.popCon').height());
                $('.popELCon').find('.popCon').css('top',top);
                var left=0.5*($(window).width()-$('.popELCon').find('.popCon').width());
                $('.popELCon').find('.popCon').css('left',left);
                $('.popELCon').find('.prevBtn').css('left',(left-50));
                $('.popELCon').find('.nextBtn').css('left',(left+$('.popELCon').find('.popCon').width()+20));
                
				$('.popELCon').find('.popMask').bind('click',function(){close();});
				$('html, body').css('overflow-y','hidden');
				$('html, body').height('100%');
				popupBody();					
				$('.popELCon').find('.popCon').find('.bigImg').imgShow(694);
				$('.popELCon').find('.prevBtn').btnCheck3();
			});
			
		});
		//imgMove(bigBody,len);
	}

	function thumbBody(){
		var t_size=60;

		var thumbBody=vBody.find('.thumbImg');
		var thumbImg=thumbBody.find('ul li');

		function thumbImgSet(obj){
			var img=obj.find('img');
			var w=img.width();
			var h=img.height();
			var ratio;
			var term;			

			if(h <= w){
				img.height('60px');
				ratio=h/t_size;
				term=-1*Math.round(0.5*(w-h)/ratio);
				img.css('margin-left',term);
				

			}else{
				img.width('60px');
				ratio=w/t_size;
				term=-1*Math.round(0.5*(h-w)/ratio);
				img.css('margin-top',term);				
			}			
		}

		thumbImg.each(function(){
			var i=$(this);
			var img=$(this).find('img');
			var len=i.parent().children('li').length;

			/* ie */
			if($.browser.msie){		
				thumbImgSet(i);				
			}
			
			var tmpImg=new Image();
			tmpImg.src=img.attr('src');
			tmpImg.onload=function(){
				thumbImgSet(i);
			};
			var cursor = ($.browser.msie && $.browser.version < '6.0') ? 'hand' : 'pointer';
			$(this).css('cursor',cursor);

			//$(this).intervalSet2();

			$(this).bind('click',function(){
				var prev=crn;
				crn=$(this).index();
				if(prev != crn){
					//vBody.children('.bigImg').imgRotation(600);
					vBody.children('.bigImg').imgShow(600);
					$(this).parent().thumbOn();
					$(this).btnCheck2();
				}
			});

		});

	}

	function popupBody(){	
		
		var popBody=$('.popELCon').find('.popCon').find('.bigImg');

		var bigImg=popBody.find('ul li');
		var len=bigImg.length;

		//popBody.width((694*len)+'px');		
		
		bigImg.each(function(){
			var img=$(this).children(0);

			img.each(function(){
				var i=$(this);

				/* ie */
				if($.browser.msie){
					bigImgSet2(i.parent(),456);
				}
				
				var tmpImg=new Image();
				tmpImg.src=$(this).attr('src');
				tmpImg.onload=function(){
					bigImgSet2(i.parent(),456);
				};
			});	
		});		
	}

	//popupBody();
	thumbBody();
	viewerBody();
	

	rBtn.rightBtnSet();
	lBtn.leftBtnSet();
	
	$('.popELCon').find('.nextBtn').popRightBtnSet();
	$('.popELCon').find('.prevBtn').popLeftBtnSet();

	$('.search').searchLayer();
	var top01=parseInt($("#btnMore01").parent().children('#layerMore01').find('div').height());
	var bgHei01=parseInt($("#btnMore01").parent().parent().children('.specDtl').height());
	var toHeight01 = $("#layerMore01>div").outerHeight();

	if(bgHei01<parseInt(toHeight01)+14){
		bgHei01-=26;
		
		$("#btnMore01").parent().children('#layerMore01').css('height',bgHei01);
		$("#btnMore01").css('display','block');
		$("#btnMore01").bind('mousedown',function(e){
			 e.preventDefault();			
			if($("#layerMore01").css("height")== bgHei01+'px'){
				$("#layerMore01").animate({"height":toHeight01},0);
				$("#btnMore01 img").attr("src","../resources/img/common/btn/icon_close_arrow_off.png");
			//	$("#btnMore01 a span").text("접기");
			}else{
				$("#layerMore01").animate({"height":bgHei01},0);
				$("#btnMore01 img").attr("src","../resources/img/common/btn/icon_open_arrow_off.png");
				$("#btnMore01 a").attr("href","#cTop");
			//	$("#btnMore01 a span").text("더보기");
			}
		});
	}else{
		$("#btnMore01").hide();
	}

	var top01_01=parseInt($("#btnMore01_01").parent().children('#layerMore01_01').find('div').height());
	var bgHei01_01=parseInt($("#btnMore01_01").parent().parent().children('.specDtl').height());
	var toHeight01_01 = $("#layerMore01_01>div").outerHeight();

	if(bgHei01_01<parseInt(toHeight01_01)+14){
		bgHei01_01-=39;
		
		$("#btnMore01_01").parent().children('#layerMore01_01').css('height',bgHei01_01);
		$("#btnMore01_01").css('display','block');
		$("#btnMore01_01").bind('mousedown',function(e){
			 e.preventDefault();			
			if($("#layerMore01_01").css("height")== bgHei01_01+'px'){
				$("#layerMore01_01").animate({"height":toHeight01_01},0);
				$("#btnMore01_01 img").attr("src","../resources/img/common/btn/icon_close_arrow_off.png");
			//	$("#btnMore01 a span").text("접기");
			}else{
				$("#layerMore01_01").animate({"height":bgHei01_01},0);
				$("#btnMore01_01 img").attr("src","../resources/img/common/btn/icon_open_arrow_off.png");
				$("#btnMore01_01 a").attr("href","#cTop");
			//	$("#btnMore01 a span").text("더보기");
			}
		});
	}else{
		$("#btnMore01_01").hide();
	}

	/*	$("#btnMore01").each(function(){
		var hei=$(this).parent().children('.subTxt').children('div').outerHeight();
		if(hei>140){
			$(this).css('cursor','pointer');	
			$(this).bind("click",function(e){
				 e.preventDefault();
				var txt=$(this).parent().children('.subTxt');
				//var toHeight = txt.children('div').outerHeight();
				var toHeight = '147px';
				if(txt.css("height")=="200px"){
					txt.stop().animate({'height':toHeight},250,'easeInOutQuad');
					var src=$(this).find("a img").attr("src").replace('_close','_open');
					$(this).find("a img").attr("src",src);
				}else{
					txt.stop().animate({'height':'200px'},250,'easeInOutQuad');
					var src=$(this).find("a img").attr("src").replace('_open','_close');					
					$(this).find("a img").attr("src",src);
					$(this).children("a").attr("href","#cTop");
				}
			});
		}else{
			$(this).find("a img").unbind('mouseenter mouseleave');
			$(this).css('cursor','default');
		}
	}); */
	var top02=parseInt($("#btnMore02").parent().find('ul').height());
	
	if(top02 <= 20){
		$("#btnMore02").hide();
	}else{
		$("#btnMore02").css('display','block');
		$("#btnMore02").bind('mousedown',function(e){
			 e.preventDefault();
			var toHeight = $("#layerMore02>ul").outerHeight();
			if($("#layerMore02").css("height")=="20px"){
				$("#layerMore02").animate({"height":toHeight},0);
				$("#btnMore02 img").attr("src","../resources/img/common/btn/icon_close_arrow_off.png");
			//	$("#btnMore01 a span").text("접기");
			}else{
				$("#layerMore02").animate({"height":"20px"},0);
				$("#btnMore02 img").attr("src","../resources/img/common/btn/icon_open_arrow_off.png");
				$("#btnMore02 a").attr("href","#cTop");
			//	$("#btnMore01 a span").text("더보기");
			}
		});
	}

	var top03=parseInt($("#btnMore03").parent().children('#layerMore03').find('div').height());
	var bgHei03=parseInt($("#btnMore03").parent().parent().children('.specDtl').height());
	var toHeight03 = $("#layerMore03>div").outerHeight();
	
	if(bgHei03<parseInt(toHeight03)+14){
		bgHei03-=35;

		$("#btnMore03").parent().children('#layerMore03').css('height',bgHei03);
		$("#btnMore03").css('display','block');
		$("#btnMore03").bind('mousedown',function(e){
			 e.preventDefault();
			var toHeight = $("#layerMore03>div").outerHeight();
			if($("#layerMore03").css("height")==bgHei03+'px'){
				$("#layerMore03").animate({"height":toHeight03},0);
				$("#btnMore03 img").attr("src","../resources/img/common/btn/icon_close_arrow_off.png");
			//	$("#btnMore01 a span").text("접기");
			}else{
				$("#layerMore03").animate({"height":bgHei03},0);
				$("#btnMore03 img").attr("src","../resources/img/common/btn/icon_open_arrow_off.png");
				$("#btnMore03 a").attr("href","#cTop");
			//	$("#btnMore01 a span").text("더보기");
			}
		});
	}else{
		$("#btnMore03").hide();
	}
/*
	if(top03 <= 79){
		$("#btnMore03").hide();
	}else{
		$("#btnMore03").css('display','block');
		$("#btnMore03").click(function(e){
			 e.preventDefault();
			var toHeight = $("#layerMore03>div").outerHeight();
			if($("#layerMore03").css("height")=="75px"){
				$("#layerMore03").animate({"height":toHeight},0);
				$("#btnMore03 img").attr("src","../resources/img/common/btn/icon_close_arrow_off.png");
			//	$("#btnMore01 a span").text("접기");
			}else{
				$("#layerMore03").animate({"height":"75px"},0);
				$("#btnMore03 img").attr("src","../resources/img/common/btn/icon_open_arrow_off.png");
				$("#btnMore03 a").attr("href","#cTop");
			//	$("#btnMore01 a span").text("더보기");
			}
		});
	}
*/

	var top04=parseInt($("#btnMore04").parent().children('#layerMore04').find('div').height());	
	var bgHei04=parseInt($("#btnMore04").parent().parent().children('.specDtl').height());
	var toHeight04 = $("#layerMore04>div").outerHeight();

	if(bgHei04<parseInt(toHeight04)+14){
		//bgHei04-=30;
		bgHei04-=37;//2014. 10월2차패치 예정

		$("#btnMore04").parent().children('#layerMore04').css('height',bgHei04);
		$("#btnMore04").css('display','block');
		$("#btnMore04").bind('mousedown',function(e){
			 e.preventDefault();
			var toHeight = $("#layerMore04>div").outerHeight();
			if($("#layerMore04").css("height")==bgHei04+'px'){
				$("#layerMore04").animate({"height":toHeight04},0);
				$("#btnMore04 img").attr("src","../resources/img/common/btn/icon_close_arrow_off.png");
			//	$("#btnMore01 a span").text("접기");
			}else{
				$("#layerMore04").animate({"height":bgHei04},0);
				$("#btnMore04 img").attr("src","../resources/img/common/btn/icon_open_arrow_off.png");
				$("#btnMore04 a").attr("href","#cTop");
			//	$("#btnMore01 a span").text("더보기");
			}
		});
	}else{
		$("#btnMore04").hide();
	}
	/*
	
	if(top04 <= 204){
		$("#btnMore04").hide();
	}else{
		$("#btnMore04").css('display','block');
		$("#btnMore04").click(function(e){
			 e.preventDefault();
			var toHeight = $("#layerMore04>div").outerHeight();
			if($("#layerMore04").css("height")=="200px"){
				$("#layerMore04").animate({"height":toHeight},0);
				$("#btnMore04 img").attr("src","../resources/img/common/btn/icon_close_arrow_off.png");
			//	$("#btnMore01 a span").text("접기");
			}else{
				$("#layerMore04").animate({"height":"200px"},0);
				$("#btnMore04 img").attr("src","../resources/img/common/btn/icon_open_arrow_off.png");
				$("#btnMore04 a").attr("href","#cTop");
			//	$("#btnMore01 a span").text("더보기");
			}
		});
	}
	*/
	var top05=parseInt($("#btnWriter").parent().children('#layerWriter').find('div').height());
	
	if(top05 <= 110){
		$("#btnWriter").hide();
	}else{
		$("#btnWriter").css('display','block');
		$("#btnWriter").bind('mousedown',function(e){
			 e.preventDefault();
			var toHeight = $("#layerWriter>div").outerHeight();
			if($("#layerWriter").css("height")=="110px"){
				$("#layerWriter").animate({"height":toHeight},0);
				$("#btnWriter img").attr("src","../resources/img/common/btn/icon_close_arrow_off.png");
			//	$("#btnMore01 a span").text("접기");
			}else{
				$("#layerWriter").animate({"height":"110px"},0);
				$("#btnWriter img").attr("src","../resources/img/common/btn/icon_open_arrow_off.png");
				$("#btnWriter a").attr("href","#cTop");
			//	$("#btnMore01 a span").text("더보기");
			}
		});
	}
	

	var top06=parseInt($("#btnViewList").parent().children('#layerViewList').find('div').height());
	
	if(top06 <= 114){
		$("#btnViewList").hide();
	}else{
		$("#btnViewList").css('display','block');
		$("#btnViewList").bind('mousedown',function(e){
			 e.preventDefault();
			var toHeight = $("#layerViewList>div").outerHeight();
			if($("#layerViewList").css("height")=="110px"){
				$("#layerViewList").animate({"height":toHeight},0);
				$("#btnViewList img").attr("src","../resources/img/common/btn/icon_close_arrow_off.png");
			//	$("#btnMore01 a span").text("접기");
			}else{
				$("#layerViewList").animate({"height":"110px"},0);
				$("#btnViewList img").attr("src","../resources/img/common/btn/icon_open_arrow_off.png");
				$("#btnViewList a").attr("href","#cTop");
			//	$("#btnMore01 a span").text("더보기");
			}
		});
	}

	$(".listMoreView").each(function(){
		var hei=$(this).parent().children('.textBox').children('div').outerHeight();
		if(hei>17){
			$(this).css('display','block');
			$(this).css('cursor','pointer');	
			$(this).bind("mousedown",function(e){
				 e.preventDefault();
				var txt=$(this).parent().children('.textBox');
				//var toHeight = txt.children('div').outerHeight();
				var toHeight = '16px';
				if(txt.css("height") == hei+'px'){
					//txt.stop().animate({'height':toHeight},0,'easeInOutQuad');
					txt.css('height',toHeight);
					var src=$(this).find("a img").attr("src").replace('_close','_open');
					$(this).find("a img").attr("src",src);
				}else{					
				//	txt.stop().animate({'height':hei},0,'easeInOutQuad');
					txt.css('height',hei);
					var src=$(this).find("a img").attr("src").replace('_open','_close');					
					$(this).find("a img").attr("src",src);
					$(this).children("a").attr("href","#cTop");
				}
			});
		}else{
			$(this).hide();
			//$(this).find("a img").unbind('mouseenter mouseleave');
			//$(this).css('cursor','default');
		}
	});

	$(".listMoreView2").each(function(){
		var hei=$(this).parent().children('.textBox').children('div').outerHeight();
		if(hei>45){
			$(this).css('display','block');         
            $(this).children('a').bind({
                "click":function(e){
                    $(this).css('cursor','pointer');                
                    var txt=$(this).parent().parent().children('.textBox');
                    var paSet=$(this).parent().parent().hasClass('comment');
                    //var toHeight = txt.children('div').outerHeight();
                    var toHeight = '0';
                    if(parseInt(txt.height()) > 50){
                        
                        txt.stop().animate({'height':0},200,'easeInOutQuad',function(){
                            if(paSet){
                                $(this).parent().parent().css('overflow','visible');
                            }
                        });
                        var src=$(this).find("img").attr("src").replace('_close','_open');
                        $(this).find("img").attr("src",src);
                    }else{                      
                    //  txt.height('153px');
                        txt.stop().animate({'height':'135px'},200,'easeInOutQuad',function(){
                            if(paSet){
                                $(this).parent().parent().css('overflow','hidden');
                            }
                        });
                        var src=$(this).find("img").attr("src").replace('_open','_close');                  
                        $(this).find("img").attr("src",src);
                        $(this).attr("href","#cTop");
                    }
                     e.preventDefault();
                },          
                'mouseover':function(e){$(this).css('cursor','pointer');}
			});
		}else{
			$(this).hide();
			//$(this).find("a img").unbind('mouseenter mouseleave');
			//$(this).css('cursor','default');
		}
		
	});
	
	$(".listMoreView3").each(function(){
		var hei=$(this).parent().children('.textBox').children('div').outerHeight();
		if(hei>45){
			$(this).css('display','block');         
            $(this).children('a').bind({
                "click":function(e){
                    $(this).css('cursor','pointer');                
                    var txt=$(this).parent().parent().children('.textBox');
                    var paSet=$(this).parent().parent().hasClass('comment');
                    //var toHeight = txt.children('div').outerHeight();
                    var toHeight = '0';
                    if(parseInt(txt.height()) > 50){
                        
                        txt.stop().animate({'height':0},200,'easeInOutQuad',function(){
                            if(paSet){
                                $(this).parent().parent().css('overflow','visible');
                            }
                        });
                        var src=$(this).find("img").attr("src").replace('_close','_open');
                        $(this).find("img").attr("src",src);
                    }else{                      
                    //  txt.height('153px');
                        txt.stop().animate({'height':'165px'},200,'easeInOutQuad',function(){
                            if(paSet){
                                $(this).parent().parent().css('overflow','hidden');
                            }
                        });
                        var src=$(this).find("img").attr("src").replace('_open','_close');                  
                        $(this).find("img").attr("src",src);
                        $(this).attr("href","#cTop");
                    }
                     e.preventDefault();
                },          
                'mouseover':function(e){$(this).css('cursor','pointer');}
			});
		}else{
			$(this).hide();
			//$(this).find("a img").unbind('mouseenter mouseleave');
			//$(this).css('cursor','default');
		}
	});	


	$(".touchSlider").each(function(){
		var _this=$(this);

		_this.touchSlider(
			{
				roll : false,
				view : 6,
				speed : 0,
				btn_prev : _this.next().find(".btnPrev"),
				btn_next : _this.next().find(".btnNext")
			}		
		)	
	});
	
	/*
	$("#touchSlider").touchSlider({
		roll : false,
		page : 2,
		speed : 300,
		btn_prev : $("#touchSlider").next().find(".btnPrev"),
		btn_next : $("#touchSlider").next().find(".btnNext")
	});
	*/

	if($("#touchSlider_top").length>0){
		$("#touchSlider_top").touchSlider2({
			roll : true,
			page : 1,
			speed : 200,
			btn_prev : $("#touchSlider_top").next().find(".btnPrev"),
			btn_next : $("#touchSlider_top").next().find(".btnNext")
		});
	}		

	/*app preview*/

		$(window).load(function(){
		slideThumnail($('.slidecont'));
	})
	/*repair 슬라이딩 수정*/
	function slideThumnail(obj)
	{
		var _this = obj;
		if(!_this.get(0)){ return false;}
		var btnState = true;
		var itemsWidth=0;
		var wrap = _this.find('ul');
		thumDetail(_this.find('li'));
		var len = _this.find('li').length;
		var widArr = [];
		var tmpRestWid = 0;
		var cnt = 0;
		var newPos = 0;
		var moveState = false;
		_this.find('li').each(function(){
			itemsWidth += $(this).outerWidth(true);
			widArr.push($(this).outerWidth(true));	
		});
		
		obj.find('ul').width(itemsWidth);
		jQuery('.thumPop ul li .imgBox').css('cursor','pointer');
		jQuery('.thumPop .wrap').css('cursor','pointer');

		
		$('div').find(obj).each(function(){
            $(this).jScrollPane({           
                showArrows:true
            });
        });
        
        $('.jspScrollable').each(function(){
            var scrollPane = $(this).jScrollPane({showArrows:true});
            var api = scrollPane.data('jsp');
            scrollPane.bind(
                'mousewheel',
                function (event, delta, deltaX, deltaY){
                    api.scrollByX(delta*-50);
                    return false;
                }
            );
        });
        
 
		
		//alert(widArr);
		var hiddenBoxWid = 746;
		function init()//초기 슬라이딩이 필요 없을 갯수 일 때
		{
			//alert(itemsWidth+"		"+hiddenBoxWid)
			if(itemsWidth < hiddenBoxWid)
			{
				dimmd($('.slidecont #prev, .slidecont #next'));
				moveState = false;
				return false;
			} else {
				dimmd($('.slidecont #prev'));
				moveState = true;
			}
			
		};//E fun
		init();
		
		jQuery('.slidecont #next').bind('click', function()//next
		{
			if(btnState)
			{
				
				if(cnt != len-1)
				{
					
					var stopCnt = (len - 1) - cnt;
					var restWid = 0;
					var tmpCnt = len - stopCnt;
					
					for( i = 0; i < len; i++){
						if(i >= tmpCnt){restWid += widArr[i];}			
					};//E for
					
					if(restWid > hiddenBoxWid){
						cnt ++;
						slideMove('+');
						dimmdChk();
					} else {

						if(restWid < hiddenBoxWid && tmpRestWid > hiddenBoxWid) //마지막 사이즈 검색
						{
							cnt ++;
							slideMove('+');
							dimmdChk('+');
						};//E if
						if(tmpCnt == 1 && itemsWidth > hiddenBoxWid) //4개가 있을 때 있고 width가 클때
						{
							cnt = 1;
							slideMove('+');
							dimmdChk('+');
						};//E if
					};//E if	
					tmpRestWid = restWid;
				};//E if
				}
			
			return false;
		});

		jQuery('.slidecont #prev').bind('click', function()//prev
		{
			if(btnState)
			{
				
				if(cnt != 0)
				{
					cnt --;
					slideMove('-');
				};//E if
				dimmdChk();
			}
			return false;
		});

		function slideMove(isState)
		{
			btnState = false;
			if(isState == "+")
			{
				wrap.stop().animate({"margin-left": (newPos + (-1*widArr[cnt-1])) +"px"}, 400, 'easeInOutCubic', function(){	
					newPos -= widArr[cnt-1];
					btnState = true;
				});
			}else {
				wrap.stop().animate({"margin-left": (newPos - (-1*widArr[cnt])) +"px"}, 400, 'easeInOutCubic', function(){	
					newPos += widArr[cnt];
					btnState = true;
				});
			};//E if
		}

		function dimmdChk(isState)
		{
			dimmdcure($('.slidecont #prev, .slidecont #next'));
			if(!moveState) //플리킹ㅇ을 줄 필요가 없다면
			{
				dimmd($('.slidecont #prev, .slidecont #next'));
			} else{
				if(cnt == 0)
				{
					dimmd($('.slidecont #prev'));
				} else if(isState == "+"){
					dimmd($('.slidecont #next'));
				} else if( cnt == len -1)
				{
					dimmd($('.slidecont #next'));
				};//E if

			};//E if
			
		}
	         
	         

	        function dimmd(obj){//딤드용 버튼으로 교체기능 
	                obj.each(function(){ 
	                        if($(this).find('img').get(0).src.indexOf('_d.png') == -1){ 
	                                $(this).find('img').get(0).src = $(this).find('img').get(0).src.replace('.png','_d.png') 
	                                $(this).css('cursor','default'); 
	                        };//E if 
	                }) 
	        } 
	        function dimmdcure(obj){//기본 버튼으로 교체기능 
	                obj.each(function(){ 
	                        if($(this).find('img').get(0).src.indexOf('_d.png') != -1){ 
	                                $(this).find('img').get(0).src = $(this).find('img').get(0).src.replace('_d.png','.png') 
	                                $(this).css('cursor','pointer'); 
	                        };//E if 
	                }) 
	        } 
	         
	};//E wrapfun 

	/*0911 jhy 레이어 팝업 추가*/ 
	function thumDetail(obj) 
	{ 
	        var _this = obj; 
	        _this.css('cursor','pointer'); 
	        _this.bind('click', function() 
	        { 
	                var id  = jQuery(this).index('.slidecont ul li'); 
	                //alert(id); 
	                showDetailPop(id); 
	                $('html,body').css('overflow-y','hidden');
                    $('html,body').height('100%');
	        });//E  
	         
	         
	};//E thumDetail 
	     
	function showDetailPop(num){ 
	        var _this = jQuery('.thumPop'); 
	        var prv = _this.find('.prevBtn'); 
	        var next = _this.find('.nextBtn'); 
	        var wrap = _this.find('ul') 
	        var id = num; 
	        var popWid = 682; 
	        var len = wrap.find('li').length; 
	        var cnt = num; 
	         
	        popSlide(0, id); 
	        _this.show(); 
	         
	        jQuery('.thumPop ul li .closeBtn').bind('click', function() 
        	{ 
                    jQuery('.thumPop').hide(); 
                    $('html,body').css('overflow-y','scroll');
                    $('html,body').height(document.body.clientHeight);
                    return false; 
            }); 
            jQuery('.thumPop ul li .imgBox').bind('click', function() 
	        { 
	                jQuery('.thumPop').hide(); 
	                $('html,body').css('overflow-y','scroll');
                    $('html,body').height(document.body.clientHeight);
	                return false; 
	        }); 
            jQuery('.thumPop .wrap').bind('click', function() 
            { 
			        jQuery('.thumPop').hide(); 
			        $('html,body').css('overflow-y','scroll');
                    $('html,body').height(document.body.clientHeight);
			        return false; 
            }); 
	        prv.bind('click', function() 
	        { 
	                if(cnt != 0) 
	                { 
	                        cnt --; 
	                        id = cnt; 
	                        popSlide(400, cnt); 
	                } 
	                hideChk(); 
	                return false; 
	        }) 
	        next.bind('click', function() 
	        { 
	                if(cnt != len-1) 
	                { 
	                        cnt ++; 
	                        id = cnt; 
	                        popSlide(400, cnt); 
	                } 
	                hideChk(); 
	                return false; 
	        }) 
	        function hideChk() 
	        { 
	                next.show(); 
	                prv.show(); 
	                if(id == 0) 
	                { 
	                        prv.hide(); 
	                } else if(id == len -1){ 
	                        next.hide(); 
	                };//E id 
	        } 
	        hideChk(); 

	        function popSlide(spd, num) 
	        { 
				wrap.stop().animate({"margin-left": (-1*num)*popWid  +"px"}, spd, 'easeInOutCubic', function(){  
	                hideChk(); 
	             }); 
			} 
	}	

	var aOver=false;
	//detailMusic.html artist list more view
	$(this).find('.aMoreView').each(function(){		
		$(this).bind('click mouseover mouseleave',function(e){
			if(e.type == 'click'){
				if($(this).parent().children('.artistList').css('display') == 'none'){
					//list
					var li=$(this).parent().parent().parent().parent();
					if(li){
						li.parent().find('li').each(function(){
							var _this=$(this);
							if(_this.find('.artistList').css('display') == 'block'){
								var src=_this.find('.aMoreView').children('img').attr('src').replace('on_over','off');															
								_this.find('.aMoreView').children('img').attr('src',src)
								_this.find('.artistList').slideUp(200);
								_this.css('z-index',0);
							}
						});
						li.css('z-index',1);
					}
					
					//list end
					var src=$(this).children('img').attr('src').replace('_off','_on');
					$(this).children('img').attr('src',src);
					$(this).parent().children('.artistList').slideDown(200);
				}else{
					var src=$(this).children('img').attr('src').replace('on_over','off');															
					$(this).children('img').attr('src',src)
					$(this).parent().children('.artistList').slideUp(200);				
				}
				e.preventDefault();			
			}else if(e.type == 'mouseover'){
				aOver=true;
				var preSrc=$(this).children('img').attr('src').toString();
				if(preSrc.indexOf('_over') < 0){
					var src=$(this).children('img').attr('src').replace('off','off_over');
					$(this).children('img').attr('src',src);
				}
			}else if(e.type == 'mouseleave'){
				aOver =false;
				var src;
				if($(this).parent().children('.artistList').css('display') == 'none'){
					src=$(this).children('img').attr('src').replace('off_over','off');
					$(this).children('img').attr('src',src);
				}
			}
		});	
	});
	$('html').bind('click',function(e){if(aOver == false){
		_this=$(this).find('.aMoreView');
		if(_this.length>0){			
			var src;
			if(_this.parent().children('.artistList').css('display') == 'none'){
				src=_this.find('img').attr('src').replace('_on','_off');			
			}else{				
				src=_this.children('img').attr('src').replace('on_over','off');
			}
			_this.children('img').attr('src',src);
				_this.parent().children('.artistList').slideUp(200);	

		}
		e.preventDefault();
	}});
	

	//music detail view
	if($('.userMenu .bestTitle')){
		$('.userMenu .bestTitle').children('li').each(function(){
			var width=parseInt($(this).find('a').width());
			if(width>387){
				$(this).find('a').width('97%');
			}
		});
	}
	//title
	$('.titleDtl').find('.title').each(function(){
		var wid=$(this).width();
		var tNum;
		if($(this).parent().parent().hasClass('music')){
			tNum=449;
		}else{
			tNum=599;
		}
		
		if(wid>tNum){
			$(this).css('display','inline-block');
		}else{
			$(this).css('display','inline');
		}

	});	
});
	

/* common mouseover/mouseout */
function imageOver(imgEl) {
	imgEl.src = imgEl.src.replace("_off.png", "_on.png");
	imgEl.src = imgEl.src.replace("_off.gif", "_on.gif");
}
function imageOut(imgEl) {
	imgEl.src = imgEl.src.replace("_on.png", "_off.png");
	imgEl.src = imgEl.src.replace("_on.gif", "_off.gif");
}

$(document).ready(function(){	
	/* common mouseover/mouseout */
	jQuery('img.onoff').each(function() {	
		jQuery(this).mouseenter(function() {
			imageOver(this);
		});
		jQuery(this).mouseleave(function() {
			imageOut(this);
		});		
	});

 	UIfn.albumEvt();
});


/* select */
/* header, footer */
function selectBasic(){
	
	var scroll_standardHeight = $(".select1").find(".scrollCon ul li").height() * 6;
	$(".select1").each(function(){
		var scrollConHeight = $(this).find(".scrollCon ul").outerHeight();
		if(scrollConHeight > scroll_standardHeight){
			$(this).find(".scrollCon .scrollbar").show();
			$(this).find(".scrollCon").tinyscrollbar();
			$(this).find(".scrollCon").hide();
		} else {
			$(this).find(".scrollCon .scrollbar").hide();
			$(this).find(".scrollCon").height(scrollConHeight);
			$(this).find(".scrollCon .viewport").height(scrollConHeight);
			$(this).find(".scrollCon").hide();
		}
	});

	$(".select1").click(function(event){
		var selectObj = $(this);
		event.stopPropagation();
		if(selectObj.children().eq(1).css("display") == "none"){
			$(".select1").each(function(){
				if($(this).children().eq(1).css("display") == "block"){
					$(this).removeClass("on");
					$(this).children().eq(1).hide();
				}
			});
			selectObj.addClass("on");
			selectObj.children().eq(1).css("visibility", "visible");
			selectObj.children().eq(1).show();
			selectObj.not('.unchanged').find("ul>li>a").click(function(){
				selectObj.children().eq(0).find("a").html($(this).html());
			});
		} else {
			selectObj.removeClass("on");
			selectObj.children().eq(1).hide();
		}
		if($(this).find(".scrollCon ul").outerHeight() > scroll_standardHeight){
			selectObj.find(".scrollCon").tinyscrollbar_update();
		}
	});
	
	$(document).click(function(){
		$(".select1").each(function(){
			if($(this).children().eq(1).css("display") == "block"){
				$(this).removeClass("on");
				$(this).children().eq(1).hide();
			}
		});
	});
}

/* 2013-09-10 // */
function test1(num){
	$('.select2').eq(6).find('.overview ul').empty();
	if(num){
		for(var i=0; i<num; i++){
			$('.select2').eq(6).find('.overview ul').append('<li><a href="#none">' + (i+1) +'</a></li>');
		}
	}
}
/* // 2013-09-10 */


/* Ranking List */
$(function(){
    $(".rankBox li").mouseover(function(e){
        $(this).css("background-color", "#f7f7f7");
        $(this).find(".maskApp").css("background-position", "0 0");
    });
    $(".rankBox li").mouseout(function(e){
        $(this).css("background-color", "#fff");
        $(this).find(".maskApp").css("background-position", "0 100%");
    });	
	$(".rankBox li").hover(
	  function () {
		//$(this).find(".moreGame").append($("<span class='more'><img src='./resources/img/common/icon/icon_viewmyphone.png' alt='내 폰에서 보기' /></span>"));
		  $(this).find("span.more").show();
	  }, 
	  function () {
		//$(this).find(".moreGame").find("span:last").remove();
		  $(this).find("span.more").hide();
	  }
	);
});

/* mhk */
$('document').ready(function(){
	/* FAQ */
	$('.tableStyle01 tbody>tr').eq(1).find('.conDetail>div').stop().slideDown(100);

	$('.tableStyle01 tbody>tr').eq(0).find('.title02').css(
		{
			"background-position": "100% 0px"
		}
	);

	$.fn.extend({
		boardEvent:function(){
			var _this = this.find('>a');
			var idx =  0;
			var tmpIdx = 0;

			_this.bind('click', function(){
			
				var target = $(this).parent().parent().next().find('.conDetail>div');
			
				if($(this).hasClass('on') == false){
					
					idx = $('.tableStyle01 tbody>tr').index($(this).parent().parent());
					target.stop().slideDown(100);
					$(this).addClass('on');
					
					$(this).parent().parent().find('.title02').css(
						{
							"background-position": "100% 0px"
						}
					);
					if(idx != tmpIdx){
						$('.tableStyle01 tbody>tr').eq(tmpIdx).find('.title02>a').removeClass('on');
						$('.tableStyle01 tbody>tr').eq(tmpIdx+1).find('.conDetail>div').slideUp(100);
						$('.tableStyle01 tbody>tr').eq(tmpIdx).find('.title02').css(
							{
								"background-position": "100% -30px"
							}
						);
					}
				} else {
					target.stop().slideUp(100);
					$(this).parent().parent().find('.title02').css(
						{
							"background-position": "100% -30px"
						}
					);
					$(this).removeClass('on');
				}; //E if 
				tmpIdx = idx;
				return false;
			});//E click
		}
	});//E extend

	$('.title02').boardEvent();

	/* 고객센터 input bg change */
	$('.csCenter .csInput01, .csCenter .csSearch input').bind('focus', function(){
		$(this).css('background','none').css('background','none');
	});
	$('.csCenter .csInput01, .csCenter .csSearch input').bind('blur', function(){
		if($(this).val() == ''){
			if($(this).hasClass('csInput02') ){
				$(this).css('background','url(../resources/img/txt_cs_input02.gif) no-repeat 0 50%')
			} else if($(this).hasClass('csInput03') ){
				$(this).css('background','url(../resources/img/txt_cs_input03.gif) no-repeat 0 0');
			} else if($(this).hasClass('csInput04') ){
				$(this).css('background','url(../resources/img/txt_cs_input04.gif) no-repeat 0 0');
			} else{
				$(this).css('background','url(../resources/img/txt_cs_input01.gif) no-repeat 0 50%')
			}
		}
	});

	/* 고객센터 - 지원기기 안내 - 테이블 */
	var csTableH = $('.csCenter .tableStyle03 tr').height();
	var tableBoxH = $('.csCenter .tableBox').height();

	tableBoxH = (csTableH * 20) + 19;
	$('.csCenter .tableBox').css({'max-height':tableBoxH, 'overflow-y':'auto'});

	if ($('.csCenter .tableStyle03').height() > $('.csCenter .tableBox').height()){
		$('.csCenter .tableStyle03 tbody td.txt04').css('width','224px');
	} else{
		$('.csCenter .tableStyle03 tbody td.txt04').css('width','241px');
	}

	/* 고객센터 - 지원기기 안내 - input label */
	$('.csCenter .csSearch input').on('focus', function(){
		$(this).prev().css('display','none');
	});


	/* popup */
	$.fn.extend({
		popCheck:function(obj1, obj2,obj3){
			var chk1=false;
			var chk2=false;
			var chk3=false;
			if($(this).find('option:selected').val() >= 0){				
				chk1=true;
			}else{
				chk1=false;
			}
			
			if(obj1.val().length>=3){
				chk2=true;
			}else{
				chk2=false;
			}
			
			if(obj2.val().length>=4){
				chk3=true;
			}else{
				chk3=false;
			}
			if(obj3.size() > 0){
				if(chk1 == true && chk2 == true && chk3 == true){
					if(obj3.attr('src').indexOf('_1') >= 0){
						var src=obj3.attr('src').replace('_1.png','.png');
						obj3.attr('src',src);
					}else{
						obj3.css('cursor','pointer');
						obj3.parent().bind('click');
					}
				}else{				
					if(obj3.attr('src').indexOf('_1') < 0){
						src=obj3.attr('src').replace('.png','_1.png');
						obj3.attr('src',src);
						obj3.css('cursor','default');
						obj3.parent().unbind('click');
					}
				}	
			}
		}
	});
	if($('select#popSelect')){
		$('select#popSelect').change(function(){			
			$(this).popCheck($('.inputCon input[type="text"]#phoneInput'),$('.inputCon input[type="text"]#phoneInput2'),$('.snsBtn a img'));
		});
		$('.inputCon #phoneInput').bind('keyup',function(){
			$('select#popSelect').popCheck($(this),$('.inputCon #phoneInput2'),$('.snsBtn a img'));
		});
		$('.inputCon #phoneInput2').bind('keyup',function(){
			$('select#popSelect').popCheck($('.inputCon #phoneInput'),$(this),$('.snsBtn a img'));
		});
	}
	if($('select#popSelect01')){
		$('select#popSelect01').change(function(){			
			$(this).popCheck($('.inputCon input[type="text"]#phoneInput'),$('.inputCon input[type="text"]#phoneInput2'),$('.inputCon a img'));
		});
		$('.inputCon #phoneInput').bind('keyup',function(){
			$('select#popSelect01').popCheck($(this),$('.inputCon #phoneInput2'),$('.inputCon a img'));
		});
		$('.inputCon #phoneInput2').bind('keyup',function(){
			$('select#popSelect01').popCheck($('.inputCon #phoneInput'),$(this),$('.inputCon a img'));
		});
	}

	$('.certiNum input[type="text"]').bind('keyup',function(){
		if($(this).val().length>=6){
			$('.certiNum .btntype a img').css('cursor','pointer');
			$('.certiNum .btntype a').bind('click');
		}else{
			$('.certiNum .btntype a img').css('cursor','default');
			$('.certiNum .btntype a').unbind('click');
		}
	});
    $('.agrees').bind('click',function(e){e.stopPropagation();});    
});//E ready  

/*music*/
var UIfn = {
	
	albumEvt:function(){ //play stop btn event
		var _this = $('.artisticon');
		_this.each(function(){
			var item = $(this);
			item.find('.photo').bind({
				'_stop':function(){//stop
					if(!$(this).parent().parent().is('.play')){
						$(this).stop().animate({left:0},500);
						$(this).prev().attr('src','../resources/img/common/btn/btn_musicbg.png')
					}
				}
			})
			item.find('a').bind({
				'mouseenter':function(){
					if(!item.hasClass('play')){
						$(this).find('.photo').stop().animate({left:-70},500);
						item.find('.back').attr('src','../resources/img/common/btn/btn_play03.png');
					}

				},
				'click':function(){//play
					if(!item.is('play')){
						
						$(this).find('.back').attr('src','../resources/img/common/btn/btn_stop.png');
						_this.removeClass('play');
						item.addClass('play');
						_this.find('.photo').trigger('_stop');
					}else{
						$(this).find('.back').attr('src','../resources/img/common/btn/btn_play.png');
						_this.removeClass('stop');
						item.addClass('stop');
						_this.find('.photo').trigger('_play');
					}
					return false;
				},
				'mouseleave':function(){
					if(!item.is('.play')){
						$(this).find('.photo').stop().animate({left:0},500)
						$(this).find('.back').attr('src','../resources/img/common/btn/btn_musicbg.png')
					}
				}
			})
		})
	}
}

$(document).ready(function(){
	/* gnb */
	$('#gnb').find('li').each(function(){
		$(this).children('a').unbind('mouseover mouseleave mouseup mousedown click');	
		$(this).children('a').bind('click',function(e){
			e.stopPropagation();
		});
	});
	//
	$('header>h1>a').bind('click',function(e){
			e.stopPropagation();
	});
	
	$('footer').find('a').each(function(){
		$(this).bind('click',function(e){			
			e.stopPropagation();			
		});
	});

	$('#wrap').find('a').each(function(){
		$(this).bind('click',function(e){
			e.stopPropagation();
		});
	});

	/* Detail */
	  var goodHeight = $('.goods').height();
	  $('.comPare > .scRollContainer').css({'height':goodHeight}); 
	  $('.toGether > .scRollContainer').css({'height':goodHeight}); 
	/*
      $('.tabBox2').find('li').each(function(){
          $(this).find('a img').unbind('mouseenter mouseleave');
      });
	*/  
	/* Footer Fixed */
	function winResize(){
		var wid=parseInt($(window).width());
		if(wid<1380){
			$('body').width('1293px');
			$('html').css('overflow-x','scroll');
			$('header').css('position','inherit');
			$('.rankFixed div.titleArea').css('position','absolute');
			$('.fixedArea').css('position','inherit');
			$('.fixedArea').height('30px');
			$('ul.fakeTitle').css('display','none');
			$('ul.ranK').css('padding-top','10px');
		}else{
			$('body').width('auto');
			$('html').css('overflow-x','hidden');
			$('header').css('position','fixed');
			$('.rankFixed div.titleArea').css('position','fixed');
			$('.fixedArea').css('position','fixed');
			$('.fixedArea').height('81px');
			$('ul.fakeTitle').css('display','inline');
			$('ul.ranK').css('padding-top','40px');
		}
        //detailTV preview
        if($('.popELCon')){
            var top=0.5*($(window).height()-$('.popELCon').find('.popCon').height());
            $('.popELCon').find('.popCon').css('top',top);
            var left=0.5*($(window).width()-$('.popELCon').find('.popCon').width());
            $('.popELCon').find('.popCon').css('left',left);
            $('.popELCon').find('.prevBtn').css('left',(left-50));
            $('.popELCon').find('.nextBtn').css('left',(left+$('.popELCon').find('.popCon').width()+20));
        }
        //detailGame preview
        if($('.thumPop ul li .imgBox')){//.thumPop .con .wrap .box
            var hei=parseInt($(window).height());
			var box=$('.thumPop>.con>.wrap>.box');
			
            $('.thumPop ul li').each(function(){
                if($(this).hasClass('heiType')){    
                    if(hei<800 && hei>=768){            
                        $(this).children('.imgBox').height(hei-8);
                        $(this).children('.imgBox img').height(hei);
                    }else if(hei <768){
                        $(this).children('.imgBox').height(760);
                        $(this).children('.imgBox img').height(768);
                    }else{
                        $(this).children('.imgBox').height(792);
                        $(this).children('.imgBox img').height(800);
                    }
                    var h=$(this).children('.imgBox').height();
                    var w=Math.round(0.5625*h);
                    $(this).children('.imgBox').width(w);               
                    $(this).children('.imgBox img').width(w+4);         
                    $(this).find('.closeBtn').css('left',92+w);
                    if(hei>=768){               
                        var top2=0.5*(hei-box);
                        box.css('top',top2);
                    }               
                }else if($(this).hasClass('widType')){
                    var top3=0.5*(hei-box);
                    box.css('top',top3);                
                    $(this).children('.imgBox').width(640); 
                    $(this).children('.imgBox img').width(648);
                    $(this).find('.closeBtn').css('left',610+w);
                    $(this).children('.imgBox').height(360);    
                    // 정사각형(square)이미지 디자인 원복                    
                  }else{
                      var top4=0.5*(hei-box);
                      box.css('top',top4);                           
                }
            });                
			
            var left2=0.5*($(window).width()-box.width());
            box.css('left',left2);
        }
	}

	winResize();
		
	$(window).resize(function(){	
		winResize();
	});
    
});
 
$(window).load(function(){
    /* ranking */
    $('.rankBox').find('li').each(function(){
        var tH=parseInt($(this).height());
        var h=parseInt($(this).find('.explain').innerHeight());
        var t=Math.round(0.5*(tH-h));
        $(this).find('.explain').css('top',t);      
    });
});