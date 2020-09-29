
//colors must be determined to display in the text

var continue_label = 'המשך';

var next_label = 'הבא';

var previous_label = "קודם";

var subject_id_prompt = "נא להכניס מספר נבדק כאן";

var instructions_01 = ['ברוכים הבאים למשחק חיפוש המטמון! כאן תחפשו מטמון בחלל החיצון. תוכלו להשתמש במקשי החיצים כדי ללכת קדימה או אחורה'];

var instructions_02 = ['במשחק, תוכלו לחפש מטמון באחד משני כוכבים'];

var instructions_03 = ['בכל כוכב גרים שני חייזרים. כשתבקשו מחייזר מטמון, הוא יתן לכם מטמון, או שיתן לכם אבנים'];

var instructions_04 = ['!כך נראה מטמון בחלל'];

var instructions_05 = ['...כך נראות האבנים'];

var instructions_06 = ['.הסיכוי שכל חייזר יתן לכם מטמון משתנה לאט במשך המשחק'];

var instructions_07 = ['מכיוון שהחייזרים משנים כל הזמו את הסיכוי שהם נותנים לכם מטמון, תצטרכו לשים לב איזה חייזר נותן יותר מטמון כרגע'];

var instructions_08 = ['רמז: החייזרים יכולים להחליף צדדים, אבל זה לא משנה באיזה צד החייזר עומד כשאתם מבקשים ממנו מטמון'];

var instructions_09 = ['בואו נתאמן בלבקש מהחייזרים מטמון. תוכלו לבקש מהחייזר שבצד שמאל על ידי לחיצה על מקש החץ השמאלי. תוכלו לבקש מהחייזר שבצד ימין על ידי לחיצה על מקש החץ הימני<br><br>!לחצו על המקש הבא כדי להתחיל בתירגול'];

var instructions_10 = ['כל הכבוד! אולי שמת לב שהחייזר הזה נתן כרגע יותר מטמון מהחייזר השני'];

var instructions_11 = [':הנה כמה רמזים חשובים לחיפוש מטמון עם החייזרים'];

var instructions_12 = ['רמז 1: החייזרים לאט לאט משנים את הסיכוי שהם יתנו לך מטמון. לכן, אם חייזר נותן כרגע מטמון רוב הזמן, הוא כנראה ימשיך לתת מטמון בסיכוי גדול בזמן הקרוב. אם חייזר כרגע נותן מטמון רק לעיתים רחוקות, גם זה ימשיך כך בזמן הקרוב'];

var instructions_13 = ['רמז 2: אם חייזר אחד לא נותן מטמון בסיכוי גבוה, זה לא אומר שהשני כן נותן מטמון בסיכוי גבוה. כל חייזר עושה מה שהוא רוצה בלי קשר לחייזר השני. הם גם לא יעשו דברים כמו לתת מטמון פעם כן ופעם לא. הם פשוט נותנים מטמון בסיכוי מסויים, שמשתנה כל הזמן'];

var instructions_14 = ['לפני שתוכלו לבקש מחייזר מטמון, תצטרכו להגיע לכוכב שלהם! יש שתי חלליות ושני כוכבים. כל חללית טסה רוב הזמן לכוכב מסוים. עליכם ללמוד מהמסעות שתעשו, איזו חללית מעדיפה לנחות באיזה כוכב'];

var instructions_15 = ['כל חללית נוחתת בכוכב המועדף עליה רוב הזמן. אבל לפעמים החללית תטוס לכוכב השני. הטיסות האלה נדירות'];

// var instructions_16 = ['תרגלו בחירה של חלליות כדי ללמוד לאיזה כוכב הן טסות רוב הזמן'];

var instructions_17 = ['כל הכבוד! כעת תוכלו לתרגל את כל המשחק. ראשית תבחרו באיזו חללית לטוס. לאחר שתנחתו בכוכב, תראו שני חייזרים. בכל פעם, תוכלו לבקש רק מחייזר אחד מטמון. זיכרו שאתם מנסים לאסוף כמה שיותר מטמון חלל! נסו לתרגל 20 טיסות'];

var instructions_18 = ['כל הכבוד! המשחק יכול להיות מאתגר, אז תצטרכו להתרכז. לפני שנתחיל, אנא ענו על מספר שאלות'];

var temp = ['שלום'];

// var temp = ['שלום'];

// Comprehension check questions
var correct_text = "!נכון מאוד";
// Question 1
var comp_q1 = '<p class="jspsych-survey-multi-choice-text survey-multi-choice">נכון או לא נכון: החייזרים משנים את הסיכוי שהם יתנו מטמון במשך הזמן. אם חייזר נותן כרגע מטמון בסיכוי גבוה, ייתכן שבעתיד הוא יתן מטמון בסיכוי נמוך יותר. אם חייזר נותן מטמון בסיכוי נמוך, ייתכן שבעתיד הוא יתחיל לתת מטמון בסיכוי גבוה. הסיכוי למטמון משתנה לאט לאט </p>';

var comp_q1_option1 = "נכון";
var comp_q1_option2 = "לא נכון";
var comp_q1_feedback = "רמז: החייזרים משנים אט אט את הסיכוי לתת מטמון";
var comp_q1_correct = "0"; //indicate which option is the correct answer (starting at zero)

//Question 2
// comp_q2 moved to two-step-xperiment so that the color variable can be referenced there.
var comp_q2_option1 = "נכון";
var comp_q2_option2 = "לא נכון";
var comp_q2_feedback = "רמז: תמיד יש סיכוי קטן שהחללית תנחת בכוכב השני";
var comp_q2_correct = "1"; //indicate which option is the correct answer (starting at zero)

// Question 3
var comp_q3 = '<p class="jspsych-survey-multi-choice-text survey-multi-choice">True or False: Sometimes a rocketship will have a problem and will go to a different planet by accident. </p>';
var comp_q3_option1 = "True";
var comp_q3_option2 = "לא נכון";
var comp_q3_feedback = "Hint: There is a small chance that a rocketship will malfunction.";
var comp_q3_correct = "0"; //indicate which option is the correct answer (starting at zero)

var instructions_19 = ['מצוין! עכשיו אתם מוכנים למשחק. זיכרו, אתם מנסים לאסוף כמה שיותר מטמון. ליחצו "הלאה" כדי להתחיל. בהצלחה'];

var block_end = ['קחו הפסקה! תוכלו ללחוץ על כל מקש כדי להמשיך כשתהיו מוכנים'];

var exp_end = ['Exp end test text.'];
