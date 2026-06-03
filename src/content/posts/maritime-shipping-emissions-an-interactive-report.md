---
title: "Maritime Shipping Emissions: An Interactive Report"
description: "Read about Maritime Shipping Emissions: An Interactive Report on Bright Mariner."
date: 2025-07-04T17:11:54.000Z
categories: ["Marine Engineering"]
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maritime Shipping Emissions: An Interactive Report</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <!-- Chosen Palette: Oceanic Calm -->
    <!-- Application Structure Plan: The application is designed as a single-page app with a top-level tabbed navigation to improve usability. A dense report is broken into logical, thematic sections: an 'Overview', 'Regulatory Landscape', 'Company Deep Dive', and 'Reporting Standards'. This non-linear structure allows users to directly access the information they are most interested in, rather than scrolling through a long document. The 'Company Deep Dive' is the core interactive element, allowing for direct comparison between companies via a selector that dynamically updates charts and text blocks. This user-driven exploration is more engaging and facilitates better understanding and synthesis of complex comparative data than a static report format. -->
    <!-- Visualization & Content Choices: 
        - Report Info: Company-specific GHG targets (Net-Zero year). Goal: Compare. Viz: Bar Chart (Chart.js). Interaction: User can see all companies' primary goals side-by-side for immediate comparison. Justification: A bar chart is the most effective way to compare single data points across multiple categories.
        - Report Info: Company-specific GHG scope breakdown (Maersk). Goal: Inform/Proportions. Viz: Doughnut Chart (Chart.js). Interaction: On company selection, the chart shows the emission breakdown. Justification: A doughnut chart is ideal for showing part-to-whole relationships.
        - Report Info: Key regulations (IMO/EU). Goal: Organize/Inform. Viz: Interactive Cards (HTML/Tailwind). Interaction: Users click tabs for IMO/EU, then view details on cards. Justification: Cards chunk information neatly, and tabbing prevents overwhelming the user with too much text at once.
        - Report Info: GHG Protocol Scopes. Goal: Explain/Organize. Viz: Diagram-style layout (HTML/Tailwind Grid). Interaction: Static visual explanation. Justification: A visual layout with icons is more intuitive and quicker to grasp than a dense text description.
        - CONFIRMATION: NO SVG graphics used. NO Mermaid JS used.
    -->
    <style>
        body { font-family: 'Inter', sans-serif; }
        .chart-container { position: relative; width: 100%; height: 320px; max-height: 400px; }
        @media (min-width: 768px) { .chart-container { height: 400px; } }
        .tab-active { border-bottom-color: #0891b2; color: #0e7490; }
        .tab-inactive { border-bottom-color: transparent; color: #475569; }
        .nav-tab:hover, .sub-nav-tab:hover { color: #0e7490; border-bottom-color: #0891b2; transform: translateY(-2px); transition: all 0.2s ease-in-out; }
        .nav-tab, .sub-nav-tab { transition: all 0.2s ease-in-out; }
        .card-hover:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); transition: all 0.3s ease-in-out; }
        .fade-in { animation: fadeIn 0.5s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    </style>
</head>
<body class="bg-slate-50 text-slate-700">

    <div class="min-h-screen">
        <header class="bg-white shadow-sm sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4">
                    <h1 class="text-xl sm:text-2xl font-bold text-slate-800">Maritime Emissions Navigator</h1>
                    <span class="text-3xl">🚢</span>
                </div>
                <nav class="border-b border-slate-200">
                    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center">
                        <li class="mr-2">
                            <button class="nav-tab inline-block p-4 border-b-2 rounded-t-lg tab-active" data-tab="overview">Overview</button>
                        </li>
                        <li class="mr-2">
                            <button class="nav-tab inline-block p-4 border-b-2 rounded-t-lg tab-inactive" data-tab="regulations">Regulatory Landscape</button>
                        </li>
                        <li class="mr-2">
                            <button class="nav-tab inline-block p-4 border-b-2 rounded-t-lg tab-inactive" data-tab="companies">Company Deep Dive</button>
                        </li>
                        <li class="mr-2">
                            <button class="nav-tab inline-block p-4 border-b-2 rounded-t-lg tab-inactive" data-tab="standards">Reporting Standards</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            <div id="overview" class="content-tab fade-in">
                <div class="bg-white p-6 sm:p-8 rounded-xl shadow">
                    <h2 class="text-2xl font-bold text-slate-900 mb-4">Navigating the Tides of Change</h2>
                    <p class="mb-6 text-slate-600">
                        The global maritime shipping industry, the backbone of international trade, is at a critical juncture. Accounting for nearly 3% of global greenhouse gas (GHG) emissions, with projections indicating a rise without decisive intervention, robust and transparent emission reporting has become a critical imperative. This reporting serves a dual purpose: it acts as a fundamental compliance mechanism for an evolving landscape of international and regional regulations, and it functions as an essential tool for fostering transparency, ensuring accountability, and driving comprehensive decarbonization strategies within major shipping companies.
                    </p>
                    <p class="mb-6 text-slate-600">
                        The International Maritime Organization (IMO) and the European Union (EU) stand as the principal regulatory bodies shaping maritime emission reporting standards. In response to these escalating regulatory demands and increasing stakeholder expectations, leading global carriers such as A.P. Møller - Maersk, Mediterranean Shipping Company (MSC), CMA CGM Group, COSCO Shipping Holdings, and Hapag-Lloyd are demonstrating a proactive and comprehensive approach to emission reporting and reduction. Explore the tabs above to understand the forces shaping this monumental transition.
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div class="bg-slate-100 p-4 rounded-lg">
                            <p class="text-3xl font-bold text-cyan-700">~3%</p>
                            <p class="text-sm font-medium text-slate-600">of Global GHG Emissions</p>
                        </div>
                        <div class="bg-slate-100 p-4 rounded-lg">
                            <p class="text-3xl font-bold text-cyan-700">2050</p>
                            <p class="text-sm font-medium text-slate-600">IMO Net-Zero Target Year</p>
                        </div>
                        <div class="bg-slate-100 p-4 rounded-lg">
                            <p class="text-3xl font-bold text-cyan-700">Scope 1, 2 & 3</p>
                            <p class="text-sm font-medium text-slate-600">GHG Protocol Reporting</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="regulations" class="content-tab hidden fade-in">
                 <div class="bg-white p-6 sm:p-8 rounded-xl shadow">
                    <h2 class="text-2xl font-bold text-slate-900 mb-2">The Regulatory Framework</h2>
                    <p class="mb-6 text-slate-600">Emission reporting is governed by a complex web of international and regional rules. The International Maritime Organization (IMO) sets global standards, while bodies like the European Union (EU) often implement more stringent regional measures. This section breaks down the key regulations that shipping companies must navigate. Select a regulatory body to explore its key initiatives.</p>
                    
                    <div class="mb-4 border-b border-gray-200">
                        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="regulation-sub-nav">
                            <li class="mr-2"><button class="sub-nav-tab inline-block p-4 border-b-2 rounded-t-lg tab-active" data-subtab="imo">IMO Regulations</button></li>
                            <li class="mr-2"><button class="sub-nav-tab inline-block p-4 border-b-2 rounded-t-lg tab-inactive" data-subtab="eu">EU Regulations</button></li>
                        </ul>
                    </div>

                    <div id="imo" class="sub-content-tab">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div class="bg-slate-50 p-5 rounded-lg border border-slate-200 card-hover">
                                <h3 class="font-bold text-slate-800 mb-2">IMO GHG Strategy (2023 Revisions)</h3>
                                <p class="text-sm text-slate-600">Sets ambitious targets: net-zero GHG emissions by 2050, with indicative checkpoints for 2030 (20-30% reduction) and 2040 (70-80% reduction) from 2008 levels. It explicitly focuses on life-cycle GHG emissions and drives long-term investment in new fuels and technologies. The Net-Zero Framework (NZF) was approved in April 2025 and is slated for adoption in October 2025, effective 2028.</p>
                            </div>
                            <div class="bg-slate-50 p-5 rounded-lg border border-slate-200 card-hover">
                                <h3 class="font-bold text-slate-800 mb-2">IMO Data Collection System (DCS)</h3>
                                <p class="text-sm text-slate-600">Since 2018, ships over 5,000 GT must collect and report detailed fuel oil consumption data annually to the IMO, commencing in 2019. This includes granular data on fuel consumption per consumer type and onshore power supplied. Bunker Delivery Notes (BDNs) are critical for this process, as inaccuracies can directly influence a vessel's Carbon Intensity Indicator (CII) calculation.</p>
                            </div>
                            <div class="bg-slate-50 p-5 rounded-lg border border-slate-200 card-hover">
                                <h3 class="font-bold text-slate-800 mb-2">CII, EEDI & SEEMP</h3>
                                <p class="text-sm text-slate-600">The Carbon Intensity Indicator (CII), introduced in 2023, measures and regulates the operational carbon intensity of ships. The Energy Efficiency Design Index (EEDI) applies to new ships for inherent efficiency. The Ship Energy Efficiency Management Plan (SEEMP) is a tool for continuous operational efficiency improvement. DCS data is essential for compliance, and CII directly incentivizes operational measures like slow steaming.</p>
                            </div>
                             <div class="bg-slate-50 p-5 rounded-lg border border-slate-200 card-hover">
                                <h3 class="font-bold text-slate-800 mb-2">MARPOL Annex VI (SOx & NOx)</h3>
                                <p class="text-sm text-slate-600">Controls air pollution from ships. Global sulfur content limits are 0.50% m/m (from 2020), with stricter 0.10% m/m limits in Emission Control Areas (ECAs) like the Mediterranean Sea (from May 2025). NOx emissions are controlled via a tiered system (Tier I, II, III), with Tier III applying to ships in designated NOx ECAs (e.g., Baltic and North Seas for ships built after Jan 2021).</p>
                            </div>
                        </div>
                    </div>
                    <div id="eu" class="sub-content-tab hidden">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div class="bg-slate-50 p-5 rounded-lg border border-slate-200 card-hover">
                                <h3 class="font-bold text-slate-800 mb-2">EU Emissions Trading System (ETS)</h3>
                                <p class="text-sm text-slate-600">Integrates shipping into a 'cap-and-trade' system from 2024. Ships over 5,000 GT must acquire and surrender emission allowances for reported GHG emissions. Coverage began at 40% in 2024, increasing to 100% by 2026 for intra-EU voyages. This transforms emissions into a direct financial liability, creating a powerful economic incentive for decarbonization.</p>
                            </div>
                            <div class="bg-slate-50 p-5 rounded-lg border border-slate-200 card-hover">
                                <h3 class="font-bold text-slate-800 mb-2">FuelEU Maritime Regulation</h3>
                                <p class="text-sm text-slate-600">Effective from 2025, this regulation imposes 'Well-to-Wake' (WTW) GHG emissions requirements per unit of energy consumed. It mandates a 2% reduction in WTW GHG intensity by 2025, escalating to 80% by 2050 (from a 2020 baseline). WTW accounts for the entire lifecycle of the fuel, pushing companies to adopt greener fuels with lower overall carbon footprints.</p>
                            </div>
                            <div class="bg-slate-50 p-5 rounded-lg border border-slate-200 card-hover">
                                <h3 class="font-bold text-slate-800 mb-2">EU SECAs & NECAs</h3>
                                <p class="text-sm text-slate-600">The EU has established Sulphur Emission Control Areas (SECAs) in the Baltic and North Seas (from 2007), and the Mediterranean Sea (from May 2025), requiring marine fuels with max 0.10% sulfur. The Baltic and North Seas are also NOx Emission Control Areas (NECAs). These stricter regional limits create a complex, multi-layered compliance environment for global shipping companies.</p>
                            </div>
                        </div>
                        <p class="mt-6 text-slate-600">
                            The establishment and expansion of ECAs and NECAs, with their stricter emission limits compared to global MARPOL standards, illustrate a dynamic where regional regulations often act as a vanguard for environmental policy. This creates a complex, dual compliance challenge for global shipping companies, requiring them to adhere to both international baseline standards and more stringent regional rules.
                        </p>
                    </div>
                </div>
            </div>

            <div id="companies" class="content-tab hidden fade-in">
                <div class="bg-white p-6 sm:p-8 rounded-xl shadow mb-8">
                    <h2 class="text-2xl font-bold text-slate-900 mb-2">Company Deep Dive & Comparison</h2>
                    <p class="mb-6 text-slate-600">Leading maritime carriers are not just complying with regulations; they are actively shaping the future of sustainable shipping. This section provides a comparative look at their decarbonization targets and strategies. The chart below shows the publicly stated net-zero GHG target year for each company, offering a quick overview of their ambition levels.</p>
                     <div class="chart-container mx-auto max-w-4xl">
                        <canvas id="companyComparisonChart"></canvas>
                    </div>
                </div>

                <div class="bg-white p-6 sm:p-8 rounded-xl shadow">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <h2 class="text-2xl font-bold text-slate-900 mb-2 sm:mb-0">Explore Company Strategies</h2>
                        <div>
                            <label for="company-selector" class="sr-only">Select a company</label>
                            <select id="company-selector" class="block w-full sm:w-auto p-2 border border-slate-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 ease-in-out hover:border-cyan-500">
                                <option value="maersk">A.P. Møller - Maersk</option>
                                <option value="msc">Mediterranean Shipping Company</option>
                                <option value="cma-cgm">CMA CGM Group</option>
                                <option value="cosco">COSCO Shipping Holdings</option>
                                <option value="hapag-lloyd">Hapag-Lloyd</option>
                            </select>
                        </div>
                    </div>
                     <p class="mb-6 text-slate-600" id="company-intro">Select a company from the dropdown menu to explore its specific emission profile, decarbonization strategy, and key initiatives in detail.</p>
                    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        <div class="lg:col-span-3">
                            <h3 class="text-xl font-semibold text-slate-800 mb-4" id="company-name-title"></h3>
                            <p class="text-slate-600 mb-4" id="company-description"></p>
                            <h4 class="font-semibold text-slate-800 mb-2">Key Decarbonization Strategies:</h4>
                            <ul class="list-disc list-inside text-slate-600 space-y-2" id="company-strategy-list">
                            </ul>
                        </div>
                        <div class="lg:col-span-2">
                             <h3 class="text-xl font-semibold text-slate-800 mb-4 text-center">GHG Emissions Breakdown</h3>
                             <div class="chart-container mx-auto max-w-sm" id="scope-chart-container">
                                <canvas id="scopeBreakdownChart"></canvas>
                             </div>
                             <p id="scope-chart-note" class="text-xs text-center text-slate-500 mt-2"></p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="standards" class="content-tab hidden fade-in">
                <div class="bg-white p-6 sm:p-8 rounded-xl shadow">
                    <h2 class="text-2xl font-bold text-slate-900 mb-2">Common Reporting Standards</h2>
                    <p class="mb-6 text-slate-600">To ensure consistency, transparency, and comparability, companies rely on globally recognized standards for reporting emissions. These frameworks provide the methodologies and principles for calculating and disclosing environmental performance. The most prominent is the GHG Protocol, which categorizes emissions into three scopes.</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-cyan-50 border-l-4 border-cyan-500 p-6 rounded-r-lg card-hover">
                            <h3 class="font-bold text-cyan-900 text-lg mb-2">Scope 1: Direct Emissions</h3>
                            <p class="text-sm text-cyan-800">These are emissions that arise directly from operations owned or controlled by the reporting company. In maritime shipping, this primarily encompasses emissions generated from the combustion of marine fuels in a company's owned or operated vessel fleet, including CO2, SOx, and NOx from ship engines.</p>
                        </div>
                        <div class="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg card-hover">
                            <h3 class="font-bold text-amber-900 text-lg mb-2">Scope 2: Indirect Emissions</h3>
                            <p class="text-sm text-amber-800">These emissions are indirect and result from the generation of purchased or acquired electricity, steam, heating, or cooling consumed by the reporting company. For shipping companies, this typically covers the electricity consumption at their owned or controlled port terminals, corporate offices, and other land-based facilities.</p>
                        </div>
                        <div class="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg card-hover">
                            <h3 class="font-bold text-emerald-900 text-lg mb-2">Scope 3: Value Chain Emissions</h3>
                            <p class="text-sm text-emerald-800">This broad category includes all other indirect emissions (not covered in Scope 2) that occur in the value chain of the reporting company, encompassing both upstream and downstream activities. For maritime shipping, this can include emissions from fuel production ("well-to-tank"), subcontracted transport, and business travel.</p>
                        </div>
                    </div>
                    <p class="mt-6 text-slate-600">
                        The widespread adoption of the GHG Protocol, particularly the increasing focus on Scope 3 emissions, signifies a critical expansion of reporting responsibility for shipping companies. It compels them to look beyond their immediate operational control to encompass the entire value chain, fostering greater supply chain transparency and collaborative decarbonization efforts.
                    </p>

                    <div class="mt-8">
                        <h3 class="text-xl font-semibold text-slate-800 mb-4">Data Collection and Quantification Methods</h3>
                         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div class="bg-slate-50 p-5 rounded-lg border border-slate-200 card-hover">
                                <h3 class="font-bold text-slate-800 mb-2">Fuel Oil Consumption Data (BDNs)</h3>
                                <p class="text-sm text-slate-600">The collection of detailed fuel oil consumption data forms the bedrock of maritime emission reporting. Bunker Delivery Notes (BDNs) are critical documents, accurately recording fuel type, quantity, density, and sulfur content. Electronic BDNs are increasingly accepted, reflecting a shift towards digital efficiency in data management.</p>
                            </div>
                            <div class="bg-slate-50 p-5 rounded-lg border border-slate-200 card-hover">
                                <h3 class="font-bold text-slate-800 mb-2">Operational Efficiency Measures</h3>
                                <p class="text-sm text-slate-600">Shipping companies implement various operational strategies to reduce emissions, including regular energy audits, optimizing voyage planning and routing to minimize fuel consumption, implementing slow steaming practices, and improving hull maintenance and cleaning to reduce hydrodynamic drag.</p>
                            </div>
                            <div class="bg-slate-50 p-5 rounded-lg border border-slate-200 card-hover">
                                <h3 class="font-bold text-slate-800 mb-2">Direct Measurement vs. Calculation</h3>
                                <p class="text-sm text-slate-600">Emissions can be quantified using direct measurement (e.g., Continuous Emissions Monitoring Systems - CEMS) or calculation-based methods. Most organizations, including shipping companies, primarily use calculation methods, multiplying activity data (e.g., fuel consumption) by specific emission factors. Digital tools are increasingly vital for managing this complex data.</p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8">
                        <h3 class="text-xl font-semibold text-slate-800 mb-4">Other Key Frameworks</h3>
                        <ul class="space-y-3">
                            <li class="p-4 bg-slate-100 rounded-md card-hover">
                                <span class="font-semibold text-slate-700">ISO 14083:</span>
                                <span class="text-slate-600"> An international standard (2023) providing a common, standardized calculation method for GHG emissions from freight and passenger transport, enabling accurate Scope 3 measurement.</span>
                            </li>
                             <li class="p-4 bg-slate-100 rounded-md card-hover">
                                <span class="font-semibold text-slate-700">GRI Standards:</span>
                                <span class="text-slate-600"> Widely recognized for comprehensive sustainability reporting globally, offering a robust framework for disclosing environmental, social, and governance (ESG) performance.</span>
                            </li>
                             <li class="p-4 bg-slate-100 rounded-md card-hover">
                                <span class="font-semibold text-slate-700">GLEC Framework:</span>
                                <span class="text-slate-600"> From the Smart Freight Centre, designed to promote data transparency for inland logistics and freight emissions, often used with ISO 14083.</span>
                            </li>
                            <li class="p-4 bg-slate-100 rounded-md card-hover">
                                <span class="font-semibold text-slate-700">General Reporting Protocol (GrP) Principles:</span>
                                <span class="text-slate-600"> Outlines five overarching accounting and reporting principles: Relevance, Completeness, Consistency, Transparency, and Accuracy, fundamental for ensuring GHG data faithfully represents an organization's emissions.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    </div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    const companyData = {
        'maersk': {
            name: 'A.P. Møller - Maersk',
            description: 'Maersk aims for net-zero GHG emissions across their entire value chain by 2040, validated by the Science Based Targets initiative (SBTi) against a 1.5°C pathway. They are pioneering a "first-mover" advantage in decarbonization.',
            strategies: [
                'Pioneering dual-fuel methanol vessels and securing green fuel supplies, with 7 new vessels delivered in 2024 and the first methanol-capable retrofit.',
                'Optimizing network efficiency with AI-powered StarConnect platform, processing billions of data points for optimal routing and speed.',
                'Strategic partnerships like Gemini Cooperation with Hapag-Lloyd to create a leaner, lower-emission network.',
                'Investing in green logistics parks and terminals with renewable energy integration (e.g., Ruakura Superhub, Jeddah Logistics Park).',
                'Offering customers a low-GHG service via "Maersk ECO Delivery" to accelerate their own decarbonization goals.'
            ],
            scopeData: {
                labels: ['Scope 1', 'Scope 2', 'Scope 3'],
                data: [33939, 431, 49232],
                note: 'Data from 2024 performance report (in thousand tonnes CO2e). 92% of Scope 1 emissions originate from ocean operations related to fuel use.'
            }
        },
        'msc': {
            name: 'Mediterranean Shipping Company (MSC)',
            description: 'MSC is committed to net-zero decarbonization by 2050, aligning with the IMO\'s strategy. Their approach is holistic, covering the entire logistics chain with a focus on fleet renewal and operational efficiency.',
            strategies: [
                'Extensive fleet renewal with dual-fuel LNG-capable vessels (15 in operation by end 2023, 20% of fleet capacity by 2027) and a large-scale retrofit program (nearly 300 vessels retrofitted).',
                'Exploring bio-LNG, synthetic LNG, green ammonia, and piloting onboard carbon capture systems (first in service 2025).',
                'Using data-driven systems for vessel performance optimization and "just-in-time" port arrivals to reduce waiting times and fuel consumption.',
                'Decarbonizing inland logistics with rail solutions, new electric locomotives, and "Green Terminal" initiatives (e.g., phasing out diesel tractors).',
                'Offering "Journey to Net Zero" program, allowing customers to opt for MSC Biofuel Solution using certified sustainable second-generation biofuel.'
            ],
            scopeData: null
        },
        'cma-cgm': {
            name: 'CMA CGM Group',
            description: 'CMA CGM targets Net Zero Carbon by 2050 across all activities, following the upper trajectory of the IMO. They emphasize a diversified energy mix and significant strategic investments.',
            strategies: [
                'Investing $15 billion in a fleet of 119 dual-fuel LNG and methanol ships, expected by 2028.',
                'Created a €1.5 billion "Fund for Energies" (PULSE) to support sustainable energy production, decarbonize infrastructure, and foster innovation (supported 40 projects).',
                'Focusing on operational excellence through three fleet centers that provide data to crews for optimizing routes and fuel consumption.',
                'Diversifying energy mix by integrating new low-carbon fuels such as biogas, biomethanol, and synthetic fuels.',
                'Offering "ACT+ low-carbon transport solutions" for customers, using low-carbon fuels to cut CO2 emissions by up to 83% (well-to-wake).'
            ],
            scopeData: null
        },
        'cosco': {
            name: 'COSCO Shipping Holdings',
            description: 'COSCO aims for carbon neutrality by 2060, aligning with China\'s national goal, while also targeting IMO\'s 2050 net-zero standard for its vessels. Their approach integrates green fleet and port development.',
            strategies: [
                'Investing in twelve new 24,000 TEU methanol dual-fuel-powered container ships and adopting green/zero-carbon fuel technologies for all newly built ships.',
                'Promoting green port construction with 100% shore power facility coverage at domestic holding terminals and developing distributed photovoltaic systems.',
                'Utilizing a rigorous ship dynamic monitoring system (COVRS) for route optimization and real-time fuel consumption control.',
                'Conducting pilot projects on vessels using cleaner fuels like biofuels (e.g., COSCO Venus, Sagittarius) and offering "Hi ECO Green Shipping" product.',
                'Providing a Carbon Emissions Calculator for customers to track supply chain emissions, now including Carbon Intensity Indicator (CII) monitoring data.'
            ],
            scopeData: null
        },
        'hapag-lloyd': {
            name: 'Hapag-Lloyd',
            description: 'Hapag-Lloyd has one of the most ambitious targets, aiming for a net-zero GHG fleet by 2045. Their strategy combines fleet upgrades with a strong focus on biofuels and industry advocacy.',
            strategies: [
                'Running a Fleet Upgrade Programme (FUP) to reduce CO2 emissions by ~9% through retrofitting optimized bulbous bows, propellers, and hull coatings.',
                'Ordering twelve new dual-fuel (LNG-capable) container ships, with three delivered in 2023, equipped with high-pressure gas injection systems to minimize methane slip.',
                'Significantly expanding the use of biofuel blends (213,000 tonnes in 2023), offering over 80% lower GHG emissions than standard fuels.',
                'Launched "Ship Green Product" in 2023, a biofuel-based solution allowing customers to choose 25%, 50%, or 100% CO2e reduction for their bookings.',
                'Advocating for an industry-wide end date for fossil-fuelled newbuilds and joining the Green Corridor Consortium to reduce emissions on vital shipping routes.'
            ],
            scopeData: null
        }
    };

    const navTabs = document.querySelectorAll('.nav-tab');
    const contentTabs = document.querySelectorAll('.content-tab');
    const regulationSubNavTabs = document.querySelectorAll('.sub-nav-tab');
    const subContentTabs = document.querySelectorAll('.sub-content-tab');
    const companySelector = document.getElementById('company-selector');

    let scopeChart = null;

    function switchTab(e) {
        const tabId = e.target.dataset.tab;
        
        navTabs.forEach(tab => {
            if (tab.dataset.tab === tabId) {
                tab.classList.replace('tab-inactive', 'tab-active');
            } else {
                tab.classList.replace('tab-active', 'tab-inactive');
            }
        });

        contentTabs.forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById(tabId).classList.remove('hidden');
    }

    function switchSubTab(e) {
        const subTabId = e.target.dataset.subtab;
        
        regulationSubNavTabs.forEach(tab => {
            if (tab.dataset.subtab === subTabId) {
                tab.classList.replace('tab-inactive', 'tab-active');
            } else {
                tab.classList.replace('tab-active', 'tab-inactive');
            }
        });

        subContentTabs.forEach(content => {
            content.classList.add('hidden');
        });
        document.getElementById(subTabId).classList.remove('hidden');
    }

    function updateCompanyDetails(companyId) {
        const data = companyData[companyId];
        
        document.getElementById('company-name-title').textContent = data.name;
        document.getElementById('company-description').textContent = data.description;
        
        const strategyList = document.getElementById('company-strategy-list');
        strategyList.innerHTML = '';
        data.strategies.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            strategyList.appendChild(li);
        });

        const scopeChartContainer = document.getElementById('scope-chart-container');
        const scopeChartNote = document.getElementById('scope-chart-note');
        
        if (scopeChart) {
            scopeChart.destroy();
        }

        if (data.scopeData) {
            scopeChartContainer.classList.remove('hidden');
            const ctx = document.getElementById('scopeBreakdownChart').getContext('2d');
            scopeChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: data.scopeData.labels,
                    datasets: [{
                        data: data.scopeData.data,
                        backgroundColor: ['#0891b2', '#f59e0b', '#10b981'],
                        borderColor: '#ffffff',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed !== null) {
                                        label += new Intl.NumberFormat().format(context.parsed) + ' kt CO2e';
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
            scopeChartNote.textContent = data.scopeData.note;
        } else {
            scopeChartContainer.classList.add('hidden');
            scopeChartNote.textContent = 'Detailed scope breakdown data not available in the source report.';
        }
    }

    function createCompanyComparisonChart() {
        const ctx = document.getElementById('companyComparisonChart').getContext('2d');
        const labels = Object.values(companyData).map(c => c.name);
        const data = [2040, 2050, 2050, 2060, 2045];
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Net-Zero Target Year',
                    data: data,
                    backgroundColor: [
                        'rgba(14, 116, 144, 0.7)',
                        'rgba(14, 165, 233, 0.7)',
                        'rgba(56, 189, 248, 0.7)',
                        'rgba(125, 211, 252, 0.7)',
                        'rgba(7, 89, 133, 0.7)'
                    ],
                    borderColor: [
                        '#0e7490',
                        '#0ea5e9',
                        '#38bdf8',
                        '#7dd3fc',
                        '#075985'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: false,
                        min: 2035,
                        title: { display: true, text: 'Year' }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                           title: function(context) {
                                return context[0].label;
                           },
                           label: function(context) {
                               return `Target: ${context.parsed.x}`;
                           }
                        }
                    }
                }
            }
        });
    }

    navTabs.forEach(tab => tab.addEventListener('click', switchTab));
    regulationSubNavTabs.forEach(tab => tab.addEventListener('click', switchSubTab));
    companySelector.addEventListener('change', (e) => updateCompanyDetails(e.target.value));

    createCompanyComparisonChart();
    updateCompanyDetails('maersk');
});
</script>

</body>
</html>

