var score = 0;

var ball, bullet, bulletIcon, enemy, enemyBullet, explosive, heart, player;

var ballImg, bulletImg, bulletIconImg, enemyImg, enemyBulletImg, explosiveImg, heartImg, playerImg;

var background, backgroundImg;

var life = 5;

var gameState = 1;

function preload() {
    ballImg = loadImage("assets/ball.png")
    bulletImg = loadImage("assets/bullet.png");
    bulletIconImg = loadImage("assets/bulleticon.png");
    enemyImg = loadImage("assets/enemy.png");
    enemyBulletImg = loadImage("assets/enemybullet.png");
    explosiveImg = loadImage("assets/explosive.png")
    heartImg = loadImage("assets/heart.png");
    playerImg = loadImage("assets/spaceship.png");
    backgroundImg = loadImage("assets/background.jpg");
}

function setup() {
    createCanvas(1000,600);

    player = createSprite(500,525,75,75);
    player.addImage(playerImg);
    player.scale=0.2;
    player.debug = true
    player.setCollider("rectangle",0,0,200,600)

    enemy = createSprite(500,50,25,25);
    enemy.addImage(enemyImg);
    enemy.scale=0.2;
    enemy.debug = true
    enemy.setCollider("rectangle",0,0,300,500)

    bulletGroup = new Group();
    explosiveGroup = new Group();
}

function draw () {
    background(backgroundImg);
    
    if(gameState===1){

        edges = createEdgeSprites();
        enemy.bounceOff(edges);

        player.x=mouseX

        if(keyWentDown("space")){
            fireBullet();
        }

        if(bulletGroup.isTouching(enemy)){
            enemy.destroy();
        }

        if(frameCount % 150 === 0){
            fireExplosive();
        }

        if(frameCount % 60 === 0)
        enemy.velocityX = random(-50,50)
    }


    drawSprites();
}

function fireBullet() {
    bullet = createSprite(player.x,player.y)
    bullet.addImage(bulletImg)
    bullet.scale = 0.1
    bullet.velocityY = -15
    bulletGroup.add(bullet)
    bullet.debug = true
    bullet.setCollider("rectangle",0,0,100,200)

    player.depth = bullet.depth
    player.depth = player.depth + 1
}

function fireExplosive() {
    explosive = createSprite(enemy.x,enemy.y)
    explosive.addImage(explosiveImg)
    explosive.scale = 0.05
    explosive.velocityY = 5
    explosiveGroup.add(explosive)
    explosive.debug = true
    explosive.setCollider("circle",-250,250,500)

    enemy.depth = explosive.depth
    enemy.depth = enemy.depth + 1
}
