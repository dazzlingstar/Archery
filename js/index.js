var height,width;
var loadingLayer,imglist,gameLayer,backLayer,bowObj,bowBitmapData,bowBodyObj,arrowBitmapData,arrowObj,startx,starty,linelObj,linerObj,canvasy=1000,bulletLayer,btnLayer;
var oldx,oldy,defferx,deffery=0,mouseStartX,mouseStartY,mouseNowX,mouseNowY;
var movex,movey,isshoot,ballPosi=100,radius=0.06*width;
var MOVE_STEP;
var angle=Math.random()*45*(Math.random()>=0.5?1:-1);
var balls,balla,ballb,ballc,balld,balle;
var timeout;
var charArr=[];
function getRandomChar() {
    charArr=[];
    for(var i=0;i<5;i++){
        var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
        //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
        charArr.push(String.fromCharCode(97+ranNum));
    }
    return charArr;
}
var nums=[];
out:for(var i=0 ;i<10;i++){
    var temp=parseInt(Math.random()*50);
    for(var j=0;j<nums.length;j++){
        if(nums[j]==temp){
            i-=1;
            continue out;
        }
    }
    nums.push(temp);
}

//图片path数组
var imgData = new Array(
    {name:"arrow",path:"./img/arrow.png"},
    {name:"bow",path:"./img/bow.png"},
    {name:"line",path:"./img/line.png"},
    {name:"back",path:"./img/back.png"},
    {name:"backg",path:"./img/background.png"},
    {name:"title",path:"./img/title.png"},
    {name:"letter",path:"./img/letter.png"},
    {name:"close",path:"./img/close.png"}
);
$(function () {
    width= $("body").width();
    height= $("body").height();
    canvasy=height*0.86;
    firstPage();
});
function itemNum(num) {
    $(".progress").width((itemnum+1)*9+"%");
    $(".nums .numitem.now").removeClass("now");
    $(".nums .numitem").eq(itemnum).addClass("now");
    $(".nums .numitem").removeClass("passed");
    for(var z=0;z<itemnum;z++){
        $(".nums .numitem").eq(z).addClass("passed");
    }
    $(".quest .yell .txt").html(gameData[num]["txt"].replace(gameData[num]["redtxt"],"<span class='red'>"+gameData[num]["redtxt"]+"</span>"));
    $(".answin .txt").html(gameData[num]["txt"].replace(gameData[num]["redtxt"],"<span class='red'>"+gameData[num]["redtxt"]+"</span>"));
    $(".quest .yell .answer").html(gameData[num]["word"]);
    $(".answin .answer").html(gameData[num]["word"]);
    $(".quest .yell .tone").html(gameData[num]["tone"]);
    $(".quest img").attr({"src":"img/"+gameData[num]["id"]+"_"+gameData[num]["word"]+".png"});// style='background: #fff'
    $(".word").html(gameData[num]["word"].replace(gameData[num]["rubric"], "<span>5</span>")+"<img src='img/showans.png' onload='imgonload()'/>");
    if(btnLayer){
        btnLayer.graphics.clear();
        btnLayer.graphics.drawRect(0,"#ffffff",[$(".word img").offset().left,$(".word img").offset().top,$(".word img").width(),$(".word img").height()],false,"#000000");
    }

    getRandomChar();
    charArr[parseInt(Math.random()*5)]=gameData[num]["rubric"];
    balla.changeLetter(charArr[0]);
    ballb.changeLetter(charArr[1]);
    ballc.changeLetter(charArr[2]);
    balld.changeLetter(charArr[3]);
    balle.changeLetter(charArr[4]);
    if(itemnum>0){
        balls.x=0;
        balla.y=ballb.y=ballc.y=balld.y=balle.y=parseInt(((Math.random()<0.5)?"+":"-")+Math.random()*0.16*width);
    }
    direc=(Math.random()<0.5)?true:false;
    intervalFunc(direc);
    timeoutFunc(direc);
}
function imgonload() {
    btnLayer.graphics.drawRect(0,"#ffffff",[$(".word img").offset().left,$(".word img").offset().top,$(".word img").width(),$(".word img").height()],false,"#000000");
}
var direc,zindex=true;
function gameInit(result){
    LGlobal.preventDefault=false;
    imglist = result;
    removeChild(loadingLayer);
    loadingLayer = null;
    radius=0.06*width;
    //游戏底层实例化
    gameLayer = new LSprite();
    addChild(gameLayer);
    gameLayer.graphics.drawRect(0,"#ffe656",[0,0,width,height],false,"#ffe656");


    backLayer = new LSprite();
    gameLayer.addChild(backLayer);
    bulletLayer = new LSprite();
    gameLayer.addChild(bulletLayer);

    bowObj=new Back(0,0);//整体
    bowBitmapData = new LBitmapData(imglist["bow"]);
    bowBodyObj = new Player(width/2-(bowBitmapData.width*width/750)/2,canvasy,width*0.4,width*2.215,bowBitmapData,30);
    arrowBitmapData = new LBitmapData(imglist["arrow"]);
    arrowObj = new Player((bowBitmapData.width/2-(arrowBitmapData.width)/2),-bowBitmapData.height*1.5,width*0.4,width*2.215,arrowBitmapData,30);
    startx=width/2-(bowBitmapData.width*width/750)/2;
    starty=-bowBitmapData.height*1.5;

    linelObj = new LSprite();
    linelObj.graphics.beginPath();
    linelObj.graphics.strokeStyle("#000");
    linelObj.graphics.moveTo(width*750/width/2-bowBitmapData.width*750/width/2.2,canvasy*750/width+bowBitmapData.height*0.86);
    linelObj.graphics.lineTo(width*750/width/2,canvasy*750/width+bowBitmapData.height*0.86);
    linelObj.graphics.stroke();
    linerObj = new LSprite();
    linerObj.graphics.beginPath();
    linerObj.graphics.strokeStyle("#000");
    linerObj.graphics.moveTo(width*750/width/2,canvasy*750/width+bowBitmapData.height*0.86);
    linerObj.graphics.lineTo(width*750/width/2+bowBitmapData.width*750/width/2,canvasy*750/width+bowBitmapData.height*0.86);
    linerObj.graphics.stroke();
    isshoot=true;

    bowBodyObj.scaleX=width/750;
    bowBodyObj.scaleY=width/750;
    // bowBodyObj.height=100;

    arrowObj.addShape(LShape.ARC,[arrowBitmapData.width/2,arrowBitmapData.height*0.06,0.02*width]);
    bowBodyObj.addChild(arrowObj);
    balls = new Back(0,300);
    balla=new Ball(ballPosi,0,radius,charArr[0],(Math.random()*35*(Math.random()>=0.5?1:-1))-135,"#8ed8fb","#009be3");
    ballb=new Ball(ballPosi+1.2*radius,0,radius,charArr[1],(Math.random()*35*(Math.random()>=0.5?1:-1))-135,"#00ff66","#10a121");
    ballc=new Ball(ballPosi+2.4*radius,0,radius,charArr[2],(Math.random()*35*(Math.random()>=0.5?1:-1))-135,"#ffea00","#ec6f00");
    balld=new Ball(ballPosi+3.6*radius,0,radius,charArr[3],(Math.random()*35*(Math.random()>=0.5?1:-1))-135,"#8ed8fb","#009be3");
    balle=new Ball(ballPosi+4.8*radius,0,radius,charArr[4],(Math.random()*35*(Math.random()>=0.5?1:-1))-135,"#ff6868","#ff0000",true);
    linelObj.scaleX=linelObj.scaleY=linerObj.scaleX=linerObj.scaleY=width/750;
    bowObj.addChild(linelObj);
    bowObj.addChild(linerObj);

    // console.log(ballb.hitObj);

    balls.addChild(balla);
    balls.addChild(ballb);
    balls.addChild(ballc);
    balls.addChild(balld);
    balls.addChild(balle);
    gameLayer.addChild(balls);
    bowObj.addChild(bowBodyObj);
    gameLayer.addChild(bowObj);

    itemNum(14);

    btnLayer= new LSprite();
    gameLayer.addChild(btnLayer);
    gameLayer.setChildIndex(btnLayer,0);


    var closeImg = new LBitmapData(imglist["close"]);
    var closeLayer= new Player(0.82*width,0.12*height,width*0.4,width*2.215,closeImg,30);

    var backLayer= new LSprite();
    backLayer.graphics.drawRect(0,"#ffffff",[0,0,width,height],true,"rgba(0,0,0,0.8)");

    gameLayer.addEventListener(LEvent.ENTER_FRAME,onframe);
    gameLayer.addEventListener(LMouseEvent.MOUSE_DOWN,ondown);
    gameLayer.addEventListener(LMouseEvent.MOUSE_MOVE,onmove);
    gameLayer.addEventListener(LMouseEvent.MOUSE_OUT,onup);
    gameLayer.addEventListener(LMouseEvent.MOUSE_UP,onup);
    closeLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function () {
        backLayer.visible=false;
        $(".answin").fadeOut();
        closeLayer.visible=false;
    });
    btnLayer.addEventListener(LMouseEvent.MOUSE_DOWN,function () {
        $(".answin").fadeIn();
        if(zindex){

            gameLayer.addChild(backLayer);
            gameLayer.setChildIndex(backLayer,5);
            // closeLayer.y=$(".close").offset().top;
            gameLayer.addChild(closeLayer);
            gameLayer.setChildIndex(closeLayer,6);
            zindex=false;
        }else{

            backLayer.visible=true;
            closeLayer.visible=true;
        }
    });
}
var ballsmovex;
var ballsmovey;
function intervalFunc(flag) {

    // balls.x=-width*0.9;
    if(flag){
        balls.x=width*0.81;
        ballsmovex=setInterval(function () {
            // if(balls.x>=-0.6*width&&balls.x<=width*0.6){

                balls.x=balls.x-2*(itemnum+1);
            // }else{
            //
            //     balls.x=balls.x-4;
            // }
            if(balls.x<=-width*0.9){
                // balls.x=width*0.81;

                clearInterval(ballsmovex);
                clearTimeout(ballsmovey);
                clearInterval(balla.balltime);
                clearInterval(ballb.balltime);
                clearInterval(ballc.balltime);
                clearInterval(balld.balltime);
                clearInterval(balle.balltime);
                direc=(Math.random()<0.5)?true:false;
                intervalFunc(direc);
                timeoutFunc(direc);
            }
        },60);
    }else{
        balls.x=-width*0.9;
        ballsmovex=setInterval(function () {
            // if(balls.x>=-0.6*width&&balls.x<=width*0.6){

                balls.x=balls.x+2*(itemnum+1);
            // }else{
            //
            //     balls.x=balls.x+4;
            // }
            if(balls.x>=width*0.81){
                // balls.x=-width*0.9;

                clearInterval(ballsmovex);
                clearTimeout(ballsmovey);
                clearInterval(balla.balltime);
                clearInterval(ballb.balltime);
                clearInterval(ballc.balltime);
                clearInterval(balld.balltime);
                clearInterval(balle.balltime);
                direc=(Math.random()<0.5)?true:false;
                intervalFunc(direc);
                timeoutFunc(direc);
            }
        },60);
    }
}
var itemnum=0;
var timeArr=[1400,800,500,500,500,500,500,500,500,500,400];
function timeoutFunc(flag) {
    balla.y=ballb.y=ballc.y=balld.y=balle.y=balla.y+parseInt(((Math.random()<0.5)?"+":"-")+Math.random()*0.16*width);
    balla.direc=ballb.direc=ballc.direc=balld.direc=balle.direc=(Math.random()<0.5)?false:true;
    var i,arr=[balla,ballb,ballc,balld,balle];
    if(flag){
        i=0;
    }else{
        i=4;
    }
    function timesFunc() {
        ballsmovey=setTimeout( function () {
            arr[i].intervalObj=new ballInterval(arr[i]);
            if(flag){
                i=i+1;
            }else{
                i=i-1;
            }
            timesFunc();
        },timeArr[itemnum]);
        if(flag){
            if(i>=5){
                clearTimeout(ballsmovey);
                i=0;
            }
        }else{
            if(i<0){
                clearTimeout(ballsmovey);
                i=4;
            }

        }
    }
    arr[i].intervalObj=new ballInterval(arr[i]);
    if(flag){
        i=i+1;
    }else{
        i=i-1;
    }
    timesFunc();
    var balltime;
    function ballInterval(ball) {
        ball.balltime=balltime=setInterval(function () {
            if(ball.direc){
                ball.y=ball.y-(itemnum+1)*2;
                if(ball.y<0.06*width){
                    ball.direc=!ball.direc;
                }
            }else{
                ball.y=ball.y+(itemnum+1)*2;
                if(ball.y>0.46*width){
                    ball.direc=!ball.direc;
                }

            }
        },100+(itemnum+1)*20);
    }
}

