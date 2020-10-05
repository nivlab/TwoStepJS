//---------------------------------------//
// Define parameters.
//---------------------------------------//

// Define color assignment.
planet_color = jsPsych.randomization.sampleWithoutReplacement(['blue','red','purple','green'], 4);
rocket_color = [];

// Make sure the planet colors differ from the alien colors
for (i = planet_color.length-1; i >= 0; i--){
  rocket_color = rocket_color.concat(planet_color[i]);
}

//// TODO: change the colors references in the trials to match the above variable names

// Define outcome probabilities.
// Choose one of the four possible drifts at random.
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
    button_label: continue_label,
    questions: [{
      prompt: subject_id_prompt,
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
var p = -1;
var common = [];

// allow random draws, but trancate anything that falls too far towards the tails
while (p > 0.8 || p < 0.6){
  common = jsPsych.randomization.sampleWithReplacement([1,0], 200, [0.7,0.3]);
  var sum = 0.0;
  for(var i = 0; i < common.length; i++){
      sum += common[i];
  }
  p = sum/common.length;
}

// const common            = [true, true, true, true, true, true, true, false, false, false];
var   common_left       = [];
var   common_right      = [];

// Allow colors to randomly change sides to mitigate side bias
const switched_sides_rocket  = [true,true,true,true,true,false,false,false,false,false];
var   switched_rocket        = [];

// Allow aliens to switch
const switched_sides_alien  = [true,true,true,true,true,false,false,false,false,false]
var   switched_alien        = [];


for (var i=0; i<20; i++) {
  common_left         = common; //common_left.concat(jsPsych.randomization.shuffle(common, 1));
  // sides may become unbalanced in their transition probs given the randomized side switching.
  common_right        = common; //common_left; //common_right.concat(jsPsych.randomization.shuffle(common, 1));
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
for (var i=0; i<10; i++) {//i<200
var trial = null;
  // Define trials.
  // flip left and right rocket colors
  // don't flip aliens
  if (switched_rocket[i] & !switched_alien[i]) {
    trial = {
      type: 'two-step',
      common_left: common_left[i],
      common_right: common_right[i],
      rocket_color_left: rocket_color[1],
      rocket_color_right: rocket_color[0],
      planet_color_left: planet_color[1],
      planet_color_right: planet_color[0],
      alien_left_1: alien_shapes[2],
      alien_left_2: alien_shapes[3],
      alien_right_1: alien_shapes[0],
      alien_right_2: alien_shapes[1],
      outcome_probs: drifts[i],
      data: { trial: i+1, drift_id: drift_ix+1 }
    };
  }
  // flip left and right rocket
  // flip aliens
  else if (switched_rocket[i] & switched_alien[i]) {
    trial = {
      type: 'two-step',
      common_left: common_left[i],
      common_right: common_right[i],
      rocket_color_left: rocket_color[1],
      rocket_color_right: rocket_color[0],
      planet_color_left: planet_color[1],
      planet_color_right: planet_color[0],
      alien_left_1: alien_shapes[3],
      alien_left_2: alien_shapes[2],
      alien_right_1: alien_shapes[1],
      alien_right_2: alien_shapes[0],
      outcome_probs: drifts[i],
      data: { trial: i+1, drift_id: drift_ix+1 }
    };
  }
  // don't flip left and right rocket planet_color
  // don't flip aliens
  else if (!switched_rocket[i] & !switched_alien[i]) {
    trial = {
      type: 'two-step',
      common_left: common_left[i],
      common_right: common_right[i],
      rocket_color_left: rocket_color[0],
      rocket_color_right: rocket_color[1],
      planet_color_left: planet_color[0],
      planet_color_right: planet_color[1],
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
      rocket_color_left: rocket_color[0],
      rocket_color_right: rocket_color[1],
      planet_color_left: planet_color[0],
      planet_color_right:  planet_color[1],
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
  if (i<2){//i<20
    TWO_STEP_PRACTICE.push(trial);
  }

  // 110-20=90 real trials for the first block
  else if (i < 4){ // i<110
     TWO_STEP_TRIALS_BLOCK_1.push(trial);
  }

  else{
    TWO_STEP_TRIALS_BLOCK_2.push(trial);
  }
}
TWO_STEP_TRIALS_BLOCK_1.push({
  type: 'two-step-instructions',
  pages: [
    block_end
  ],
  add_aliens: [false],
  add_diamonds: [false],
  add_rocks: [false],
  add_one_alien: [false],
  add_moons: [false],
  add_rockets: [false],
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: rocket_color[0],
  rocket_color_right: rocket_color[1],
  planet_color_left: planet_color[0],
  planet_color_right: planet_color[1],
})

var INSTRUCTIONS_PART_1 = {
  type: 'two-step-instructions',
  pages: [
    instructions_01,
    instructions_02,
    instructions_03,
    instructions_04,
    instructions_05,
    instructions_06,
    instructions_07,
    instructions_08,
    instructions_09,
  ],
  add_moons: [
    false, true, false, false, false,
    false, false, false, false,
  ],
  add_aliens: [
    false, false, true, false, false,
    true, true, true, true,
  ],
  add_diamonds: [
    false, false, false, true, false,
    false, false, false, false,
  ],
  add_rocks: [
    false, false, false, false, true,
    false, false, false, false,
  ],
  add_one_alien: [
    false, false, false, false, false,
    false, false, false, false,
  ],
  add_rockets: [
    false, false, false, false, false,
    false, false, false, false,
  ],
  practice_alien: [
    false, true, true, false, false,
    false, false, false, false,
  ],
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: rocket_color[2],
  rocket_color_right: rocket_color[3],
  planet_color_left: planet_color[2],
  planet_color_right: planet_color[3],
}

//Variable to "rig" to the alient practice.
var num_left = 0;
var num_right = 0;
var ALIEN_PRACTICE = {
  type: 'alien-practice',
  planet_color_left: planet_color[2],
  planet_color_right: planet_color[2]
};

var INSTRUCTIONS_PART_2 = {
  type: 'two-step-instructions',
  pages: [
    instructions_10,
    instructions_11,
    instructions_12,
    instructions_13,
    instructions_14,
    instructions_15,
  ],
  add_aliens: [false, false, false, false, false, false],
  add_diamonds: [false, false, false, false, false, false],
  add_rocks: [false, false, false, false, false, false],
  add_one_alien: [true, false, false, false, false, false],
  add_moons: [false, false, false, false, true, true],
  add_rockets: [false, false, false, false, true, true],
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: rocket_color[2],
  rocket_color_right: rocket_color[3],
  planet_color_left: planet_color[2],
  planet_color_right: planet_color[3],
}

var ROCKET_PRACTICE_COMMON = {
  type: 'rocket-practice',
  common_left: true,
  common_right: true,
  rocket_color_left: rocket_color[0],
  rocket_color_right: rocket_color[1],
  planet_color_left: planet_color[0],
  planet_color_right: planet_color[1],
};

var ROCKET_PRACTICE_UNCOMMON = {
  type: 'rocket-practice',
  common_left: false,
  common_right: false,
  rocket_color_left: rocket_color[0],
  rocket_color_right: rocket_color[1],
  planet_color_left: planet_color[0],
  planet_color_right: planet_color[1],
};

var INSTRUCTIONS_PART_3 = {
  type: 'two-step-instructions',
  pages: [
    instructions_17
  ],
  add_aliens: [false],
  add_diamonds: [false],
  add_rocks: [false],
  add_one_alien: [false],
  add_moons: [false],
  add_rockets: [false],
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: rocket_color[0],
  rocket_color_right: rocket_color[1],
  planet_color_left: planet_color[0],
  planet_color_right: planet_color[1],
}

var FULL_PRACTICE = {
  type: 'temp'
};

var INSTRUCTIONS_18 = {
  type: 'two-step-instructions',
  pages: [
    instructions_18
  ],
  add_aliens: [false],
  add_diamonds: [false],
  add_rocks: [false],
  add_one_alien: [false],
  add_moons: [false],
  add_rockets: [false],
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: rocket_color[0],
  rocket_color_right: rocket_color[1],
  planet_color_left: planet_color[0],
  planet_color_right: planet_color[1],
}

var INSTRUCTIONS = {
  timeline: [
    INSTRUCTIONS_PART_1,
    ALIEN_PRACTICE,  //x20 alien practice
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
    // ALIEN_PRACTICE,
    INSTRUCTIONS_PART_2,
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
    INSTRUCTIONS_PART_3
]};

var COMPREHENSION_01 = {
  type: 'two-step-comprehension',
  prompt: comp_q1,
  options: [comp_q1_option1,comp_q1_option2],
  preamble: 'Question 1',
  correct_option: comp_q1_correct,
  feedback: comp_q1_feedback,
  correct_text: correct_text
}

var comp_q2 = `<p class="jspsych-survey-multi-choice-text survey-multi-choice">True or False: A rocketship will always go to the same planet.</p>`;
var COMPREHENSION_02 = {
  type: 'two-step-comprehension',
  prompt: comp_q2,
  options: [comp_q2_option1,comp_q2_option2],
  preamble: 'Question 2',
  correct_option: comp_q2_correct,
  feedback: comp_q2_feedback,
  correct_text: correct_text
}

var COMPREHENSION_CHECK = {
  timeline: [
      COMPREHENSION_01,
      COMPREHENSION_02
      // COMPREHENSION_03
]};

var INSTRUCTIONS_19 = {
  type: 'two-step-instructions',
  pages: [
    instructions_19
  ],
  add_aliens: [false],
  add_diamonds: [false],
  add_rocks: [false],
  add_one_alien: [false],
  add_moons: [false],
  add_rockets: [false],
  show_clickable_nav: true,
  show_page_number: false,
  rocket_color_left: rocket_color[0],
  rocket_color_right: rocket_color[1],
  planet_color_left: planet_color[0],
  planet_color_right: planet_color[1],
}

var DEMO = {type: 'survey-demo'};
var DEBRIEF = {type: 'survey-debrief'};
