// 公共方法库

// 生成ID
var jschars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
function generateMixed(n) {
  var res = "";
  for(var i = 0; i < n ; i ++) {
    var id = Math.ceil(Math.random()*61);
    res += jschars[id];
  }
  return res;
}

//获取指定时间0:0:0的时间戳
window.getNowDate = function(data){
	if(data){
		var date = new Date(data); //获取当前Date对象
	}else{
		var date = new Date(); //获取当前Date对象
	}
	//var date = new Date('2020/10/10 11:22:33'); //获取指定时间的Date对象，这里只能用"2020/10/10"格式，其他格式如"2020-10-10"浏览器兼容性不好
	date.setHours(0);
	date.setMinutes(0);
	date.setSeconds(0);
	date.setMilliseconds(0);
	return (date.getTime()/1000)
}