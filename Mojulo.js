Mojulo = (function() {
  // Constant properties for all mojulo displays
  // Possibly should be passable as a options hash, but instead making file-global
  var width = 100;
  var height = 100;
  var interval = 1000 / (10 /* fps */);

  // Pad out a string, adding padding to the front until it is the width width
  function pad(str, width, padding) {
    return Array(width - str.length).join(padding) + str;
  }

  function Mojulo(equation, canvas) {
    this.equation  = mathparser.parse(equation); // Generate the equation
    this.canvas    = canvas;
    this.scale     = canvas.getAttribute('width') / width;
    this.context   = canvas.getContext('2d');
    this.imageData = this.context.createImageData(width * this.scale, height * this.scale);
    this.then      = +Date.now();
    this.frame     = 1;
    this.paused    = true;
  }

  Mojulo.prototype = {
    play: function() {
      this.paused = false;
      this.step();
    },

    pause: function() {
      this.paused = true;
    },

    step: function() {
      // Rerun the step() function every animation frame
      if (this.paused) return;
      requestAnimFrame(this.step.bind(this));

      var now = +Date.now();
      var delta = now - this.then;
      if (delta > interval) {
        this.then = now;
        this.drawFrame();
        this.frame++;
      }
    },

    drawFrame: function() {
      var equationContext = {
        fns: {
          sin: Math.sin,
          cos: Math.cos,
          tan: Math.tan,
          rand: Math.random,
          sqrt: Math.sqrt
        },

        vars: {
          PI: Math.PI,
          time: this.frame
        }
      };

      var data = this.imageData.data;

      for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
          // Set the x, y, r and A variables
          equationContext.vars.x = x;
          equationContext.vars.y = y;
          equationContext.vars.r = Math.sqrt(x * x + y * y);
          equationContext.vars.A = Math.atan(y / x);

          // Get the color
          var color = this.equation(equationContext.fns, equationContext.vars);
          var R = (color & 0xff0000) >>> 16;
          var G = (color & 0x00ff00) >>> 8;
          var B = (color & 0x0000ff) >>> 0;

          for (var sx = 0; sx < this.scale; sx++) {
            for (var sy = 0; sy < this.scale; sy++) {
              var i = (((y * this.scale + sy) * width * this.scale) + (x * this.scale + sx)) * 4;
              this.imageData.data[i]   = R;
              this.imageData.data[i+1] = G;
              this.imageData.data[i+2] = B;
              this.imageData.data[i+3] = 255;
            }
          }
        }
      }

      this.context.putImageData(this.imageData, 0, 0);
    }
  };

  var requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 2000);
        };

  return Mojulo;
})();
