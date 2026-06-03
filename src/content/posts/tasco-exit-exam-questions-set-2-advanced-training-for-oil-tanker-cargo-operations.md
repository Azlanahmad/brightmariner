---
title: "TASCO Exit Exam Questions | Set 2 | Advanced Training for Oil Tanker Cargo Operations "
description: "Read about TASCO Exit Exam Questions | Set 2 | Advanced Training for Oil Tanker Cargo Operations  on Bright Mariner."
date: 2026-04-16T18:14:48.000Z
categories: ["Marine Engineering"]
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TASCO Exit Exam - Set 2</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #eef2f7;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            color: #2c3e50;
        }

        .question-container {
            width: 100%;
            max-width: 700px;
            background-color: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            display: none;
            animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }

        .question-container.active {
            display: block;
        }

        .question-container h2 {
            font-size: 19px;
            margin-bottom: 20px;
            color: #34495e;
            line-height: 1.6;
        }

        .answers {
            list-style: none;
            padding: 0;
        }

        .answers li {
            margin: 10px 0;
        }

        .answers li input {
            display: none;
        }

        .answers li label {
            display: block;
            padding: 14px;
            background-color: #fdfdfd;
            border-radius: 6px;
            cursor: pointer;
            border: 1px solid #ddd;
            transition: all 0.2s;
            font-size: 15px;
        }

        .answers li label:hover {
            background-color: #f0f7ff;
            border-color: #3498db;
        }

        .answers li.correct label {
            background-color: #e8f5e9;
            border-color: #2ecc71;
            color: #1b5e20;
            font-weight: 600;
        }

        .answers li.incorrect label {
            background-color: #ffebee;
            border-color: #e74c3c;
            color: #b71c1c;
        }

        .buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 25px;
            gap: 15px;
        }

        .buttons button {
            padding: 12px 20px;
            background-color: #2c3e50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 15px;
            transition: background 0.2s;
            flex: 1;
        }

        .buttons button:hover {
            background-color: #34495e;
        }

        .buttons button:disabled {
            background-color: #bdc3c7;
            cursor: not-allowed;
        }

        #completion-message {
            max-width: 650px;
            margin: 20px auto;
            padding: 40px;
            background-color: #fff;
            border: 2px solid #2ecc71;
            border-radius: 12px;
            text-align: center;
            display: none;
        }

        .progress-bar {
            font-size: 13px;
            color: #7f8c8d;
            margin-bottom: 10px;
            font-weight: bold;
        }
    </style>
</head>
<body>

<div class="header">
    <h1>TASCO Exam Prep - Set 2</h1>
    <p>Advanced Training for Oil Tanker Cargo Operations</p>
</div>

<!-- Question 1 -->
<div id="q1" class="question-container">
    <div class="progress-bar">Question 1 / 30</div>
    <h2>What does the acronym SECA stand for under MARPOL Annex VI?</h2>
    <ul class="answers">
        <li><input type="radio" id="q1a" name="q1"><label for="q1a">A) SOx Elimination Controlled Area</label></li>
        <li><input type="radio" id="q1b" name="q1" data-correct="true"><label for="q1b">B) SOx Emission Control Area</label></li>
        <li><input type="radio" id="q1c" name="q1"><label for="q1c">C) SOx Escalation Controlled Area</label></li>
        <li><input type="radio" id="q1d" name="q1"><label for="q1d">D) Sulphur Emission Compliance Authority</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()" disabled>« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 2 -->
<div id="q2" class="question-container">
    <div class="progress-bar">Question 2 / 30</div>
    <h2>Titanium and Aluminum materials fires are classified under which category?</h2>
    <ul class="answers">
        <li><input type="radio" id="q2a" name="q2"><label for="q2a">A) Category A</label></li>
        <li><input type="radio" id="q2b" name="q2"><label for="q2b">B) Category B</label></li>
        <li><input type="radio" id="q2c" name="q2"><label for="q2c">C) Category C</label></li>
        <li><input type="radio" id="q2d" name="q2" data-correct="true"><label for="q2d">D) Category D</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 3 -->
