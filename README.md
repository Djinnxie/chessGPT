# chessGPT
a chess interface for chatGPT. Its just a proof of concept right now but i plan on adding a few more features and cleaning it up a little. to run, paste the code below into the developer console on [chatgpt](https://chat.openai.com/chat)
## features
- tells the AI to try again if it makes an illegal move while reminding it of the boardstate
- only lets the user input legal moves

```javascript
javascript:!function(s,e){s.src=e,s.onload=function(){console.log("jQuery injected"),x=jQuery("body").append('<script src="https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.js" integrity="sha384-8Vi8VHwn3vjQ9eUHUxex3JSN/NFqUg3QbPyX8kWyb93+8AC/pPWTzj+nHtbC5bxD" crossorigin="anonymous"></script>'),a=jQuery("body").append('<script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js" integrity="sha512-xRllwz2gdZciIB+AkEbeq+gVhX8VB8XsfqeFbUh+SzHlN96dEduwtTuVuc2u9EROlmW9+yhRlxjif66ORpsgVA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>'),a=jQuery("body").append('<script src="https://djinnxie.github.io/chessGPT/main.js" referrerpolicy="no-referrer"></script>'),b=jQuery("head").append('<link rel="stylesheet" href="https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.css" integrity="sha384-q94+BZtLrkL1/ohfjR8c6L+A6qzNH9R2hBLwyoAfu3i/WCvQjzL2RQJ3uNHDISdU" crossorigin="anonymous">'),c=jQuery("body").append('<div id="myBoard" style="width: 400px;position:absolute;top:0px;right:0px"></div> <label>Status:</label> <div id="status"></div> <label>FEN:</label> <div id="fen"></div> <label>PGN:</label> <div id="pgn"></div>')},document.head.appendChild(s)}(document.createElement("script"),"//code.jquery.com/jquery-latest.min.js");
```
