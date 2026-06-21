import { useState, useMemo } from 'react';
import { Plus, Trash2, Anchor, Info, Download } from 'lucide-react';

/* ============================================================================
 * CII CALCULATOR — reference data
 *
 * Sources (verified against official IMO PDFs, June 2026):
 *  - Capacity rules & reference-line constants (a, c):
 *      IMO Resolution MEPC.353(78), Annex 15, Table 1
 *  - dd-vector rating boundaries:
 *      IMO Resolution MEPC.354(78), Annex 16, Table 1
 *  - Fuel → CO2 conversion factors (Cf):
 *      MARPOL Annex VI / EEDI Technical Guidelines Cf table
 *  - Annual reduction factor (Z%), years 2023–2030:
 *      IMO Resolution MEPC.400(83) (adopted 11 Apr 2025), Table 1
 *
 * NOTE ON GAS CARRIER / LNG CARRIER CONSTANTS:
 * The official MEPC.353(78) PDF renders these two ship types' "a" constants
 * in exponential shorthand ("14405E7", "14479E10", "14779E10") that does not
 * cleanly disambiguate in plain-text extraction. They are implemented below
 * as standard scientific notation (1.4405e7, 1.4479e10, 1.4779e10), the most
 * literal reading of the source text. For official compliance reporting on
 * gas or LNG carriers specifically, cross-check against the source PDF or
 * your class society's CII tool — everything else in this table is
 * unambiguous in the source.
 * ==========================================================================*/

const SHIP_TYPES = [
  { id: 'bulk_carrier', label: 'Bulk Carrier', unit: 'DWT' },
  { id: 'gas_carrier', label: 'Gas Carrier', unit: 'DWT' },
  { id: 'tanker', label: 'Tanker', unit: 'DWT' },
  { id: 'container_ship', label: 'Container Ship', unit: 'DWT' },
  { id: 'general_cargo', label: 'General Cargo Ship', unit: 'DWT' },
  { id: 'reefer', label: 'Refrigerated Cargo Carrier', unit: 'DWT' },
  { id: 'combination_carrier', label: 'Combination Carrier', unit: 'DWT' },
  { id: 'lng_carrier', label: 'LNG Carrier', unit: 'DWT' },
  { id: 'roro_vehicle', label: 'Ro-ro Cargo Ship (Vehicle Carrier)', unit: 'GT' },
  { id: 'roro_cargo', label: 'Ro-ro Cargo Ship', unit: 'GT' },
  { id: 'roro_passenger', label: 'Ro-ro Passenger Ship', unit: 'GT' },
  { id: 'cruise_passenger', label: 'Cruise Passenger Ship', unit: 'GT' },
];

const FUEL_TYPES = [
  { id: 'mgo', label: 'Diesel / Gas Oil (MGO)', cf: 3.206 },
  { id: 'lfo', label: 'Light Fuel Oil (LFO)', cf: 3.151 },
  { id: 'hfo', label: 'Heavy Fuel Oil (HFO)', cf: 3.114 },
  { id: 'lpg_propane', label: 'LPG — Propane', cf: 3.000 },
  { id: 'lpg_butane', label: 'LPG — Butane', cf: 3.030 },
  { id: 'ethane', label: 'Ethane', cf: 2.927 },
  { id: 'lng', label: 'LNG', cf: 2.750 },
  { id: 'methanol', label: 'Methanol', cf: 1.375 },
  { id: 'ethanol', label: 'Ethanol', cf: 1.913 },
];

// Z% reduction factor relative to the 2019 reference line (MEPC.400(83) Table 1)
const Z_FACTORS = {
  2023: 5, 2024: 7, 2025: 9, 2026: 11,
  2027: 13.625, 2028: 16.25, 2029: 18.875, 2030: 21.5,
};

const RATING_COLORS = {
  A: '#1E7A4C',
  B: '#4FA876',
  C: '#D9A93A',
  D: '#D97706',
  E: '#C13A2E',
};

const RATING_LABELS = {
  A: 'Major superior',
  B: 'Minor superior',
  C: 'Moderate',
  D: 'Minor inferior',
  E: 'Inferior',
};