<div id="q3" class="question-container">
    <div class="progress-bar">Question 3 / 30</div>
    <h2>On tankers, the emergency fire pump must be capable of producing 72 m³/h at a pressure of:</h2>
    <ul class="answers">
        <li><input type="radio" id="q3a" name="q3" data-correct="true"><label for="q3a">A) 7 bar</label></li>
        <li><input type="radio" id="q3b" name="q3"><label for="q3b">B) 9 bar</label></li>
        <li><input type="radio" id="q3c" name="q3"><label for="q3c">C) 10 bar</label></li>
        <li><input type="radio" id="q3d" name="q3"><label for="q3d">D) 5 bar</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 4 -->
<div id="q4" class="question-container">
    <div class="progress-bar">Question 4 / 30</div>
    <h2>The term 'Pour Point' of an oil refers to:</h2>
    <ul class="answers">
        <li><input type="radio" id="q4a" name="q4"><label for="q4a">A) The temperature at which it begins to boil</label></li>
        <li><input type="radio" id="q4b" name="q4" data-correct="true"><label for="q4b">B) The lowest temperature at which the oil will remain fluid</label></li>
        <li><input type="radio" id="q4c" name="q4"><label for="q4c">C) The temperature at which it creates sparks</label></li>
        <li><input type="radio" id="q4d" name="q4"><label for="q4d">D) The temperature at which wax crystals first appear</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 5 -->
<div id="q5" class="question-container">
    <div class="progress-bar">Question 5 / 30</div>
    <h2>What is the maximum oxygen content allowed in the Inert Gas main?</h2>
    <ul class="answers">
        <li><input type="radio" id="q5a" name="q5"><label for="q5a">A) 2% by volume</label></li>
        <li><input type="radio" id="q5b" name="q5" data-correct="true"><label for="q5b">B) 5% by volume</label></li>
        <li><input type="radio" id="q5c" name="q5"><label for="q5c">C) 8% by volume</label></li>
        <li><input type="radio" id="q5d" name="q5"><label for="q5d">D) 11% by volume</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 6 -->
<div id="q6" class="question-container">
    <div class="progress-bar">Question 6 / 30</div>
    <h2>Under MARPOL Annex I, the Oil Record Book Part II is for:</h2>
    <ul class="answers">
        <li><input type="radio" id="q6a" name="q6"><label for="q6a">A) Machinery space operations</label></li>
        <li><input type="radio" id="q6b" name="q6" data-correct="true"><label for="q6b">B) Cargo/Ballast operations</label></li>
        <li><input type="radio" id="q6c" name="q6"><label for="q6c">C) Garbage disposal</label></li>
        <li><input type="radio" id="q6d" name="q6"><label for="q6d">D) Sewage discharge</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 7 -->
<div id="q7" class="question-container">
    <div class="progress-bar">Question 7 / 30</div>
    <h2>Pyrophoric iron sulphide is formed by the reaction of iron oxide with:</h2>
    <ul class="answers">
        <li><input type="radio" id="q7a" name="q7"><label for="q7a">A) Carbon Monoxide</label></li>
        <li><input type="radio" id="q7b" name="q7" data-correct="true"><label for="q7b">B) Hydrogen Sulphide</label></li>
        <li><input type="radio" id="q7c" name="q7"><label for="q7c">C) Nitrogen Dioxide</label></li>
        <li><input type="radio" id="q7d" name="q7"><label for="q7d">D) Pure Oxygen</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 8 -->
<div id="q8" class="question-container">
    <div class="progress-bar">Question 8 / 30</div>
    <h2>What is the minimum requirement for carrying a Garbage Management Plan onboard?</h2>
    <ul class="answers">
        <li><input type="radio" id="q8a" name="q8" data-correct="true"><label for="q8a">A) Ships ≥ 400 GT or carrying 15+ persons</label></li>
        <li><input type="radio" id="q8b" name="q8"><label for="q8b">B) Ships ≥ 100 GT only</label></li>
        <li><input type="radio" id="q8c" name="q8"><label for="q8c">C) All ships regardless of size</label></li>
        <li><input type="radio" id="q8d" name="q8"><label for="q8d">D) Ships ≥ 1000 GT only</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 9 -->
