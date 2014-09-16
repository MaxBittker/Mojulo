var JS_MOD = {};

JS_MOD.Anim = (function () {
    var ctx;
    
    JS_MOD.width = 100;
    JS_MOD.height = JS_MOD.width;
    JS_MOD.scale = 1;
     var frame =1;

      var x, y, intColor;
      var output;
      var data;
    

		var fps = 30;
		var now;
		var then = Date.now();
		var interval = 1000/fps;
		var delta;


    function init() {
        $('body').append('<canvas id="mycanvas">');
        var $canvas = $('#mycanvas');
        $canvas.attr('width', JS_MOD.width*JS_MOD.scale);
        $canvas.attr('height', JS_MOD.height*JS_MOD.scale);
        $canvas.attr('image-rendering',"crisp-edges");

        

        var canvas = $canvas[0];
        ctx = canvas.getContext('2d');
        
         output = ctx.createImageData(JS_MOD.width, JS_MOD.height);

         data = output.data;

Run();


     
  
 



      
    }

    function Run() {
       
  requestAnimFrame(function() {
         Run();
        });
     
    now = Date.now();
    delta = now - then;
     
    if (delta > interval) {
        then = now - (delta % interval);
        DrawFrame();
      	 frame++;
		}



        

      

        }

    function DrawFrame() {
       
   for (y = 0; y < JS_MOD.height; y++) {
            for (x = 0; x < JS_MOD.width; x++) {
                intColor = (x * y * frame);
            data[((y*JS_MOD.width)+x)*4 + 0] =toR(intColor);
            data[((y*JS_MOD.width)+x)*4 + 1] = toG(intColor);
            data[((y*JS_MOD.width)+x)*4 + 2] = toB(intColor);
            data[((y*JS_MOD.width)+x)*4 + 3] = 255;
            }
        }
        
 		//ctx.scale(4,4;
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
          window.setTimeout(callback, 2000 );
        };
      })();


$(document).ready(function () {
    JS_MOD.Anim.init();
});
