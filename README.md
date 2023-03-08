# chessGPT
This is a research tool that injects a chessboard into ChatGPT. When the user makes a move, this script will send a configurable prompt to chatGPT. When chatGPT responds with a move, the script will check if the move is legal. If it is, it will make that move on the injected chessboard. If not, it will prompt chatGPT to stay on task. 
This project using jQuery, chessboard.js, and chess.js. The script in usage includes these dependancies automatically

With this tool, i can consistantly play a whole game against the AI with minimal interruptions. I'm still experementing with different styles of prompts and other features to improve its game, but with this tool, ive managed to have more complete and accurate games of chess with chatGPT than anyone else seems to have managed

![image](https://user-images.githubusercontent.com/42308767/223728584-c6fa32ac-e047-46c9-b4b4-672a2e031612.png)


## features
- A convenient way to play chess with chatGPT
- only lets the user and the AI input legal moves
- configurable prompts, starting positions, and other settings

## Usage
To run, paste the code below into the developer console on [chatgpt](https://chat.openai.com/chat)
```javascript
javascript:!function(s,e){s.src=e,s.onload=function(){console.log("jQuery injected"),x=jQuery("body").append('<script src="https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.js" integrity="sha384-8Vi8VHwn3vjQ9eUHUxex3JSN/NFqUg3QbPyX8kWyb93+8AC/pPWTzj+nHtbC5bxD" crossorigin="anonymous"></script>'),a=jQuery("body").append('<script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js" integrity="sha512-xRllwz2gdZciIB+AkEbeq+gVhX8VB8XsfqeFbUh+SzHlN96dEduwtTuVuc2u9EROlmW9+yhRlxjif66ORpsgVA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>'),a=jQuery("body").append('<script src="https://djinnxie.github.io/chessGPT/main.js" referrerpolicy="no-referrer"></script>'),b=jQuery("head").append('<link rel="stylesheet" href="https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.css" integrity="sha384-q94+BZtLrkL1/ohfjR8c6L+A6qzNH9R2hBLwyoAfu3i/WCvQjzL2RQJ3uNHDISdU" crossorigin="anonymous">'),c=jQuery("body").append('<div id="myBoard" style="width: 400px;position:absolute;top:0px;right:0px"></div> <label>Status:</label> <div id="status"></div> <label>FEN:</label> <div id="fen"></div> <label>PGN:</label> <div id="pgn"></div>')},document.head.appendChild(s)}(document.createElement("script"),"//code.jquery.com/jquery-latest.min.js");
```
theres a bug where sometimes it throws an error. just paste it again if it does. ill fix it. ...eventually
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
};
```

## Custom Prompts
You can configure the prompts in any way you like. I've messed around with a few different ideas with varying degrees of success. 
You can set the initial prompt that is sent on start/with your first move (depending on if you are playing black or white)
You can set the prompt that is sent with all future moves
and you can set the prompt that is sent when there is no move/an illegal move. 

### Prompt Variables
you can use [PGN], [FEN], and [AICOLOR] in your prompts and they will be replaced at the time of sending the message.
[PGN] - All of the moves up until this point in PGN format.
[FEN] - the current boardstate in FEN format.
[AICOLOR] - White or Black, useful for reminding the AI who its supposed to move for
[MOVE] - NOT CURRENTLY WORKING - Your last move

### Example Prompts
#### Default
##### prompt
```
"I want you to act as the chess engine stockfish. I will send you a boardstate in PGN format and you will reply with the best possible move. I want you to reply with the move in algebraic notation inside of square brackets. Do not write explainations. Do not reply with anything other than the best move unless instructed. It is [AICOLOR] to move. Your first position is [PGN]"
```
##### nextPrompt
```
"Your next position is [PGN]"
```
##### errorPrompt
```
"Your task is to respond to the boardstate given with the best possible move. Reply with the move in algebraic notation inside of square brackets. It is [AICOLOR] to move. Do not reply with anything other than the best move unless instructed. Your position is [PGN]"
```

TODO: Add some more example prompts


## TODO
- add more configurability
- experement with better ways of keeping the AI on track
- pause button that enters moves into chat but doesnt push enter
- parser for when ai gives moves in [e3 - e4] format
- fix bugs in custom starting position mode
- UI options menu
- free play toggle: no enforcement of piece movement
