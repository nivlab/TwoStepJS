/**
 * jspsych-pit-comprehension
 * Sam Zorowitz
 *
 * plugin for running the comprehension check for the PIT task
 *
 **/

jsPsych.plugins['two-step-comprehension'] = (function() {
  var plugin = {};

  plugin.info = {
    name: 'two-step-comprehension',
    description: '',
    parameters: {
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        description: 'Question text.'
      },
      options: {
        type: jsPsych.plugins.parameterType.STRING,
        array: true,
        pretty_name: 'Prompt',
        description: 'Question text.'
      },
      preamble: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        description: 'Question preamble.'
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        description: 'Label of the button.'
      }
    }
  }
  plugin.trial = function(display_element, trial) {

    // Plug-in setup
    var plugin_id_name = "jspsych-survey-multi-choice";
    var plugin_id_selector = '#' + plugin_id_name;
    var _join = function( /*args*/ ) {
      var arr = Array.prototype.slice.call(arguments, _join.length);
      return arr.join(separator = '-');
    }

    // ---------------------------------- //
    // Section 1: Define HTML             //
    // ---------------------------------- //

    // Initialize HTML.
    var html = '';

    // Start two-step wrapper.
    html += '<div class="two-step-wrap">';

    // Start sky.
    html += '<div class="landscape-sky" stage="1">';

    // Draw stars.
    html += '<div class="stars"></div>';

    // End sky.
    html += '</div>';

    // Close wrapper.
    html += '</div>';

    // form element
    var trial_form_id = _join(plugin_id_name, "form");
    display_element.innerHTML += '<form id="'+trial_form_id+'"></form>';

    // Show preamble text
    html += '<div class="comprehension-box">'
    html += `<div class="jspsych-survey-multi-choice-preamble"><h4>${trial.preamble}</h4></div>`;

    // Initialize form element
    html += '<form id="jspsych-survey-multi-choice-form">';

    // Initialize item
    html += `<div id="jspsych-survey-multi-choice-0" class="jspsych-survey-multi-choice-question jspsych-survey-multi-choice-horizontal" data-name="Q0">`;

    // Add question text
    html += `<p class="jspsych-survey-multi-choice-text survey-multi-choice">${trial.prompt}</p>`;

    // Iteratively add options.
    for (j = 0; j < trial.options.length; j++) {

      // Option 1: True
      html += `<div id="jspsych-survey-multi-choice-option-0-${j}" class="jspsych-survey-multi-choice-option">`;
      html += `<input type="radio" name="jspsych-survey-multi-choice-response-0" id="jspsych-survey-multi-choice-response-0-${j}" value="${j}" required>`;
      html += `<label class="jspsych-survey-multi-choice-text" for="jspsych-survey-multi-choice-response-0-${j}">${trial.options[j]}</label>`;
      html += '</div>';
    }

    // Close item
    html += '</div>';
    //// TODO: This next line causes display issues with the images
    html += '<br><p class="error" id="Q-error"></p>'

    // add submit button
    html += '<input type="submit" id="'+plugin_id_name+'-next" class="'+plugin_id_name+' jspsych-btn"' + (trial.button_label ? ' value="'+trial.button_label + '"': '') + '"></input>';

    // End HTML
    html += '</form>';
    html += '</div></div>';

    // Display HTML
    display_element.innerHTML = html;

    // ---------------------------------- //
    // Section 2: jsPsych Functions       //
    // ---------------------------------- //

    //Define error messages
    const Q = document.getElementById("Q-error");
    var count = 0;

    // Detect changes on first comprehension item
    display_element.querySelector('#jspsych-survey-multi-choice-0').addEventListener('change', function(){

      // On change, find which item is checked.
      var val = display_element.querySelector('#jspsych-survey-multi-choice-0 input:checked').value;

      // Validation
      if (val === trial.correct_option) {

        // Update text
        Q.innerHTML = trial.correct_text;
        Q.className = "valid";

        //Enable the next button
        document.getElementById("jspsych-survey-multi-choice-next").disabled = false;

      } else {

        // Update text
        Q.innerHTML = trial.feedback;
        Q.className = "invalid"

        // Restart animation
        Q.style.animation = 'none';
        Q.offsetHeight; /* trigger reflow */
        Q.style.animation = null;

        //disable the next button
        document.getElementById("jspsych-survey-multi-choice-next").disabled = true;

        // Increment error count
        count += 1;

      }

    });

    // Detect if all correct answers
    display_element.addEventListener('change', function(){
      if (Q.className === 'valid') {
        document.getElementById("jspsych-survey-multi-choice-next").disabled = false;
      } else {
        document.getElementById("jspsych-survey-multi-choice-next").disabled = true;
      }
    })


    // End experimental zone

    // Detect submit button press
    document.querySelector('form').addEventListener('submit', function(event) {
      event.preventDefault();

      // Measure response time
      var endTime = performance.now();
      var response_time = endTime - startTime;

      // Find matching question.
      var match = display_element.querySelector('#jspsych-survey-multi-choice-0');
      var response = match.querySelector("input[type=radio]:checked").value;

      // store data
      var trial_data = {
        "response": response,
        "rt": response_time
      };

      // clear html
      display_element.innerHTML += '';

      // next trial
      jsPsych.finishTrial(trial_data);

    });

    var startTime = performance.now();
  };

  return plugin;
})();
