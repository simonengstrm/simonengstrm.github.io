var graphics;
var canvas;
var paused = true;
var menuButtons = [];
var map = [];
var Players = [];
var items = [];
var mapSetup = true;
var killzone;
var background;
var frames = 0;
var testCombatText = [];

var text=false;
var winImage = new Image;

var playButtonImage = new Image;
var instructionsButtonImage = new Image;
var backButtonImage = new Image;
var p1controlsImage = new Image;
var p2controlsImage = new Image;
var BarOverlay1 = new Image;
var BarOverlay2 = new Image;
var Startscreen  = new Image;
var punchSound = [];

var punchSound;
var kickSound;
var missSound;
var backgroundSound;
var gameOverSound;
var p1winSound;
var p2winSound;
var jumpSound;
var enrageSound;
var ciggaretteSound;
var vodkaSound;


var muteButton;
var pauseButton;

//var Player1Idle = ["resources/chad/chadIDLE1.png","resources/chad/chadIDLE2.png"];

function init() {
    canvas = document.getElementById('rityta');
    graphics = canvas.getContext("2d");
    killzone = new Rectangle(-400,-400, 1800, 1500);
    background = new Image;
    background.src = "resources/gameonbakgrund.jpg";    
    
    playButtonImage.src = "resources/gameonknapp1.png";
    instructionsButtonImage.src = "resources/gameonknapp2.png";
    backButtonImage.src = "resources/gameonknapp3.png";
    p1controlsImage.src = "resources/props/p1controls.png";
    p2controlsImage.src = "resources/props/p2controls.png";
    Startscreen.src = "resources/Startscreen.png";

    menuButtons.push(new Button(canvas.width/2-200, canvas.height/2, 'play',playButtonImage));
    menuButtons.push(new Button(canvas.width/2-200, canvas.height/2+100, 'instructions',instructionsButtonImage));
    console.log(menuButtons.length);


    punchSound=new sound("resources/sounds/punch.wav");
    missSound=new sound("resources/sounds/miss.wav");
    backgroundSound=new sound("resources/sounds/soundtrack2.mp3");
    gameOverSound=new sound("resources/sounds/deathSound.mp3");
    p2winSound=new sound("resources/sounds/p2wins.mp3");
    p1winSound=new sound("resources/sounds/p1wins.mp3");
    jumpSound=new sound("resources/sounds/jumpsound.mp3");
    enrageSound = new sound("resources/sounds/enrage.mp3");
    kickSound = new sound("resources/sounds/kick.mp3");
    vodkaSound = new sound("resources/sounds/vodka.mp3");
    ciggaretteSound = new sound("resources/sounds/cigarette.mp3");
    ciggaretteSound.sound.playbackRate=1.5;
    backgroundSound.sound.volume=0.1;


    muteButton=document.getElementById('mute');
    pauseButton=document.getElementById('pause');                    

    muteButton.innerHTML='<img src="resources/soundon.png" />';
    pauseButton.innerHTML='<img src="resources/play.png" />';

    drawAnimation();
}

function gameOver(){
    mapSetup = true;
    displayText();
    setTimeout(displayText, 2000);
}

function update() {
    if (mapSetup) {    
        console.log("resetting map");
        // Resettar alla arrays så att nya object kan initieras
        frames = 1;
        menuButtons = [];
        map=[];
        Players = [];
        items = [];

        //Overlay För bars
        BarOverlay1.src = "resources/BarOverlay.png";
        BarOverlay2.src = "resources/BarOverlayR.png";

        //Map creation
        map.push(new Rectangle(140, canvas.height-110, 715, 50, true));
        createRectangles(canvas.height-210, 130, 50,740,2);
        createRectangles(canvas.height-330,160, 50,175,2);
        createRectangles(canvas.height-420,200,50,600, 2);
        createRectangles(canvas.height-515,175,50,0,1);

        //Item creation
        items.push(new vodkaBottle("vodka", canvas.width/2, 174));

        //Player creation
        Player1 = new Player(30,canvas.height-280,57,102,0);
        Player2 = new Player(canvas.width-100,canvas.height-280,57,102,1);
        Players.push(Player1);
        Players.push(Player2);
        
        mapSetup = false;

    }
    backgroundSound.play();

    if (frames % 1000 == 0 && Math.round(Math.random()) == 0 && items.length < 3) {
        items.push(new vodkaBottle("vodka", canvas.width*Math.random(), 100));
    } else if (frames % 1000 == 0 && Math.round(Math.random()) == 1 && items.length < 3) {
        items.push(new ciggarette("cigg", canvas.width*Math.random(), 100));
    }

    // Död kotnroll
    if (Players[0].dead == true || Players[1].dead == true) {
        if(Players[0].dead == true) {
            winImage.src = "resources/p2Wins.png";
            p2winSound.play();
        } else {
            winImage.src = "resources/p1Wins.png";
            p1winSound.play();
        }
        gameOverSound.play();
        gameOver();
    }
    
    updateBars();

}