/** Resolve { capacity, a, c, dd } for a ship type given its raw entered DWT/GT. */
function resolveShipParams(typeId, rawCapacity, opts = {}) {
  switch (typeId) {
    case 'bulk_carrier':
      return { capacity: Math.min(rawCapacity, 279000), a: 4745, c: 0.622, dd: [0.86, 0.94, 1.06, 1.18] };
    case 'gas_carrier':
      return rawCapacity >= 65000
        ? { capacity: rawCapacity, a: 1.4405e7, c: 2.071, dd: [0.81, 0.91, 1.12, 1.44] }
        : { capacity: rawCapacity, a: 8104, c: 0.639, dd: [0.85, 0.95, 1.06, 1.25] };
    case 'tanker':
      return { capacity: rawCapacity, a: 5247, c: 0.610, dd: [0.82, 0.93, 1.08, 1.28] };
    case 'container_ship':
      return { capacity: rawCapacity, a: 1984, c: 0.489, dd: [0.83, 0.94, 1.07, 1.19] };
    case 'general_cargo':
      return rawCapacity >= 20000
        ? { capacity: rawCapacity, a: 31948, c: 0.792, dd: [0.83, 0.94, 1.06, 1.19] }
        : { capacity: rawCapacity, a: 588, c: 0.3885, dd: [0.83, 0.94, 1.06, 1.19] };
    case 'reefer':
      return { capacity: rawCapacity, a: 4600, c: 0.557, dd: [0.78, 0.91, 1.07, 1.20] };
    case 'combination_carrier':
      return { capacity: rawCapacity, a: 5119, c: 0.622, dd: [0.87, 0.96, 1.06, 1.14] };
    case 'lng_carrier':
      if (rawCapacity >= 100000) return { capacity: rawCapacity, a: 9.827, c: 0.000, dd: [0.89, 0.98, 1.06, 1.13] };
      if (rawCapacity >= 65000) return { capacity: rawCapacity, a: 1.4479e10, c: 2.673, dd: [0.78, 0.92, 1.10, 1.37] };
      // Below 65,000 DWT, MEPC.353(78) Table 1 fixes the reference capacity at 65,000.
      return { capacity: 65000, a: 1.4779e10, c: 2.673, dd: [0.78, 0.92, 1.10, 1.37] };
    case 'roro_vehicle':
      return rawCapacity >= 30000
        ? { capacity: Math.min(rawCapacity, 57700), a: 3627, c: 0.590, dd: [0.86, 0.94, 1.06, 1.16] }
        : { capacity: rawCapacity, a: 330, c: 0.329, dd: [0.86, 0.94, 1.06, 1.16] };
    case 'roro_cargo':
      return { capacity: rawCapacity, a: 1967, c: 0.485, dd: [0.76, 0.89, 1.08, 1.27] };
    case 'roro_passenger':
      return opts.highSpeedCraft
        ? { capacity: rawCapacity, a: 4196, c: 0.460, dd: [0.76, 0.92, 1.14, 1.30] }
        : { capacity: rawCapacity, a: 2023, c: 0.460, dd: [0.76, 0.92, 1.14, 1.30] };
    case 'cruise_passenger':
      return { capacity: rawCapacity, a: 930, c: 0.383, dd: [0.87, 0.95, 1.06, 1.16] };
    default:
      return null;
  }
}

function getRating(attained, [b1, b2, b3, b4]) {
  if (attained <= b1) return 'A';
  if (attained <= b2) return 'B';
  if (attained <= b3) return 'C';
  if (attained <= b4) return 'D';
  return 'E';
}

let fuelRowId = 0;
function newFuelRow(fuelTypeId = 'hfo') {
  fuelRowId += 1;
  return { rowId: fuelRowId, fuelTypeId, tonnes: '' };
}

/* ---------------------------------- UI ---------------------------------- */

