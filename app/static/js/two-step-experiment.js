//---------------------------------------//
// Define parameters.
//---------------------------------------//

// Define color assignment.
colors = jsPsych.randomization.sampleWithoutReplacement(['blue','red','purple','green'], 4);

// Define outcome probabilities.
const drift_ix  = jsPsych.randomization.shuffle([0,1,2,3], 1)[0];
const drifts    = [drifts_01, drifts_02, drifts_03, drifts_04][drift_ix];

//---------------------------------------//
// Define experiment.
//---------------------------------------//
// The two-step task is 200 trials in total.
// Common transitions occur 70% of the time,
// and uncommon transitions occur 30% of the
// time. We pseudo-randomize transitions
// such that 7 (3) common (uncommon) transitions
// occur every 10 trials.

// Subject ID Screen
function getFormattedDate() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return str;
}
var subject_id = {
    type: 'survey-text',
    questions: [{
      prompt: "Please enter the subject ID.",
    }],
    on_finish: function(data){
      sub_num = JSON.parse(data.responses)["Q0"];
      jsPsych.data.addProperties({
        sub: sub_num,
        start_time: getFormattedDate()
      });
    }
  }

// Define the alien types and drift.
// The first two are assigned to the left planet. (after shuffling)
// The second two are assigned to the right planet. (after shuffling)
var alien_shapes = [1,2,3,4];
alien_shapes     = jsPsych.randomization.shuffle(alien_shapes, 1);

var drift_types = [0,1,2,3];
drift_types     = jsPsych.randomization.shuffle(drift_types, 1)

// Predefine common transitions.
const common            = [true, true, true, true, true, true, true, false, false, false];
var   common_left       = [];
var   common_right      = [];

// Allow colors to randomly change sides to mitigate side bias
const switched_sides_rocket  = [true,true,true,true,true,false,false,false,false,false]
var   switched_rocket        = [];

// Allow aliens to switch switched_sides_rocket
const switched_sides_alien  = [true,true,true,true,true,false,false,false,false,false]
var   switched_alien        = [];


for (var i=0; i<20; i++) {
  common_left         = common_left.concat(jsPsych.randomization.shuffle(common, 1));
  common_right        = common_right.concat(jsPsych.randomization.shuffle(common, 1));
  switched_rocket     = switched_rocket.concat(jsPsych.randomization.shuffle(switched_sides_rocket, 1));
  switched_alien      = switched_alien.concat(jsPsych.randomization.shuffle(switched_sides_alien, 1));
}

// Iteratively define trials.
var TWO_STEP_TRIALS_BLOCK_1   = [];
var TWO_STEP_TRIALS_BLOCK_2   = [];
var TWO_STEP_PRACTICE         = [];

