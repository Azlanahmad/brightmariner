---
layout: "../layouts/Layout.astro"
title: ""
description: "Read about  on Bright Mariner."
---



    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
        }

        .container {
            max-width: 900px;
            margin: auto;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .left-pane {
            width: 55%;
        }

        .right-pane {
            width: 40%;
            text-align: center;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
        }

        .slider-label {
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }

        input[type="range"] {
            width: 100%;
        }

        .output-values {
            margin: 20px 0;
            font-size: 18px;
            color: #555;
        }

        .output-values span {
            display: block;
            margin: 5px 0;
        }

        .output-heading {
            font-size: 22px;
            font-weight: bold;
            color: #444;
            margin: 20px 0 10px;
            padding-bottom: 5px;
            border-bottom: 2px solid #ddd;
        }

        .chart-container {
            margin-top: 20px;
            width: 100%;
        }

        .chart-container.large {
            height: 400px;
        }

        .invest-now {
            background-color: #28a745;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 20px;
            font-size: 16px;
        }

        .invest-now:hover {
            background-color: #218838;
        }
    </style>


<div class="container">
    <!-- Left Pane for Inputs -->
    <div class="left-pane">
        <div class="form-group">
            <div class="slider-label">
                <label for="monthlySIP">Monthly investment</label>
                <span id="monthlySIPValue">₹25000</span>
            </div>
            <input type="range" id="monthlySIP" min="100" max="50000" value="25000" oninput="updateValue('monthlySIPValue', this.value)">
        </div>

        <div class="form-group">
            <div class="slider-label">
                <label for="expectedReturn">Expected return rate (p.a)</label>
                <span id="expectedReturnValue">12%</span>
            </div>
            <input type="range" id="expectedReturn" min="1" max="30" value="12" oninput="updateValue('expectedReturnValue', this.value)">
        </div>

        <div class="form-group">
            <div class="slider-label">
                <label for="years">Time period</label>
                <span id="yearsValue">16Yr</span>
            </div>
            <input type="range" id="years" min="1" max="40" value="16" oninput="updateValue('yearsValue', this.value)">
        </div>

        <div class="output-values">
            <div class="output-heading">Invested amount:</div>
            <span>₹<span id="investedAmount">0</span></span>
            <div class="output-heading">Est. returns:</div>
            <span>₹<span id="estimatedReturns">0</span></span>
            <div class="output-heading">Total value:</div>
            <span>₹<span id="totalValue">0</span></span>
        </div>

        <button class="invest-now" onclick="calculateSIP()">INVEST NOW</button>
    </div>

    <!-- Right Pane for Charts -->
    <div class="right-pane">
        <div class="chart-container">
            <canvas id="donutChart"></canvas>
        </div>
        <div class="chart-container large">
            <canvas id="sipChart"></canvas>
        </div>
    </div>
</div>

<script type="module">
    import Chart from 'https://cdn.jsdelivr.net/npm/chart.js/auto/+esm';
    let sipChart;  // Global variable to hold the chart instance
    let donutChart;

    function updateValue(spanId, value) {
        if (spanId === 'monthlySIPValue') {
            document.getElementById(spanId).innerText = '₹' + parseInt(value).toLocaleString();
        } else if (spanId === 'expectedReturnValue') {
            document.getElementById(spanId).innerText = value + '%';
        } else if (spanId === 'yearsValue') {
            document.getElementById(spanId).innerText = value + 'Yr';
        }
    }

    function calculateSIP() {
        const monthlySIP = parseFloat(document.getElementById('monthlySIP').value);
        const expectedReturn = parseFloat(document.getElementById('expectedReturn').value);
        const years = parseFloat(document.getElementById('years').value);

        const monthlyRate = expectedReturn / 12 / 100;
        const months = years * 12;
        let total = 0;
        let invested = 0;
        const totalData = [];
        const investedData = [];
        const labels = [];

        for (let i = 1; i <= months; i++) {
            invested += monthlySIP;
            total = (total + monthlySIP) * (1 + monthlyRate);

            if (i % 12 === 0) {
                totalData.push(Math.round(total));
                investedData.push(Math.round(invested));
                labels.push(i / 12);
            }
        }

        document.getElementById('investedAmount').innerText = invested.toLocaleString();
        document.getElementById('estimatedReturns').innerText = (total - invested).toLocaleString();
        document.getElementById('totalValue').innerText = Math.round(total).toLocaleString();

        renderChart(labels, totalData, investedData);
        renderDonutChart(invested, total - invested);
    }

    function renderChart(labels, totalData, investedData) {
        const ctx = document.getElementById('sipChart').getContext('2d');

        // Destroy the previous chart instance if it exists
        if (sipChart) {
            sipChart.destroy();
        }

        // Create a new chart instance
        sipChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Total Amount (₹)',
                        data: totalData,
                        borderColor: '#8884d8',
                        fill: false,
                        tension: 0.1
                    },
                    {
                        label: 'Invested Capital (₹)',
                        data: investedData,
                        borderColor: '#82ca9d',
                        fill: false,
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Years'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Amount (₹)'
                        }
                    }
                }
            }
        });
    }

    function renderDonutChart(invested, returns) {
        const ctx = document.getElementById('donutChart').getContext('2d');

        // Destroy the previous chart instance if it exists
        if (donutChart) {
            donutChart.destroy();
        }

        // Create a new doughnut chart instance
        donutChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Invested amount', 'Est. returns'],
                datasets: [{
                    label: 'Investment Breakdown',
                    data: [invested, returns],
                    backgroundColor: ['#82ca9d', '#8884d8'],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    },
                }
            }
        });
    }

    window.updateValue = updateValue;
    window.calculateSIP = calculateSIP;

    // Initial calculation and chart rendering
    calculateSIP();
</script>

