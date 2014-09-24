var JS_MOD = {};

JS_MOD.Anim = (function () {
  var width = 100;
  var height = 100;

  JS_MOD.scale = 4;
  JS_MOD.width = width * JS_MOD.scale;
  JS_MOD.height = JS_MOD.width;
  var frame = 1;

  // Canvas Variables
  var ctx;   // The canvas context
  var image; // The imagedata
  var fun = function() { return 0; };   // The function entered by the user

  var fps = 10;
  var then = Date.now();
  var interval = 1000/fps;

  function init(canvas) {
    canvas.attr('width', JS_MOD.width);
    canvas.attr('height', JS_MOD.height);
    canvas.attr('image-rendering', "crisp-edges");

    // Extract the image data from the canvas
    ctx = canvas[0].getContext('2d');
    image = ctx.createImageData(width * JS_MOD.scale, height * JS_MOD.scale);

    run();
  }

  function updateEquation(equation) {
    fun = equation;
    then = Date.now();
    frame = 1;
  }

  function run() {
    requestAnimFrame(function() {
      run();
    });

    var now = Date.now();
    var delta = now - then;

    if (delta > interval) {
      then = now - (delta % interval);
      drawFrame();
      frame++;
    }
  }

  function drawFrame() {
    var exposedFunctions = {
      sin: Math.sin,
      cos: Math.cos,
      rand: Math.random
    };

    var exposedVars = {
      x: 0,
      y: 0,
      pi: Math.PI,
      time: frame
    };

    for (var y = 0; y < (height); y += 1) {
      for (var x = 0; x < (width); x += 1) {
        // Ensure the correct x and y are exposed
        exposedVars.x = x;
        exposedVars.y = y;

        // Get the color
        var intColor = fun(exposedFunctions, exposedVars);

        for (var sy = 0; sy < JS_MOD.scale; sy++) {
          for (var sx = 0; sx < JS_MOD.scale; sx++) {
            image.data[(( ((y* JS_MOD.scale)+sy) *JS_MOD.width) +((x* JS_MOD.scale)+sx) )*4 + 0] = toR(intColor); // R
            image.data[(( ((y* JS_MOD.scale)+sy) *JS_MOD.width) +((x* JS_MOD.scale)+sx) )*4 + 1] = toG(intColor); // G
            image.data[(( ((y* JS_MOD.scale)+sy) *JS_MOD.width) +((x* JS_MOD.scale)+sx) )*4 + 2] = toB(intColor); // B
            image.data[(( ((y* JS_MOD.scale)+sy) *JS_MOD.width) +((x* JS_MOD.scale)+sx) )*4 + 3] = 255;           // A
          }
        }
      }
    }

    ctx.putImageData(image, 0, 0);
  }

  function toB(num) {
    num >>>= 0;
    var b = num & 0xFF;
    return b;
  }

  function toG(num) {
    num >>>= 0;
    var g = (num & 0xFF00) >>> 8;
    return g;
  }

  function toR(num) {
    num >>>= 0;
    var r = (num & 0xFF0000) >>> 16;
    return r;
  }

  return {
    init: init,
    updateEquation: updateEquation
  };
})();

JS_MOD.EquationManager = (function() {
  var FIELD = 'input[name=equation]';

  function init(form, anim) {
    readHash(form, anim);

    $(window).on('hashchange', function() {
      readHash(form, anim);
    });

    $(form).on('submit', function(e) {
      e.preventDefault();
      triggerUpdate(form, anim);
    });
  }

  function readHash(form, anim) {
    var $field = $(form).find(FIELD);
    if (location.hash) {
      $field.val(decodeURIComponent(location.hash.substring(1)));
    } else {
      $field.val('x * y * time');
    }

    triggerUpdate(form, anim);
  }

  function triggerUpdate(form, anim) {
    var $field = $(form).find(FIELD);
    var equation = $field.val();
    location.hash = '#' + encodeURIComponent(equation);
    anim.updateEquation(mathparser.parse(equation));
  }

  return {
    init: init
  };
})();

window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback)
  {
    window.setTimeout(callback, 2000);
  };
})();


$(document).ready(function () {
  JS_MOD.Anim.init($('#display'));
  JS_MOD.EquationManager.init($('#equation-form'), JS_MOD.Anim);
});