function drawAnimation() {
    frames++;
    //console.log(frames);
    graphics.fillStyle = "#000000";
    graphics.drawImage(background,0,0,canvas.width,canvas.height);
    if (!paused) {
        if(text==false){
            update();
        }
        
        for (var i = 0; i < items.length; i++) {
            items[i].draw();
        }

        /*for(var i = 0; i < map.length; i++) {
            map[i].draw();
        }*/

        for(var i=0;i<Players.length;i++){
            Players[i].draw();
        }
        for(var i=0;i<testCombatText.length;i++){
            testCombatText[i].draw();
        }

        graphics.drawImage(BarOverlay1, 0,-7);
        graphics.drawImage(BarOverlay2, canvas.width/2+79,-7);

        if (text == true) {
            killzone.col = "rgba(0,0,0,0.5)";
            console.log(killzone.col);
            killzone.draw();
            graphics.font = "50px Arial";
            graphics.fillStyle = "red";
            graphics.drawImage(winImage, 200,250);
        }
        
    } else {
        backgroundSound.stop2();
        //Menyn
        // Play button: x:mitten-bredd y:mitten-höjd*2; w=400 h=100
        killzone.col = "rgba(0,0,0,0.4)";
        killzone.draw();
        for (i = 0; i < menuButtons.length; i++) {
            if (menuButtons[i].type == 'back' || menuButtons.length == 0) {
                graphics.fillStyle = "#FFFFFF";
                graphics.font = "20px Georgia";
                graphics.fillText("Gopnik McBlyat Ultimate Vodka Storm går ut på att besegra sin motståndare genom att",100, 100)
                graphics.fillText("antingen slå av dem från plattformen eller helt enkelt slå ihjäl sin motståndare.", 100, 125);
                graphics.fillText("Stamina-systemet: Stamina gör så att du inte kan slå eller blockera i all oändlighet.",100, 160);
                graphics.fillText("Stamina-systemet: Håll koll på den blå mätaren så att den inte tar slut!",100, 185);
                graphics.fillText("Testosteron-systemet: Laddar du upp din testosteron nivå tillräckligt mycket, genom",100, 205);
                graphics.fillText("att spela eller dricka vodka, kommer dina attacker att skada mer en kort stund.",100, 230);
                graphics.fillText("Ciggaretter ger dig mer liv. Vodkaflaskor ger dig mer testosteron, dessa hittas på kartan", 100, 255);
                graphics.fillText("då och då.",100, 280);
                graphics.drawImage(p2controlsImage, 50,400);
                graphics.drawImage(p1controlsImage, 550,400)
                graphics.fillText("Music by: https://www.youtube.com/channel/UCz6zvgkf6eKpgqlUZQstOtQ", canvas.width/2-175  , canvas.height-7);

            }
            menuButtons[i].draw();

        }
        if ( menuButtons.length == 0) {
            graphics.fillStyle = "#FFFFFF";
            graphics.font = "20px Arial";
            graphics.fillText("Gopnik McBlyat Ultimate Vodka Storm går ut på att besegra sin motståndare genom att",100, 100)
            graphics.fillText("antingen slå av dem från plattformen eller helt enkelt slå ihjäl sin motståndare.", 100, 125);
            graphics.fillText("Stamina-systemet: Stamina gör så att du inte kan slå eller blockera i all oändlighet.",100, 160);
            graphics.fillText("Stamina-systemet: Håll koll på den blå mätaren så att den inte tar slut!",100, 185);
            graphics.fillText("Testosteron-systemet: Laddar du upp din testosteron nivå tillräckligt mycket, genom",100, 205);
            graphics.fillText("att spela eller dricka vodka, kommer dina attacker att skada mer en kort stund.",100, 230);
            graphics.fillText("Ciggaretter ger dig mer liv. Vodkaflaskor ger dig mer testosteron, dessa hittas på kartan", 100, 255);
            graphics.fillText("då och då.",100, 280);
            graphics.drawImage(p1controlsImage, 50,400);
            graphics.drawImage(p2controlsImage, 550,400);
            graphics.font = "50px Arial";      
            graphics.fillStyle = "#a3101a";         
            graphics.fillText("PAUSAT",400,60);
            graphics.fillStyle = "#FFFFFF";
            graphics.font = "20px Georgia";
            graphics.fillText("Music by: https://www.youtube.com/channel/UCz6zvgkf6eKpgqlUZQstOtQ", canvas.width/2-175  , canvas.height-7);

        } else if (menuButtons.length == 2){
            graphics.drawImage(Startscreen, 330,40, 350,300);
        }
                
    }
    menuButtons.length == 0
    window.requestAnimationFrame(drawAnimation);

}


function sound(src) {

    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
        this.sound.currentTime = 0;
    }
    this.stop2 = function(){
        this.sound.pause();
        
    }
}

