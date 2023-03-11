function getXMLhttprequest(){
			var xmlhttp;
			try{
				xmlhttp=new XMLHttpRequest();
			}catch(e){
				console.log("browser not support it");
			}
			return xmlhttp;
		}