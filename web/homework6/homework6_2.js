window.onload = function () {
    var Test = document.getElementById('Time');
    var radios = document.getElementsByClassName('Radio');
    var last = null;
    var current = parseInt((Math.random() * 60).toString(),10);
    var count = 30;
    var mark = 0;
    var flag = 0;
    var SCORE = document.getElementById('Score');
    var InnerText = document.getElementById('result');
    var Interval;
    var btn = document.getElementById('button');

    Test.value = count;
    SCORE.value = 0;
    btn.onclick = function () {
        for(var i=0;i<radios.length;i++){
            radios[i].checked = false;
        }
    mark = 1 - mark;
    if(mark||flag) {
        InnerText.value = "";
        SCORE.value = 0;
        count = 30;
        if(flag===1)
            flag = 0;

            Interval = setInterval(function () {
                if(count===0){
                    clearInterval(Interval);
                    InnerText.value = "Game Over";
                    Test.value = 0;
                    flag = 1;
                    return;
                }
                var operateObjectLast;
                var operateObjectCurrent;
                if (last !== null)
                    operateObjectLast = radios[last];
                if(current !== null)
                    operateObjectCurrent = radios[current];

                operateObjectCurrent.onclick = function () {
                    SCORE.value = parseInt((parseInt(SCORE.value,10) + parseInt("1",10)).toString());

                    operateObjectCurrent.checked = false;
                    last = current;
                    current = parseInt((Math.random() * 60).toString(), 10);
                };

                var j;
                for(j=0;j<radios.length;j++){
                    (function () {
                        if (radios[j] !== operateObjectCurrent)
                            radios[j].onclick = function () {
                                var that = this;
                                SCORE.value = parseInt((parseInt(SCORE.value, 10) - parseInt("1", 10)).toString());
                                that.checked = false;
                            }
                    })(j);
                }

                if (operateObjectLast)
                    operateObjectLast.checked = false;
                if (operateObjectCurrent)
                    operateObjectCurrent.checked = true;

                Test.value = count--;
            }, 1000);
    }
    else{
        clearInterval(Interval);
        var operateObjectLast;
        if (last !== null)
            operateObjectLast = radios[last];
        if (operateObjectLast)
            operateObjectLast.checked = false;
    }
    }
};