function FuelRow({ row, onChange, onRemove, removable }) {
  return (
    <div className="flex gap-2 items-center">
      <select
        value={row.fuelTypeId}
        onChange={(e) => onChange({ ...row, fuelTypeId: e.target.value })}
        className="flex-1 rounded-md border border-[#0A2540]/20 bg-white px-3 py-2 text-sm text-[#0A2540] focus:outline-none focus:ring-2 focus:ring-[#145C7C]"
      >
        {FUEL_TYPES.map((f) => (
          <option key={f.id} value={f.id}>{f.label}</option>
        ))}
      </select>
      <input
        type="number"
        min="0"
        inputMode="decimal"
        placeholder="tonnes"
        value={row.tonnes}
        onChange={(e) => onChange({ ...row, tonnes: e.target.value })}
        className="w-28 rounded-md border border-[#0A2540]/20 bg-white px-3 py-2 text-sm text-right tabular-nums text-[#0A2540] focus:outline-none focus:ring-2 focus:ring-[#145C7C]"
      />
      <button
        type="button"
        onClick={onRemove}
        disabled={!removable}
        className="p-2 rounded-md text-[#0A2540]/50 hover:text-[#C13A2E] hover:bg-[#C13A2E]/10 disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
        aria-label="Remove fuel row"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

function RatingGauge({ boundaries, attained }) {
  const [b1, b2, b3, b4] = boundaries;
  const span = Math.max(b4 - b1, 0.01);
  const domainMin = Math.max(0, b1 - span * 0.4);
  const domainMax = b4 + span * 0.4;
  const pct = (v) => ((Math.min(Math.max(v, domainMin), domainMax) - domainMin) / (domainMax - domainMin)) * 100;

  const zones = [
    { id: 'A', from: domainMin, to: b1 },
    { id: 'B', from: b1, to: b2 },
    { id: 'C', from: b2, to: b3 },
    { id: 'D', from: b3, to: b4 },
    { id: 'E', from: b4, to: domainMax },
  ];

  const needleLeft = pct(attained);

  return (
    <div className="w-full pt-5">
      <div className="relative">
        <div
          className="absolute -top-5 -translate-x-1/2 text-[10px] font-semibold text-[#0A2540] whitespace-nowrap"
          style={{ left: `${needleLeft}%` }}
        >
          {attained.toFixed(2)}
        </div>
        <div
          className="absolute top-0 -translate-x-1/2 w-0.5 h-8 bg-[#0A2540]"
          style={{ left: `${needleLeft}%` }}
        />
        <div className="flex h-8 rounded-sm overflow-hidden border border-[#0A2540]/25">
          {zones.map((z) => (
            <div
              key={z.id}
              style={{ width: `${pct(z.to) - pct(z.from)}%`, backgroundColor: RATING_COLORS[z.id] }}
              className="h-full flex items-center justify-center text-[11px] font-bold text-white/95"
            >
              {z.id}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between text-[10px] text-[#0A2540]/55 mt-1 font-mono tabular-nums">
        <span>{b1.toFixed(2)}</span>
        <span>{b2.toFixed(2)}</span>
        <span>{b3.toFixed(2)}</span>
        <span>{b4.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default function CIICalculator() {
  const [shipIdentifier, setShipIdentifier] = useState('');
  const [shipTypeId, setShipTypeId] = useState('bulk_carrier');
  const [capacityInput, setCapacityInput] = useState('');
  const [highSpeedCraft, setHighSpeedCraft] = useState(false);
  const [year, setYear] = useState(2026);
  const [distanceInput, setDistanceInput] = useState('');
  const [fuelRows, setFuelRows] = useState([newFuelRow()]);
  const [showMethodology, setShowMethodology] = useState(false);

  const shipType = SHIP_TYPES.find((s) => s.id === shipTypeId);

  const result = useMemo(() => {
    const rawCapacity = parseFloat(capacityInput);
    const distance = parseFloat(distanceInput);
    if (!rawCapacity || rawCapacity <= 0 || !distance || distance <= 0) return null;

    const params = resolveShipParams(shipTypeId, rawCapacity, { highSpeedCraft });
    if (!params) return null;

    const totalCO2Tonnes = fuelRows.reduce((sum, row) => {
      const tonnes = parseFloat(row.tonnes);
      if (!tonnes || tonnes <= 0) return sum;
      const fuel = FUEL_TYPES.find((f) => f.id === row.fuelTypeId);
      return sum + tonnes * fuel.cf;
    }, 0);
    if (totalCO2Tonnes <= 0) return null;

    const transportWork = params.capacity * distance;
    const attainedCII = (totalCO2Tonnes * 1e6) / transportWork; // g CO2 per capacity-tonne·nm

    const referenceCII = params.a * Math.pow(params.capacity, -params.c);
    const z = Z_FACTORS[year] ?? 11;
    const requiredCII = referenceCII * (1 - z / 100);
    const boundaries = params.dd.map((d) => requiredCII * d);
    const rating = getRating(attainedCII, boundaries);
    const ratio = attainedCII / requiredCII;

    return { attainedCII, referenceCII, requiredCII, boundaries, rating, ratio, capacityUsed: params.capacity, totalCO2Tonnes };
  }, [shipTypeId, capacityInput, highSpeedCraft, distanceInput, fuelRows, year]);

  const updateFuelRow = (rowId, updated) =>
    setFuelRows((rows) => rows.map((r) => (r.rowId === rowId ? updated : r)));
  const removeFuelRow = (rowId) =>
    setFuelRows((rows) => rows.filter((r) => r.rowId !== rowId));
  const addFuelRow = () => setFuelRows((rows) => [...rows, newFuelRow()]);

  const reset = () => {
    setShipIdentifier('');
    setShipTypeId('bulk_carrier');
    setCapacityInput('');
    setHighSpeedCraft(false);
    setYear(2026);
    setDistanceInput('');
    setFuelRows([newFuelRow()]);
  };

  const handleDownloadPDF = () => {
    if (!result) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to download the PDF report.');
      return;
    }

    const shipTypeName = SHIP_TYPES.find((s) => s.id === shipTypeId)?.label || shipTypeId;
    const capacityUnit = SHIP_TYPES.find((s) => s.id === shipTypeId)?.unit || 'DWT';

    const fuelsHtml = fuelRows
      .filter((r) => parseFloat(r.tonnes) > 0)
      .map((r) => {
        const fuel = FUEL_TYPES.find((f) => f.id === r.fuelTypeId);
        const fuelLabel = fuel?.label || r.fuelTypeId;
        const cf = fuel?.cf || 0;
        const tonnes = parseFloat(r.tonnes) || 0;
        const co2 = (tonnes * cf).toFixed(2);
        return `
          <tr>
            <td style="padding: 10px 8px; border-bottom: 1px solid #ebebeb;">${fuelLabel}</td>
            <td style="padding: 10px 8px; border-bottom: 1px solid #ebebeb; text-align: right; font-family: monospace;">${tonnes.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} t</td>
            <td style="padding: 10px 8px; border-bottom: 1px solid #ebebeb; text-align: right; font-family: monospace;">${parseFloat(co2).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} t CO₂</td>
          </tr>
        `;
      })
      .join('');

    const reportDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>CII Calculation Report - ${shipIdentifier || 'Vessel'}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            color: #0A2540;
            background-color: #ffffff;
            line-height: 1.5;
            margin: 40px;
            padding: 0;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #0A2540;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .title-area h1 {
            font-size: 24px;
            color: #0A2540;
            margin: 0;
            font-weight: 700;
            letter-spacing: -0.5px;
          }
          .title-area p {
            font-size: 11px;
            color: #145C7C;
            margin: 5px 0 0 0;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 1px;
          }
          .meta-area {
            text-align: right;
            font-size: 12px;
            color: #4d4d4d;
          }
          .section-title {
            font-size: 13px;
            color: #145C7C;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
            margin-top: 30px;
            margin-bottom: 15px;
            border-bottom: 1px solid #ebebeb;
            padding-bottom: 5px;
          }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
          }
          .info-card {
            background-color: #fafafa;
            border: 1px solid #ebebeb;
            border-radius: 8px;
            padding: 15px;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 14px;
          }
          .info-row:last-child {
            margin-bottom: 0;
          }
          .label {
            color: #888888;
          }
          .value {
            font-weight: 600;
            color: #0A2540;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
            margin-bottom: 20px;
          }
          th {
            background-color: #fafafa;
            color: #888888;
            font-weight: 500;
            text-align: left;
            padding: 10px 8px;
            border-bottom: 1px solid #a1a1a1;
          }
          .results-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #F6F4EF;
            border: 1px solid rgba(10, 37, 64, 0.1);
            border-radius: 12px;
            padding: 20px;
            margin-top: 20px;
          }
          .rating-badge {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background-color: ${RATING_COLORS[result.rating]};
            color: white;
            font-size: 36px;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          }
          .rating-details h2 {
            margin: 0;
            font-size: 20px;
            color: #0A2540;
            font-weight: 700;
          }
          .rating-details p {
            margin: 5px 0 0 0;
            font-size: 14px;
            color: #4d4d4d;
          }
          .gauge-container {
            margin-top: 30px;
            margin-bottom: 30px;
          }
          .gauge-bar {
            display: flex;
            height: 28px;
            border-radius: 6px;
            overflow: hidden;
            border: 1px solid rgba(10, 37, 64, 0.15);
          }
          .gauge-zone {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
            font-weight: 700;
          }
          .gauge-labels {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            color: #888888;
            margin-top: 6px;
            font-family: monospace;
          }
          .footer-note {
            margin-top: 60px;
            font-size: 11px;
            color: #888888;
            text-align: center;
            border-top: 1px solid #ebebeb;
            padding-top: 15px;
          }
          @media print {
            body {
              margin: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title-area">
            <h1>CII CALCULATION REPORT</h1>
            <p>Bright Mariner Compliance Assistant</p>
          </div>
          <div class="meta-area">
            <div>Report Date: ${reportDate}</div>
            <div>Regulations: IMO MEPC.354(78)</div>
          </div>
        </div>

        <div class="section-title">Vessel Details</div>
        <div class="grid">
          <div class="info-card">
            <div class="info-row">
              <span class="label">Ship Name / IMO No.</span>
              <span class="value">${shipIdentifier || 'Not Specified'}</span>
            </div>
            <div class="info-row">
              <span class="label">Ship Type</span>
              <span class="value">${shipTypeName}</span>
            </div>
            <div class="info-row">
              <span class="label">Capacity</span>
              <span class="value">${parseFloat(capacityInput).toLocaleString()} ${capacityUnit}</span>
            </div>
          </div>
          <div class="info-card">
            <div class="info-row">
              <span class="label">Reporting Year</span>
              <span class="value">${year}</span>
            </div>
            <div class="info-row">
              <span class="label">Distance Sailed</span>
              <span class="value">${parseFloat(distanceInput).toLocaleString()} nm</span>
            </div>
            <div class="info-row">
              <span class="label">Total CO₂ Emissions</span>
              <span class="value">${result.totalCO2Tonnes.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} t CO₂</span>
            </div>
          </div>
        </div>

        <div class="section-title">Fuel Consumption Summary</div>
        <table>
          <thead>
            <tr>
              <th style="padding: 10px 8px;">Fuel Type</th>
              <th style="padding: 10px 8px; text-align: right;">Quantity Burned</th>
              <th style="padding: 10px 8px; text-align: right;">CO₂ Emissions</th>
            </tr>
          </thead>
          <tbody>
            ${fuelsHtml || '<tr><td colspan="3" style="padding: 10px 8px; text-align: center; color: #888888;">No fuel recorded</td></tr>'}
          </tbody>
        </table>

        <div class="section-title">CII Operational Rating</div>
        <div class="results-box">
          <div class="rating-details">
            <h2>Operational Rating: ${result.rating}</h2>
            <p>${RATING_LABELS[result.rating]} efficiency performance status.</p>
            <div style="margin-top: 15px; font-size: 14px; line-height: 1.6;">
              <div><strong>Attained CII:</strong> ${result.attainedCII.toFixed(3)} g / ${capacityUnit.toLowerCase()}·nm</div>
              <div><strong>Required CII (${year}):</strong> ${result.requiredCII.toFixed(3)} g / ${capacityUnit.toLowerCase()}·nm</div>
              <div><strong>Attained / Required Ratio:</strong> ${result.ratio.toFixed(3)}</div>
            </div>
          </div>
          <div class="rating-badge">${result.rating}</div>
        </div>

        <div class="gauge-container">
          <div class="gauge-bar">
            <div class="gauge-zone" style="background-color: ${RATING_COLORS.A};">A</div>
            <div class="gauge-zone" style="background-color: ${RATING_COLORS.B};">B</div>
            <div class="gauge-zone" style="background-color: ${RATING_COLORS.C};">C</div>
            <div class="gauge-zone" style="background-color: ${RATING_COLORS.D};">D</div>
            <div class="gauge-zone" style="background-color: ${RATING_COLORS.E};">E</div>
          </div>
          <div class="gauge-labels">
            <span>${result.boundaries[0].toFixed(2)} (A/B)</span>
            <span>${result.boundaries[1].toFixed(2)} (B/C)</span>
            <span>${result.boundaries[2].toFixed(2)} (C/D)</span>
            <span>${result.boundaries[3].toFixed(2)} (D/E)</span>
          </div>
          <div style="margin-top: 15px; font-size: 13px; color: #0A2540; font-style: italic; text-align: center;">
            Vessel operational Carbon Intensity Indicator value attained: <strong>${result.attainedCII.toFixed(3)}</strong>
          </div>
        </div>

        <div class="footer-note">
          <p>This report has been compiled for compliance checking and educational verification purposes.</p>
          <p>Bright Mariner Compliance Assistant &copy; 2026. All rights reserved.</p>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          }
        <\/script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#F6F4EF] rounded-xl border border-[#0A2540]/10 overflow-hidden">
      {/* Header */}
      <div className="bg-[#0A2540] px-6 py-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#C08A28] flex items-center justify-center shrink-0">
          <Anchor size={18} className="text-[#0A2540]" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-[#C08A28] font-semibold">
            IMO MEPC.354(78) · Operational Carbon Intensity
          </p>
          <h2 className="text-lg font-bold text-white leading-tight">CII Calculator</h2>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-6 p-6">
        {/* Inputs */}
        <div className="space-y-6">
          <section className="space-y-3">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-[#145C7C]">Ship &amp; capacity</p>
            
            <div>
              <label className="block text-xs text-[#0A2540]/70 mb-1">
                Ship Name / IMO No.
              </label>
              <input
                type="text"
                placeholder="e.g. Bright Mariner (IMO 9123456)"
                value={shipIdentifier}
                onChange={(e) => setShipIdentifier(e.target.value)}
                className="w-full rounded-md border border-[#0A2540]/20 bg-white px-3 py-2 text-sm text-[#0A2540] focus:outline-none focus:ring-2 focus:ring-[#145C7C]"
              />
            </div>

            <div>
              <label className="block text-xs text-[#0A2540]/70 mb-1">
                Ship Type
              </label>
              <select
                value={shipTypeId}
                onChange={(e) => setShipTypeId(e.target.value)}
                className="w-full rounded-md border border-[#0A2540]/20 bg-white px-3 py-2 text-sm text-[#0A2540] focus:outline-none focus:ring-2 focus:ring-[#145C7C]"
              >
                {SHIP_TYPES.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-[#0A2540]/70 mb-1">
                {shipType.unit} (long tons)
              </label>
              <input
                type="number"
                min="0"
                inputMode="decimal"
                placeholder="e.g. 75000"
                value={capacityInput}
                onChange={(e) => setCapacityInput(e.target.value)}
                className="w-full rounded-md border border-[#0A2540]/20 bg-white px-3 py-2 text-sm tabular-nums text-[#0A2540] focus:outline-none focus:ring-2 focus:ring-[#145C7C]"
              />
            </div>

            {shipTypeId === 'roro_passenger' && (
              <label className="flex items-center gap-2 text-xs text-[#0A2540]/80">
                <input
                  type="checkbox"
                  checked={highSpeedCraft}
                  onChange={(e) => setHighSpeedCraft(e.target.checked)}
                  className="accent-[#145C7C]"
                />
                High-speed craft (SOLAS chapter X)
              </label>
            )}
          </section>

          <section className="space-y-3">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-[#145C7C]">Voyage data</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#0A2540]/70 mb-1">Reporting year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full rounded-md border border-[#0A2540]/20 bg-white px-3 py-2 text-sm text-[#0A2540] focus:outline-none focus:ring-2 focus:ring-[#145C7C]"
                >
                  {Object.keys(Z_FACTORS).map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#0A2540]/70 mb-1">Distance sailed (nm)</label>
                <input
                  type="number"
                  min="0"
                  inputMode="decimal"
                  placeholder="e.g. 45000"
                  value={distanceInput}
                  onChange={(e) => setDistanceInput(e.target.value)}
                  className="w-full rounded-md border border-[#0A2540]/20 bg-white px-3 py-2 text-sm tabular-nums text-[#0A2540] focus:outline-none focus:ring-2 focus:ring-[#145C7C]"
                />
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-[#145C7C]">Fuel consumption (annual)</p>
              <button
                type="button"
                onClick={addFuelRow}
                className="flex items-center gap-1 text-xs font-semibold text-[#145C7C] hover:text-[#0A2540]"
              >
                <Plus size={14} /> Add fuel
              </button>
            </div>
            <div className="space-y-2">
              {fuelRows.map((row) => (
                <FuelRow
                  key={row.rowId}
                  row={row}
                  onChange={(updated) => updateFuelRow(row.rowId, updated)}
                  onRemove={() => removeFuelRow(row.rowId)}
                  removable={fuelRows.length > 1}
                />
              ))}
            </div>
          </section>

          <button
            type="button"
            onClick={reset}
            className="text-xs text-[#0A2540]/50 hover:text-[#0A2540] underline underline-offset-2"
          >
            Reset calculator
          </button>
        </div>

        {/* Results */}
        <div className="lg:sticky lg:top-6 h-fit">
          <div className="bg-white rounded-lg border border-[#0A2540]/10 p-5 space-y-5">
            {!result ? (
              <p className="text-sm text-[#0A2540]/50 leading-relaxed">
                Enter the ship's capacity, distance sailed, and fuel burned for the
                year to see its Attained CII and rating.
              </p>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#0A2540]/50">Rating</p>
                    <p className="text-2xl font-bold" style={{ color: RATING_COLORS[result.rating] }}>
                      {result.rating}
                      <span className="text-sm font-medium text-[#0A2540]/60 ml-2">
                        {RATING_LABELS[result.rating]}
                      </span>
                    </p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
                    style={{ backgroundColor: RATING_COLORS[result.rating] }}
                  >
                    {result.rating}
                  </div>
                </div>

                <RatingGauge boundaries={result.boundaries} attained={result.attainedCII} />

                <dl className="text-sm space-y-2 pt-1">
                  <div className="flex justify-between">
                    <dt className="text-[#0A2540]/60">Attained CII</dt>
                    <dd className="font-semibold tabular-nums text-[#0A2540]">{result.attainedCII.toFixed(3)} g/t·nm</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#0A2540]/60">Required CII ({year})</dt>
                    <dd className="font-semibold tabular-nums text-[#0A2540]">{result.requiredCII.toFixed(3)} g/t·nm</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#0A2540]/60">A/R ratio</dt>
                    <dd className="font-semibold tabular-nums text-[#0A2540]">{result.ratio.toFixed(3)}</dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="w-full mt-4 flex items-center justify-center gap-2 rounded-md bg-[#145C7C] hover:bg-[#0A2540] text-white px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <Download size={16} />
                  Download PDF Report
                </button>
              </>
            )}
          </div>

          <div className="mt-3">
            <button
              type="button"
              onClick={() => setShowMethodology((v) => !v)}
              className="flex items-center gap-1.5 text-xs text-[#0A2540]/55 hover:text-[#0A2540]"
            >
              <Info size={13} /> Methodology &amp; limitations
            </button>
            {showMethodology && (
              <p className="text-[11px] leading-relaxed text-[#0A2540]/55 mt-2 bg-[#0A2540]/[0.03] rounded-md p-3">
                Implements the core G1–G4 formula chain (MEPC.352/353/354(78)) and
                the MEPC.400(83) reduction factors. It does not apply G5 correction
                factors (ice class, port waiting time, etc.), so figures here are
                an educational estimate — not a substitute for verified DCS
                reporting. Gas Carrier and LNG Carrier reference constants come
                from a source table with ambiguous exponential notation; treat
                those two ship types with extra caution.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
