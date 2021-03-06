/**
 * jspsych-pit-instructions
 * Sam Zorowitz
 *
 * plugin for running the instructions for the PIT task
 *
 **/

jsPsych.plugins["two-step-instructions"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'two-step-instructions',
    description: '',
    parameters: {
      pages: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Pages',
        default: undefined,
        array: true,
        description: 'Each element of the array is the content for a single page.'
      },
      key_forward: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Key forward',
        default: 'leftarrow',
        description: 'The key the subject can press in order to advance to the next page.'
      },
      key_backward: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Key backward',
        default: 'rightarrow',
        description: 'The key that the subject can press to return to the previous page.'
      },
      add_moons: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name:'Do or do not draw moons?',
        default: undefined,
        array: true,
        description: 'Decides if moons appear on this instructions slide.'
      },
      add_aliens: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name:'Do or do not draw aliens?',
        default: undefined,
        array: true,
        description: 'Decides if aliens appear on this instructions slide.'
      },
      add_diamonds: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name:'Do or do not draw diamonds?',
        default: undefined,
        array: true,
        description: 'Decides if diamonds appear on this instructions slide.'
      },
      add_rocks: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name:'Do or do not draw rocks?',
        default: undefined,
        array: true,
        description: 'Decides if rocks appear on this instructions slide.'
      },
      add_one_alien: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name:'Show correct alien in practice',
        default: undefined,
        array: true,
        description: 'Decides if that alien appears on this instructions slide.'
      },
      add_rockets: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name:'Show the rockets. ',
        default: undefined,
        array: true,
        description: 'Decides if the rockets appear on this instructions slide.'
      }
    }
  }

  plugin.trial = function(display_element, trial) {

    //---------------------------------------//
    // Section 1: Define HTML.
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

    // Draw right moon.
    new_html += `<div class="moon" id="moon-R" side="right" color="${trial.planet_color_right}">`;
    new_html += '<div class="shadow"></div>';
    new_html += '<div class="crater"></div>';
    new_html += '</div>';

    // End sky.
    new_html += '</div>';

    new_html += '<div id="rockets">';

    // Draw ground.
    new_html += '<div class="landscape-ground" stage="1">';
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

    // Close rockets.
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
    new_html += '<div class="diamond" id="diamond-L" stage="1" status="instructions" side="center"></div>';

    // Draw rocks.
    new_html += '<div class="rock" id="rock-C" stage="1" status="instructions" side="center"></div>';

    // Draw center alien.
    new_html += '<div class="alien" id="alien-C" stage="2" side="center">';
    new_html += `<img id="alien-R-img" src="../static/img/alien01-${trial.planet_color_left}.png"></img>`;
    new_html += '</div>';

    // Close wrapper.
    new_html += '</div>';

    // Draw instructions
    new_html += '<div class="instructions-box"><div class="instructions"></div></div>';

    // Draw buttons
    new_html += '<div class="jspsych-instructions-nav">';
    new_html += '<button id="jspsych-instructions-next" class="jspsych-btn" style="position: absolute; left: 49%; bottom: 10%; -webkit-transform: translate(-100%, -50%); transform: translate(-100%, -50%)">&lt;'+ next_label + '</button>'; //disabled="disabled"
    new_html += '<button id="jspsych-instructions-back" class="jspsych-btn" style="position: absolute; left: 51%; bottom: 10%; -webkit-transform: translate(0%, -50%); transform: translate(0%, -50%)">' + previous_label + '&gt;</button>';
    new_html += '</div>';

    // draw
    display_element.innerHTML = new_html;

    //---------------------------------------//
    // Task functions.
    //---------------------------------------//

    // Initialize variables.
    var current_page = 0;
    var view_history = [];
    var start_time = performance.now();
    var last_page_update_time = start_time;

    // Define EventListener.
    function btnListener(evt){
    	evt.target.removeEventListener('click', btnListener);
    	if(this.id === "jspsych-instructions-back"){
    		back();
    	}
    	else if(this.id === 'jspsych-instructions-next'){
    		next();
    	}
    }

    function show_current_page() {

      // Update instructions text.
      display_element.querySelector('.instructions').innerHTML = `<p>${trial.pages[current_page]}</p>`;

      // Update prev button
      if (current_page != 0) {
        display_element.querySelector('#jspsych-instructions-back').disabled = false;
        display_element.querySelector('#jspsych-instructions-back').addEventListener('click', btnListener);
      } else {
        display_element.querySelector('#jspsych-instructions-back').disabled = true;
      }
      // Update next button
      display_element.querySelector('#jspsych-instructions-next').addEventListener('click', btnListener);

      // Update task elements
      if (trial.add_moons[current_page]) {
        display_element.querySelector('#moon-L').style.display = "block";
        display_element.querySelector('#moon-R').style.display = "block";
      } else {
        display_element.querySelector('#moon-L').style.display = "none";
        display_element.querySelector('#moon-R').style.display = "none";
      }

      if (trial.add_aliens[current_page]) {
        display_element.querySelector('#alien-L').style.display = "block";
        display_element.querySelector('#alien-R').style.display = "block";
      } else {
        display_element.querySelector('#alien-L').style.display = "none";
        display_element.querySelector('#alien-R').style.display = "none";
      }

      if (trial.add_diamonds[current_page]) {
        display_element.querySelector('#diamond-L').style.display = "block";
      } else {
        display_element.querySelector('#diamond-L').style.display = "none";
      }

      if (trial.add_rocks[current_page]) {
        display_element.querySelector('#rock-C').style.display = "block";
      } else {
        display_element.querySelector('#rock-C').style.display = "none";
      }

      if (trial.add_one_alien[current_page]) {
        display_element.querySelector('#alien-C').style.display = "block";
      } else {
        display_element.querySelector('#alien-C').style.display = "none";
      }

      if (trial.add_rockets[current_page]) {
        display_element.querySelector('#rockets').style.display = "block";
      } else {
        display_element.querySelector('#rockets').style.display = "none";
      }

    }

    function next() {

      add_current_page_to_view_history()

      current_page++;

      // if done, finish up...
      if (current_page >= trial.pages.length) {
        endTrial();
      } else {
        show_current_page();
      }

    }

    function back() {

      add_current_page_to_view_history()

      current_page--;

      show_current_page();
    }

    function add_current_page_to_view_history() {

      var current_time = performance.now();

      var page_view_time = current_time - last_page_update_time;

      view_history.push({
        page_index: current_page,
        viewing_time: page_view_time
      });

      last_page_update_time = current_time;
    }

    function endTrial() {

      jsPsych.pluginAPI.cancelKeyboardResponse(keyboard_listener);

      display_element.innerHTML = '';

      var trial_data = {
        "view_history": JSON.stringify(view_history),
        "rt": performance.now() - start_time
      };

      jsPsych.finishTrial(trial_data);
    }

    var after_response = function(info) {

      // have to reinitialize this instead of letting it persist to prevent accidental skips of pages by holding down keys too long
      keyboard_listener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: [trial.key_forward, trial.key_backward],
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
      // check if key is forwards or backwards and update page
      if (jsPsych.pluginAPI.compareKeys(info.key, trial.key_backward)) {
        if (current_page !== 0) {
          back();
        }
      }

      if (jsPsych.pluginAPI.compareKeys(info.key, trial.key_forward)) {
        next();
      }

    };

    show_current_page();

    var keyboard_listener = jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_response,
      valid_responses: [trial.key_forward, trial.key_backward],
      rt_method: 'performance',
      persist: false
    });
  };

  return plugin;
})();
