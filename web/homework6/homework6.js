window.onload = function () {
    var Map = document.getElementById('map');
    Map.addEventListener('mouseleave',reset);
    Map.addEventListener('mouseover',function () {
        mark2 = 1
    });
    var slogan = document.getElementById('Reminder');
    slogan.innerHTML = '<br/>';
    var arr = document.getElementsByTagName('div');
    var arrRed = [];
    var mark;
    var mark2;
    function reset() {
        for(var i=0;i<arr.length;i++){
            if(arr[i].className === 'ChangeToRed') {
                arr[i].style.backgroundColor = 'rgb(238,238,238)';
                arrRed.push(arr[i]);
            }
        }

        mark=0;
        mark2=0
    }

    for(var i1=0;i1<arr.length;i1++){
        if(arr[i1].className === 'ChangeToRed') {
            arr[i1].addEventListener('mouseover', function () {
                mark=0;
                slogan.innerHTML = "You Lose";
                for(var i2=0;i2<arrRed.length;i2++) {
                    arrRed[i2].style.backgroundColor = 'red';
                }
            });
        }
    }

    var BlockS = document.getElementById('blockS');
    BlockS.addEventListener('mouseover',function () {
        // alert(mark);
        slogan.innerHTML = '<br/>';
        mark=1;
    });
    var BlockE = document.getElementById('blockE');
    BlockE.addEventListener('mouseover',function () {
        // alert(mark);
        if(mark===1&&mark2===1){
            slogan.innerHTML = 'You Win';
        }
        else{
            slogan.innerHTML = 'Don\'t cheat, you should start form the \'S\' and move to the \'E\' inside the maze!';
        }
    });
    reset();
};