var JS_MOD = {};

JS_MOD.Anim = (function () {
    var ctx;
    // var xPosition = 0;
    // var yPosition = 0;

    JS_MOD.width = 300;
    JS_MOD.height = JS_MOD.width;

     var frame =1;

      var x, y, intColor;
      var output;
      var data;
        var timeout;

    var frameLength = 1000; //new frame every 1 seconds

    function init() {
        $('body').append('<canvas id="modolo">');
        var $canvas = $('#modolo');
        $canvas.attr('width', JS_MOD.width);
        $canvas.attr('height', JS_MOD.height);
        var canvas = $canvas[0];
        ctx = canvas.getContext('2d');

         output = ctx.createImageData(JS_MOD.width, JS_MOD.height);
         data = output.data;
Run();
       // DrawFrame();

       // setInterval(DrawFrame(), frameLength);


         // while(frame<100){
         //        timeout =setTimeout(aLoop(frame), frameLength); //call itself
         //        frame++;
         //    }
    }

    function Run() {
        // update
               
        DrawFrame();
       
       requestAnimFrame(function() {
          Run();
        });

        }

    function DrawFrame() {
       
   for (y = 0; y < JS_MOD.height; y++) {
            for (x = 0; x < JS_MOD.width; x++) {
                intColor = (x * y * frame*10);
            data[((y*JS_MOD.width)+x)*4 + 0] =toR(intColor);
            data[((y*JS_MOD.width)+x)*4 + 1] = toG(intColor);
            data[((y*JS_MOD.width)+x)*4 + 2] = toB(intColor);
            data[((y*JS_MOD.width)+x)*4 + 3] = 255;
            }
        }
        frame++;
        ctx.putImageData(output, 0, 0);
    
   
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
        init: init
    };
})();

 window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) 
        {
          window.setTimeout(callback, 1000 / 5);
        };
      })();


$(document).ready(function () {
    JS_MOD.Anim.init();
});