// 200 trials total
// 20 practice
// 180 in blocks
for (var i=0; i<10; i++) { //i<200
var trial = null;
  // Define trials.
  // flip left and right rocket colors
  // don't flip aliens
  if (switched_rocket[i] & !switched_alien[i]) {
    trial = {
      type: 'two-step',
      common_left: common_left[i],
      common_right: common_right[i],
      rocket_color_left: colors[1],
      rocket_color_right: colors[0],
      planet_color_left: colors[1],
      planet_color_right: colors[0],
      alien_left_1: alien_shapes[2],
      alien_left_2: alien_shapes[3],
      alien_right_1: alien_shapes[0],
      alien_right_2: alien_shapes[1],
      outcome_probs: drifts[i],
      data: { trial: i+1, drift_id: drift_ix+1 }
    };
  }
  // flip left and right rocket colors
  // flip aliens
  else if (switched_rocket[i] & switched_alien[i]) {
    trial = {
      type: 'two-step',
      common_left: common_left[i],
      common_right: common_right[i],
      rocket_color_left: colors[1],
      rocket_color_right: colors[0],
      planet_color_left: colors[1],
      planet_color_right: colors[0],
      alien_left_1: alien_shapes[3],
      alien_left_2: alien_shapes[2],
      alien_right_1: alien_shapes[1],
      alien_right_2: alien_shapes[0],
      outcome_probs: drifts[i],
      data: { trial: i+1, drift_id: drift_ix+1 }
    };
  }
  // don't flip left and right rocket colors
  // don't flip aliens
  else if (!switched_rocket[i] & !switched_alien[i]) {
    trial = {
      type: 'two-step',
      common_left: common_left[i],
      common_right: common_right[i],
      rocket_color_left: colors[0],
      rocket_color_right: colors[1],
      planet_color_left: colors[0],
      planet_color_right: colors[1],
      alien_left_1: alien_shapes[0],
      alien_left_2: alien_shapes[1],
      alien_right_1: alien_shapes[2],
      alien_right_2: alien_shapes[3],
      outcome_probs: drifts[i],
      data: { trial: i+1, drift_id: drift_ix+1 }
    };
  }
  // don't flip left and right rocket colors
  // flip aliens
  else if (!switched_rocket[i] & switched_alien[i]) {//don't flip left and right colors
    trial = {
      type: 'two-step',
      common_left: common_left[i],
      common_right: common_right[i],
      rocket_color_left: colors[0],
      rocket_color_right: colors[1],
      planet_color_left: colors[0],
      planet_color_right: colors[1],
      alien_left_1: alien_shapes[1],
      alien_left_2: alien_shapes[0],
      alien_right_1: alien_shapes[3],
      alien_right_2: alien_shapes[2],
      outcome_probs: drifts[i],
      data: { trial: i+1, drift_id: drift_ix+1 }
    };
  }

  else{
    console.log('Error in adding all the types of trials in two-step-experiment.js')
  }

  // Append trial.
  //20 practice trials
  if (i<2){ //i<20
    TWO_STEP_PRACTICE.push(trial);
  }

  // 90 real trials for the first block
  else if (i < 5){
     TWO_STEP_TRIALS_BLOCK_1.push(trial);
  }

  else{
    TWO_STEP_TRIALS_BLOCK_2.push(trial);
  }
}
TWO_STEP_TRIALS_BLOCK_1.push({
  type: 'two-step-instructions',
  pages: block_end, //text from two-step-instructions.js
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: colors[0],
  rocket_color_right: colors[1],
  planet_color_left: colors[0],
  planet_color_right: colors[1],
});

var INSTRUCTIONS_01 = {
  type: 'two-step-instructions',
  pages: instructions_01, //text from two-step-instructions.js
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: colors[2],
  rocket_color_right: colors[3],
  planet_color_left: colors[2],
  planet_color_right: colors[3],
};

var INSTRUCTIONS_02 = {
  type: 'two-step-instructions',
  pages: instructions_02, //text from two-step-instructions.js
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: colors[2],
  rocket_color_right: colors[3],
  planet_color_left: colors[2],
  planet_color_right: colors[3],
  add_moons: true
};

var INSTRUCTIONS_03 = {
  type: 'two-step-instructions',
  pages: instructions_03, //text from two-step-instructions.js
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: colors[2],
  rocket_color_right: colors[3],
  planet_color_left: colors[2],
  planet_color_right: colors[3],
  add_aliens: true
};

var INSTRUCTIONS_04 = {
  type: 'two-step-instructions',
  pages: instructions_04, //text from two-step-instructions.js
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: colors[2],
  rocket_color_right: colors[3],
  planet_color_left: colors[2],
  planet_color_right: colors[3],
  add_diamonds: true,
};

var INSTRUCTIONS_05 = {
  type: 'two-step-instructions',
  pages: instructions_05, //text from two-step-instructions.js
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: colors[2],
  rocket_color_right: colors[3],
  planet_color_left: colors[2],
  planet_color_right: colors[3],
  add_rocks: true,
};

var INSTRUCTIONS_06 = {
  type: 'two-step-instructions',
  pages: instructions_06, //text from two-step-instructions.js
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: colors[2],
  rocket_color_right: colors[3],
  planet_color_left: colors[2],
  planet_color_right: colors[3],
  add_aliens: true
};

var INSTRUCTIONS_07 = {
  type: 'two-step-instructions',
  pages: instructions_07, //text from two-step-instructions.js
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: colors[2],
  rocket_color_right: colors[3],
  planet_color_left: colors[2],
  planet_color_right: colors[3],
  add_aliens: true
};