<div id="q9" class="question-container">
    <div class="progress-bar">Question 9 / 30</div>
    <h2>The process whereby solid particles collide with water droplets in the gas stream is:</h2>
    <ul class="answers">
        <li><input type="radio" id="q9a" name="q9" data-correct="true"><label for="q9a">A) Inertial impaction</label></li>
        <li><input type="radio" id="q9b" name="q9"><label for="q9b">B) Diffusion</label></li>
        <li><input type="radio" id="q9c" name="q9"><label for="q9c">C) Electrostatic attraction</label></li>
        <li><input type="radio" id="q9d" name="q9"><label for="q9d">D) Sublimation</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 10 -->
<div id="q10" class="question-container">
    <div class="progress-bar">Question 10 / 30</div>
    <h2>A 'Panamax' tanker refers to a vessel with a deadweight range of:</h2>
    <ul class="answers">
        <li><input type="radio" id="q10a" name="q10"><label for="q10a">A) 10,000 - 25,000 DWT</label></li>
        <li><input type="radio" id="q10b" name="q10" data-correct="true"><label for="q10b">B) 50,000 - 79,999 DWT</label></li>
        <li><input type="radio" id="q10c" name="q10"><label for="q10c">C) 120,000 - 150,000 DWT</label></li>
        <li><input type="radio" id="q10d" name="q10"><label for="q10d">D) Above 200,000 DWT</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 11 -->
<div id="q11" class="question-container">
    <div class="progress-bar">Question 11 / 30</div>
    <h2>RVP stands for:</h2>
    <ul class="answers">
        <li><input type="radio" id="q11a" name="q11"><label for="q11a">A) Real Vapour Pressure</label></li>
        <li><input type="radio" id="q11b" name="q11" data-correct="true"><label for="q11b">B) Reid Vapour Pressure</label></li>
        <li><input type="radio" id="q11c" name="q11"><label for="q11c">C) Rated Vessel Pressure</label></li>
        <li><input type="radio" id="q11d" name="q11"><label for="q11d">D) Relative Volume Pressure</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 12 -->
<div id="q12" class="question-container">
    <div class="progress-bar">Question 12 / 30</div>
    <h2>Before entering an enclosed space, the oxygen level must be:</h2>
    <ul class="answers">
        <li><input type="radio" id="q12a" name="q12"><label for="q12a">A) 18%</label></li>
        <li><input type="radio" id="q12b" name="q12"><label for="q12b">B) 20%</label></li>
        <li><input type="radio" id="q12c" name="q12" data-correct="true"><label for="q12c">C) 21%</label></li>
        <li><input type="radio" id="q12d" name="q12"><label for="q12d">D) 10%</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 13 -->
<div id="q13" class="question-container">
    <div class="progress-bar">Question 13 / 30</div>
    <h2>What is the primary function of the Deck Water Seal in an IGS?</h2>
    <ul class="answers">
        <li><input type="radio" id="q13a" name="q13"><label for="q13a">A) To scrub the gas</label></li>
        <li><input type="radio" id="q13b" name="q13" data-correct="true"><label for="q13b">B) To prevent backflow of cargo vapours to the engine room</label></li>
        <li><input type="radio" id="q13c" name="q13"><label for="q13c">C) To regulate the pressure in the tank</label></li>
        <li><input type="radio" id="q13d" name="q13"><label for="q13d">D) To cool the gas</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 14 -->
<div id="q14" class="question-container">
    <div class="progress-bar">Question 14 / 30</div>
    <h2>Threshold Limit Value (TLV) refers to:</h2>
    <ul class="answers">
        <li><input type="radio" id="q14a" name="q14" data-correct="true"><label for="q14a">A) Time-weighted average concentration for a normal 8-hour workday</label></li>
        <li><input type="radio" id="q14b" name="q14"><label for="q14b">B) The absolute maximum concentration allowed for 1 minute</label></li>
        <li><input type="radio" id="q14c" name="q14"><label for="q14c">C) The concentration that causes immediate death</label></li>
        <li><input type="radio" id="q14d" name="q14"><label for="q14d">D) The pressure limit of a cargo tank</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 15 -->
<div id="q15" class="question-container">
    <div class="progress-bar">Question 15 / 30</div>
    <h2>The 'Hi-Hi' or Overfill Alarm on a tanker is typically set at:</h2>
    <ul class="answers">
        <li><input type="radio" id="q15a" name="q15"><label for="q15a">A) 90% volume</label></li>
        <li><input type="radio" id="q15b" name="q15"><label for="q15b">B) 95% volume</label></li>
        <li><input type="radio" id="q15c" name="q15" data-correct="true"><label for="q15c">C) 98% volume</label></li>
        <li><input type="radio" id="q15d" name="q15"><label for="q15d">D) 100% volume</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 16 -->