class combatText {
    constructor(playerNumber, value) {
        this.playerNr = playerNumber;
        this.value = value;
        this.x = Players[this.playerNr].x+55;
        this.y = Players[this.playerNr].y-10;
        this.vy = 0.2;
        this.alpha = 1;
    }

    update() {
        //this.x=Players[this.playerNr].x+55;
        //this.y = Players[this.playerNr].y-10;
        this.alpha-=0.05;
        this.y-=this.vy;
    }

    draw() {
        this.update();
        graphics.font = "bold 16px Arial";
        graphics.fillStyle = "rgba(200,10,10,"+this.alpha+")";
        graphics.fillText(this.value,this.x,this.y);                                                
    }    
}


class Player {
    constructor(x,y,w,h,playerNumber) {
        this.hp = 500;
        this.stamina = 100;
        this.testosteron = 20;
        this.x=x;
        this.y=y;
        this.w = w;
        this.h = h;        
        this.vx = 0;
        this.vy = 0;
        this.ay = 0.5100005325;
        this.ax = 0;
        this.dead=false;
        this.playerNumber = playerNumber;
        
        this.punched = false;
        this.punchingFrames = 0;
        this.kickFrames = 0;

        //Damage variables
        this.punchDamage = 20;
        this.kickDamage = 50;
        this.punchDrain = 5;
        this.kickDrain = 10;
        this.damageFactor = 1;
        

        this.left=false;
        this.right=false;
        this.jump=false;
        this.down=false;
        
        this.isBlocking=false;
        this.inAction = false;
        this.isEnraged = false;
        this.recoverFrames=0;

        this.animationIndexChanger = 1;

        if (this.playerNumber == 0) {
            this.HPBar = new Rectangle(80,50,400,10,false,"#FF0000");
            this.staminaBar = new Rectangle(83,62,150,6,false,"#0000FF");
            this.testosteronBar = new Rectangle(83,73,200,8,false,"#ff8100");

            this.direction=1;
            // P1 Animations 
            this.PlayerIdle = ["resources/chad/IDLE/chadIDLE1.png","resources/chad/IDLE/chadIDLE2.png"];
            this.PlayerPunch = ["resources/chad/PUNCH/chadPUNCHEnraged.png","resources/chad/PUNCH/chadPUNCH.png","resources/chad/IDLE/chadIDLE1.png"];
            this.PlayerKick = ["resources/chad/KICK/chadKICK1.png","resources/chad/KICK/chadKICK2.png","resources/chad/KICK/chadKICK3.png"];
            this.PlayerBlock = ["resources/chad/BLOCK/chadBLOCK.png"];
            this.PlayerRun = ["resources/chad/RUN/chadRUN1.png", "resources/chad/RUN/chadRUN2.png", "resources/chad/RUN/chadRUN3.png"]
            this.PlayerJump = ["resources/chad/JUMP/chadJUMP.png"];
            this.PlayerDead = ["resources/chad/DEAD/chadDEAD.png", "resources/chad/DEAD/chadDEAD2.png"];
            this.img = new Image;
            this.animationIndex=0;
            this.img.src = this.PlayerIdle[this.animationIndex];
            

        } else if (this.playerNumber == 1) {
            this.HPBar = new Rectangle(canvas.width-80+7,50,-400,10,false,"#FF0000");
            this.staminaBar = new Rectangle(canvas.width-83+8,61,-150,8,false,"#0000FF");
            this.testosteronBar = new Rectangle(canvas.width-83+7,72,-200,9,false,"#ff8100");

            this.direction=0;
            // P1 Animations
            this.PlayerIdle = ["resources/ryss/IDLE/ryssIDLE1.png","resources/ryss/IDLE/ryssIDLE2.png"];
            this.PlayerPunch = ["resources/ryss/PUNCH/ryssPUNCHEnraged.png","resources/ryss/PUNCH/ryssPUNCH.png","resources/ryss/IDLE/ryssIDLE1.png"];
            this.PlayerKick = ["resources/ryss/KICK/ryssKICK1.png","resources/ryss/KICK/ryssKICK2.png","resources/ryss/KICK/ryssKICK3.png"];
            this.PlayerBlock = ["resources/ryss/BLOCK/ryssBLOCK.png"];
            this.PlayerRun = ["resources/ryss/RUN/ryssRUN1.png","resources/ryss/RUN/ryssRUN2.png","resources/ryss/RUN/ryssRUN3.png"]
            this.PlayerJump = ["resources/ryss/JUMP/ryssJUMP.png"];    
            this.PlayerDead = ["resources/ryss/DEAD/ryssDEAD.png", "resources/ryss/DEAD/ryssDEAD2.png"];        
            this.img = new Image;
            this.animationIndex=0;
            this.img.src = this.PlayerIdle[this.animationIndex];
            
        }
        this.updateTestosteronBar();

    }

