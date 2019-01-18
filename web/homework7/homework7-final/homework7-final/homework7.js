var second;
var minute;
var hour;
var Time="Time: 00:00:00";
var Step=0;
var CHECK = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
window.onload=function(){
	$("#Timer").text(Time);
	$("#StepCounter").text("Step: " + Step);
	localStorage.setItem("Tmin",Number.POSITIVE_INFINITY);
	localStorage.setItem("Smin",Number.POSITIVE_INFINITY);
	
	var MainArea = document.getElementById("Game");
	for(var i = 0;i < 16;i++){
		var block = document.createElement("div");
		block.className = "block"+i;
		block.id = "block"+i;
		$(block).click(move);
		MainArea.appendChild(block);
	}

	$("#Restart").click(Restart);
}
/*first We announce some function use to Make a New Jigsaw & Check Validty*/
function Verify(){
	var inverse = 0;
	for(var i=0;i < 16;i++)
		for(var j=i+1;j < 16;j++)
			if(CHECK[j]<CHECK[i])
				inverse ++;
	if(CHECK[15]==1||CHECK[15]==3||CHECK[15]==4||CHECK[15]==6||CHECK[15]==9||CHECK[15]==11||CHECK[15]==12||CHECK[15]==14)
		return inverse % 2;
	else
		return (inverse + 1) % 2;
}

function MakeaNewJigsaw(){
	do{
		CHECK.sort(function(a,b){
			return Math.random() > 0.5 ? -1 : 1;
		})
	}while(Verify()==false);

	for(var i=0;i < 16;i++)
		$("#Game").children()[i].className = "block" + CHECK[i];
}
/*Second We handle the move of block & Check whether Completed*/
function IsComplete(){
	for(var i=0;i < 16;i++){
		if(document.getElementById("block" + i).className != "block" + i)
			return;
	}
	alert("You win!");
	/*记录数据*/
	var newTime = hour * 3600 + minute * 60 + second;
	if(newTime < localStorage.getItem("Tmin")){
		localStorage.setItem("Tmin", newTime);
		var Second_String = second;
		var Minute_String = minute;
		var Hour_String = hour;
		if(second<10) Second_String = "0" + second;
		if(minute<10) Minute_String = "0" + minute;
		if(hour<10) Hour_String = "0" + hour;
		alert("A New Time Record: " + + Hour_String + ":" + Minute_String + ":" + Second_String);
	}
	if(Step < localStorage.getItem("Smin")){
		localStorage.setItem("Smin", Step);
		alert("A New Step Record:" + Step);
	}
	//Restart();
	clearInterval(Time);
	second = minute = hour = 0;
	Step = 0;
	$("#StepCounter").text("Step: 0");
}
function move(){
	var vacant = document.getElementById("block15");
	//对于此块判断是否与空白相邻（可以移动）
	if((Math.abs(vacant.offsetTop-this.offsetTop) == 85 && Math.abs(vacant.offsetLeft-this.offsetLeft)==0)
		|| (Math.abs(vacant.offsetLeft-this.offsetLeft) == 80 && Math.abs(vacant.offsetTop-this.offsetTop)==0)){
		//Position Switch By Using class .block
		var Vacant = vacant.className;
		vacant.className = this.className;
		this.className = Vacant;
		Step++;
		$("#StepCounter").text("Step: "+Step);
		IsComplete();
	}
}
/*重新开始*/
function Restart(){
	clearInterval(Time);
	second = minute = hour = 0;
	Step = 0;
	$("#StepCounter").text("Step: 0");
	Time = Timer(); 

	MakeaNewJigsaw();
}
/*Timer*/
function Timer(){
	return setInterval(function(){
		var Second_String = second;
		var Minute_String = minute;
		var Hour_String = hour;
		if(second<10) Second_String = "0" + second;
		if(minute<10) Minute_String = "0" + minute;
		if(hour<10) Hour_String = "0" + hour;
		$("#Timer").text("Time: " + Hour_String + ":" + Minute_String + ":" + Second_String);
		second ++;
		if(second == 60){
			second = 0;
			minute ++;
		}
		if(minute == 60){
			minute = 0;
			hour ++;
		}
		if(hour > 99){
			hour = 0;
		}
	},1000);
}