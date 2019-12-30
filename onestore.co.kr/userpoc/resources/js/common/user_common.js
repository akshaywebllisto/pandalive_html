	var CONTEXT_PATH ="/userpoc";/// 해당 페이지에서 재정의 해서 사용
	var onImgErr182 = function(obj){
		obj.src = CONTEXT_PATH+"/resources/img/common/noImage182x182.png";

	}
	var onImgErr72 = function(obj){
		obj.src = CONTEXT_PATH+"/resources/img/common/img_phone02.gif";
	}
	
	var onImgErr151_220 = function(obj){
		obj.src = CONTEXT_PATH+"/resources/img/main/noImage.png";
	}
	
	var onImgErr166 = function(obj){
		obj.src = CONTEXT_PATH+"/resources/img/main/noImage.png";
	}
	
	var onImgErr166x166 = function(obj){
		obj.src = CONTEXT_PATH+"/resources/img/main/noImage166x166.png";
	}
	
	var onImgErr900x600 = function(obj){
		obj.src = CONTEXT_PATH+"/resources/img/common/noImage900x600.png";
	}
	
	
    var onImgErr600x400 = function(obj){
        obj.src = CONTEXT_PATH+"/resources/img/common/noImage600x400.png";
    }
    
    //상세페이지 공통 - 더보기 상품들 APP 
    var onImgErr80 = function(obj){
    	obj.src = CONTEXT_PATH+"/resources/img/common/noimg80x80.png";
    }
    var onImgErr238x423 = function(obj){
    	obj.src = CONTEXT_PATH+"/resources/img/common/noImage238x423.png";
    }
    //상세페이지 공통 - 더보기 상품들 MM 
    var onImgErr90 = function(obj){
    	obj.src = CONTEXT_PATH+"/resources/img/common/noimg90x128.png";
    }
	//상세>tv>screenshot tumbnail
    var onImgErr60 = function(obj){
    	obj.src = CONTEXT_PATH+"/resources/img/common/noimg60x60.png";
    }

	function getTimeStamp() {
	  var d = new Date();
	  var rdm = Math.floor(Math.random() * 1000) + 1;
	  var s =
	    leadingZeros(d.getFullYear(), 4) + '' +
	    leadingZeros(d.getMonth() + 1, 2) + '' +
	    leadingZeros(d.getDate(), 2) + '' +

	    leadingZeros(d.getHours(), 2) + '' +
	    leadingZeros(d.getMinutes(), 2) + '' +
	    leadingZeros(d.getMilliseconds(), 3)+''+rdm;

	  return s;
	}



	function leadingZeros(n, digits) {
	  var zero = '';
	  n = n.toString();

	  if (n.length < digits) {
	    for (i = 0; i < digits - n.length; i++)
	      zero += '0';
	  }
	  return zero + n;
	}
	
	/**
	 * 팝업 윈도우 공통모듈 윈도우 팝업 참조
	 */
	function popupWin(url, name, width, height) {
		var wi = screen.width - width;
		var hi = screen.height - height;
		
		if( wi < 0 ) wi = 0;
		if( hi < 0 ) hi = 0;
		
		var info = 'left=' + parseInt(wi/2) + ',top=' + parseInt(hi/2) + ',width='  + width + ',height=' + height + ',resizable=no, scrollbars=no,menubars=no,status=no';
		window.open(url, name, info);
	}
	

	//<script language="Javascript">document.write(setComma('<s:property value="#vStatModel.value.scrbCound"/>'));</script>
    function setComma(str)
    {
           str = ""+str+"";
           var retValue = "";
           for(i=0; i<str.length; i++)
           {
                   if(i > 0 && (i%3)==0) {
                           retValue = str.charAt(str.length - i -1) + "," + retValue;
                    } else {
                           retValue = str.charAt(str.length - i -1) + retValue;
                   }
           }
           return retValue;
    }
    