<div id="q16" class="question-container">
    <div class="progress-bar">Question 16 / 30</div>
    <h2>What is the three-stage process of static electricity?</h2>
    <ul class="answers">
        <li><input type="radio" id="q16a" name="q16"><label for="q16a">A) Ignition, Combustion, Explosion</label></li>
        <li><input type="radio" id="q16b" name="q16" data-correct="true"><label for="q16b">B) Generation, Accumulation, Discharge</label></li>
        <li><input type="radio" id="q16c" name="q16"><label for="q16c">C) Friction, Heat, Spark</label></li>
        <li><input type="radio" id="q16d" name="q16"><label for="q16d">D) Compression, Expansion, Ignition</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 17 -->
<div id="q17" class="question-container">
    <div class="progress-bar">Question 17 / 30</div>
    <h2>Lower Flammable Limit (LFL) of crude oil is approximately:</h2>
    <ul class="answers">
        <li><input type="radio" id="q17a" name="q17" data-correct="true"><label for="q17a">A) 1% by volume</label></li>
        <li><input type="radio" id="q17b" name="q17"><label for="q17b">B) 5% by volume</label></li>
        <li><input type="radio" id="q17c" name="q17"><label for="q17c">C) 10% by volume</label></li>
        <li><input type="radio" id="q17d" name="q17"><label for="q17d">D) 15% by volume</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 18 -->
<div id="q18" class="question-container">
    <div class="progress-bar">Question 18 / 30</div>
    <h2>Which valve is used to protect the cargo tank from over-pressure or vacuum?</h2>
    <ul class="answers">
        <li><input type="radio" id="q18a" name="q18"><label for="q18a">A) Butterfly valve</label></li>
        <li><input type="radio" id="q18b" name="q18"><label for="q18b">B) Gate valve</label></li>
        <li><input type="radio" id="q18c" name="q18" data-correct="true"><label for="q18c">C) P/V Valve</label></li>
        <li><input type="radio" id="q18d" name="q18"><label for="q18d">D) Storm valve</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 19 -->
<div id="q19" class="question-container">
    <div class="progress-bar">Question 19 / 30</div>
    <h2>The gas source for an Inert Gas system is usually:</h2>
    <ul class="answers">
        <li><input type="radio" id="q19a" name="q19" data-correct="true"><label for="q19a">A) Boiler flue gas or an independent IG generator</label></li>
        <li><input type="radio" id="q19b" name="q19"><label for="q19b">B) Compressed air from the deck</label></li>
        <li><input type="radio" id="q19c" name="q19"><label for="q19c">C) Nitrogen cylinders from the storage room</label></li>
        <li><input type="radio" id="q19d" name="q19"><label for="q19d">D) Carbon Dioxide from the fire station</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 20 -->
<div id="q20" class="question-container">
    <div class="progress-bar">Question 20 / 30</div>
    <h2>ODMCS stands for:</h2>
    <ul class="answers">
        <li><input type="radio" id="q20a" name="q20"><label for="q20a">A) Oil Delivery Monitoring and Cargo System</label></li>
        <li><input type="radio" id="q20b" name="q20" data-correct="true"><label for="q20b">B) Oil Discharge Monitoring and Control System</label></li>
        <li><input type="radio" id="q20c" name="q20"><label for="q20c">C) Overboard Discharge Monitoring and Certification System</label></li>
        <li><input type="radio" id="q20d" name="q20"><label for="q20d">D) Oily Deposit Monitoring and Cleaning System</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 21 -->
<div id="q21" class="question-container">
    <div class="progress-bar">Question 21 / 30</div>
    <h2>The pressure at which the P/V breaker operates is usually:</h2>
    <ul class="answers">
        <li><input type="radio" id="q21a" name="q21" data-correct="true"><label for="q21a">A) Higher than the P/V valve setting</label></li>
        <li><input type="radio" id="q21b" name="q21"><label for="q21b">B) Lower than the P/V valve setting</label></li>
        <li><input type="radio" id="q21c" name="q21"><label for="q21c">C) The same as the P/V valve setting</label></li>
        <li><input type="radio" id="q21d" name="q21"><label for="q21d">D) Atmospheric pressure</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 22 -->
