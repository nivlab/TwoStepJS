//---------------------------------------//
// Define parameters.
//---------------------------------------//

// Define color assignment.
colors = jsPsych.randomization.sampleWithoutReplacement(['blue','red','purple','green'], 2);

// Define outcome probabilities.
const drift_ix = jsPsych.randomization.shuffle([0,1,2,3], 1)[0];
const drifts = [drifts_01, drifts_02, drifts_03, drifts_04][drift_ix];

//---------------------------------------//
// Define experiment.
//---------------------------------------//
// The two-step task is 200 trials in total.
// Common transitions occur 70% of the time,
// and uncommon transitions occur 30% of the
// time. We pseudo-randomize transitions
// such that 7 (3) common (uncommon) transitions
// occur every 10 trials.

// Predefine common transitions.
const common = [true, true, true, true, true, true, true, false, false, false];
var common_left = [];
var common_right = [];

for (var i=0; i<20; i++) {
  common_left = common_left.concat(jsPsych.randomization.shuffle(common, 1));
  common_right = common_right.concat(jsPsych.randomization.shuffle(common, 1));
}

// Iteratively define trials.
var two_step_trials = [];

for (var i=0; i<200; i++) {

  // Define trial.
  var trial = {
    type: 'two-step',
    common_left: common_left[i],
    common_right: common_right[i],
    rocket_color_left: colors[0],
    rocket_color_right: colors[1],
    planet_color_left: colors[0],
    planet_color_right: colors[1],
    outcome_probs: drifts[i],
    data: { trial: i+1, drift_id: drift_ix+1 }
  };

  // Append trial.
  two_step_trials.push(trial);

}