////////이미지 에러시 기본 이미지 //////////////////////////////
    var onImgErr73 = function(obj){
    	obj.src = CONTEXT_PATH+"/resources/img/common/noimg73x73.png";
    }
    var onImgErr73m = function(obj){
    	obj.src = CONTEXT_PATH+"/resources/img/common/noimg73x73m.png";
    }
    var onImgErr42 = function(obj){
    	obj.src = CONTEXT_PATH+"/resources/img/common/noimg42x42.png";
    }
	var onImgErr96 = function(obj){
		obj.src = CONTEXT_PATH+"/resources/img/common/noimg73x96.png";
	}
	var onImgErr106 = function(obj){
		obj.src = CONTEXT_PATH+"/resources/img/common/noimg73x106.png";
	}
////
	
    /**
	 * 이용통계 로그 시스템 쿠키생성 
	 * @return
	 */
	function setStatiCookies()
	{
		var todayDate = new Date(); 
		todayDate.setDate(todayDate.getDate() + 1000); 
		document.cookie = 'STAT_LOG' + "=" + escape(getTimeStamp()) + "; path=/; expires=" + todayDate.toGMTString() + ";"
		//document.cookie = 'STAT_LOG' + "=" + escape(getTimeStamp()) + "; path=/;"
	}    
	
    // 쿠키 생성
    function setCookie(cName, cValue){
    	if("" != cValue)
    		setCookieGB_stPrePageNm("stPrePageNm", GB_stPrePageNm);
    	var cDay="-1";
         var expire = new Date();
         expire.setDate(expire.getDate() + cDay);
         cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
         if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
         document.cookie = cookies;
    }
	
    // 이전페이지코드(세션값)을 쿠키로 설정
    function setCookieGB_stPrePageNm(cName, cValue){
    	var cDay="-1";
         var expire = new Date();
         expire.setDate(expire.getDate() + cDay);
         cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
         if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
         document.cookie = cookies;
    }
	    

    

	function getCookie( name ){ 
	    var nameOfCookie = name + "="; 
	    var x = 0; 
	    while ( x <= document.cookie.length ) 
	    { 
	            var y = (x+nameOfCookie.length); 
	            if ( document.cookie.substring( x, y ) == nameOfCookie ) { 
	                    if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) 
	                            endOfCookie = document.cookie.length; 
	                    return unescape( document.cookie.substring( y, endOfCookie ) ); 
	            } 
	            x = document.cookie.indexOf( " ", x ) + 1; 
	            if ( x == 0 ) 
	                    break; 
	    } 
	    return ""; 
	}    
	
	//쿠키 삭제 
	function delete_cookie ( cookie_name )
	{
		//alert("delete_cookie cookie_name="+cookie_name);
	  var expireDate = new Date ( );  // current date & time
	  expireDate.setDate( expireDate.getDate() - 1 );
	  document.cookie = cookie_name += "=; expires=" + expireDate.toGMTString();
	}	
	
 function pagingTemplatePrevNextInit()
 {
	 
	 //페이징 < 이전 버튼에 # => javascript:void(0) 로 변경    
	 $('.btnPrev a').each(function(){
		 if($(this).attr('href')=='#')
		 {
			 $(this).attr({
				 'href':"javascript:void(0)"
			 });
		 }
	 });
	 
	 //페이징 > 다음 버튼에 # => javascript:void(0) 로 변경 
	 $('.btnNext a').each(function(){
		 //alert($(this).attr('href'));
		 if($(this).attr('href')=='#')
		 {
			 $(this).attr({
				 'href':"javascript:void(0)"
			 });
		 }
	 });
	 
	 //페이징 > 현재페이지번호 버튼에 # => javascript:void(0) 로 변경 
	 $('.num a').each(function(){
		 //alert($(this).attr('href'));
		 if($(this).attr('href')=='#')
		 {
			 $(this).attr({
				 'href':"javascript:void(0)"
			 });
		 }
	 });
 }
 
 
 function replaceNumEng(sValue) 
 {
	var repStr=sValue;
	repStr=repStr.split("1").join("a");
	repStr=repStr.split("2").join("b");
	repStr=repStr.split("3").join("c");
	repStr=repStr.split("4").join("d");
	repStr=repStr.split("5").join("e");
	repStr=repStr.split("6").join("f");
	repStr=repStr.split("7").join("g");
	repStr=repStr.split("8").join("h");
	repStr=repStr.split("9").join("i");
	repStr=repStr.split("0").join("j");
	return repStr;
}