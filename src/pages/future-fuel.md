---
layout: "../layouts/Layout.astro"
title: "Future of Marine Fuel"
description: "Read about Future of Marine Fuel on Bright Mariner. A comprehensive guide for marine engineers and seafarers. Learn essential technical knowledge and safety pro"
---


    <!-- 
    Infographic Narrative Plan:
    1.  Hook: Start with the IMO's dramatic 2050 net-zero goal.
    2.  The Regulatory Squeeze: Visualize the timeline of regulations (IMO, EU ETS) pushing the industry to act.
    3.  The Contenders: A head-to-head comparison of the main fuel candidates (LNG, Methanol, Ammonia, Hydrogen) across critical metrics: Bunkering Readiness, Safety, Cost, and Emissions.
    4.  The "Drop-In" Reality Check: Analyze the role of biofuels, highlighting their scalability issues.
    5.  AI-Powered Risk Analysis: Use Gemini to generate tangible risk scenarios for each fuel type.
    6.  The Verdict & AI Advisor: A clear, flowchart-style summary that synthesizes the report's findings, enhanced with a Gemini-powered strategic advisor for personalized recommendations.
    
    Visualization Selection Summary (NO SVG or Mermaid JS used):
    -   All original visualizations retained.
    -   New Feature: AI Risk Scenario Generator. Goal: Organize/Inform. Method: Structured HTML/CSS modal powered by a Gemini API call. Justification: Makes abstract safety data concrete and actionable.
    -   New Feature: AI Strategic Fuel Advisor. Goal: Organize/Inform. Method: Structured HTML/CSS modal powered by a Gemini API call. Justification: Provides personalized, expert-level advice, increasing user engagement and value.
    -->
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f0f4f8;
        }
        .chart-container {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            height: 350px;
            max-height: 400px;
        }
        @media (max-width: 768px) {
            .chart-container {
                height: 300px;
            }
        }
        .info-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .info-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .flowchart-node {
            background-color: white;
            border: 2px solid #003f5c;
            color: #003f5c;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            text-align: center;
            font-weight: 600;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            opacity: 0;
            animation: fadeIn 0.5s ease forwards;
        }
        .flowchart-arrow {
            position: relative;
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            animation: fadeIn 0.5s ease forwards;
        }
        .flowchart-arrow::after {
            content: '▼';
            font-size: 2rem;
            color: #7a5195;
            animation: arrowBounce 1.5s infinite;
        }
        .modal {
            transition: opacity 0.25s ease;
        }
        #riskContent {
            max-height: 60vh;
            overflow-y: auto;
            padding-right: 1rem;
            line-height: 1.6;
        }
        #riskContent::-webkit-scrollbar {
            width: 8px;
        }
        #riskContent::-webkit-scrollbar-track {
            background: #f0f4f8;
        }
        #riskContent::-webkit-scrollbar-thumb {
            background: #cbd5e0;
            border-radius: 4px;
        }
        #riskContent::-webkit-scrollbar-thumb:hover {
            background: #a0aec0;
        }
        #advisorResponse {
            max-height: 60vh;
            overflow-y: auto;
            padding-right: 1rem;
            line-height: 1.6;
        }
        #advisorResponse::-webkit-scrollbar {
            width: 8px;
        }
        #advisorResponse::-webkit-scrollbar-track {
            background: #f0f4f8;
        }
        #advisorResponse::-webkit-scrollbar-thumb {
            background: #cbd5e0;
            border-radius: 4px;
        }
        #advisorResponse::-webkit-scrollbar-thumb:hover {
            background: #a0aec0;
        }
        .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border-left-color: #003f5c;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .ai-button {
            background-color: #003f5c;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            font-weight: 600;
            transition: background-color 0.2s;
        }
        .ai-button:hover {
            background-color: #002c40;
        }
        @keyframes fadeIn {
            to {
                opacity: 1;
            }
        }
        @keyframes arrowBounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(5px);
            }
        }
        .title-animate {
            animation: tracking-in-expand 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
        }
        @keyframes tracking-in-expand {
            0% {
                letter-spacing: -0.5em;
                opacity: 0;
            }
            40% {
                opacity: 0.6;
            }
            100% {
                opacity: 1;
            }
        }
    </style>
