var apiKey
, mongoURL
, booty
;

function main (stage) {
  require([ 'config' ], function(config) {
    apiKey = config.apiKey;
    mongoURL = config.mongoURL;
  });

  var headsButton = addButton(0, 0, 'Heads', 'heads.png', handleButtonClick)
  , tailsButton = addButton(150, 0, 'Tails', 'tails.png', handleButtonClick)
  , resultsTextField = addTextField(10, 50, 100)
  , scoreTextField = addTextField(10, 100, 100)
  , yourNameTextField = addYourName()
  , submitButton = addButton(0, 200, 'Submit', 'submit.png', handleSubmitClick)
  , highScoreList = addTextField(10, 250, 500)
  ;

  scoreTextField.score = 0;

  function addButton (x, y, guess, url, onClick) {
    var buttonLoader = new sp.Loader();
    var buttonURL = url;
    var buttonURLRequest = new sp.URLRequest(buttonURL);
    buttonLoader.load(buttonURLRequest);
    buttonLoader.x = x;
    buttonLoader.y = y;
    buttonLoader.guess = guess;
    buttonLoader.addEventListener(sp.MouseEvent.CLICK, onClick);
    stage.addChild(buttonLoader);
    return buttonLoader;
  }

  function addTextField (x, y, width) {
    var textField = new sp.TextField();
    textField.x = x;
    textField.y = y;
    stage.addChild(textField);
    return textField;
  }

  function addYourName() {
    var yourNameLoader = new sp.Loader()
    , yourNameURL = 'your_name.swf'
    , yourNameURLRequest = new sp.URLRequest(yourNameURL)
    ;
    yourNameLoader.addEventListener(sp.MouseEvent.CLICK, function (event) {
        yourNameLoader.content.keystring.text='';
    });
    yourNameLoader.load(yourNameURLRequest);
    yourNameLoader.y = 150;
    stage.addChild(yourNameLoader);
    return yourNameLoader;
  }
     
  function handleButtonClick (event) {
    console.log(event.target.guess);
    placeBet(event.target.guess, resultsTextField, scoreTextField);
  }
    
  function handleSubmitClick (event) {
    console.log('handleSubmitClick');
    console.log(yourNameTextField);
    console.log(booty);
    var name = yourNameTextField.content.keystring.text
    , score = scoreTextField.score
    ;
    saveScore(name, score);
    showScores(highScoreList);
  }
}

function showScores(highScoreList) {
  $.getJSON(mongoURL + '?apiKey=' + apiKey, function(data) {
    highScoreList.text = 'HIGH SCORES\n\n';
    for (var i = 0; i < data.length; i++) {
      highScoreList.text += data[i].score + ' by ' + data[i].name + '\n';
    }
  });
}

function saveScore (name, score) {
  var mongoQuery = '?apiKey=' + apiKey;
  console.log('adding to mongo: name: ' + name + ' score: ' + score);
  $.ajax (mongoURL + mongoQuery, {
    "data": JSON.stringify( {
        "_id" : name
        , "name" : name
        , "score" : score
      } )
    , "type": "POST"
    , "contentType": "application/json"
  });
}

function placeBet (guess, resultsTextField, scoreTextField) {
  console.log('placeBet');
  var coinState = flipCoin();
  if (guess == coinState) {
    var winner = true;
  }
  else {
    var winner = false;
  }
  resultsTextField.text = printResult(coinState, winner);
  updateScore(scoreTextField, winner);
}

function flipCoin() {
  var toss = Math.random();
  console.log(toss);
  if (toss < 0.5) {
  	return 'Heads';
  }
  else if (toss > 0.5) {
    return 'Tails';
  }
  else {
    return flipCoin();
  }
}

function printResult (coinState, winner) {
  console.log('printResult');
  var output = coinState + '!';
  if (winner) {
  	output += ' You Win!';
  }
  else {
    output += ' You Lose :(';
  }
  return output;
}

function updateScore(scoreTextField, winner) {
  if (winner) {
    scoreTextField.score++;
  }
  else {
    scoreTextField.score--;
  }
  scoreTextField.text = 'Your Score: ' + scoreTextField.score;
}  