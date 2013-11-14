var g = {
    options : {
        canvas  : 'canvas',
        width   : 700,
        height  : 400,
        fps     : 60
    }
};

(function(g) {

    // set up options
    var fps = g.options.fps || 60;
    var width = g.options.width || 640;
    var height = g.options.height || 480;

    // handles the canvas updates all smart-like
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / fps);
        };
    })();

    var canvas,
        ctx;
        
    var debug = false;

    var GameState = {
        'Menu' :    0,
        'Play' :    1,
        'GameOver': 2,
        'Reset' :   3
    }

    // externally available variables
    g.gameState = GameState.Play;
    g.frame = 0;
    g.obj = {};
    g.mouse = new Mouse();
    g.key = Key;
    
    var init = {
        start: function(id) {
            this.canvas(id);
            
            g.obj.brick = new Brick(g);
            
            // log key events for our little key state machine below (Key)
            window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
            window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
            document.getElementById(g.options.canvas).addEventListener('mousemove', function(event) { g.mouse.onMouseMove(event); }, false );
            
            this.loadAssets(
                // call back with the gameloop
                this.gameLoop
            );
        },
        gameLoop : function gameLoop() {
            // EVERYTHING AM LIVING HERE
            loop.input();
            loop.update();
            loop.draw();

            // increment for fun? or functionality...
            g.frame++;

            setTimeout(function() {
                requestAnimFrame(gameLoop);
            }, 1000 / fps);
            
        },
        canvas: function(id) {
            canvas = document.getElementById(id);
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext("2d");
            g.canvas = canvas;
            g.ctx = ctx;
        },
        loadAssets: function(loop) {
            // run the call bakc when we're ready!
            loop();
        }
    };         

    var loop = {
        input: function() {
            // nothing actually happening...
        },
        update: function () {
            switch(g.gameState) {
                case GameState.Menu:

                    break;
                case GameState.Play:
                    g.obj.brick.update();
                    break;
                case GameState.GameOver:

                    break;
                case GameState.Reset:

                    break;
            }

        },
        draw: function() {   
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = canvas.width;
            switch(g.gameState) {
                case GameState.Menu:

                    break;
                case GameState.Play:
                    g.obj.brick.draw();
                    break;
                case GameState.GameOver:

                    break;
                case GameState.Reset:

                    break;
            }         
        }
    };  
    
    var Helper = {
        randomColor: function() {
            var letters = '0123456789ABCDEF'.split(''),
                color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.round(Math.random() * 15)];
            }
            return color;
        }
    };

    var Key = {
      _pressed: {},

      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      W: 87,
      A: 65,
      S: 83,
      D: 68,
      
      isDown: function(keyCode) {
        for(var i = 0; i < keyCode.length; i++) {
            if( this._pressed[keyCode[i]] )
                return true;
        }
        return false;
      },
      
      onKeydown: function(event) {
        this._pressed[event.keyCode] = true;
      },
      
      onKeyup: function(event) {
        delete this._pressed[event.keyCode];
      }
    };

    init.start(g.options.canvas);
})(g);