<div id="q22" class="question-container">
    <div class="progress-bar">Question 22 / 30</div>
    <h2>What is the 'Cloud Point' of an oil?</h2>
    <ul class="answers">
        <li><input type="radio" id="q22a" name="q22"><label for="q22a">A) The temperature at which it evaporates</label></li>
        <li><input type="radio" id="q22b" name="q22" data-correct="true"><label for="q22b">B) The temperature at which wax crystals first form and appear as a cloud</label></li>
        <li><input type="radio" id="q22c" name="q22"><label for="q22c">C) The temperature at which the oil turns black</label></li>
        <li><input type="radio" id="q22d" name="q22"><label for="q22d">D) The temperature at which gas is released</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 23 -->
<div id="q23" class="question-container">
    <div class="progress-bar">Question 23 / 30</div>
    <h2>Under OPA 90, the vessel response plan (VRP) must be submitted to:</h2>
    <ul class="answers">
        <li><input type="radio" id="q23a" name="q23" data-correct="true"><label for="q23a">A) US Coast Guard</label></li>
        <li><input type="radio" id="q23b" name="q23"><label for="q23b">B) International Maritime Organization</label></li>
        <li><input type="radio" id="q23c" name="q23"><label for="q23c">C) Port Authority of Singapore</label></li>
        <li><input type="radio" id="q23d" name="q23"><label for="q23d">D) Flag State only</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 24 -->
<div id="q24" class="question-container">
    <div class="progress-bar">Question 24 / 30</div>
    <h2>The limit for oil content in overboard discharge for an oil tanker outside special areas is:</h2>
    <ul class="answers">
        <li><input type="radio" id="q24a" name="q24"><label for="q24a">A) 15 ppm</label></li>
        <li><input type="radio" id="q24b" name="q24" data-correct="true"><label for="q24b">B) 30 Liters per nautical mile</label></li>
        <li><input type="radio" id="q24c" name="q24"><label for="q24c">C) 100 ppm</label></li>
        <li><input type="radio" id="q24d" name="q24"><label for="q24d">D) Zero discharge allowed</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 25 -->
<div id="q25" class="question-container">
    <div class="progress-bar">Question 25 / 30</div>
    <h2>Which of the following is considered a 'special liquid' cargo?</h2>
    <ul class="answers">
        <li><input type="radio" id="q25a" name="q25"><label for="q25a">A) Crude Oil</label></li>
        <li><input type="radio" id="q25b" name="q25"><label for="q25b">B) Gasoline</label></li>
        <li><input type="radio" id="q25c" name="q25" data-correct="true"><label for="q25c">C) Molten Sulphur</label></li>
        <li><input type="radio" id="q25d" name="q25"><label for="q25d">D) Diesel</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 26 -->
<div id="q26" class="question-container">
    <div class="progress-bar">Question 26 / 30</div>
    <h2>The 'Uptake' valve in an IGS is used to:</h2>
    <ul class="answers">
        <li><input type="radio" id="q26a" name="q26" data-correct="true"><label for="q26a">A) Isolate the IG system from the boiler flue gas</label></li>
        <li><input type="radio" id="q26b" name="q26"><label for="q26b">B) Increase gas pressure</label></li>
        <li><input type="radio" id="q26c" name="q26"><label for="q26c">C) Drain the scrubber tower</label></li>
        <li><input type="radio" id="q26d" name="q26"><label for="q26d">D) Release gas to the atmosphere</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 27 -->
<div id="q27" class="question-container">
    <div class="progress-bar">Question 27 / 30</div>
    <h2>Lung inflammation from chemical exposure will cause:</h2>
    <ul class="answers">
        <li><input type="radio" id="q27a" name="q27"><label for="q27a">A) Breathlessness and drowsiness</label></li>
        <li><input type="radio" id="q27b" name="q27" data-correct="true"><label for="q27b">B) Breathlessness and a dry cough</label></li>
        <li><input type="radio" id="q27c" name="q27"><label for="q27c">C) Sudden fainting</label></li>
        <li><input type="radio" id="q27d" name="q27"><label for="q27d">D) Stomach cramps</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 28 -->
