# chessGPT
a chess interface for chatGPT. Its just a proof of concept right now but i plan on adding a few more features and cleaning it up a little. 
## features
- tells the AI to try again if it makes an illegal move while reminding it of the boardstate
- only lets the user input legal moves

## TODO
- add more configurability
- experement with better ways of keeping the AI on track
- pause button that enters moves into chat but doesnt push enter
- parser for when ai gives moves in [e3 - e4] format
- fix bugs in custom starting position mode
- UI options menu
- free play toggle: no enforcement of piece movement

## Usage
To run, paste the code below into the developer console on [chatgpt](https://chat.openai.com/chat)
```javascript
javascript:!function(s,e){s.src=e,s.onload=function(){console.log("jQuery injected"),x=jQuery("body").append('<script src="https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.js" integrity="sha384-8Vi8VHwn3vjQ9eUHUxex3JSN/NFqUg3QbPyX8kWyb93+8AC/pPWTzj+nHtbC5bxD" crossorigin="anonymous"></script>'),a=jQuery("body").append('<script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js" integrity="sha512-xRllwz2gdZciIB+AkEbeq+gVhX8VB8XsfqeFbUh+SzHlN96dEduwtTuVuc2u9EROlmW9+yhRlxjif66ORpsgVA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>'),a=jQuery("body").append('<script src="https://djinnxie.github.io/chessGPT/main.js" referrerpolicy="no-referrer"></script>'),b=jQuery("head").append('<link rel="stylesheet" href="https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.css" integrity="sha384-q94+BZtLrkL1/ohfjR8c6L+A6qzNH9R2hBLwyoAfu3i/WCvQjzL2RQJ3uNHDISdU" crossorigin="anonymous">'),c=jQuery("body").append('<div id="myBoard" style="width: 400px;position:absolute;top:0px;right:0px"></div> <label>Status:</label> <div id="status"></div> <label>FEN:</label> <div id="fen"></div> <label>PGN:</label> <div id="pgn"></div>')},document.head.appendChild(s)}(document.createElement("script"),"//code.jquery.com/jquery-latest.min.js");
```
## Settings
before pasting the script, you can paste a settings object
```javascript
settings = {
    playerColor : "w", // [BUGGY] Choose your colour. 
    scoldType : 0, // how many times will the script autoreply with errorPrompt?
    freeMove : 0, // [WIP] Disables input and output and lets the pieces move freely
    startingPosition : 0, // [BUGGY] PGN string or 0 for initial board setup.
    prompt : "", // The initial prompt to get chatGPT to play chess. Get creative. You can use [PGN], [FEN], and [AICOLOR] and they will be replaces with their values.
    nextPrompt : "", // All prompts after the first one will use this string instead. The same square bracket variables work here too. 
    errorPrompt : "" // What do you tell the AI when it makes an illegal move? This prompt is to get the AI back on track. Same variables apply
}
        };
```