var INSTRUCTIONS_08 = {
  type: 'two-step-instructions',
  pages: instructions_08, //text from two-step-instructions.js
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: colors[2],
  rocket_color_right: colors[3],
  planet_color_left: colors[2],
  planet_color_right: colors[3],
  add_aliens: true
};

var INSTRUCTIONS_09 = {
  type: 'two-step-instructions',
  pages: instructions_09, //text from two-step-instructions.js
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: colors[2],
  rocket_color_right: colors[3],
  planet_color_left: colors[2],
  planet_color_right: colors[3],
  add_aliens: true
};

//Variable to "rig" to the alient practice.
var num_left = 0;
var num_right = 0;
var ALIEN_PRACTICE = {
  type: 'alien-practice',
  planet_color_left: colors[2],
  planet_color_right: colors[2]
};

var INSTRUCTIONS_10 = {
  type: 'two-step-instructions',
  pages: instructions_10, //text from two-step-instructions.js
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: colors[2],
  rocket_color_right: colors[3],
  planet_color_left: colors[2],
  planet_color_right: colors[3],
  add_one_alien: true
};

var INSTRUCTIONS_11 = {
  type: 'two-step-instructions',
  pages: instructions_11, //text from two-step-instructions.js
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: colors[0],
  rocket_color_right: colors[1],
  planet_color_left: colors[0],
  planet_color_right: colors[1],
};

var INSTRUCTIONS_12 = {
  type: 'two-step-instructions',
  pages: instructions_12, //text from two-step-instructions.js
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: colors[0],
  rocket_color_right: colors[1],
  planet_color_left: colors[0],
  planet_color_right: colors[1],
};

var INSTRUCTIONS_13 = {
  type: 'two-step-instructions',
  pages: instructions_13, //text from two-step-instructions.js
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: colors[0],
  rocket_color_right: colors[1],
  planet_color_left: colors[0],
  planet_color_right: colors[1],
};

var instructions_14 = [`Before you can ask an alien for some treasure, you will first need to travel to their planet! There are two rocketships and two planets. Most of the time, the <b>${colors[0]}</b> rocketship will go to the <b>${colors[0]}</b> planet. Most of the time the <b>${colors[1]}</b> rocketship will go to the <b>${colors[1]}</b> planet.`];
var INSTRUCTIONS_14 = {
  type: 'two-step-instructions',
  pages: instructions_14, //text from two-step-instructions.js
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: colors[0],
  rocket_color_right: colors[1],
  planet_color_left: colors[0],
  planet_color_right: colors[1],
  add_moons: true,
  add_rockets: true,
};

var INSTRUCTIONS_15 = {
  type: 'two-step-instructions',
  pages: instructions_15, //text from two-step-instructions.js
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: colors[0],
  rocket_color_right: colors[1],
  planet_color_left: colors[0],
  planet_color_right: colors[1],
  add_moons: true,
  add_rockets: true,
};

// var INSTRUCTIONS_16 = {
//   type: 'two-step-instructions',
//   pages: instructions_16, //text from two-step-instructions.js
//   show_clickable_nav: true,
//   show_page_number: false,
//   rocket_color_left: colors[0],
//   rocket_color_right: colors[1],
//   planet_color_left: colors[0],
//   planet_color_right: colors[1],
//   add_moons: true,
//   add_rockets: true,
// };

var ROCKET_PRACTICE_COMMON = {
  type: 'rocket-practice',
  common_left: true,
  common_right: true,
  rocket_color_left: colors[0],
  rocket_color_right: colors[1],
  planet_color_left: colors[0],
  planet_color_right: colors[1],
};

var ROCKET_PRACTICE_UNCOMMON = {
  type: 'rocket-practice',
  common_left: false,
  common_right: false,
  rocket_color_left: colors[0],
  rocket_color_right: colors[1],
  planet_color_left: colors[0],
  planet_color_right: colors[1],
};

var INSTRUCTIONS_17 = {
  type: 'two-step-instructions',
  pages: instructions_17, //text from two-step-instructions.js
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: colors[0],
  rocket_color_right: colors[1],
  planet_color_left: colors[0],
  planet_color_right: colors[1],
};