    checkCollision() {  
        for (var i = 0; i < map.length; i++) {
            if (intersect(this.x+40,this.y+70,map[i].x,map[i].y,this.w-20,this.h-70, map[i].w, map[i].h/12) && this.vy>0) {
                if(this.down == false || map[i].isFloor == true){
                    this.vy = 0;
                    this.y = map[i].y-this.h;
                    this.punched=false;            
                }
               //graphics.fillRect(this.x+40,this.y+70,this.w-20,this.h-70);
            }

        }

        // Kollar intersect mot items
        for(var i = 0; i < items.length; i++) {
            if(intersect(this.x,this.y,items[i].x, items[i].y-items[i].h,this.w,this.h,items[i].w,items[i].h)) {
                items[i].consume(this.playerNumber);
                items.splice(i, 1);
            }
        }

        // Intersect mot killzone
        if (!intersect(this.x,this.y,killzone.x,killzone.y,this.w,this.h,killzone.w, killzone.h)) {
            this.dead = true;
            //gameOver();
        }
    }

    updatePosition() {
        
        this.checkCollision();

        // inAction är en sammanfattande boolean som gör att vi behöver skriva mindre på vissa ställen
        if (this.isBlocking || this.punchingFrames > 0 || this.kickFrames > 0) {
            this.inAction = true;
        }
        if (this.isBlocking == false && this.punchingFrames <= 0 && this.kickFrames <= 0) {
            this.inAction = false;
        }
        
        // Denna hanterar movement i sidleds
        if(this.left){
            if(this.vx>-6){
                this.vx-=1;
            }
        }
        if(this.right){
            if(this.vx<6){
                this.vx+=1;  
            }      
        }

        // Stamina countas ner om man blockar
        if (this.isBlocking && this.stamina>=0.6) {
            this.stamina -= 0.5;
        }

        // Stunnen countas ner
        if(this.recoverFrames>0){
            this.recoverFrames--;
        }
        // Man saktas ner i knockbacken om man inte är stunnad
        if (this.punched) {
        
        }
        else if (!this.right && !this.left) {
            this.vx *= 0.8;
        }
        // Hopp
        if(this.jump && this.vy==0){
            this.vy=-12;
            
            jumpSound.stop();
            jumpSound.sound.currentTime=0.2;
            jumpSound.play();
        }

        // Del av denna funktion är flyttad till en annan
        this.standingStill();
       
        // Denna if sätter igång en köad action (kick/punch)
        if (this.punchingFrames > 0 && this.isBlocking == false) {
            this.punch();
            if (this.vy == 0) {
                this.vx *= 0.6;
            }
        } else if (this.kickFrames > 0 && this.isBlocking == false) {
            this.kick();
            if (this.vy == 0) {
                this.vx *= 0.6;
            }
        }
        // Kalkylationen av den nya positionen.
            this.vy += this.ay;
            this.vx += this.ax;
            this.x += this.vx;
            this.y += this.vy;
        
        //animation
        this.animation();

    }


    animation(){
        // Alla ifs under styr vilka animationer som visas. Vissa har counters som ändrar vilken frame som ska visas.
        if(this.isBlocking == true) {
            this.img.src = this.PlayerBlock[0];

        }else if (this.dead == true) {
            this.w = 75*1.6;
            this.h = 37*1.6;
            for(var i=0;i<Players.length;i++){
                if(this!=Players[i]){
                    if(Players[i].direction==0){
                        if(this.direction==0){
                            this.img.src = this.PlayerDead[1];
                        }
                        else{
                            this.img.src = this.PlayerDead[0];
                        }
                        
                    }
                    else{
                        if(this.direction==0){
                            this.img.src = this.PlayerDead[0];
                        }
                        else{
                            this.img.src = this.PlayerDead[1];
                        }
                    }
                }
            }

        }else if(this.jump == true) {
            this.w = 45;
            this.img.src = this.PlayerJump[0];
        }
        else if (frames % 8 == 0 && (this.left == true || this.right == true) && this.inAction == false) {
            this.w = 57;
            this.img.src = this.PlayerRun[this.animationIndex];
            console.log(this.animationIndex);
            if (this.animationIndex == this.PlayerRun.length-1) {
                this.animationIndexChanger = -1;
            } else if (this.animationIndex == 0) {
                this.animationIndexChanger = 1;
            }   

            this.animationIndex+=this.animationIndexChanger;
        }
        else if (frames % 20 == 0 && this.punchingFrames == 0 && this.kickFrames == 0 && (this.left == false && this.right == false)) {
            this.w = 57;
            if (this.animationIndex == 2)
                this.animationIndex--;
            //console.log(this.animationIndex);
            this.img.src = this.PlayerIdle[this.animationIndex];
            if (this.animationIndex == 1) {
                this.animationIndex--;
                
            } else if (this.animationIndex == 0) {
                this.animationIndex++;
            }
        } else if (this.punchingFrames < 8 && this.punchingFrames > 3) {
            //console.log("Visar punch på spelare"+this.playerNumber);
            if (this.isEnraged == false) {
                this.img.src = this.PlayerPunch[1];
                this.w = 66;
                console.log("Visar punch på spelare"+this.playerNumber);
            } else {
                this.img.src = this.PlayerPunch[0];
                this.w = 66;
            }
        }else if (this.punchingFrames ==1) {
            this.img.src = this.PlayerPunch[2];
        }

        else if (this.kickFrames > 14 && this.kickFrames < 21) {
            if (this.isEnraged == false) {
                this.img.src = this.PlayerKick[0];
                this.w = 66;
            } else {
                this.img.src = this.PlayerKick[0];
                this.w = 66;
            }
        }
        else if (this.kickFrames > 13 && this.kickFrames < 16) {
            if (this.isEnraged == false) {
                this.img.src = this.PlayerKick[1];
                this.w = 66;
            } else {
                this.img.src = this.PlayerKick[1];
                this.w = 66;
            }
        }
        else if (this.kickFrames > 8 && this.kickFrames < 14) {
            if (this.isEnraged == false) {
                this.img.src = this.PlayerKick[2];
                this.w = 66;
            } else {
                this.img.src = this.PlayerKick[2];
                this.w = 66;
            }
        }
        
    }

