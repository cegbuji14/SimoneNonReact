var colorArray
var colorLoopCount = 0
var checkedColorNumber
var colorNumber
var colorHighlightCount
var difficulty
var turn

describe("Number generator", function() {
    describe("Random colors inputted into colors array", function() {
        colorArray = randomColor(3)

        //Check randomColors() produces an array of the length of the variable inputted
        it("randomColor's length should be 3", function() {
            expect(colorArray.length).toBe(3);
        })

        //with random numbers between 0 and 3
        function testColorNumbers(i) {
            it("should be between 0 and 3", function() {
                //Why doesn't this work?
                expect(colorArray[colorLoopCount]).toBeLessThanOrEqual(3);
            })
            it("should be between 0 and 3", function() {
                expect(colorArray[0]).toBeGreaterThanOrEqual(0);
            })
        }
        for (var i = 0; i < 4; i++) {
            testColorNumbers(i);
        }
    })
})

function checkColorSpyFunctions() {
    spyOn(window, 'clearTimeout')
    spyOn(window, 'newRoundInit')
    spyOn(window, 'gameOver')
    spyOn(window, 'timer')
}

var colors
var e = { target: { id: "" } };

describe("Appropriate functions should run based on user's guess", function() {
    describe("User guessed last color in series correctly", function() {
        it("newRoundInit and clearTimeout (on timeOut and textTimeOut) should run", function() {



            colors = [0, 0, 0, 3]
            //User is on the last colour to be checked before a new one is added
            colorNumber = 3
            //User has selected the correct color
            e.target.id = "3"

            checkColorSpyFunctions()
            checkColor(e)
            expect(window.clearTimeout).toHaveBeenCalledWith(textTimeOut)
            expect(window.clearTimeout).toHaveBeenCalledWith(timeOut)
            expect(window.newRoundInit).toHaveBeenCalled()
        })
    })

    describe("User guessed last color in series incorrectly", function() {
        it("game over should run", function() {

            colors = [0, 0, 0, 3]
            //User is on the last colour to be checked before a new one is added
            colorNumber = 3
            //User has selected the incorrect color
            e.target.id = "1"

            checkColorSpyFunctions()
            checkColor(e)
            expect(window.gameOver).toHaveBeenCalled()

            expect(window.newRoundInit).not.toHaveBeenCalled()

        })
    })
    describe("User guessed color (exc. last) in series correctly", function() {
        it("timer and clearTimeout (on timeOut and textTimeOut) should run", function() {

            colors = [0, 1, 0, 0]
            //User is not on the last colour to be checked before a new one is added
            colorNumber = 1
            //User has selected the correct color
            e.target.id = "1"

            checkColorSpyFunctions()
            checkColor(e)
            expect(window.timer).toHaveBeenCalled()
            expect(window.clearTimeout).toHaveBeenCalledWith(textTimeOut)
            expect(window.clearTimeout).toHaveBeenCalledWith(timeOut)

            expect(window.newRoundInit).not.toHaveBeenCalled()

        })
    })
    describe("User guessed color (exc. last) in series incorrectly", function() {
        it("game over should run", function() {

            colors = [0, 1, 0, 0]
            //User is not on the last colour to be checked before a new one is added
            colorNumber = 1
            //User has selected the correct color
            e.target.id = "0"

            checkColorSpyFunctions()
            checkColor(e)
            expect(window.gameOver).toHaveBeenCalled()

            expect(window.newRoundInit).not.toHaveBeenCalled()

        })
    })
})


// // Assistance from jasmine-jquery docs https://github.com/velesin/jasmine-jquery

beforeEach(function() {
    jasmine.getStyleFixtures().fixturesPath = './assets/css';
    loadStyleFixtures('style.css');
    jasmine.getFixtures().fixturesPath = '.';
    loadFixtures('index.html')
})

describe('Color highlight function called', function() {
    describe('Blue selector to be highlighted', function() {

        // beforeEach(function() {
        //     createHTMLFixture();
        // })

        beforeEach(function() {
            jasmine.clock().install();
        });

        afterEach(function() {
            jasmine.clock().uninstall();
        });

        it('it should not have class blue-highlighted for 299 milliseconds', function() {
            //Color blue is in color array
            colors = [0]
            //No colors have yet been highlighted
            colorHighlightCount = 0
            highlightColors()

            expect($('#0')).not.toHaveClass("blue-highlighted")

            jasmine.clock().tick(299);

            expect($('#0')).not.toHaveClass("blue-highlighted")


        });

        it('it should have class blue-highlighted between 300 and 899 milliseconds (difficulty easy)', function() {
            //Color blue is in color array
            colors = [0]
            //No colors have yet been highlighted
            colorHighlightCount = 0
            highlightedTime = 900
            highlightColors()

            //300 milliseconds
            jasmine.clock().tick(301);

            expect($('#0')).toHaveClass("blue-highlighted")

            //899 milliseconds
            jasmine.clock().tick(598);

            expect($('#0')).toHaveClass("blue-highlighted")

            //900 milliseconds
            jasmine.clock().tick(1);

            expect($('#0')).not.toHaveClass("blue-highlighted")
        });
    });
});

describe("Game is running", function() {
    describe("User does not guess within timer", function() {

        beforeEach(function() {
            jasmine.clock().install();
        });

        afterEach(function() {
            jasmine.clock().uninstall();
        });

        it("on easy, gameOver should run after 6 seconds", function() {
            //Easy difficulty selected
            difficulty = 2
            timer()
            spyOn(window, 'gameOver')
            expect(window.gameOver).not.toHaveBeenCalled()

            jasmine.clock().tick(6001);

            expect(window.gameOver).toHaveBeenCalled()

        })

        it("on hard, gameOver should run after 3 seconds", function() {
            //Hard difficulty selected
            difficulty = 1
            timer()
            spyOn(window, 'gameOver')
            expect(window.gameOver).not.toHaveBeenCalled()

            jasmine.clock().tick(3001);

            expect(window.gameOver).toHaveBeenCalled()

        })

    })
})

describe("Modal appears on end of game", function() {
    describe("Easy mode, user scores in top ten results", function() {

        it("user scored in top 10, modal should appear", function() {

            //Difficulty easy
            difficulty == 2
            loadEasyScores()
            //User scored in top 10
            turn = easyScores[9].score + 1
            showScoresForm()
            expect($(".modal")).toHaveCss({display: "block"})
        })
        it("user did not score in top 10, modal should not appear", function() {

            //Difficulty easy
            difficulty == 2
            loadEasyScores()
            //User did not score in top 10
            turn = easyScores[9].score - 1
            showScoresForm()
            expect($(".modal")).not.toHaveCss({display: "block"})
        })
    })
})



