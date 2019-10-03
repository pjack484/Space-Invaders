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

    it('should move hero left 10 pixels', () => {
        app.canvas = { width: 200, height: 300 };
        setupGame();
        leftKeyDownHandler()
        expect(app.hero.position.x).toEqual(90);
    });

    it('should move hero left 10 pixels on a bigger board', () => {
        app.canvas = { width: 400, height: 600 };
        setupGame();
        leftKeyDownHandler()
        expect(app.hero.position.x).toEqual(190);
    });

    it('should move hero right 10 pixels', () => {
        app.canvas = { width: 200, height: 300 };
        setupGame();
        rightKeyDownHandler()
        expect(app.hero.position.x).toEqual(110);
    });

    it("should add a bullet when fire key is pressed", function () {
        app.canvas = { width: 200, height: 300 };
        setupGame();
        fireKeyHandler();
        expect(app.bullets.length).toEqual(1);
    })

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

    it("should spawn 20 enemies", function () {
        app.canvas = { width: 300, height: 400 };
        setupGame();
        expect(app.enemies.length).toEqual(20);
    })

    it("should create enemies that have color and size", function () {
        app.canvas = { width: 300, height: 400 };
        setupGame();
        expect(app.enemies[0].color).toEqual("#FFFFFF");
        expect(app.enemies[0].size).toEqual({ height: 20, width: 20 });
    })
});