    standingStill(){
        
        // Kickar igång enrage
        if (this.testosteron >= 100) {
            this.testosteron = 100;
            this.isEnraged = true;
            enrageSound.stop();
            enrageSound.play();
            if (this.playerNumber == 0) {
                BarOverlay1.src = "resources/BarOverlayEnraged.png";
            } else {
               // this.x-=10;
                BarOverlay2.src = "resources/BarOverlayEnragedR.png";
            }
        }
        // Säger vad som gäller för spelaren om den är enraged
        if (this.isEnraged == true) {
            this.stamina=100;
            this.damageFactor = 2;
            if (this.testosteron > 0) {
                this.testosteron-=0.1;
            } else {
                this.damageFactor=0;
                this.isEnraged = false;
                if (this.playerNumber == 0) {
                    BarOverlay1.src = "resources/BarOverlay.png";
                } else if (this.playerNumber = 1) {
                   // this.x+=10;
                    BarOverlay2.src = "resources/BarOverlayR.png";
                }
            } // Regen/deregen av testo/stamina beroende på movement
        } else if (this.isBlocking == false && this.vy == 0 && this.inAction == false) {
            if (this.left == false && this.right == false) { 
                if (this.stamina < 100)
                    this.stamina += 0.3;
                if (this.testosteron > 0.1)
                    this.testosteron -= 0.05;
                    
            }else{
                if (this.stamina < 100)
                    this.stamina += 0.15;
                if (this.testosteron > 0.05)
                    this.testosteron -= 0.03;
            }     
        }
    }


    punch() {
        if(this.direction==0){
            var punchRect = new Rectangle(this.x-this.w, this.y, this.w, 40);
        } else {
            var punchRect = new Rectangle(this.x+this.w, this.y, this.w, 40);
        }
        // Kontrollerar hitboxen när det har gått 5 frames så att man har en delay på 10 frames innan man kan göra ngt annat
        if (this.punchingFrames == 10) {
            this.stamina -= 17;
            for(var i = 0; i < Players.length; i++) {
                if (this != Players[i]) {
                    if (intersect(punchRect.x,punchRect.y,Players[i].x,Players[i].y,punchRect.w, punchRect.h,Players[i].w,Players[i].h) ) {
                        
                        punchSound.stop();
                        punchSound.play();
                        if (this.isEnraged == false)
                            this.testosteron +=6;

                        if(Players[i].isBlocking == false || this.direction == Players[i].direction){
                            Players[i].vx*=0.4;
                            Players[i].vy*=0.4;
                            Players[i].hit();
                            Players[i].recoverFrames+=10;

                            if (Players[i].isEnraged == false)
                                Players[i].testosteron += 10;

                            if(this.direction==0){
                                Players[i].left=false;
                                Players[i].right=false;
                                Players[i].vx-=10;
                                Players[i].vy-=0.2;
                                Players[i].y-=1;
                            }
                            if(this.direction==1){
                                Players[i].left=false;
                                Players[i].right=false;
                                Players[i].vx+=10;
                                Players[i].vy-=0.2;
                                Players[i].y-=1;
                            }
                            Players[i].hp-=this.punchDamage*this.damageFactor;
                            testCombatText.push(new combatText(i, this.punchDamage));

                            if (this.stamina > this.punchDrain)
                                Players[i].stamina-=this.punchDrain;
                        //Beroende på vilket håll man blockar åt så får blocken faktiskt funktion, samma för kick                                                  
                        }else if (Players[i].isBlocking == true && this.direction != Players[i].direction){
                            if(this.direction==0){
                                Players[i].vx-=2;
                                this.vx+=25;
                                this.recoverFrames = 15;
                            }
                            if(this.direction==1){
                                Players[i].vx+=2;
                                this.vx-=25;
                                this.recoverFrames = 15;
                            }
                            Players[i].hp -= this.punchDamage/4*this.damageFactor;
                            testCombatText.push(new combatText(i, this.punchDamage/4));
                            if (this.stamina > this.punchDrain/3)
                                Players[i].stamina -= this.punchDrain/3;                                                                                                                                             
                        }
                        
                    }
                    else {
                        //punchSound.stop();
                        missSound.stop();
                        missSound.play();
                    }
                } 
            }
        }
        
        this.punchingFrames--;
    }

