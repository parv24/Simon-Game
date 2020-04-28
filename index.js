var buttonColors=["red","blue","green","yellow"];
var userClickedPattern=[];
var gamePattern=[];
var level=0;
var started=false;
var num=0;
$(document).keydown(function()
{
  if(!started)
  {
    level=0;
    num=0;
    started=true;
    userClickedPattern=[];
    gamePattern=[];
    $("h1").text("Level 0");
    nextSequence();
  }
})
$(".btn").click(function()
{
  num++;
  var userChosenColour=this.classList[1];
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

    if(userChosenColour===gamePattern[num-1])
    {
      if(level===num)
      {
        num=0;
        userClickedPattern=[];
        setTimeout(function()
        {
          nextSequence();
        },500);
      }
    }
    else
    {
      $("body").addClass("game-over");
      $("h1").text("Game over, Press any key to Restart");
      setTimeout(function()
      {
        $("body").removeClass("game-over");
      },300)
      playSound("wrong");
      started=false;
    }

})
function nextSequence()
{
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  var buttonChosen=$("."+randomChosenColor);
  buttonChosen.fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150);
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level "+level);
}
function playSound(color)
{
  var audio=new Audio("sounds/"+color+".mp3");
  audio.play();
}
function animatePress(color)
{
$("."+color).addClass("pressed");
setTimeout(function()
{
  $("."+color).removeClass("pressed");
},100)
}
