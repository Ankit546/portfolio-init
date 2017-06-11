		var canvas=document.getElementById("mycanvas");
		var ctx=canvas.getContext("2d");
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
					ctx.fillStyle="#006E90";
					ctx.fill();
					ctx.closePath();
					}
				}
			}
		}
		
		function drawBall(){
		ctx.beginPath();
		ctx.arc(x,y,ballRadius,0,Math.PI*2);//first two are for co-ordinate of the center of the arc,3rd is for the radius of the arc,4th is for starting radians in degree and 5th is final degree in radians
		ctx.fillStyle="#F26430";
		ctx.fill();
		ctx.closePath();
		}
		function drawPaddle(){
			ctx.beginPath();
			ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
			ctx.fillStyle="#274156";
			ctx.fill();
			ctx.closePath();
		}
		document.addEventListener("keydown",keyDownHandler,false);
		document.addEventListener("keyup",keyUpHandler,false);

		function draw() {
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
				// alert("Game over");		
			document.getElementById("game-over").innerHTML="Game Over, Well played your score is: "+score;
			document.getElementById("btn").onclick=function(){
			document.location.reload();
			}

			
			// document.location.reload();
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
			ctx.fillStyle="red";
			ctx.fillText("Score: "+score,200,20);
			ctx.fillText("/"+(brickColumnCount*brickRowCount),270,20);
			ctx.closePath();
		}
		setInterval(draw,10);