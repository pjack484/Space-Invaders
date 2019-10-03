var app = {};

function startApp() {
    app.canvas = document.getElementById('canvas');
    app.context = canvas.getContext('2d');

    setupGame();

    window.addEventListener('keydown', myKeyDown, false);

    app.lastTime = window.performance.now();
    window.requestAnimationFrame(frameUpdate);
}

function setupGame() {
    app.hero = {
        position: {
            x: app.canvas.width / 2,
            y: app.canvas.height - 20
        },
        size: {
            width: 30,
            height: 50
        },
        color: "#FFFF00"
    }
    app.bullets = [];
    app.enemies = [];
    spawnEnemies();
}

function frameUpdate(timeStamp) {
    window.requestAnimationFrame(frameUpdate);
    var dt = (timeStamp - app.lastTime) / 1000;
    app.lastTime = timeStamp;
    app.context.fillStyle = "#000020";
    app.context.fillRect(0, 0, app.canvas.width, app.canvas.height);
    drawObject(app.context, app.hero);
    app.bullets.forEach(function (bullet) {
        bullet.position.y -= 400 * dt;
        drawObject(app.context, bullet);
    });
    app.enemies.forEach(function (enemy) {
        enemy.position.y += 40 * dt;
        drawObject(app.context, enemy)
    });
}

function myKeyDown(event) {
    if (event.keyCode === 37 || event.keyCode === 65) {
        leftKeyDownHandler();
    }
    if (event.keyCode === 39 || event.keyCode === 68) {
        rightKeyDownHandler();
    }
    if (event.keyCode === 38 || event.keyCode === 87) {
        fireKeyHandler();
    }
}

function leftKeyDownHandler() {
    app.hero.position.x -= 10;
}

function rightKeyDownHandler() {
    app.hero.position.x += 10;
}

function fireKeyHandler() {
    app.bullets.push({
        position: {
            x: app.hero.position.x,
            y: app.hero.position.y - 25
        },
        size: {
            width: 10,
            height: 10
        },
        color: "#FF0000"
    })
}

function spawnEnemies() {
    for (var i = 0; i < 20; i++) {
        app.enemies.push({
            position: {
                x: Math.random() * app.canvas.width,
                y: Math.random() * app.canvas.height * .25
            },
            size: {
                height: 20,
                width: 20
            },
            color: "#FFFFFF"
        })
    }
}