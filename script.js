	var myString="Hello, My name is Kumar Ankit";
		var myString2="I am a Full Stack Web Developer and programming enthusiast. Check out my newly made portfolio! Feel free to ask anything at ku.ankit1997@gmail.com";
		var myArray=myString.split("");
		var myArray2=myString2.split("");
		var loopTimer,loopTimer2;
		function frameLooper(){
			if(myArray.length>0){
				document.getElementById("typing-intro").innerHTML+=myArray.shift();
			}
		else{
			clearTimeout(loopTimer);
		}
		loopTimer=setTimeout('frameLooper()',50);
		}
		
		function frameLooper2(){
			if(myArray2.length>0){
				document.getElementById("typing-intro2").innerHTML+=myArray2.shift();
			}
			else{
				clearTimeout(loopTimer2);
			}
		loopTimer2=setTimeout('frameLooper2()',90);
		}
		
		frameLooper();
		setInterval(frameLooper2,2000);

$(".condition-btn").click(function(){
	$(".para").addClass("para-show");
});			
