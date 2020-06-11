/**
 * jspsych-two-step
 * Sam Zorowitz
 *
 * Plug-in to run two-step task trial
 **/

jsPsych.plugins["alien-practice"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'alien-practice',
    description: '',
    parameters: {
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
        default: [37,39],
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      planet_color_left: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Planet color left',
        description: 'Color of left planet.'
      },
      planet_color_right: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Planet color left',
        description: 'Color of right planet.'
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    //---------------------------------------//
    // Define HTML.
    //---------------------------------------//

    // Initialize HTML.
    var new_html = '';
    display_element.innerHTML = new_html;

    // Insert CSS (window animation).
    new_html += `<style>
    body {
      height: 100vh;
      max-height: 100vh;
      overflow: hidden;
      position: fixed;
    }
    </style>`;

    // Start two-step wrapper.
    new_html += '<div class="two-step-wrap">';

    // Start sky.
    new_html += '<div class="landscape-sky" stage="2">';

    // Draw stars.
    new_html += '<div class="stars"></div>';

    // End sky.
    new_html += '</div>';

    // Draw ground.
    new_html += '<div class="landscape-ground" stage="2">';
    new_html += '</div>';

    // Draw left alien.
    new_html += '<div class="alien" id="alien-L" stage="2" side="left">';
    new_html += `<img id="alien-L-img" src="../static/img/alien01-${trial.planet_color_left}.png"></img>`;
    new_html += '</div>';

    // Draw right alien.
    new_html += '<div class="alien" id="alien-R" stage="2" side="right">';
    new_html += `<img id="alien-R-img" src="../static/img/alien02-${trial.planet_color_left}.png"></img>`;
    new_html += '</div>';

    // Draw diamonds.
    new_html += '<div class="diamond" id="diamond-L" stage="1" side="left"></div>';
    new_html += '<div class="diamond" id="diamond-R" stage="1" side="right"></div>';

    // Draw rocks.
    new_html += '<div class="rock" id="rock-L" stage="1" side="left"></div>';
    new_html += '<div class="rock" id="rock-R" stage="1" side="right"></div>';

    // Close wrapper.
    new_html += '</div>';

    // draw
    display_element.innerHTML = new_html;

    //---------------------------------------//
    // Response handling.
    //---------------------------------------//

    // Preallocate space
    var response = {
      stage_1_key: null,
      stage_1_choice: null,
      stage_1_rt: null,
      stage_2_key: null,
      stage_2_rt: null,
      stage_2_choice: null,
      state_2_outcome: null,
    }


    // // function to handle responses by the subject
    // var stage_transition = function() {
    //   // Initialize second stage keyboardListener.
    //   var keyboardListener = "";
    //   setTimeout(function() {
    //     keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
    //       callback_function: after_second_response,
    //       valid_responses: [37,39],
    //       rt_method: 'performance',
    //       persist: false,
    //       allow_held_key: false
    //     });
    //   }, 0);
    //
    // };

    // function to handle responses by the subject
    var after_second_response = function(info) {

      // Kill all setTimeout handlers.
      jsPsych.pluginAPI.clearAllTimeouts();
      jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);

      // Log responses.
      response.stage_2_key = info.key;
      response.stage_2_rt = info.rt;
      if (response.stage_2_key == 37) {
        response.stage_2_choice = 1;
      } else {
        response.stage_2_choice = 0;
      }

      // Update screen.
      if ( response.stage_2_choice == 1 ) {

        // Determine outcome.
        if ( Math.random() > 0.2 ) {
          response.stage_2_outcome = 1;
        } else {
          response.stage_2_outcome = 0;
        }

        display_element.querySelector('#alien-L').setAttribute('status', 'chosen');

        if ( response.stage_2_outcome == 1 ) {
          display_element.querySelector('#diamond-L').setAttribute('status', 'chosen');
        }
        else {
          display_element.querySelector('#rock-L').setAttribute('status', 'chosen');
        }

      } else {

        if ( Math.random() > 0.8 ) {
          response.stage_2_outcome = 1;
        } else {
          response.stage_2_outcome = 0;
        }

        display_element.querySelector('#alien-R').setAttribute('status', 'chosen');

        if ( response.stage_2_outcome == 1 ) {
          display_element.querySelector('#diamond-R').setAttribute('status', 'chosen');
        }
        else {
          display_element.querySelector('#rock-R').setAttribute('status', 'chosen');
        }

      }

      // Pause for animation (2s).
      setTimeout(function() { end_trial(); }, 1500);

    };

    // function to end trial when it is time
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // gather the data to store for the trial
      var trial_data = {
        //common_left: trial.common_left,
        //common_right: trial.common_right,
        //rocket_color_left: trial.rocket_color_left,
        //rocket_color_right: trial.rocket_color_right,
        //planet_color_left: trial.planet_color_left,
        //planet_color_right: trial.planet_color_right,
        //stage_1_key: response.stage_1_key,
        //stage_1_rt: response.stage_1_rt,
        //stage_1_choice: response.stage_1_choice,
        stage_2_key: response.stage_2_key,
        stage_2_rt: response.stage_2_rt,
        stage_2_choice: response.stage_2_choice,
        stage_2_outcome: response.stage_2_outcome,
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    function after_first_response(){
        console.log('place holder');
    }

    // start the response listener
    var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_second_response,
      valid_responses: trial.choices,
      rt_method: 'performance',
      persist: false,
      allow_held_key: false
    });

  };

  return plugin;
})();
