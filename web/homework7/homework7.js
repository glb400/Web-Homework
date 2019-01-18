var imgurl = "panda.jpg";
var img = document.getElementById('imgJigsaw');
var col = 4;
var row = 4;
var vacant = null;
var imgBlockHeight = 360;
var imgBlockWidth = 360;

function submit1() {
    var content = document.getElementById('levels').value;
    col = parseInt(content,10);
    row = parseInt(content,10);
    reset();
}

function submit2() {
    var content = document.getElementById('ownimgs').value;
    imgurl = content;
    reset();
}

function Complete(blocks) {
    var flag = true;
    for(var i=0;i<blocks.length;i++){
        var tmp = blocks[i];
        if(tmp.newIndex !== tmp.getAttribute("index")){
            flag = false;
            break;
        }
    }
    return flag;
}

function reset() {
    var _imgurl = imgurl;
    var _col = col;
    var _row = row;
    imgurl = "panda.jpg";
    col = 4;
    row = 4;
    var OperateTo = document.getElementById('imgBlock');
    var _width = (OperateTo.clientWidth - 20) / _col;
    var _Height = (OperateTo.clientHeight - 20) / _row;
    var border_width = (OperateTo.clientWidth - imgBlockWidth) / _col;
    //排列
    var arr = [];
    var count = 0;
    for(var i=0;i<_row;i++){
        for(var j=0;j<_col;j++){
            var posL = ((_width) * j);
            var posT = ((_Height) * i);
            arr.push('<div class="jigsaw" index="'+count+'" style="display: inline;float:left;position:relative;width:'+_width+'px;height:'+_Height+'px;background:url('+_imgurl+') '+posL+'px '+posT+'px"></div>');
            count ++;
        }
    }
    OperateTo.innerHTML = arr.join("");
    // alert(OperateTo.innerHTML);
    var array = document.getElementsByClassName("jigsaw");

    //打乱顺序
    var blocks = document.getElementsByClassName('jigsaw');
    breakOrder = function (blocks) {
        for(var i=0;i<blocks.length/2;i++){
            var num1 = parseInt(Math.random() * blocks.length);
            var num2 = parseInt(Math.random() * blocks.length);
            var obj1 = blocks[num1];
            var obj2 = blocks[num2];
            obj1.parentNode.insertBefore(obj1,obj2);
        }
        vacant = blocks[blocks.length-1];
        vacant.style.visibility = "hidden";
    }
    breakOrder(blocks);

    click = function (blocks) {
        var _length = blocks.length;
        for(var i=0;i<_length;i++){
            blocks[i].newIndex = i;
            blocks[i].onclick = function () {
                var index = this.getAttribute("index");
                var newIndex = this.newIndex;
                // alert(newIndex);
                var Left,Right,Up,Down;
                if(newIndex>=1){
                    Left = blocks[newIndex-1];
                    // alert("L");
                    // alert(Left.style.visibility==="hidden");
                }
                if(newIndex<(_length-1)) {
                    Right = blocks[newIndex+1];
                    // alert("R");
                    // alert(Right.style.visibility==="hidden");
                }
                if(newIndex>=_col){
                    Up = blocks[newIndex-_col];
                    // alert("U");
                    // alert(Up.style.visibility==="hidden");
                }
                if((newIndex+_col)<_length){
                    Down = blocks[newIndex+_col];
                    // alert("D");
                    // alert(Down.style.visibility==="hidden");
                }

                var temp;
                if(Right&&Right.style.visibility==="hidden" && Math.ceil((newIndex+1)/_col) == Math.ceil((Right.newIndex+1)/_col)){
                    temp = this.newIndex;
                    this.newIndex = Right.newIndex;
                    Right.newIndex = temp;
                    Right.parentNode.insertBefore(Right,this);
                }
                else if(Left&&Left.style.visibility==="hidden" && Math.ceil((newIndex+1)/_col) == Math.ceil((Left.newIndex+1)/_col)){
                    temp = this.newIndex;
                    this.newIndex = Left.newIndex;
                    Left.newIndex = temp;
                    Left.parentNode.insertBefore(this,Left);
                }
                else if(Down&&Down.style.visibility==="hidden"){
                    temp = this.newIndex;
                    Down.parentNode.insertBefore(Down,blocks[temp+1]);
                    Down.parentNode.insertBefore(this,blocks[Down.newIndex]);
                    Down.parentNode.insertBefore(blocks[Down.newIndex],this);
                    this.newIndex = Down.newIndex;
                    Down.newIndex = temp;
                }
                else if(Up&&Up.style.visibility==="hidden"){
                    temp = this.newIndex;
                    Up.parentNode.insertBefore(this,blocks[Up.newIndex]);
                    Up.parentNode.insertBefore(Up,blocks[temp]);
                    Up.parentNode.insertBefore(blocks[temp],Up);
                    this.newIndex = Up.newIndex;
                    Up.newIndex = temp;
                }
                if(Complete(blocks)){
                    alert("You've Completed! Congratulations!");
                    vacant.style.visibility = "visible";
                }
            }
        }
    }
    click(blocks);
}