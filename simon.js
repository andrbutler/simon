var compArr = [];
var sRed = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var sBlue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var sYellow = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var sGreen = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var sWrong = new Audio('wrong.mp3');
var strict = false;
var repeat = false;
var num;
var clickable = false;
var time = 1100;
var turn = 0;
/*
1 == red
2 == blue
3 == yellow
4 == green*/
function start(){
	sWrong.pause();
	$('.turn').text('--');
	repeat = false;
	num = 0;
	turn = 0;
	time = 1100;
	clickable = false;
	compArr = [];
	compTurn();
}
function compTurn(){
	sWrong.pause();
	clickable = false;
	if(repeat == false){
	var x= Math.floor((Math.random() * 4)+1);
	compArr.push(x);
	turn++
	}
	var i = 0;
	function t(){
		switch(compArr[i]){
			case 1:
				sRed.play();
				$('.red').addClass('ct').delay(700).queue(function(){
				$(this).removeClass('ct').dequeue();
				});
				break;
			case 2:
				sBlue.play();
				$('.blue').addClass('ct').delay(700).queue(function(){
				$(this).removeClass('ct').dequeue();
				});
				break;
			case 3:
				sYellow.play();
				$('.yellow').addClass('ct').delay(700).queue(function(){
				$(this).removeClass('ct').dequeue();
				});
				break;
			case 4:
				sGreen.play();
				$('.green').addClass('ct').delay(700).queue(function(){
				$(this).removeClass('ct').dequeue();
				});
				break;
			}
		i++;
		//debug $('.comp').text(compArr);
		if(i <= compArr.length){
			setTimeout(t, time);
		}else if(i > compArr.length){
			repeat = false;
			//debug $('.player').text('');
			num = 0;
			$('.turn').text(turn);
			setTimeout(playerTurn, 700);
		}
	}
	t();
}
function playerTurn(){
	clickable = true;
	
	if(num == 7){
		time = 900;
	}
	if(num == 14){
		time = 700;
	}
	if(num == 20){
		repeat = false;
		num = 0;
		time = 1200;
		clickable = false;
		compArr = [];
		return alert('win!')
	}
	if(num == compArr.length){
		return setTimeout(compTurn, time);}
	
}
	$('.red').mousedown(function(){
		if(clickable == true){
		//debug $('.player').append(1);
		sRed.play();
		$(this).addClass('ct');
		}
	});
	$('.red').mouseup(function(){
		if(clickable == true){
		$(this).removeClass('ct');
		clickable = false;
		return compare(1);
		}
		});
	$('.blue').mousedown(function(){
		if(clickable == true){
		//debug $('.player').append(2);
		sBlue.play();
		$(this).addClass('ct');
		}
	});
	$('.blue').mouseup(function(){
		if(clickable == true){
		$(this).removeClass('ct');
		clickable = false;
		return compare(2);
		}
		});
	$('.yellow').mousedown(function(){
		if(clickable == true){
		//debug $('.player').append(3);
		sYellow.play();
		$(this).addClass('ct');
		}
	});
	$('.yellow').mouseup(function(){
		if(clickable == true){
		$(this).removeClass('ct');
		clickable = false;
		return compare(3);
		}
		});
	$('.green').mousedown(function(){
		if(clickable == true){
		//debug $('.player').append(4);
		sGreen.play();
		$(this).addClass('ct');
		}
	});
	$('.green').mouseup(function(){
		if(clickable == true){
		$(this).removeClass('ct');
		clickable = false;
		return compare(4);
		}
		});

function compare(input){
	
	if(input != compArr[num]){
		$('.turn').text('!!');
		sWrong.play();
		repeat = true;
		if(strict == true){
			return setTimeout(start, 1000);
		}
		return setTimeout(compTurn, 1000);
	}else if(input == compArr[num]){
		num++;
		playerTurn();
	}
		
}
$('.start').on('click', start);
$('.strict').on('click',function(){
	if(strict == true){
		strict = false;
		$('.light').removeClass('ct');
	}else if(strict == false){
		strict = true;
		$('.light').addClass('ct');
	}
});