<div id="q28" class="question-container">
    <div class="progress-bar">Question 28 / 30</div>
    <h2>What does the acronym PEL stand for?</h2>
    <ul class="answers">
        <li><input type="radio" id="q28a" name="q28" data-correct="true"><label for="q28a">A) Permissible Exposure Limit</label></li>
        <li><input type="radio" id="q28b" name="q28"><label for="q28b">B) Pressure Entry Level</label></li>
        <li><input type="radio" id="q28c" name="q28"><label for="q28c">C) Primary Explosive Limit</label></li>
        <li><input type="radio" id="q28d" name="q28"><label for="q28d">D) Personnel Evacuation List</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 29 -->
<div id="q29" class="question-container">
    <div class="progress-bar">Question 29 / 30</div>
    <h2>The frequency of testing gas detectors should be:</h2>
    <ul class="answers">
        <li><input type="radio" id="q29a" name="q29" data-correct="true"><label for="q29a">A) Before each use</label></li>
        <li><input type="radio" id="q29b" name="q29"><label for="q29b">B) Once a year</label></li>
        <li><input type="radio" id="q29c" name="q29"><label for="q29c">C) Every six months</label></li>
        <li><input type="radio" id="q29d" name="q29"><label for="q29d">D) Every week</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Question 30 -->
<div id="q30" class="question-container">
    <div class="progress-bar">Question 30 / 30</div>
    <h2>Identify the process of removing cargo residue by using the cargo itself as a washing medium:</h2>
    <ul class="answers">
        <li><input type="radio" id="q30a" name="q30"><label for="q30a">A) Water Washing</label></li>
        <li><input type="radio" id="q30b" name="q30" data-correct="true"><label for="q30b">B) Crude Oil Washing (COW)</label></li>
        <li><input type="radio" id="q30c" name="q30"><label for="q30c">C) Chemical Stripping</label></li>
        <li><input type="radio" id="q30d" name="q30"><label for="q30d">D) Purging</label></li>
    </ul>
    <div class="buttons">
        <button onclick="previousQuestion()">« Previous</button>
        <button onclick="nextQuestion()">Next »</button>
    </div>
</div>

<!-- Completion Message -->
<div id="completion-message">
    <h2>Wow! You finished this Set, Now Practice Next Set</h2>
    <p id="score-display"></p>
    <button onclick="location.reload()" style="background-color: #2ecc71; margin-top: 15px;">Restart Set 2</button>
</div>

<script>
    let currentQuestion = 1;
    const totalQuestions = 30;
    let score = 0;
    let answeredQuestions = new Set();

    function showQuestion(n) {
        document.querySelectorAll('.question-container').forEach(q => q.classList.remove('active'));
        const activeQ = document.getElementById(`q${n}`);
        if (activeQ) activeQ.classList.add('active');
    }

    function nextQuestion() {
        if (currentQuestion < totalQuestions) {
            currentQuestion++;
            showQuestion(currentQuestion);
        } else {
            showCompletion();
        }
    }

    function previousQuestion() {
        if (currentQuestion > 1) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    }

    function showCompletion() {
        document.querySelectorAll('.question-container').forEach(q => q.style.display = 'none');
        const message = document.getElementById('completion-message');
        const scoreDisplay = document.getElementById('score-display');
        scoreDisplay.textContent = `Total Score: ${score} / ${totalQuestions}`;
        message.style.display = 'block';
    }

    document.addEventListener('DOMContentLoaded', () => {
        showQuestion(1);

        document.querySelectorAll('.answers li').forEach(li => {
            li.addEventListener('click', function() {
                const container = this.closest('.question-container');
                const qId = container.id;

                if (answeredQuestions.has(qId)) return;

                const input = this.querySelector('input');
                const isCorrect = input.dataset.correct === "true";

                // Highlight correct answer
                container.querySelectorAll('.answers li').forEach(item => {
                    if (item.querySelector('input').dataset.correct === "true") {
                        item.classList.add('correct');
                    }
                });

                if (!isCorrect) {
                    this.classList.add('incorrect');
                } else {
                    score++;
                }

                answeredQuestions.add(qId);
            });
        });
    });
</script>

</body>
</html>
