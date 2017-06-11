	
		var canvas=document.getElementById("mycanvas");
		var ctx=canvas.getContext("2d");
		// first lets create a square of red color 
		// ctx.beginPath();
		//everything will be in between .beginPath and .closePath
		// ctx.rect(20,40,150,180);//first two to specify top left corner of the rectange, next two for width and height of rectangle
		// ctx.fillStyle="#FF0000";
		// ctx.fill();//method to paint the square
		// ctx.closeaPth();

		// now lets draw circle using the same method
		// ctx.beginPath();
		// ctx.arc(240, 160, 100, 0, Math.PI*2, false);
		// ctx.fillStyle="green";
		// ctx.fill();
		// ctx.closePath();

		// ctx.beginPath();
		// ctx.rect(20,60,150,150);
		// ctx.fillStroke="blue";
		// ctx.stroke();
		// ctx.closePath();

		//now lets do the actual part that was just for practice
		// Technically, we will be painting the ball on the screen, clearing it and then painting it again in a slightly different position every frame to make the impression of movement — just like how movement works with the movies

		var x=canvas.width/2;
		var y=canvas.height-30;
		var dx=2;
		var dy=-2;
		var ballRadius=10;
		var paddleHeight=10;
		var paddleWidth=75;
		var paddleX=(canvas.width-paddleWidth)/2;

		var rightPressed=false;
		var leftPressed=false;
		//for the bricks to be added
		
		var brickRowCount=3;
		var brickColumnCount=5;
		var brickWidth=75;
		var brickHeight=20;
		var brickPadding=10;
		var brickOfffsetTop=30;
		var brickOffsetLeft=30;
		var c,r;
		var bricks=[];
		var score=0;
		for(c=0;c<brickColumnCount;c++){
			bricks[c]=[];
			for(r=0;r<brickRowCount;r++){
				bricks[c][r]={x:0,y:0,status:1};
			}
		}
		function drawBrick(){
			for(c=0;c<brickColumnCount;c++){
				for(r=0;r<brickRowCount;r++){
					if(bricks[c][r].status==1){
					brickX=(c*(brickWidth+brickPadding)+brickOffsetLeft);
					brickY=(r*(brickHeight+brickPadding)+brickOfffsetTop);
					bricks[c][r].x=brickX;
					bricks[c][r].y=brickY;

					ctx.beginPath();
					ctx.rect(brickX,brickY,brickWidth,brickHeight);
					ctx.fillStyle="black";
					ctx.fill();
					ctx.closePath();
					}
				}
			}
		}
		
		function drawBall(){
		ctx.beginPath();
		ctx.arc(x,y,ballRadius,0,Math.PI*2);//first two are for co-ordinate of the center of the arc,3rd is for the radius of the arc,4th is for starting radians in degree and 5th is final degree in radians
		ctx.fillStyle="blue";
		ctx.fill();
		ctx.closePath();
		}
		function drawPaddle(){
			ctx.beginPath();
			ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
			ctx.fillStyle="black";
			ctx.fill();
			ctx.closePath();
		}
		document.addEventListener("keydown",keyDownHandler,false);
		document.addEventListener("keyup",keyUpHandler,false);

		function draw(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		drawBall();
		drawBrick();
		drawPaddle();
		drawScore();
		collisionDetection();
		if(y+dy<0+ballRadius){
			//for top
			dy=-dy;
		}
		else if(y+dy>=canvas.height-ballRadius) {
			//for bottom
			if(x>=paddleX && x<=paddleX+paddleWidth){
				dy=-dy-0.5;

			}
			else{
			// alert("Game Over!");
			document.location.reload();
			}
		}
		else if(x+dx<0+ballRadius || x+dx>=canvas.width-ballRadius){
			// for left
			dx=-dx;
		}
		x=x+dx;
		y=y+dy;

		if(rightPressed && paddleX<canvas.width-paddleWidth){
			paddleX+=7;

		}

		else if(leftPressed && paddleX>0){
			paddleX=paddleX-7;

		}

		}
	
		function keyDownHandler(e){
			if(e.keyCode==39){
				rightPressed=true;
			}
			if(e.keyCode==37){
				leftPressed=true;
			}
		}
		function keyUpHandler(e){
			if(e.keyCode==39){
				rightPressed=false;
			}
			if(e.keyCode==37){
				leftPressed=false;
			}
		}

		function collisionDetection(){
			for(c=0;c<brickColumnCount;c++){
				for(r=0;r<brickRowCount;r++){
					var b=bricks[c][r];
					if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight && b.status==1){
						//when all 4 conditions are met then the direction of ball is changed
						dy=-dy;
						b.status=0;
						score++;
						if(score==brickColumnCount*brickRowCount){
							alert("Congrats, You won!!");
							document.location.reload();
						}
					}
				}
			}
		}
		function drawScore(){
			ctx.beginPath();
			ctx.font="16px Arial";
			ctx.fillStyle="Red";
			ctx.fillText("Score: "+score,200,20);
			ctx.fillText("/"+(brickColumnCount*brickRowCount),260,20);
			ctx.closePath();
		}
		setInterval(draw,10);
		//setInterval takes two parameters, 1st the function name and last the time in miliSecond
				//we measure the height of the rectangular canvas frame from the top-left that is the top is at the 0th position and the bottom is at height canvas.height