</head>
<body class="text-gray-800">

    <div class="container mx-auto p-4 md:p-8">

        <header class="text-center mb-12">
            <h1 class="text-4xl md:text-6xl font-black text-[#003f5c] mb-2 title-animate">The Race to Zero</h1>
            <p class="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">Navigating the high-stakes transition to future marine fuels. The shipping industry is at a tipping point, driven by powerful regulations and economic forces.</p>
        </header>

        <section id="regulations" class="mb-16">
            <h2 class="text-3xl font-bold text-center mb-8 text-[#003f5c]">The Regulatory Gauntlet: No Time to Wait</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div class="bg-white rounded-lg shadow-md p-6 info-card">
                    <h3 class="font-bold text-xl mb-4 text-[#374c80]">IMO's Mandate: A Collision Course with 2050</h3>
                    <p class="mb-6 text-gray-600">The International Maritime Organization (IMO) has set an unavoidable course. The "wait and see" approach is no longer a strategy—it's a high-stakes gamble against a fixed timeline.</p>
                    <div class="space-y-4">
                        <div class="flex items-center">
                            <div class="bg-[#ff764a] text-white font-bold rounded-full h-12 w-12 flex items-center justify-center text-lg mr-4">2030</div>
                            <p><strong>-20% GHG Emissions:</strong> The first major checkpoint, demanding immediate action from the existing fleet.</p>
                        </div>
                        <div class="flex items-center">
                            <div class="bg-[#bc5090] text-white font-bold rounded-full h-12 w-12 flex items-center justify-center text-lg mr-4">2040</div>
                            <p><strong>-70% GHG Emissions:</strong> An ambitious milestone rendering conventional fuels nearly obsolete.</p>
                        </div>
                        <div class="flex items-center">
                            <div class="bg-[#003f5c] text-white font-bold rounded-full h-12 w-12 flex items-center justify-center text-lg mr-4">2050</div>
                            <p><strong>Net-Zero Emissions:</strong> The final destination, requiring a complete shift to zero-carbon fuels.</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-md p-6 info-card">
                    <h3 class="font-bold text-xl mb-4 text-[#374c80]">The Carbon Price Hammer: EU ETS</h3>
                    <p class="mb-4 text-gray-600">The EU's Emissions Trading System makes carbon a real, escalating cost. Shipping companies must buy allowances for their emissions, making cleaner fuels more competitive each year.</p>
                    <div class="chart-container h-64 md:h-80">
                        <canvas id="euEtsChart"></canvas>
                    </div>
                </div>
            </div>
        </section>

        <section id="fuel-comparison" class="mb-16">
            <h2 class="text-3xl font-bold text-center mb-8 text-[#003f5c]">The Fuel Contenders: A Head-to-Head Analysis</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <div class="bg-white rounded-lg shadow-md p-6 info-card">
                    <h3 class="font-bold text-xl mb-4 text-[#374c80]">Bunkering Readiness: Who's Ready to Fuel?</h3>
                    <p class="mb-4 text-gray-600">Fuel availability is critical. LNG has a massive head start in global bunkering infrastructure, while others are just beginning to build out their networks. This chart shows operational bunkering ports as of early 2025.</p>
                    <div class="chart-container">
                        <canvas id="bunkeringChart"></canvas>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-md p-6 info-card">
                    <h3 class="font-bold text-xl mb-4 text-[#374c80]">The Price of Power: Comparing Fuel Costs</h3>
                    <p class="mb-4 text-gray-600">The transition comes at a cost. This chart compares the estimated price per unit of energy ($/GJ). Green fuels are significantly more expensive, a major hurdle that carbon taxes aim to close.</p>
                     <div class="chart-container">
                        <canvas id="costChart"></canvas>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-md p-6 lg:col-span-2 info-card">
                    <h3 class="font-bold text-xl mb-4 text-center text-[#374c80]">Safety Showdown: Managing New Risks</h3>
                    <p class="mb-6 text-gray-600 text-center max-w-3xl mx-auto">Moving beyond oil introduces new hazards. The choice of fuel is a trade-off between flammability, toxicity, and extreme temperatures. Safely managing these risks is a paramount challenge.</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div class="border-l-4 border-[#ffa600] bg-gray-50 p-4 rounded-r-lg flex flex-col justify-between">
                            <div>
                                <h4 class="font-bold text-lg mb-2">LNG</h4>
                                <p class="text-sm text-gray-600">❄️ Cryogenic (-162°C) burns</p>
                                <p class="text-sm text-gray-600">🔥 Flammable</p>
                                <p class="text-sm text-gray-600">☁️ Vapor cloud risk</p>
                            </div>
                            <button class="ai-button mt-4 text-sm" onclick="showRiskModal('LNG')">✨ Generate Risk Scenario</button>
                        </div>
                        <div class="border-l-4 border-[#ff764a] bg-gray-50 p-4 rounded-r-lg flex flex-col justify-between">
                            <div>
                                <h4 class="font-bold text-lg mb-2">Methanol</h4>
                                 <p class="text-sm text-gray-600">☠️ Toxic</p>
                                 <p class="text-sm text-gray-600">🔥 Low flashpoint (12°C)</p>
                                 <p class="text-sm text-gray-600">👻 Invisible flame</p>
                            </div>
                            <button class="ai-button mt-4 text-sm" onclick="showRiskModal('Methanol')">✨ Generate Risk Scenario</button>
                        </div>
                        <div class="border-l-4 border-[#ef5675] bg-gray-50 p-4 rounded-r-lg flex flex-col justify-between">
                             <div>
                                <h4 class="font-bold text-lg mb-2">Ammonia</h4>
                                <p class="text-sm text-gray-600">☠️ HIGHLY Toxic</p>
                                <p class="text-sm text-gray-600"> corrodes copper</p>
                                <p class="text-sm text-gray-600">💧 Aquatic hazard</p>
                            </div>
                            <button class="ai-button mt-4 text-sm" onclick="showRiskModal('Ammonia')">✨ Generate Risk Scenario</button>
                        </div>
                        <div class="border-l-4 border-[#bc5090] bg-gray-50 p-4 rounded-r-lg flex flex-col justify-between">
                            <div>
                                <h4 class="font-bold text-lg mb-2">Hydrogen</h4>
                                <p class="text-sm text-gray-600">❄️ EXTREME Cryo (-253°C)</p>
                                <p class="text-sm text-gray-600">💥 Extremely Flammable</p>
                                <p class="text-sm text-gray-600">👻 Invisible flame</p>
                            </div>
                            <button class="ai-button mt-4 text-sm" onclick="showRiskModal('Hydrogen')">✨ Generate Risk Scenario</button>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-md p-6 info-card">
                    <h3 class="font-bold text-xl mb-4 text-[#374c80]">The Space Race: Onboard Storage</h3>
                    <p class="mb-4 text-gray-600">Alternative fuels are less energy-dense than traditional fuel oil, meaning they require significantly larger tanks for the same voyage, eating into valuable cargo space. This is a critical economic trade-off.</p>
                     <div class="chart-container">
                        <canvas id="densityChart"></canvas>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow-md p-6 info-card">
                    <h3 class="font-bold text-xl mb-4 text-[#374c80]">The Biofuel Dilemma: A Drop in the Ocean?</h3>
                    <p class="mb-4 text-gray-600">Biofuels can be "dropped in" to existing engines, but their scalability is a massive challenge. Shipping must compete with road and aviation for a very limited supply of sustainable feedstocks.</p>
                     <div class="chart-container">
                        <canvas id="biofuelChart"></canvas>
                    </div>
                </div>
            </div>
        </section>

        <section id="verdict" class="mb-8">
             <h2 class="text-3xl font-bold text-center mb-8 text-[#003f5c]">The Verdict: A Phased, Multi-Fuel Pathway</h2>
             <p class="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-10">There is no single "silver bullet." The most promising strategy is a flexible, phased approach tailored to the specific needs of the fleet. Use the guide below, or get personalized AI advice.</p>
            
            <div class="max-w-4xl mx-auto" id="flowchart-container">
                <div class="flowchart-node w-fit mx-auto" style="animation-delay: 0s;">Start Here: What is your situation?</div>
                <div class="flowchart-arrow" style="animation-delay: 0.2s;"></div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
                    
                    <div class="text-center">
                        <div class="flowchart-node" style="animation-delay: 0.4s;">Existing Fleet</div>
                        <div class="flowchart-arrow" style="animation-delay: 0.6s;"></div>
                        <div class="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#ffa600] info-card" style="animation: fadeIn 0.5s ease 0.8s forwards; opacity: 0;">
                            <h4 class="font-bold text-lg mb-2">Biofuel Blends</h4>
                            <p class="text-sm text-gray-600">The most practical option for immediate carbon intensity reduction. Use as a flexible compliance tool to extend asset life with minimal CAPEX.</p>
                        </div>
                    </div>

                    <div class="text-center">
                        <div class="flowchart-node" style="animation-delay: 0.4s;">Newbuild (Near-Term)</div>
                         <div class="flowchart-arrow" style="animation-delay: 0.6s;"></div>
                        <div class="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#7a5195] info-card" style="animation: fadeIn 0.5s ease 0.8s forwards; opacity: 0;">
                            <h4 class="font-bold text-lg mb-2">LNG Dual-Fuel</h4>
                            <p class="text-sm text-gray-600">Leverages the most mature alternative fuel market for a viable, lower-risk transition. Offers a future pathway to bio/e-LNG.</p>
                        </div>
                    </div>
                    
                    <div class="text-center">
                        <div class="flowchart-node" style="animation-delay: 0.4s;">Newbuild (Long-Term)</div>
                         <div class="flowchart-arrow" style="animation-delay: 0.6s;"></div>
                        <div class="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#003f5c] info-card" style="animation: fadeIn 0.5s ease 0.8s forwards; opacity: 0;">
                            <h4 class="font-bold text-lg mb-2">Methanol Dual-Fuel</h4>
                            <p class="text-sm text-gray-600">The most balanced long-term bet. Avoids extreme safety/technical issues while providing a clear path to net-zero with green methanol.</p>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-10" style="animation: fadeIn 0.5s ease 1s forwards; opacity: 0;">
                    <button class="ai-button text-lg" onclick="showAdvisorModal()">✨ Get AI-Powered Strategic Advice</button>
                </div>
            </div>
        </section>

    </div>
    
    <!-- AI Modals -->
    <div id="riskModal" class="modal fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 opacity-0 pointer-events-none">
        <div class="bg-white rounded-lg shadow-2xl max-w-lg w-full p-6 flex flex-col" onclick="event.stopPropagation()">
            <h3 class="text-2xl font-bold mb-4 text-[#003f5c] flex-shrink-0">Risk Scenario: <span id="riskFuelName"></span></h3>
            <div id="riskContent" class="text-gray-700 space-y-3 flex-grow">
                <div class="flex justify-center items-center h-32">
                    <div class="spinner"></div>
                </div>
            </div>
            <button class="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded flex-shrink-0" onclick="hideRiskModal()">Close</button>
        </div>
    </div>
    
    <div id="advisorModal" class="modal fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 opacity-0 pointer-events-none">
        <div class="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6" onclick="event.stopPropagation()">
            <h3 class="text-2xl font-bold mb-4 text-[#003f5c]">✨ Strategic Fuel Advisor</h3>
            <p class="text-gray-600 mb-4">Describe your fleet and operational context to get a tailored fuel strategy from our AI advisor.</p>
            <div id="advisorForm">
                 <textarea id="fleetContext" class="w-full border border-gray-300 rounded-md p-2 h-40" placeholder="Example: We operate a fleet of 15 panamax bulk carriers, average age 8 years, mostly on trans-pacific routes. We have a moderate risk tolerance and are looking for a strategy to meet 2040 targets..."></textarea>
                 <button class="mt-4 w-full ai-button" onclick="getAdvisorResponse()">Analyze My Fleet</button>
            </div>
            <div id="advisorResponse" class="text-gray-700 mt-4 space-y-3 hidden">
                 <div class="flex justify-center items-center h-48">
                    <div class="spinner"></div>
                </div>
            </div>
             <button class="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded" onclick="hideAdvisorModal()">Close</button>
        </div>
    </div>


    <footer class="text-center p-6 bg-gray-800 text-gray-400 mt-12">
        <p>Infographic based on the report "Navigating the Transition: A Definitive Analysis of Future Marine Fuels."</p>
        <p class="text-sm mt-1">Data visualizations created using Chart.js. Enhanced with Gemini AI. No SVG or Mermaid JS were used in this output.</p>
    </footer>

    <script type="module">
        import Chart from 'https://cdn.jsdelivr.net/npm/chart.js/auto/+esm';

        const chartColors = {
            blue: '#003f5c',
            purple: '#7a5195',
            pink: '#bc5090',
            red: '#ef5675',
            orange: '#ff764a',
            yellow: '#ffa600',
            grey: '#a0aec0'
        };

        const tooltipTitleCallback = (tooltipItems) => {
            const item = tooltipItems[0];
            let label = item.chart.data.labels[item.dataIndex];
            return Array.isArray(label) ? label.join(' ') : label;
        };
        
        const wrapLabel = (label, maxWidth = 16) => {
            if (label.length <= maxWidth) {
                return label;
            }
            const words = label.split(' ');
            const lines = [];
            let currentLine = '';
            words.forEach(word => {
                if ((currentLine + ' ' + word).trim().length > maxWidth && currentLine.length > 0) {
                    lines.push(currentLine);
                    currentLine = word;
                } else {
                    currentLine = (currentLine + ' ' + word).trim();
                }
            });
            lines.push(currentLine);
            return lines;
        };

        const defaultChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
             animation: {
                duration: 1500,
                easing: 'easeInOutQuart',
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: 'Inter',
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    titleFont: { family: 'Inter', weight: 'bold' },
                    bodyFont: { family: 'Inter' },
                    callbacks: {
                        title: tooltipTitleCallback
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        font: { family: 'Inter' },
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        font: { family: 'Inter' }
                    },
                    grid: {
                       color: '#e2e8f0'
                    },
                    beginAtZero: true
                }
            }
        };

        new Chart(document.getElementById('euEtsChart'), {
            type: 'bar',
            data: {
                labels: ['2024', '2025', '2026'],
                datasets: [{
                    label: '% of Emissions Covered by EU ETS',
                    data: [40, 70, 100],
                    backgroundColor: [chartColors.yellow, chartColors.orange, chartColors.red],
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: { ...defaultChartOptions, plugins: { ...defaultChartOptions.plugins, legend: { display: false } } }
        });
        
        new Chart(document.getElementById('bunkeringChart'), {
            type: 'bar',
            data: {
                labels: ['LNG', 'Methanol', 'Ammonia', 'Hydrogen'],
                datasets: [{
                    label: 'Operational Bunkering Ports',
                    data: [201, 10, 0, 0],
                    backgroundColor: [chartColors.blue, chartColors.orange, chartColors.pink, chartColors.purple],
                }]
            },
            options: { ...defaultChartOptions, indexAxis: 'y', plugins: { ...defaultChartOptions.plugins, legend: { display: false } } }
        });
        
        new Chart(document.getElementById('costChart'), {
            type: 'bar',
            data: {
                labels: ['Conventional', 'LNG (Fossil)', wrapLabel('Green Methanol'), wrapLabel('Green Ammonia')],
                datasets: [{
                    label: 'Estimated Fuel Price ($/GJ)',
                    data: [14.25, 8.15, 52.50, 47.60],
                    backgroundColor: [chartColors.grey, chartColors.blue, chartColors.orange, chartColors.red],
                }]
            },
            options: { ...defaultChartOptions, plugins: { ...defaultChartOptions.plugins, legend: { display: false } },
                scales: {
                    ...defaultChartOptions.scales,
                    y: { ...defaultChartOptions.scales.y, title: { display: true, text: 'Price ($/GJ)' }}
                }
            }
        });

        new Chart(document.getElementById('densityChart'), {
            type: 'bar',
            data: {
                labels: ['VLSFO', 'LNG', 'Methanol', 'Ammonia', 'Hydrogen (Liquid)'],
                datasets: [{
                    label: 'Volume Required for Same Energy (VLSFO = 1x)',
                    data: [1, 1.8, 2.4, 3.2, 4.2], 
                    backgroundColor: [chartColors.grey, chartColors.blue, chartColors.orange, chartColors.red, chartColors.purple],
                }]
            },
            options: { ...defaultChartOptions, plugins: { ...defaultChartOptions.plugins, legend: { display: false } },
                scales: {
                    ...defaultChartOptions.scales,
                    y: { ...defaultChartOptions.scales.y, title: { display: true, text: 'Relative Volume (x)' }}
                }
            }
        });

        new Chart(document.getElementById('biofuelChart'), {
            type: 'doughnut',
            data: {
                labels: ['Biofuel use in Shipping', 'Use in other sectors (Road, Air)'],
                datasets: [{
                    label: 'Global Biofuel Consumption',
                    data: [0.3, 99.7],
                    backgroundColor: [chartColors.yellow, chartColors.blue],
                    borderColor: '#ffffff',
                    borderWidth: 4
                }]
            },
            options: { ...defaultChartOptions, cutout: '65%' }
        });

        // AI Modal Logic
        const riskModal = document.getElementById('riskModal');
        const advisorModal = document.getElementById('advisorModal');
        const riskFuelName = document.getElementById('riskFuelName');
        const riskContent = document.getElementById('riskContent');
        const advisorForm = document.getElementById('advisorForm');
        const advisorResponse = document.getElementById('advisorResponse');
        const fleetContext = document.getElementById('fleetContext');
        const spinner = `<div class="flex justify-center items-center h-32"><div class="spinner"></div></div>`;

        async function callGemini(prompt) {
             const apiKey = "AIzaSyDauGul15Z1pw3j1GHPsZgFH-HApTV87WY";
             const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
             const payload = {
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                safetySettings: [
                    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
                ]
             };
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    let errorText = `API call failed with status: ${response.status}`;
                    try {
                        const errorData = await response.json();
                        if (errorData && errorData.error && errorData.error.message) {
                            errorText += `: ${errorData.error.message}`;
                        }
                    } catch (e) {
                         errorText += ` - ${response.statusText}`;
                    }
                    throw new Error(errorText);
                }

                const result = await response.json();

                if (result.candidates && result.candidates.length > 0) {
                    if (result.candidates[0].finishReason === 'SAFETY') {
                        return "The AI's response was blocked for safety reasons. Please adjust your query.";
                    }
                    if (result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
                         return result.candidates[0].content.parts[0].text;
                    }
                }
                return "No valid response from AI. The model may be unavailable or the request was blocked.";

            } catch (error) {
                console.error("Error calling Gemini API:", error);
                return `An error occurred while fetching the AI response. ${error.message}`;
            }
        }

        function formatAIResponse(text) {
            return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#003f5c]">$1</strong>') // Bold
                       .replace(/\n/g, '<br>');
        }

        async function showRiskModal(fuel) {
            riskFuelName.innerText = fuel;
            riskContent.innerHTML = spinner;
            riskModal.classList.remove('opacity-0', 'pointer-events-none');
            const prompt = `Act as a maritime safety officer. Generate a brief, realistic operational risk scenario for a ship using ${fuel} as its primary fuel. The scenario should be about 2-3 paragraphs and highlight a specific danger associated with ${fuel} (e.g., toxicity for Ammonia, flammability for Methanol). Then, briefly list 3 critical, immediate action steps the crew should take.`;
            const response = await callGemini(prompt);
            riskContent.innerHTML = formatAIResponse(response);
        }
        
        function hideRiskModal() {
            riskModal.classList.add('opacity-0', 'pointer-events-none');
        }
        
        function showAdvisorModal() {
            advisorModal.classList.remove('opacity-0', 'pointer-events-none');
            advisorForm.style.display = 'block';
            advisorResponse.style.display = 'none';
            fleetContext.value = '';
        }

        function hideAdvisorModal() {
             advisorModal.classList.add('opacity-0', 'pointer-events-none');
        }

        async function getAdvisorResponse() {
            if (fleetContext.value.trim() === '') {
                alert('Please describe your fleet context.');
                return;
            }
            advisorForm.style.display = 'none';
            advisorResponse.style.display = 'block';
            advisorResponse.innerHTML = spinner;

            const prompt = `Act as an expert maritime fuel transition strategist. Based on the following fleet context, provide a tailored strategic recommendation for achieving regulatory compliance towards 2050.
            
            Context: "${fleetContext.value}"

            Your response should:
            1.  Start with a clear summary recommendation (e.g., "The optimal strategy is a phased transition beginning with...").
            2.  Break down the strategy into short-term (to 2030) and long-term (to 2040/2050) actions.
            3.  Discuss the pros and cons of the recommended fuel pathway(s) (e.g., Methanol, LNG, Biofuels) specifically for this user's context.
            4.  Conclude with key considerations regarding CAPEX, OPEX, and potential operational risks.
            Keep the tone professional and actionable.`;
            
            const response = await callGemini(prompt);
            advisorResponse.innerHTML = formatAIResponse(response);
        }
        
        // Close modals on background click
        riskModal.addEventListener('click', hideRiskModal);
        advisorModal.addEventListener('click', hideAdvisorModal);

        window.showRiskModal = showRiskModal;
        window.hideRiskModal = hideRiskModal;
        window.showAdvisorModal = showAdvisorModal;
        window.hideAdvisorModal = hideAdvisorModal;
        window.getAdvisorResponse = getAdvisorResponse;
    </script>

