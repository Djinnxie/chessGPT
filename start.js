javascript: (function(e, s) {
	settings={};
    e.src = s;
    e.onload = function() {
        x = jQuery('body').append('<script src="https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.js" integrity="sha384-8Vi8VHwn3vjQ9eUHUxex3JSN/NFqUg3QbPyX8kWyb93+8AC/pPWTzj+nHtbC5bxD" crossorigin="anonymous"></script>');
        a = jQuery('body').append('<script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js" integrity="sha512-xRllwz2gdZciIB+AkEbeq+gVhX8VB8XsfqeFbUh+SzHlN96dEduwtTuVuc2u9EROlmW9+yhRlxjif66ORpsgVA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>');
        a = jQuery('body').append('<script src="https://djinnxie.github.io/chessGPT/main.js" referrerpolicy="no-referrer"></script>');
        b = jQuery('head').append('<link rel="stylesheet" href="https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.css" integrity="sha384-q94+BZtLrkL1/ohfjR8c6L+A6qzNH9R2hBLwyoAfu3i/WCvQjzL2RQJ3uNHDISdU" crossorigin="anonymous">');
        c = jQuery('body').append('<div style="width:400px;height:450px;opacity:0.8;position:absolute;top:0px;right:0px"">'+
'<div id="myBoard" style="width: 400px;"></div>'+
'<div style="position:absolute;top:400px">'+
'<button type="button">Settings</button>'+
'<button type="button">Pause</button>'+
'<button type="button">free play</button>'+
'<button type="button">undo</button>'+
'</div>'+
'<div style="display:none">'+
' <label>Status:</label> <div id="status"></div> <label>FEN:</label> <div id="fen"></div> <label>PGN:</label> <div id="pgn">'+
' </div>'+
' </div>' );
    };
    document.head.appendChild(e);
})(document.createElement('script'), '//code.jquery.com/jquery-latest.min.js')

