/**
 * jspsych-two-step
 * Sam Zorowitz
 *
 * Plug-in to run two-step task trial
 **/

jsPsych.plugins["two-step"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'two-step',
    description: '',
    parameters: {
      common_left: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Common left',
        default: true,
        description: 'Whether common transition takes place if left rocket chosen.'
      },
      common_right: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Common left',
        default: true,
        description: 'Whether common transition takes place if left rocket chosen.'
      },
      rocket_color_left: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Rocket color left',
        description: 'Color of left rocket.'
      },
      rocket_color_right: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Rocket color left',
        description: 'Color of right rocket.'
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
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
        default: [37,39],
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },

    }
  }

  plugin.trial = function(display_element, trial) {

    //---------------------------------------//
    // Define HTML.
    //---------------------------------------//

    // Initialize HTML.
    var new_html = '';

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
    new_html += '<div class="landscape-sky" stage="1">';

    // Draw stars.
    new_html += '<div class="stars"></div>';

    // Draw left moon.
    new_html += `<div class="moon" id="moon-L" side="left" color="${trial.planet_color_left}">`;
    new_html += '<div class="shadow"></div>';
    new_html += '<div class="crater"></div>';
    new_html += '</div>';

    // Draw left moon.
    new_html += `<div class="moon" id="moon-R" side="right" color="${trial.planet_color_right}">`;
    new_html += '<div class="shadow"></div>';
    new_html += '<div class="crater"></div>';
    new_html += '</div>';

    // End sky.
    new_html += '</div>';

    // Draw ground.
    new_html += '<div class="landscape-ground" stage="1">';
    // new_html += '<div class="dirt"></div>';
    new_html += '</div>';

    // Draw left rocket.
    new_html += '<div class="tower" id="tower-L" side="left"><div class="arm"></div></div>';
    new_html += '<div class="platform" id="platform-L" side="left"></div>';
    new_html += '<div class="rocket" id="rocket-L" stage="1" side="left">';
    new_html += '<div class="rocket-body">';
    new_html += `<div class="rocket-window" color="${trial.rocket_color_left}"></div>`;
    new_html += '<div class="rocket-studs"></div>';
    new_html += `<div class="rocket-fin" side="left" color="${trial.rocket_color_left}"></div>`;
    new_html += `<div class="rocket-fin" side="right" color="${trial.rocket_color_left}"></div>`;
    new_html += '<div class="rocket-fire" id="fire-L"></div>';
    new_html += '</div></div>';

    // Draw right rocket.
    new_html += '<div class="tower" id="tower-R" side="right"><div class="arm"></div></div>';
    new_html += '<div class="platform" id="platform-R" side="right"></div>';
    new_html += '<div class="rocket" id="rocket-R" stage="1" side="right">';
    new_html += '<div class="rocket-body">';
    new_html += `<div class="rocket-window" color="${trial.rocket_color_right}"></div>`;
    new_html += '<div class="rocket-studs"></div>';
    new_html += `<div class="rocket-fin" side="left" color="${trial.rocket_color_right}"></div>`;
    new_html += `<div class="rocket-fin" side="right" color="${trial.rocket_color_right}"></div>`;
    new_html += '<div class="rocket-fire" id="fire-R"></div>';
    new_html += '</div></div>';

    // Draw left alien.
    new_html += '<div class="alien" id="alien-L" stage="1" side="left">';
    new_html += '<img src="../static/img/alien1_norm.png"></img>';
    new_html += '</div>';

    // Draw right alien.
    new_html += '<div class="alien" id="alien-R" stage="1" side="right">';
    new_html += '<img src="../static/img/alien2_norm.png"></img>';
    new_html += '</div>';

    // Draw diamonds.
    new_html += '<div class="diamond" id="diamond-L" stage="1" side="left"></div>';
    new_html += '<div class="diamond" id="diamond-R" stage="1" side="right"></div>';

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
    }

    // function to handle responses by the subject
    var after_first_response = function(info) {

      // Kill all setTimeout handlers.
      jsPsych.pluginAPI.clearAllTimeouts();
      jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);

      // Log responses.
      response.stage_1_key = info.key;
      response.stage_1_rt = info.rt;
      if (response.stage_1_key == 37) {
        response.stage_1_choice = 1;
      } else {
        response.stage_1_choice = 0;
      }

      // Initiate animation.
      if ( response.stage_1_choice == 1 && trial.common_left ) {
        display_element.querySelector('#rocket-L').setAttribute('stage', 'common');
        display_element.querySelector('#fire-L').style['display'] = 'inherit';
      } else if ( response.stage_1_choice == 1 ) {
        display_element.querySelector('#rocket-L').setAttribute('stage', 'uncommon');
        display_element.querySelector('#fire-L').style['display'] = 'inherit';
      } else if ( response.stage_1_choice == 0 && trial.common_right ) {
        display_element.querySelector('#rocket-R').setAttribute('stage', 'common');
        display_element.querySelector('#fire-R').style['display'] = 'inherit';
      } else {
        display_element.querySelector('#rocket-R').setAttribute('stage', 'uncommon');
        display_element.querySelector('#fire-R').style['display'] = 'inherit';
      }

      // Pause for animation.
      setTimeout(function() { stage_transition(); }, 2000);

    };

    // function to handle responses by the subject
    var stage_transition = function() {

      // Update screen.
      display_element.querySelector('#alien-L').setAttribute('stage', '2');
      display_element.querySelector('#alien-R').setAttribute('stage', '2');
      display_element.querySelector('#moon-L').setAttribute('stage', '2');
      display_element.querySelector('#moon-R').setAttribute('stage', '2');
      display_element.querySelector('#platform-L').setAttribute('stage', '2');
      display_element.querySelector('#platform-R').setAttribute('stage', '2');
      display_element.querySelector('#tower-L').setAttribute('stage', '2');
      display_element.querySelector('#tower-R').setAttribute('stage', '2');
      display_element.querySelector('.landscape-sky').setAttribute('stage', '2');
      display_element.querySelector('.landscape-ground').setAttribute('stage', '2');

      if ( response.stage_1_choice == 1 ) {

        if ( trial.common_left ) {
          display_element.querySelector('.landscape-ground').setAttribute('color', trial.planet_color_left);
        } else {
          display_element.querySelector('.landscape-ground').setAttribute('color', trial.planet_color_right);
        }

        display_element.querySelector('#rocket-L').setAttribute('stage', '2');
        display_element.querySelector('#fire-L').style['display'] = 'none';
        display_element.querySelector('#rocket-R').style['display'] = 'none';

      } else {

        if ( trial.common_right ) {
          display_element.querySelector('.landscape-ground').setAttribute('color', trial.planet_color_right);
        } else {
          display_element.querySelector('.landscape-ground').setAttribute('color', trial.planet_color_left);
        }

        display_element.querySelector('#rocket-R').setAttribute('stage', '2');
        display_element.querySelector('#fire-R').style['display'] = 'none';
        display_element.querySelector('#rocket-L').style['display'] = 'none';

      }

      // Initialize second stage keyboardListener.
      var keyboardListener = "";
      setTimeout(function() {
        keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_second_response,
          valid_responses: [37,39],
          rt_method: 'performance',
          persist: false,
          allow_held_key: false
        });
      }, 0);

    };

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
        display_element.querySelector('#alien-L').setAttribute('status', 'chosen');
        display_element.querySelector('#diamond-L').setAttribute('status', 'chosen');
      } else {
        display_element.querySelector('#alien-R').setAttribute('status', 'chosen');
        display_element.querySelector('#diamond-R').setAttribute('status', 'chosen');
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
        common_left: trial.common_left,
        common_right: trial.common_right,
        rocket_color_left: trial.rocket_color_left,
        rocket_color_right: trial.rocket_color_right,
        planet_color_left: trial.planet_color_left,
        planet_color_right: trial.planet_color_right,
        stage_1_key: response.stage_1_key,
        stage_1_rt: response.stage_1_rt,
        stage_1_choice: response.stage_1_choice,
        stage_2_key: response.stage_2_key,
        stage_2_rt: response.stage_2_rt,
        stage_2_choice: response.stage_2_choice,
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // start the response listener
    var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_first_response,
      valid_responses: trial.choices,
      rt_method: 'performance',
      persist: false,
      allow_held_key: false
    });

  };

  return plugin;
})();
