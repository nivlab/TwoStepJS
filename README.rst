TwoStepJS
=========

A jsPsych port of the child-friendly two-step task (doi.org/10.1177/0956797616639301).

Quickstart
^^^^^^^^^^

The following is the minimal set of commands needed to get started:

.. code-block:: bash

    ssh <user-name>@<server-name>.princeton.edu
    git clone https://github.com/szorowi1/TwoStepJS.git
    cd TwoStepJS
    pip install -r requirements.txt
    gunicorn -b 0.0.0.0:9000 -w 4 app:app

Wiki
^^^^

For details on how to serve the experiment, how the code is organized, and how data is stored, please see the `Wiki <https://github.com/nivlab/nivturk/wiki>`_.

Attributions
^^^^^^^^^^^^
- Rocket ship originally designed by Eva Lettner (codepen.io/eva_trostlos/pen/akQoLN).
- Night sky originally designed by John Balladares (codepen.io/jaballadares/pen/YVKozy).
- Moons designed by Mathew Gitchell (codepen.io/mgitch/pen/pECcD).
- Rocket tower and animation inspired by Kelly Kovalcik (codepen.io/kellykov/pen/kXmgyq).