    kick() {
        if(this.direction==0){
            var kickRect = new Rectangle(this.x-this.w, this.y, this.w, this.h);
        } else {
            var kickRect = new Rectangle(this.x+this.w, this.y, this.w, this.h);
        }
        // Kontrollerar hitboxen när det har gått 10 frames så att man har en delay innan man kan göra ngt annat
        if (this.kickFrames == 10) {
            this.stamina -= 35;
            for(var i = 0; i < Players.length; i++) {
                if (this != Players[i]) {
                    if (intersect(kickRect.x,kickRect.y,Players[i].x,Players[i].y,kickRect.w, kickRect.h,Players[i].w,Players[i].h)) {
                        //missSound.stop();
                        kickSound.stop();
                        kickSound.play();
                        if (this.isEnraged == false)
                            this.testosteron += 8;

                        if(Players[i].isBlocking == false || this.direction == Players[i].direction){
                            Players[i].vx*=0.4;
                            Players[i].vy*=0.4;
                            Players[i].hit();
                            Players[i].recoverFrames+=45;

                            if(Players[i].isEnraged == false)                            
                                Players[i].testosteron += 15;

                            if(this.direction==0){
                                Players[i].left=false;
                                Players[i].right=false;
                                Players[i].vx-=3;
                                Players[i].vy-=10;
                                Players[i].y-=1;
                            }
                            if(this.direction==1){
                                Players[i].left=false;
                                Players[i].right=false;
                                Players[i].vx+=3;
                                Players[i].vy-=10;
                                Players[i].y-=1;
                            }
                            Players[i].hp -= this.kickDamage*this.damageFactor;
                            testCombatText.push(new combatText(i, this.kickDamage));
                            if (this.stamina > this.kickDrain)
                                Players[i].stamina -= this.kickDrain;
                        }else if (Players[i].isBlocking == true && Players[i].direction != this.direction){
                            if(this.direction==0){
                                Players[i].vx-=6;
                            }
                            if(this.direction==1){
                                Players[i].vx+=6;
                            } 
                            Players[i].hp -= this.kickDamage/4*this.damageFactor;
                            testCombatText.push(new combatText(i, this.kickDamage/4));
                            if (this.stamina > this.kickDrain/3)
                                Players[i].stamina -= this.kickDrain/3;
                        }
                        
                    }
                    else {
                        //punchSound.stop();
                        missSound.stop();
                        missSound.play();
                    }
                }
            }
        }
        this.kickFrames--;
    }

    // Lägger en stun och interupptar en när man blir slagen. EX: punchar man så kommer den att avbrytas när man blir slagen/sparkad
    hit() {
        this.punched = true;
        this.punchingFrames=0;
        this.kickFrames=0;
    }
     
    draw() {
              
        //flippar bilden rätt så vi itne behöver göra alla animationer åt både höger/vänster
        if(this.direction==0){
            graphics.save();
            graphics.translate((this.x+this.w/2),0);
            graphics.scale(-1,1);
            graphics.translate((-this.w),0);
            graphics.drawImage(this.img,0,this.y,this.w,this.h);
            graphics.restore();
        }
        else{
            graphics.save();
            graphics.translate((this.x+this.w/2),0);
            graphics.drawImage(this.img,0,this.y,this.w,this.h);
            graphics.restore();
        }

        this.updatePosition();
// uppdaterar alla bars
        this.HPBar.draw();
        this.staminaBar.draw(); 
        this.testosteronBar.draw();
    }

//Barens längder beror procentuellt på hur mycket man har i det värdet jämfört med det totala värdet-
//För de vänstra barsen sätter vi en negativ width, det förenklar kalkylen så att man kan minska bredden på båda sidor på samma sätt
    updateHPBar(){
        
        if (this.playerNumber == 0) {
            var procent = this.hp/500;
            var originalWidth = 326;
            var newWidth = originalWidth*procent;
            this.HPBar.w = newWidth;
        } else if (this.playerNumber == 1) {
            var procent = this.hp/500;
            var originalWidth = -326;
            var newWidth = originalWidth*procent;
            this.HPBar.w = newWidth;
        }
        if (this.hp <= 0) {
            this.dead = true;
        }
    }

