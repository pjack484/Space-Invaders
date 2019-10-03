// create index.html, basic website
<html>

    <head>
        <title>TDD Game</title>
    </head>

    <body onload="startApp()">
        <canvas id="canvas" width="500" height="800"></canvas>
        <script type="text/javascript" src="game.js"></script>
        <script type="text/javascript" src="helper.js"></script>
    </body>

</html>

//create game.js
var app = {};

function startApp() {
    app.canvas = document.getElementById('canvas');
    app.context = canvas.getContext('2d');
    app.context.fillStyle = "#000020";
    app.context.fillRect(0, 0, app.canvas.width, app.canvas.height);
}

//should be able to see the canvas.  Now we want to add a hero.  lets start with a test
//create game.spec.js, and create first test
describe('TDD game', () => {
    it('should spawn a hero', () => {
        app.canvas = { width: 100, height: 200 };
        setupGame();
        let hero = {
            position: {
                x: 50,
                y: 180
            },
            size: {
                width: 30,
                height: 50
            },
            color: "#FFFF00"
        }
        expect(hero).toEqual(app.hero);
    });
});

//create function setupGame() and call it at end of startApp method

function setupGame() {
    app.hero = {
        position: {
            x: 50,
            y: 180
        },
        size: {
            width: 30,
            height: 50
        },
        color: "#FFFF00"
    }
}

//lets visually see where its drawing the hero
function startApp() {
    app.canvas = document.getElementById('canvas');
    app.context = canvas.getContext('2d');

    setupGame();

    app.context.fillStyle = "#000020";
    app.context.fillRect(0, 0, app.canvas.width, app.canvas.height);
    drawObject(app.context, app.hero);
}

//we want the hero to always spawn near the bottom and in the middle so lets write a second test
it('should spawn a hero in middle of the game', () => {
    app.canvas = { width: 200, height: 300 };
    setupGame();
    let hero = {
        position: {
            x: 100,
            y: 280
        },
        size: {
            width: 30,
            height: 50
        },
        color: "#FFFF00"
    }
    expect(app.hero).toEqual(hero);
});

//we could try and change to new hardcoded values but then we would fail out first test.  We have to dynamicaly solve the problem
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
}

//we are going to try and add animation which is really just drawing the scene a lot of times really quickly
//add to startApp()
app.lastTime = window.performance.now();
window.requestAnimationFrame(frameUpdate);

//add new function
function frameUpdate() {
    console.log("update")
    window.requestAnimationFrame(frameUpdate);
    app.context.fillStyle = "#000020";
    app.context.fillRect(0, 0, app.canvas.width, app.canvas.height);
    drawObject(app.context, app.hero);
}

//now we need a way of having the hero move a direction lets start with moving left
//first we need to listen for a key to be pressed
function startApp() {
    app.canvas = document.getElementById('canvas');
    app.context = canvas.getContext('2d');

    setupGame();

    window.addEventListener('keydown', myKeyDown, false);

    app.lastTime = window.performance.now();
    window.requestAnimationFrame(frameUpdate);
}

//that will call my function myKeyDown everytime a key is pressed
//we want this function to call our method leftKeyDownHandler when withe the a or left key is pressed
function myKeyDown(event) {
    if (event.keyCode === 37 || event.keyCode === 65) {
        leftKeyDownHandler();
    }
}

//we want this method to move our hero 10 pixels to the left so lets write a test
it('should move hero left 10 pixels', () => {
    app.canvas = { width: 200, height: 300 };
    setupGame();
    leftKeyDownHandler()
    expect(app.hero.position.x).toEqual(90);
});

//make the test pass
function leftKeyDownHandler() {
    app.hero.position.x = 90;
}

//you can see that the hero is getting drawn in the same place everytime

//write another test to make the test dynamic
it('should move hero left 10 pixels on a bigger board', () => {
    app.canvas = { width: 400, height: 600 };
    setupGame();
    leftKeyDownHandler()
    expect(app.hero.position.x).toEqual(190);
});

//make the test pass
function leftKeyDownHandler() {
    app.hero.position.x -= 10;
}

//you should now be able to move left
//ok lets deal with moving right

it('should move hero right 10 pixels', () => {
    app.canvas = { width: 200, height: 300 };
    setupGame();
    rightKeyDownHandler()
    expect(app.hero.position.x).toEqual(110);
});

//add listener to the new keys
function myKeyDown(event) {
    if (event.keyCode === 37 || event.keyCode === 65) {
        leftKeyDownHandler();
    }
    if (event.keyCode === 39 || event.keyCode === 68) {
        rightKeyDownHandler();
    }
}

//make the test pass
function rightKeyDownHandler() {
    app.hero.position.x += 10;
}

//now we want to fire some bullets
it("should add a bullet when fire key is pressed", function () {
    app.canvas = { width: 200, height: 300 };
    setupGame();
    fireKeyHandler();
    expect(app.bullets.length).toEqual(1);
})

// add new keys to keydown function

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

//add app.bullets to startGame()
app.bullets = [];

//add a bullet to the array
function fireKeyHandler() {
    app.bullets.push({})
}

//add a test for bullet object coming from where the hero is
it("should fire bullet", function () {
    app.canvas = { width: 300, height: 400 };
    setupGame();
    fireKeyHandler();
    let bullet = {
        position: {
            x: 150,
            y: 355
        },
        size: {
            width: 10,
            height: 10
        },
        color: "#FF0000"
    }
    expect(app.bullets[0]).toEqual(bullet);
})

//make test pass
function fireKeyHandler() {
    app.bullets.push({
        position: {
            x: 150,
            y: 355
        },
        size: {
            width: 10,
            height: 10
        },
        color: "#FF0000"
    })
}

//add the code to draw the bullet in frame update
function frameUpdate() {
    window.requestAnimationFrame(frameUpdate);
    app.context.fillStyle = "#000020";
    app.context.fillRect(0, 0, app.canvas.width, app.canvas.height);
    drawObject(app.context, app.hero);
    app.bullets.forEach(function (bullet) {
        drawObject(app.context, bullet);
    });
}

//looks like bullet is showing up in the wrong place
//add another test to make dynamic
it("should fire bullet from hero", function () {
    app.canvas = { width: 200, height: 200 };
    setupGame();
    fireKeyHandler();
    let bullet = {
        position: {
            x: 100,
            y: 155
        },
        size: {
            width: 10,
            height: 10
        },
        color: "#FF0000"
    }
    expect(app.bullets[0]).toEqual(bullet);
})

//make the test pass
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

//update frameupdate to have bullets move
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
}

//add a test for 20 enemies
it("should spawn 20 enemies", function () {
    app.canvas = { width: 300, height: 400 };
    setupGame();
    expect(app.enemies.length).toEqual(20);
})

//add enemies array to setupgame()
app.enemies = [];

//write a test to determine enemy characteristics
it("should create enemies that have color and size", function () {
    app.canvas = { width: 300, height: 400 };
    setupGame();
    expect(app.enemies[0].color).toEqual("#FFFFFF");
    expect(app.enemies[0].size).toEqual({ height: 20, width: 20 });
})

//make it pass by creating a function and calling it in setupGame()
function spawnEnemies() {
    for (var i = 0; i < 20; i++) {
        app.enemies.push({
            size: {
                height: 20,
                width: 20
            },
            color: "#FFFFFF"
        })
    }
}

//now we need to draw it so we will add some random positions which is hard to test
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

//now lets draw the enemies and have them move at the hero
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

//refactor to a beforeEach()

describe("game", function () {
    beforeEach(function () {
        app.canvas = { width: 100, height: 200 };
        restartGame();
    })
});