function cmp(String1, String2, Require){
    var testMatch = /^[a-zA-Z]/;
    if(!(testMatch.test(String1)||testMatch.test(String2))){
        var Date1 = new Date(Date.parse(String1));
        var Date2 = new Date(Date.parse(String2));
    }
    if(Require=="ascend"){
        if(testMatch.test(String1)||testMatch.test(String2))
            return String1 < String2;
        else
            return Date1 < Date2;
    }
    else{
        if(testMatch.test(String1)||testMatch.test(String2))
            return String1 > String2;
        else
            return Date1 > Date2;
    }
}
function Sort(tableIndex, thIndex, colCount) {
    $('th')[thIndex].className = $('th')[thIndex].id = $('th')[thIndex].id == "ascend" ? "descend" : "ascend";        

    for(var i = 0;i < 6; i++)
        if((!tableIndex && i < 3 && i != thIndex)||(tableIndex && i >= 3 && i != thIndex))
            $('th')[i].id = $('th')[i].className = "";  
            
    //Bubble Sort
    for (var i = 1; i < $('table')[tableIndex].rows.length; i++) {
        for (var j = i + 1; j < $('table')[tableIndex].rows.length; j++) {
            if (!cmp($('table')[tableIndex].rows[i].cells[colCount].innerText, 
                $('table')[tableIndex].rows[j].cells[colCount].innerText, $('th')[thIndex].id)) {

                var swap = $('table')[tableIndex].rows[i].innerHTML;
                $('table')[tableIndex].rows[i].innerHTML = $('table')[tableIndex].rows[j].innerHTML;
                $('table')[tableIndex].rows[j].innerHTML = swap;
            }
        }
    }
}
window.onload = function() {
    var Table = $('table');
    var Th = $('th');
    var tableIndex = 0;
    var colCount = 0;//表示当前列数
    var col = [];//存放每表列数用于比较
        
    for (var i = 0; i < Table.length; i++)
        col.push(Table[i].rows[0].cells.length);

    for (var thIndex = 0; thIndex < Th.length; thIndex++) {
        if (colCount == col[tableIndex]) {
            tableIndex++;
             colCount = 0;
        }
        
        (function(Th, tableIndex, thIndex, colCount) {
            Th[thIndex].addEventListener("click", function() {
                Sort(tableIndex, thIndex, colCount);
            });
        })(Th, tableIndex, thIndex, colCount);

        colCount ++;
    }
}