    updateStaminaBar() {
        if (this.playerNumber == 0) {
            var procent = this.stamina/100;
            var originalWidth = 155;
            var newWidth = originalWidth*procent;
            this.staminaBar.w = newWidth;
        } else if (this.playerNumber == 1) {
            var procent = this.stamina/100;
            var originalWidth = -155;
            var newWidth = originalWidth*procent;
            this.staminaBar.w = newWidth;
        }
    }


    updateTestosteronBar() {
        if (this.playerNumber == 0) {
            var procent = this.testosteron/100;
            var originalWidth = 155;
            var newWidth = originalWidth*procent;
            this.testosteronBar.w = newWidth;
        } else if (this.playerNumber == 1) {
            var procent = this.testosteron/100;
            var originalWidth = -155;
            var newWidth = originalWidth*procent;
            this.testosteronBar.w = newWidth;
        }
    }

}
// Huvudklass för alla items
class Item {
    constructor(type,imgsrc,x,y) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.vy = 1;
        this.img = new Image;
        this.img.src = imgsrc;
        this.w = this.img.width;
        this.h = this.img.height;
    }

    move() {
        for (var i = 0; i < map.length; i++) {
            if (intersect(this.x, this.y-this.h, map[i].x, map[i].y, this.w, this.h, map[i].w, map[i].h)) {
                this.vy = 0;
            }
        }
        this.y += this.vy;
    }

    draw(){
        this.move();
        graphics.drawImage(this.img,this.x,this.y-this.h);
    }

}

class vodkaBottle extends Item {
    constructor(type,x,y) {
        super(type,"resources/props/vodkaBottle.png",x,y);
        this.testosteronValue = 50;
    }

    consume(playerNumber) {
        vodkaSound.stop();
        vodkaSound.play();
        if (100 < Players[playerNumber].testosteron+this.testosteronValue) {
            Players[playerNumber].testosteron = 100;
        } else {
            Players[playerNumber].testosteron += this.testosteronValue;
        }
    }
}

class ciggarette extends Item {
    constructor(type,x,y) {
        super(type, "resources/props/cigg.png", x, y);
        this.hpValue = 100;
    }

    consume (playerNumber) {
        ciggaretteSound.stop();
        ciggaretteSound.play();
        if (500 < Players[playerNumber].hp+this.hpValue) {
            Players[playerNumber].hp == 500;
        } else {
            Players[playerNumber].hp += this.hpValue;
        }    
    }
}

function updateBars() { 
    for (var i = 0; i < Players.length; i++) {
        Players[i].updateHPBar();
        Players[i].updateStaminaBar();
        Players[i].updateTestosteronBar();
    }
}
// Denna funktion gör så att mapcreation blir enklare, istället för att göra alla rektanglar individuellt så speglar denna funktion och sätter
//ut flera (om man vill det) och gör dem symmetriska;
function createRectangles(y,w,h,distance,amount){

    var width=w*amount+distance*(amount-1);
    var center=((canvas.width/2)-(width/2));
    for(var i=0;i<amount;i++){
        map.push(new Rectangle(center+(i*distance)+(w*i), y, w, h, false));
    }
}

// FUL klass för buttons i meny osv.
class Button {
    constructor(x,y, type, img) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = 400;
        this.h = 75;
        this.type = type;
    }

    onclick() {

        if (this.type == 'play') {
            console.log(paused);
            paused = false;
        } else if(this.type == 'instructions') {
            console.log(this.type);
            for (var i = 0; i < menuButtons.length+1; i++) {
                menuButtons.pop();
            }   
            console.log(menuButtons.length);
            menuButtons.push(new Button(canvas.width/2-200, canvas.height-100, 'back', backButtonImage));
        } else if(this.type == 'back') {
            menuButtons.pop();
            menuButtons.push(new Button(canvas.width/2-200, canvas.height/2, 'play', playButtonImage));
            menuButtons.push(new Button(canvas.width/2-200, canvas.height/2+100, 'instructions', instructionsButtonImage));
        }
    }

    draw() {
        graphics.drawImage(this.img,this.x,this.y, this.w, this.h)
    }
}


function pauseGame() {
    if (paused) {
        pauseButton.innerHTML='<img src="resources/pause.png" />';        
        paused = false;
    } else {
        paused = true;
        pauseButton.innerHTML='<img src="resources/play.png" />';
    }
}

// Kollisionsmetoden
function intersect(x,y,x2,y2,w1,h1,w2,h2){
    if(x+w1>=x2 && x<=x2+w2){
        if(y+h1>=y2 && y<=y2+h2){
            return true;
        }
    }
    return false;
}

// Map rektanglarnas klass
class Rectangle{
    constructor(x,y,w,h,isFloor, col){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.isFloor = isFloor;
        this.vx = 1;
        this.vy = 1;
        this.col = col;
    }

