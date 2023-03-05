//include jquery
javascript: (function(e, s) {
    e.src = s;
    e.onload = function() {
        //jQuery.noConflict();
        console.log('jQuery injected');
        x = jQuery('body').append('<script src="https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.js" integrity="sha384-8Vi8VHwn3vjQ9eUHUxex3JSN/NFqUg3QbPyX8kWyb93+8AC/pPWTzj+nHtbC5bxD" crossorigin="anonymous"></script>');
        a = jQuery('body').append('<script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js" integrity="sha512-xRllwz2gdZciIB+AkEbeq+gVhX8VB8XsfqeFbUh+SzHlN96dEduwtTuVuc2u9EROlmW9+yhRlxjif66ORpsgVA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>');
        b = jQuery('head').append('<link rel="stylesheet" href="https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.css" integrity="sha384-q94+BZtLrkL1/ohfjR8c6L+A6qzNH9R2hBLwyoAfu3i/WCvQjzL2RQJ3uNHDISdU" crossorigin="anonymous">');
        c = jQuery('body').append('<div id="myBoard" style="width: 400px;position:absolute;top:0px;right:0px"></div> <label>Status:</label> <div id="status"></div> <label>FEN:</label> <div id="fen"></div> <label>PGN:</label> <div id="pgn"></div>');
        /*
        jQuery.getScript( "https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.js", function( data, textStatus, jqxhr ) {
            setTimeout(() => {
        // TODO call chess.js contents
                console.log('Hello, World!');
            }, 2000);
        //  		console.log( "Load was performed." );
    });
    */
    };
    document.head.appendChild(e);
})(document.createElement('script'), '//code.jquery.com/jquery-latest.min.js')
