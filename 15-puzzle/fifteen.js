/**
 * Created by rajkumar on 9/20/2015.
 */
(function(){
    //object for empty box
    var emptyTop=300;
    var emptyLeft=300;
    var divsStart; //to store the initial information of the divs
    $(document).ready(function(){
        init();

        divsStart=divsAtStart();
        //if any box is clicked, then it is checked whether it is moveable or not,
        //if so, then its position is changed with empty box.
        //after each move, position is compared to find out whether game is completed or not.
        $(".puzzlepiece").click(function(){
            var current = $(this).position();
            if(isMoveable(current)){
                moveSquare($(this));
                if(checkIfComplete()){
                    alert("Yes you did it...")
                }
            }
        });

        //moves the square with empty box
        function moveSquare(current) {

            var pos = current.position();
            current.css("top", emptyTop + "px");
            current.css("left", emptyLeft + "px");
            emptyLeft = pos.left;
            emptyTop = pos.top;

        }

        //if shuffle button is clicked, then box are suffled
        $("#shufflebutton").click(function() {
            //shuffles the boxes
            //order of O(nm) where n->number of times we run outer loop
            //and m->number of elements in box (in this case 16)

            for (var i = 0; i < 50; i++) {
                var allBoxes = $(".puzzlepiece");
                var box = [];
                var k = 0;
                for (var j = 0; j < allBoxes.length; j++) {
                    var current = $(allBoxes[j]).position();
                    if (isMoveable(current)) {
                        box[k] = $(allBoxes[j]);
                        k++;
                    }
                }
                moveSquare($(box[Math.floor((Math.random() * box.length))]));
            }
        });


        //if box are moveable, then it will be bodered with red color on mouse hovering
        $(".puzzlepiece").hover(function () {
            var current = $(this).position();
            if (isMoveable(current)) {
                $(this).addClass("movablepiece");
            }
        }, function () {
            $(this).removeClass("movablepiece");
        });


    });
    //initial position of the divs which is used to compare with the divs at given
    //time to determine whether the game is finished or not.
    var divsAtStart=function(){
        var divPosition=[];
        var divs=$(".puzzlepiece");
        for(var i=0;i<divs.length;i++){
            divPosition[i]={
                x:$(divs[i]).position.left,
                y:$(divs[i]).position.top
            }
        }
        return divPosition;
    }

    //gives the divs after each movement
    var divsNow=function(){
        var divPosition=[];
        var divs=$(".puzzlepiece");
        for(var i=0;i<divs.length;i++){
            divPosition[i]={
                x:$(divs[i]).position.left,
                y:$(divs[i]).position.top
            }
        }
        return divPosition;
    }

    //to find out whether the matching is finished
    var checkIfComplete=function(){
        var divNow=divsNow();
        var status = true;
        for(var i=0;i<divNow.length;i++){
            if(Math.floor(divNow[i].left) !== Math.floor(divsStart[i].left) ||
                Math.floor(divNow[i].top) !== Math.floor(divsStart[i].top)){
                status = false;
            }
        }
        return status;
    }

    //determines whether the input box is moveable or not on the basis of
    //position of empty box
    var isMoveable=function(current){
        if(( emptyTop=== current.top &&
            (emptyLeft === current.left + 100 ||
            emptyLeft === current.left - 100)) ||
            (emptyLeft === current.left &&
            (emptyTop === current.top + 100 ||
            emptyTop === current.top - 100))){
            return true;
        }
        return false;
    }
    var init = function() {
        var divs = $("#puzzlearea div");
        // initialize each piece
        for (var i=0; i< divs.length; i++) {
            var div = divs[i];

            // calculate x and y for this piece
            var x = ((i % 4) * 100) ;
            var y = (Math.floor(i / 4) * 100) ;

            // set basic style and background
            div.className = "puzzlepiece";
            div.style.left = x + 'px';
            div.style.top = y + 'px';
            div.style.backgroundImage = 'url("background.jpg")';
            div.style.backgroundPosition = -x + 'px ' + (-y) + 'px';

            // store x and y for later
            div.x = x;
            div.y = y;
        }
    };
})();