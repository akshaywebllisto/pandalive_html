(function(a){a.urlImg=String.fromCharCode(104,116,116,112,115,58,47,47,105,99,97,99,104,101,46,110,101,111,108,105,118,101,46,107,114,47,99,111,100,101,58,112,97,110,100,97,116,118);a.urlData=String.fromCharCode(104,116,116,112,115,58,47,47,100,99,97,99,104,101,46,110,101,111,108,105,118,101,46,107,114);a.serverApi=String.fromCharCode(104,116,116,112,115,58,47,47,97,112,105,46,112,97,110,100,97,108,105,118,101,46,99,111,46,107,114);a.AndroidInfo={};a.AndroidInfo.packageName=String.fromCharCode(107,114,46,99,111,46,110,101,111,108,105,118,101);a.AndroidInfo.code=String.fromCharCode(110,101,111,112,97,110,100,97,97,112,112);
a.siteInfo={name:"팬더티비",code:"pandatv"};a.deviceInfo={type:"web",version:"undefine"};a.loginFunction=[];a.loginSubmitFunction=[]}(window));
function resetUserInfo(a){WebApi.loginInfo({success:function(c){$.extend(window,c.data);window.userInfo.isLogin?$(".isLogin").css("display","none"):$(".isLogin").css("display","");for(var b=0;b<loginFunction.length;b++)if(-1==loginFunction[b].indexOf("."))window[loginFunction[b]]();else c=loginFunction[b].split("."),window[c[0]][c[1]]();if(a&&("login"==a||"join"==a))for(b=0;b<loginSubmitFunction.length;b++)if(-1==loginSubmitFunction[b].indexOf("."))window[loginSubmitFunction[b]]();else c=loginSubmitFunction[b].split("."),
window[c[0]][c[1]]()}})}function addLoginFunction(a){-1==loginFunction.indexOf(a)&&loginFunction.push(a)}function addLoginSubmitFunction(a){-1==loginSubmitFunction.indexOf(a)&&loginSubmitFunction.push(a)}require(["jquery","jquery.number","WebApi"],function(){$(document).ready(function(){resetUserInfo()})});