    draw(){
        graphics.fillStyle=this.col;
        graphics.fillRect(this.x,this.y,this.w,this.h);
    }
    move(){
        this.x+=this.vx;
        this.y+=this.vy;
    }
}

// mouselistenern
onmouseup=function(e){
    let x=e.clientX;
    let y=e.clientY;   
    x-=255;
    y-=30;
    if (paused) {
        for(var i=0;i<menuButtons.length;i++){
            if(x>=menuButtons[i].x && x<=menuButtons[i].x+menuButtons[i].w){
                if(y>=menuButtons[i].y && y<=menuButtons[i].y+menuButtons[i].h){
                    console.log(menuButtons[i].type);
                    menuButtons[i].onclick();
                }
            }
        }
    }
}

//https://keycode.info/

onkeydown=function(e) {
    var key = e.key.toUpperCase();

    //Player1, ifs som låser movements på man inte kan inte kan röra sig i vissa fall, ex om man blockar eller någon har dött, och om
    //man är stunnad. Samma gäller för player 2
    if (Players[0].recoverFrames > 0 || Players[0].isBlocking || Players[0].dead == true || Players[1].dead == true) {

    } else {

        // Movement
        if(key == 'W') {
            Players[0].jump=true;
        }
        if(key == 'S') {
            Players[0].down=true;
        }
        if(key == 'A') {
            Players[0].left = true;
            Players[0].right = false;
            Players[0].direction=0; 
        }if (key == 'D') {
            Players[0].right = true;
            Players[0].left = false;
            Players[0].direction=1;
        }

        // Actions, kan inte göra något om man redan utför en action
        if (Players[0].inAction==false) {
            if (key == 'C' && Players[0].stamina > 10) {
                // Köar en punch action
                Players[0].punchingFrames = 15;
                if (Players[0].vy == 0) {
                    Players[0].vx = 0;
                }
            }
            // Köar en kick action
            if (key == 'V' && Players[0].stamina > 35) {
                Players[0].kickFrames = 20;
                if (Players[0].vy == 0) {
                    Players[0].vx = 0;
                }
            }
            // Blockar
            if (key == 'B' && Players[0].inAction==false && Players[0].stamina>5) {
                Players[0].left = false;
                Players[0].right = false;
                Players[0].isBlocking = true;
            }
        }
    }
    
    
    //Player2
    if (Players[1].recoverFrames > 0 || Players[1].isBlocking || Players[0].dead == true || Players[1].dead == true) {

    } else {

        // Movement
        if (key == 'ARROWLEFT') {
            Players[1].left = true;
            Players[1].right = false;  
            Players[1].direction=0;      
        }if (key == 'ARROWRIGHT') {
            Players[1].right = true;
            Players[1].left = false;   
            Players[1].direction=1;   
        }
        if(key == 'ARROWUP') {
            Players[1].jump=true;
        }
        if(key == 'ARROWDOWN') {
            Players[1].down=true;
        }

        // Actions
        
        if (Players[1].inAction==false) {
            if (key == 'I' && Players[1].stamina > 10) {
                Players[1].punchingFrames = 15;
                if (Players[1].vy == 0) {
                    Players[1].vx = 0;
                }
            }
            if (key == 'O' && Players[1].stamina > 35) {
                Players[1].kickFrames = 20;
                if (Players[1].vy == 0) {
                    Players[1].vx = 0;
                }
            }
            if (key == 'P' && Players[1].inAction==false  && Players[1].stamina>5) {
                Players[1].left = false;
                Players[1].right = false;
                Players[1].isBlocking = true;
            }
        }
    }

}

// Key up för actions/movements
onkeyup=function(e) {
    var key = e.key.toUpperCase();
    if(key == 'W') { 
        Players[0].jump=false;
    }
    if(key == 'S') {
        Players[0].down=false;
    }
    if(key == 'A') {
        Players[0].left = false;
    }if (key == 'D') {
        Players[0].right = false;
    }if (key == 'ARROWLEFT') {
        Players[1].left = false;        
    }if (key == 'ARROWRIGHT') {
        Players[1].right = false;        
    }
    if(key == 'ARROWUP') {
        Players[1].jump=false;
        
    }
    if(key == 'ARROWDOWN') {
        Players[1].down=false;
    }
    if (key == 'B') {
        Players[0].isBlocking = false;
    }
    if (key == 'P') {
        Players[1].isBlocking = false;
    }
}

// Dessa två funktioner fungerar typ som pausen, den är en funktion som växlar
function displayText() {
    if (text == true) {
        text = false;
    } else {
        text = true;
    }
}

function muteMusic() {
    if (backgroundSound.sound.volume > 0) {
        backgroundSound.sound.volume = 0;
        muteButton.innerHTML='<img src="resources/muted.png" />';                
    } else if (backgroundSound.sound.volume == 0) {
        backgroundSound.sound.volume = 0.1;
        muteButton.innerHTML='<img src="resources/soundon.png" />';        
    }
}