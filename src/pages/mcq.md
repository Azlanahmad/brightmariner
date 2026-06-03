---
layout: "../layouts/Layout.astro"
title: "Q1"
description: "Read about Q1 on Bright Mariner."
---


<html>
<head>
<style>
.quiz {
  list-style: none;
  margin: 0;
  padding: 0;
}

.quiz li {
  margin-bottom: 20px;
}

.quiz h4 {
  margin: 0;
  font-size: 24px; /* Increase the font size of the question */
  font-weight: bold; /* Make the question bold */
}

.choices {
  list-style: none;
  margin: 10px 0;
  padding: 0;
}

.choices li {
  margin-bottom: 10px;
}

.correct {
  color: green;
}

.wrong {
  color: red;
}
</style>
<script>
// Define the correct answer for the question
var correctAnswer = "B";

// Define a function to check the answer and display the feedback
function checkAnswer() {
  // Get all the radio buttons
  var radios = document.getElementsByTagName("input");
  
  // Loop through the radio buttons and check the answer
  for (var i = 0; i < radios.length; i++) {
    // If the radio button is checked
    if (radios[i].checked) {
      // If the answer is correct, add the correct class
      if (radios[i].value == correctAnswer) {
        radios[i].parentNode.classList.add("correct");
      }
      // If the answer is wrong, add the wrong class and highlight the correct answer
      else {
        radios[i].parentNode.classList.add("wrong");
        document.querySelector("input[value=" + correctAnswer + "]").parentNode.classList.add("correct");
      }
    }
    // Disable the radio button to prevent changing the answer
    radios[i].disabled = true;
  }
}
</script>
</head>
<body>
<ul class="quiz">
 <li>
   <h4>What type of release is allowed for fixed gas fire extinguishing installation onboard</h4>
   <ul class="choices">
     <li>
       <label><input type="radio" name="question0" value="A" onclick="checkAnswer()" /> <span>Any automatic release system</span></label>
     </li>
     <li>
       <label><input type="radio" name="question0" value="B" onclick="checkAnswer()" /> <span>A manually operated release only</span></label>
     </li>
     <li>
       <label><input type="radio" name="question0" value="C" onclick="checkAnswer()" /> <span>An automatic release system activated by fire alarms</span></label>
     </li>
     <li>
       <label><input type="radio" name="question0" value="D" onclick="checkAnswer()" /> <span>An automatic release system activated by fire detectors</span></label>
     </li>
   </ul>
 </li>
</ul>
</body>
</html>


