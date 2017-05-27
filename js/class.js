
function Ball(x,y,radius,let,rotate,color1,color2,ifimg){
    base(this,LSprite,[]);
    var self = this;
    //圆球圆点位置
    self.x = x;
    self.y = y;
    self.contentChar=let;
    self.radius = radius;
    self.shapea = new LShape();
    var box = new LSprite();
    box.addChild(self.shapea);
    self.shapea.graphics.drawArc(2, "#000", [x,y, radius, 0, 2*Math.PI,true],true,color2);

    var shapeb = new LShape();
    box.addChild(shapeb);
    shapeb.graphics.drawArc(0, "#000", [x,y+6, radius, -10*Math.PI/140, 190*Math.PI/180,true],true,color1);

    var shapec = new LShape();
    box.addChild(shapec);
    shapec.graphics.drawArc(0, "#000", [x,y, radius, -10*Math.PI/140, 190*Math.PI/180,false],true,color1);
    // self.graphics.drawArc(0, "#000", [x+1, y+1, 20, 70*Math.PI/180, 260*Math.PI/180,false]);
    var theTextField = new LTextField();
    theTextField.text = let?let:"a";
    theTextField.x = x-0.45*radius;
    theTextField.y = y-0.9*radius;
    theTextField.color = "#4f0047";
    theTextField.size=width*0.1;
    box.addChild(theTextField);
    box.rotate=rotate;
    box.rotatex=x;
    box.rotatey=y;
    theTextField.rotate=rotate-90;
    theTextField.rotatex=0.45*radius;
    theTextField.rotatey=0.9*radius;
    if(!ifimg){
        var ballimgData = new LBitmapData(imglist["line"]);
        var ballimg = new Player(x+0.8*radius,y-0.1*radius,width*0.4,width*2.215,ballimgData,30);
        ballimg.rotate=-rotate;
        ballimg.rotatex=-0.8*radius;
        ballimg.rotatey=0.1*radius;
        box.addChildAt(ballimg);
    }
    self.addChild(box);
    self.shapeDiv=self.addShape(LShape.ARC,[x,y,radius]);
    self.changeLetter=function (charstr) {

        theTextField.text = charstr?charstr:"a";
        self.contentChar=charstr;
    }
    // console.log(self.shapeDiv);
}
function Player(x,y,shootX,shootY,bitmapData,hp){
    base(this,Plain,[x,y,shootX,shootY,bitmapData,hp]);
    var self = this;
    self.belong = "self";
    self.downX = self.downY = 0;
    self.bulletBitmapData=new LBitmapData(imglist["bullet01"]);
}

function Plain(x,y,shootX,shootY,bitmapData,hp){
    base(this,LSprite,[]);
    var self = this;
    //飞机出现位置
    self.x = x;
    self.y = y;
    //炮口相对飞机的相对位置
    self.shootX = shootX;
    self.shootY = shootY;
    //是否射击炮弹
    self.canshoot=false;
    //自动移动控制
    self.move=[0,0];
    //飞机自动移动时的移动速度
    self.speed=1;
    //飞机生命值
    self.hp = hp;
    //飞机是否死亡
    self.isdie=false;
    self.shoopIndex=0;
    //将飞机显示到画面上
    self.bitmap = new LBitmap(bitmapData);
    self.addChild(self.bitmap);
}

/**
 * 循环
 * */
Plain.prototype.onframe = function (){
    var self = this;
    //移动
    self.x += self.move[0]*self.speed;
    self.y += self.move[1]*self.speed;
    //射击
    if(self.canshoot)self.shoot();
};
function Back(x,y){
    base(this,LSprite,[]);
    var self = this;
    //飞机出现位置
    self.x = x;
    self.y = y;
    //是否射击炮弹
    self.canshoot=false;
    //自动移动控制
    self.move=[0,0];
    //飞机自动移动时的移动速度
    self.speed=1;
    // self.graphics.drawRect(1,"#000000",[0,0,100,200],true,"#000000");

    var bitmapData = new LBitmapData("./images/back.png");
    self.bitmap = new LBitmap(bitmapData);
    self.addChild(self.bitmap);
}