var FULL_PRACTICE = {
  type: 'temp'
};

var INSTRUCTIONS_18 = {
  type: 'two-step-instructions',
  pages: instructions_18, //text from two-step-instructions.js
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: colors[0],
  rocket_color_right: colors[1],
  planet_color_left: colors[0],
  planet_color_right: colors[1],
};

var INSTRUCTIONS = {
  timeline: [
    INSTRUCTIONS_01,
    INSTRUCTIONS_02,
    INSTRUCTIONS_03,
    INSTRUCTIONS_04,
    INSTRUCTIONS_05,
    INSTRUCTIONS_06,
    INSTRUCTIONS_07,
    INSTRUCTIONS_08,
    INSTRUCTIONS_09,
    ALIEN_PRACTICE,  //x20 alien practice
    ALIEN_PRACTICE,
    ALIEN_PRACTICE,
    // ALIEN_PRACTICE,
    // ALIEN_PRACTICE,
    // ALIEN_PRACTICE,
    // ALIEN_PRACTICE,
    // ALIEN_PRACTICE,
    // ALIEN_PRACTICE,
    // ALIEN_PRACTICE,
    // ALIEN_PRACTICE,
    // ALIEN_PRACTICE,
    // ALIEN_PRACTICE,
    // ALIEN_PRACTICE,
    // ALIEN_PRACTICE,
    // ALIEN_PRACTICE,
    // ALIEN_PRACTICE,
    // ALIEN_PRACTICE,
    // ALIEN_PRACTICE,
    // ALIEN_PRACTICE,
    INSTRUCTIONS_10,
    INSTRUCTIONS_11,
    INSTRUCTIONS_12,
    INSTRUCTIONS_13,
    INSTRUCTIONS_14,
    INSTRUCTIONS_15,
    // INSTRUCTIONS_16 // removed instructions for rocket only practice
    // ROCKET_PRACTICE_COMMON, // x10 rocket practice
    // ROCKET_PRACTICE_COMMON, // rocket practice removed because encourages planning
    // ROCKET_PRACTICE_UNCOMMON, // and not feasible without the moon display
    // ROCKET_PRACTICE_COMMON,
    // ROCKET_PRACTICE_COMMON,
    // ROCKET_PRACTICE_UNCOMMON,
    // ROCKET_PRACTICE_UNCOMMON,
    // ROCKET_PRACTICE_COMMON,
    // ROCKET_PRACTICE_COMMON,
    // ROCKET_PRACTICE_COMMON,
    INSTRUCTIONS_17
]};

var COMPREHENSION_01 = {
  type: 'two-step-comprehension',
  prompt: comp_q1,
  options: [comp_q1_option1,comp_q1_option2],
  preamble: 'Question 1',
  correct_option: comp_q1_correct,
  feedback: comp_q1_feedback,
}
var comp_q2 = `<p class="jspsych-survey-multi-choice-text survey-multi-choice">True or False: The <b>${colors[0]}</b> rocketship will always go to the <b>${colors[0]}</b> planet.</p>`;
var COMPREHENSION_02 = {
  type: 'two-step-comprehension',
  prompt: comp_q2,
  options: [comp_q2_option1,comp_q2_option2],
  preamble: 'Question 2',
  correct_option: comp_q2_correct,
  feedback: comp_q2_feedback,
}

// var COMPREHENSION_03 = {
//   type: 'two-step-comprehension',
//   prompt: comp_q3,
//   options: [comp_q3_option1,comp_q3_option2],
//   preamble: 'Question 3',
//   correct_option: comp_q3_correct,
//   feedback: comp_q3_feedback
// }

var COMPREHENSION_CHECK = {
  timeline: [
      COMPREHENSION_01,
      COMPREHENSION_02
      // COMPREHENSION_03
]};

var INSTRUCTIONS_19 = {
  type: 'two-step-instructions',
  pages: instructions_19, //text from two-step-instructions.js
  show_clickable_nav: true,
  show_page_number: false,
};

var DEMO = {type: 'survey-demo'};