function onmove(event){
    // console.log(event.offsetY);
    // $("body").scrollTop(0);

    if(!oldy){
        oldy=event.offsetY;
    }
    movex=event.offsetX-oldx;
    movey=event.offsetY-oldy;
    var target = event.target || event.srcElement;
    // console.log(event.offsetY);
    if(event.offsetY<canvasy){
        if(movey>0){
            $("body").scrollTop($("body").scrollTop()-10);
        }else{
            $("body").scrollTop($("body").scrollTop()+10);

        }
    }else {
    bowObj.rotatex=width/2;
    bowObj.rotatey=canvasy;
    // console.log((event.offsetY-canvasy-(bowBitmapData.height*width/750)));
    if((event.offsetY-canvasy-(bowBitmapData.height*width/750))>0){
        bowObj.rotate=-45*(((event.offsetX-width/2)/2)/((event.offsetY-canvasy)));
    }
    deffery += movey;
    if(deffery>width/10){
        movey=0;

    }else if(deffery<-width/20){
        // deffery=0;
    }else if(deffery<=width/10&&deffery>=0) {
        arrowObj.y = arrowObj.y + movey;
        setScale();
    }else {


        // setScale();
    }
    // if(!bowObj.canshoot)return;
    // mouseNowX=event.offsetX;
    // mouseNowY = event.offsetY;
    }
    oldy=event.offsetY;
}
function setScale() {

    // linelObj.graphics.moveTo(width*750/width/2-bowBitmapData.width*750/width/2.2,canvasy*750/width+bowBitmapData.height*0.86);
    // linelObj.graphics.lineTo(width*750/width/2,canvasy*750/width+bowBitmapData.height*0.86);

    // linerObj.graphics.moveTo(width*750/width/2,canvasy*750/width+bowBitmapData.height*0.86);
    // linerObj.graphics.lineTo(width*750/width/2+bowBitmapData.width*750/width/2,canvasy*750/width+bowBitmapData.height*0.86);
    if(!isshoot){
        return;
    }
    linelObj.graphics.clear();
    linelObj.graphics.beginPath();
    linelObj.graphics.moveTo(width*750/width/2-bowBitmapData.width*750/width/2.2,canvasy*750/width+bowBitmapData.height*0.86);
    linelObj.graphics.lineTo(width*750/width/2,canvasy*750/width+bowBitmapData.height*0.86+deffery);
    linelObj.graphics.stroke();
    linerObj.graphics.clear();
    linerObj.graphics.beginPath();
    linerObj.graphics.moveTo(width*750/width/2,canvasy*750/width+bowBitmapData.height*0.86+deffery);
    linerObj.graphics.lineTo(width*750/width/2+bowBitmapData.width*750/width/2,canvasy*750/width+bowBitmapData.height*0.86);
    linerObj.graphics.stroke();
    linelObj.scaleX=linelObj.scaleY=linerObj.scaleX=linerObj.scaleY=width/750;

}
function onup(event){
    // setScale();
    bowObj.canshoot=false;
    // linelObj.rotate=linerObj.rotate=0;
    // arrowObj.y=arrowObj.y-deffery;
    linelObj.graphics.clear();
    linelObj.graphics.beginPath();
    linelObj.graphics.moveTo(width*750/width/2-bowBitmapData.width*750/width/2.2,canvasy*750/width+bowBitmapData.height*0.86);
    linelObj.graphics.lineTo(width*750/width/2,canvasy*750/width+bowBitmapData.height*0.86);
    linelObj.graphics.stroke();
    linerObj.graphics.clear();
    linerObj.graphics.beginPath();
    linerObj.graphics.moveTo(width*750/width/2,canvasy*750/width+bowBitmapData.height*0.86);
    linerObj.graphics.lineTo(width*750/width/2+bowBitmapData.width*750/width/2,canvasy*750/width+bowBitmapData.height*0.86);
    linerObj.graphics.stroke();
    if(deffery<=0) {
        arrowObj.y=starty;
        deffery = 0;
        return;
    }
    // console.log(Math.abs(arrowObj.y-starty));
    // console.log(arrowObj.y-starty);
    if(Math.abs(arrowObj.y-starty)>=(width/10*0.2)){
        shoot();
    }else{
        arrowObj.y=starty;
    }




    deffery=0;


}
function shoot(obj) {

    arrowObj.y=arrowObj.y-(width/10)/10;
    // balla.addShape(LShape.ARC,[balla.x,balla.y,balla.radius]);
    // arrowObj.addShape(LShape.ARC,[arrowBitmapData.width/2,arrowBitmapData.height*0.06,0.02*width]);
    if(arrowObj.y<starty-width*2){
        arrowObj.y=starty;
        bowObj.rotate=0;
        clearTimeout(timeout);
        isshoot=true;

    }else{
        isshoot=false;
        timeout=setTimeout("shoot()",0.2);
    }

}
function main(){
    loadingLayer = new LoadingSample4(100,"#ffe656","#d66600");
    // loadingLayer.backgroundColor="#ffe656";
    addChild(loadingLayer);
    LLoadManage.load(
        imgData,
        function(progress){
            loadingLayer.setProgress(progress);
        },
        gameInit
    );
}
function gogame() {
    console.log("dhaksjhdjk");
    document.body.className="game";
    $("body").scrollTop(0);
    console.log(width);
    console.log(height);
    init(20,"myDiv",width,height,main);
}
function firstPage() {
    document.body.className="addtit";
    setTimeout(function () {
        document.body.className="titanim";
        $(".button").click(gogame);
    },1500);
}
var isNum=false;
function onframe(){


    // if(arrowObj.hitTestObject(balla)){
    //     alert("a");
    // }else if(arrowObj.hitTestObject(ballb)){
    //     alert("b");
    // }else if(arrowObj.hitTestObject(ballc)){
    //     alert("c");
    // }else if(arrowObj.hitTestObject(balld)){
    //     alert("d");
    // }else if(arrowObj.hitTestObject(balle)){
    //     alert("e");
    // }
// console.log((starty-arrowObj.y)*bowObj.rotate/45+arrowObj.x);



    if(balla.hitTestPoint((starty-arrowObj.y)*bowObj.rotate/45+width/2,arrowObj.y+bowBodyObj.y)){
        clearInterval(ballsmovex);
        clearTimeout(ballsmovey);
        clearInterval(balla.balltime);
        clearInterval(ballb.balltime);
        clearInterval(ballc.balltime);
        clearInterval(balld.balltime);
        clearInterval(balle.balltime);
        // clearInterval(ballsmovex);
        if($(".word span").html()=="5"){
            $(".word span").html(balla.contentChar);
            if(balla.contentChar==gameData[nums[itemnum]]["rubric"]){
                $(".word span").addClass("green");
                itemnum+=1;
                if(itemnum==10){
                    goResult();
                    return;
                }
                setTimeout(function () {
                    itemNum(nums[itemnum]);
                },2000);
            }else{
                $(".word span").addClass("red");
                document.body.className="success";
                goResult();
            }
        }
    }else if(ballb.hitTestPoint((starty-arrowObj.y)*bowObj.rotate/45+width/2,arrowObj.y+bowBodyObj.y)){
        clearInterval(ballsmovex);
        clearTimeout(ballsmovey);
        clearInterval(balla.balltime);
        clearInterval(ballb.balltime);
        clearInterval(ballc.balltime);
        clearInterval(balld.balltime);
        clearInterval(balle.balltime);
        if($(".word span").html()=="5"){
            $(".word span").html(ballb.contentChar);
            if(ballb.contentChar==gameData[nums[itemnum]]["rubric"]){
                $(".word span").addClass("green");
                itemnum+=1;
                if(itemnum==10){
                    goResult();
                    return;
                }
                setTimeout(function () {
                    itemNum(nums[itemnum]);
                },2000);
            }else{

                $(".word span").addClass("red");
                document.body.className="success";
                goResult();
            }
        }
    }else if(ballc.hitTestPoint((starty-arrowObj.y)*bowObj.rotate/45+width/2,arrowObj.y+bowBodyObj.y)){
        clearInterval(ballsmovex);
        clearTimeout(ballsmovey);
        clearInterval(balla.balltime);
        clearInterval(ballb.balltime);
        clearInterval(ballc.balltime);
        clearInterval(balld.balltime);
        clearInterval(balle.balltime);
        if($(".word span").html()=="5"){
            $(".word span").html(ballc.contentChar);
            if(ballc.contentChar==gameData[nums[itemnum]]["rubric"]){
                $(".word span").addClass("green");
                itemnum+=1;
                if(itemnum==10){
                    goResult();
                    return;
                }
                setTimeout(function () {
                    itemNum(nums[itemnum]);
                },2000);
            }else{
                $(".word span").addClass("red");
                document.body.className="success";
                goResult();
            }
        }
    }else if(balld.hitTestPoint((starty-arrowObj.y)*bowObj.rotate/45+width/2,arrowObj.y+bowBodyObj.y)){
        clearInterval(ballsmovex);
        clearTimeout(ballsmovey);
        clearInterval(balla.balltime);
        clearInterval(ballb.balltime);
        clearInterval(ballc.balltime);
        clearInterval(balld.balltime);
        clearInterval(balle.balltime);
        if($(".word span").html()=="5"){
            $(".word span").html(balld.contentChar);
            if(balld.contentChar==gameData[nums[itemnum]]["rubric"]){
                $(".word span").addClass("green");
                itemnum+=1;
                if(itemnum==10){
                    goResult();
                    return;
                }
                setTimeout(function () {
                    itemNum(nums[itemnum]);
                },2000);
            }else{
                $(".word span").addClass("red");
                document.body.className="success";
                goResult();
            }
        }
    }else if(balle.hitTestPoint((starty-arrowObj.y)*bowObj.rotate/45+width/2,arrowObj.y+bowBodyObj.y)){
        clearInterval(ballsmovex);
        clearTimeout(ballsmovey);
        clearInterval(balla.balltime);
        clearInterval(ballb.balltime);
        clearInterval(ballc.balltime);
        clearInterval(balld.balltime);
        clearInterval(balle.balltime);
        if($(".word span").html()=="5"){
            $(".word span").html(balle.contentChar);
            if(balle.contentChar==gameData[nums[itemnum]]["rubric"]){
                $(".word span").addClass("green");
                itemnum+=1;
                if(itemnum==10){
                    goResult();
                    return;
                }
                setTimeout(function () {
                    itemNum(nums[itemnum]);
                },2000);
            }else{
                $(".word span").addClass("red");
                document.body.className="success";
                goResult();
            }
        }
    }

}

function ondown(event){
    oldx=event.offsetX;
    oldy=event.offsetY;
    // linelObj.rotate=23;
    // linerObj.rotate=-23;
    // bowObj.canshoot=true;
    // console.log(bowObj.rotate);
    setCoordinate(event.offsetX,event.offsetY);
}
function setCoordinate(x,y){
    mouseStartX = mouseNowX = x;
    mouseStartY = mouseNowY = y;
    bowObj.downX = bowObj.x;
    bowObj.downY = bowObj.y;
}
function goResult() {
    $(".sucnum").html(itemnum);
    $(".sucdiv p").html(resulttxt[itemnum]);
}


//下载按钮
function down() {
    alert("down");
}
//再来一次
function again() {
    itemnum=0;
    document.body.className="game";nums=[];
    out:for(var i=0 ;i<10;i++){
        var temp=parseInt(Math.random()*50);
        for(var j=0;j<nums.length;j++){
            if(nums[j]==temp){
                i-=1;
                continue out;
            }
        }
        nums.push(temp);
    }
    itemNum(nums[itemnum]);
}




