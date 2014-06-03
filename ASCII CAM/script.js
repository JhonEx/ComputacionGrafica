$( document ).ready(function() 
{

    window.URL = window.URL || window.webkitURL;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;

        var ROW_PIXELS = 8;
        var COL_PIXELS = 5;


        var DARK_TO_LIGHT = "@$BW#MQ8ERN95D06&HgGOS3%UPKFIp2ZbAdq4wCha[]1{}JXekVliofunjLTz7Yst=?)(|+xcmvr^/\_*!y;,-':`.".split("");
        var NORMALISER = DARK_TO_LIGHT.length / 256;

        navigator.getUserMedia({video:true}, function (stream) {
                    var video = document.querySelector("#video");
                    video.src = window.URL.createObjectURL(stream);
                    setTimeout(onVideoLoaded, 2000, video);
                }, function (e) {
                    alert("Failed to capture video: " + JSON.stringify(e, null, 2));
                });

        function getChar(luminance) 
        {
            var index = Math.floor(luminance * NORMALISER);
            return DARK_TO_LIGHT[index];
        }

        function drawToCanvas(context, sourceImageData) 
        {

            var sourcePixels = sourceImageData.data;
            var numCols = sourceImageData.width;
            var numRows = sourceImageData.height;

            for (var row = 0; row < numRows; row += ROW_PIXELS) {
                var rowOffset = row * numCols * 4;
                for (var col = 0; col < numCols; col += COL_PIXELS) {
                    var offset = rowOffset + 4 * col;
                    var r = sourcePixels[offset];
                    var g = sourcePixels[offset + 1];
                    var b = sourcePixels[offset + 2];
                    var luminance = Math.ceil(0.299 * r + 0.587 * g + 0.114 * b);

                    var c = getChar(luminance);
                    context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                    context.fillText(c, col, row);
                }
            }

        }

        $("#iniciar").on('click',function()
        {
            var width = video.clientWidth;
            var height = video.clientHeight;
            var canvas = document.querySelector("canvas");
            canvas.width = width;
            canvas.height = height;

            var backCanvas = document.createElement("canvas");
            backCanvas.width = width;
            backCanvas.height = height;
            var backContext = backCanvas.getContext("2d");

            var context = canvas.getContext("2d");
            context.font = (ROW_PIXELS + 4) + "px courier";

            setTimeout(draw, 20, video, width, height, backContext, context);

       function draw(video, width, height, backContext, context)
        {
            backContext.drawImage(video, 0, 0, width, height);
            context.clearRect(0, 0, width, height);
            drawToCanvas(context, backContext.getImageData(0, 0, width, height));
            setTimeout(draw, 40, video, width, height, backContext, context);
        }
         });


                
       
});