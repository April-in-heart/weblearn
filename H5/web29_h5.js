var counter=0;
function myCounter(){
	counter++;
	postMessage(counter);//提交数据
	setTimeout(myCounter,1000);
}
myCounter();