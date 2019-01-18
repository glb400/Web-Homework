/*((6+4)+((7*6+5)+(5+4)))*/
function Illegal(ch) {
    switch (ch) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '.':
        case '(':
        case ')': {
            return true;
        }
        default: {
            return false;
        }
    }
}
function isSymbol(ch) {
    switch (ch){
        case '+':case '-':case '*':case '/':
        {
            return true;
        }
        default:{
            return false;
        }
    }
}
function isDigit(ch) {
    switch (ch){
        case '1':case '2':case '3':case '4':case '5':case '6':case '7':case '8':case '9':case '0':case '.':{
            return true;
        }
        default:{
            return false;
        }
    }
}
function process(str) {
    var ans=0;
    var count=0;
    var count1=0;

    //judgeLoop && arr push
    for(var i=0;i<str.length;i++){
        if(!Illegal(str[i])){
            var text1=document.getElementById('result');
            text1.value="illegal input!";
            alert('illegal input!');
            return;
        }
        if(isSymbol(str[i])&&i<str.length&&isSymbol(str[i+1])){
            var text5=document.getElementById('result');
            text5.value="illegal input!";
            alert('illegal input!');
            return;
        }

        if(str[i]==='('){
            if(i===(str.length-1)){
                var text=document.getElementById('result');
                text.value="illegal input!";
                alert('illegal input!');
            }
            else {
                if (!isDigit(str[i + 1]) && str[i + 1]!=='(') {
                    var text2 = document.getElementById('result');
                    text2.value = "illegal input!";
                    alert('illegal input!');
                    return;
                }
                else {
                    if (str[i + 1]==='(') {
                        i++;
                        count++;
                    }
                    count++;
                }
            }
        }
        else if(str[i]===')') {
            if (i!==(str.length-1)) {
                if (!isSymbol(str[i + 1]) && str[i + 1] != ')') {
                    var text3 = document.getElementById('result');
                    text3.value = "illegal input!";
                    alert('illegal input!');
                    return;
                }
                else {
                    if (str[i + 1]===')') {
                        i++;
                        count1++;
                    }
                    count1++;
                }
            }
            else
                count1++;
        }
    }

    if(count!=count1){
        // alert(count + "    " + count1);
        var text4 = document.getElementById('result');
        text4.value = "illegal input!";
        alert('illegal input!');
        return;
    }

    //process
    // alert('judgeLoop && arr push OK!');
    if(count===0) {
        str = '(' + str + ')';
        count = 1;
    }

    if(str[0]!=='('){
        str = '(' + str + ')';
        count += 1;
    }

    if(str[str.length-1]!==')'){
        str = '(' + str + ')';
        count += 1;
    }

    while(count){   
        var vis=0;
        for(var tmp=0;tmp<str.length;tmp++){
            if(str[tmp]==='('){
                vis++;
            }
            if(vis===count){
                var head=tmp;
                var tail;
                var flag=0;
                for(var j=tmp;j<str.length;j++){
                    if(str[j]===')'){
                        tail=j;
                        break;
                    }
                }

                var strSub = str.slice(head+1,tail);
                var MyQueueSymbol=[];
                var MyQueueNumber=[];
                var MyStackSymbol=[];
                var MyStackNumber=[];
                var TempStrArr=[];
                var TempNumArr=[];
                var TempAns = 0;
                var cnt=0;
                // alert(MyQueueSymbol.length);
                // alert(MyQueueNumber.length);
                // alert(strSub);
                TempStrArr=strSub.split(/[*/+-]/);
                // alert(TempStrArr);
                for(var temp=head+1;temp<tail;temp++){
                    if(str[temp]==='+'||str[temp]==='-'||str[temp]==='*'||str[temp]==='/'){
                        MyQueueSymbol.unshift(str[temp]);
                    }
                }
                for(var temp0=0;temp0<TempStrArr.length;temp0++){
                    TempNumArr.push(parseFloat(TempStrArr[temp0],10));
                    MyQueueNumber.unshift(TempNumArr[temp0]);
                    // alert(MyQueueNumber[temp0]);
                }
                // alert('hi');
                // alert(MyQueueNumber + "    " + MyQueueSymbol);
                var number;
                var symbol;
                var number1;
                var number2;
                if(MyQueueNumber.length!==0) {
                    number = MyQueueNumber.pop();
                    MyStackNumber.push(number);
                }
                // alert(" " + MyQueueNumber + "    " + MyQueueSymbol);


                while(!(MyQueueSymbol.length===0&&MyQueueNumber.length===0)){
                    // alert("1" + MyQueueNumber.length + "    " + MyQueueSymbol.length);
                    if(MyQueueNumber.length!==0) {
                        number = MyQueueNumber.pop();
                        MyStackNumber.push(number);
                    }
                    if(MyQueueSymbol.length!==0){
                        symbol = MyQueueSymbol.pop();
                        MyStackSymbol.push(symbol);
                    }
                    if(symbol==='*'||symbol==='/'){
                        MyStackSymbol.pop();
                        number1=MyStackNumber.pop();
                        number2=MyStackNumber.pop();
                        if(symbol==='*') {
                            number = number2 * number1;
                            MyStackNumber.push(number);
                        }
                        else{
                            number = number2 / number1;
                            MyStackNumber.push(number);
                        }
                    }
                }
                // alert(" " + MyStackNumber + "    " + MyStackSymbol);
                while(!(MyStackSymbol.length===0&&MyStackNumber.length===1)){
                    number1=MyStackNumber.pop();
                    number2=MyStackNumber.pop();
                    symbol=MyStackSymbol.pop();
                    if(symbol==='+') {
                        number = number2 + number1;
                    }
                    else{
                        number = number2 - number1;
                    }
                    MyStackNumber.push(number);
                }
                TempAns=MyStackNumber[0].toString();
                //  TempAns="$";
                str=str.substr(0,head)+TempAns+str.substr(tail+1,str.length);
                count--;
            }
        }
    }

    var textans = document.getElementById('result');
    var number = parseFloat(str,10);
    number = number.toFixed(6);
    // textans.value = str;
    textans.value = number;
    if(str==='Infinity'||str==='NaN'){
        str='illegal input!';
        textans.value=str;
        alert('illegal input!');
    }
    return;
}
function equal() {
    var input = document.getElementById('result').value;
    var answer = process(input);
    //process
    //用var answer保存结果
    input.innerHTML = answer;
}
function read(n) {
    var text = document.getElementById('result');
    var textcontent = text.value;
    text.value = textcontent + n;
}
function backspace() {
    var text = document.getElementById('result');
    var textcontent = text.value.slice(0,text.value.length-1);
    text.value = textcontent;
}
function CE() {
    var text = document.getElementById('result');
    text.value = '';
}