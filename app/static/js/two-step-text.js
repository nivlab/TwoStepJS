
//colors must be determined to display in the text

var instructions_01 = ['Welcome to the Treasure Hunting Game! Here, you will be hunting for treasure in outer space. You can use the arrow keys to navigate.'];

var instructions_02 = ['In this game, you can hunt for treasure on two different planets with the help of some aliens.'];

var instructions_03 = ['Each planet has two aliens that live there. When you ask an alien for treasure, it will either give you treasure or give you rocks.'];

var instructions_04 = ['This is what space treasure looks like!'];

var instructions_05 = ['This is what rocks look like.'];

var instructions_06 = ['How often each alien gives you treasure changes slowly over time.'];

var instructions_07 = ['Since each alien is changing how often it gives you treasure, you will have to pay attention to which alien is most likely to give you treasure right now.'];

var instructions_08 = ['<b>Your goal is to find out which alien is most likely to give you treasure at the moment.</b><br><br><b>Hint:</b> The aliens might change sides, but it does not matter what side the alien is standing on when you ask it.'];

var instructions_09 = ['We will practice asking these two aliens for treasure. You can ask the alien on the left by pressing the LEFT ARROW KEY. You can ask the alien on the right by pressing the RIGHT ARROW KEY. <br><br>Press the next button to start practicing!'];

var instructions_10 = ['Great! You might have learned that this alien was most likely to give you treasure right now.'];

var instructions_11 = ['There are some helpful hints for treasure hunting with the aliens.'];

var instructions_12 = ['<b>Hint 1:</b> Aliens change how often they give you treasure slowly. So if an alien is giving lots of treasure right now, it will probably keep giving treasure for a while. If an alien is not giving much treasure right now, it will probably not give you much treasure for a while.'];

var instructions_13 = ['<b>Hint 2:</b> If one alien is not giving much treasure, that does not mean the other one is giving more treasure. There are no patterns like giving you treasure every other time.'];

// instruction14 moved to two-step-experiment script for colo customization.

var instructions_15 = ['Each rocketship has a planet it goes to most of the time. Sometimes (though rarely), it will fly to the other planet.'];

// var instructions_16 = ['Practice choosing the rocketships to learn which planet they go to most often.'];

var instructions_17 = ['Now we can practice the whole game. You will first choose which rocketship to take. Once you make it to a planet, there will be two aliens. You can only ask one alien for treasure per trip. Remember you are trying to get as much space treasure as you can! We will try practicing 20 flights.'];

var instructions_18 = ['Great job! This game can be hard, so you will need to concentrate. Before we get started, we will do some review.'];

// var temp = ['שלום'];

// Comprehension check questions

// Question 1
var comp_q1 = '<p class="jspsych-survey-multi-choice-text survey-multi-choice">True or False: The aliens slowly change where they look in their mines over time. If an alien is digging in a spot that is easy to find treasure in right now, it might dig in a spot that is harder to find treasure in, in the future. If an alien is digging in a spot that is hard to find treasure in right now, it might dig in a spot that is easy to find treasure in, in the future. The aliens will only change where they are looking slowly. </p>';

var comp_q1_option1 = "True";
var comp_q1_option2 = "False";
var comp_q1_feedback = "Hint:  The aliens are slowly checking new places in their mines, and those places might be it easier or harder to dig.";
var comp_q1_correct = "0"; //indicate which option is the correct answer (starting at zero)

//Question 2
// comp_q2 moved to two-step-xperiment so that the color variable can be referenced there.
var comp_q2_option1 = "True";
var comp_q2_option2 = "False";
var comp_q2_feedback = "Hint: There is always a small chance that a rocket will go to another planet.";
var comp_q2_correct = "1"; //indicate which option is the correct answer (starting at zero)

// // Question 3
// var comp_q3 = '<p class="jspsych-survey-multi-choice-text survey-multi-choice">True or False: Sometimes a rocketship will have a problem and will go to a different planet by accident. </p>';
// var comp_q3_option1 = "True";
// var comp_q3_option2 = "False";
// var comp_q3_feedback = "Hint: There is a small chance that a rocketship will malfunction.";
// var comp_q3_correct = "0"; //indicate which option is the correct answer (starting at zero)

var instructions_19 = [' Wonderful! Now you are ready to begin the game. Remember, you are trying to get as much treasure as you can. Press next to begin. Good luck!'];

var block_end = ['Take a break! Press the right arrow key when you are ready to continue.'];

var exp_end = ['Exp end test text.'];
