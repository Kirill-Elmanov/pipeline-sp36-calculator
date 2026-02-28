// calc_sp36.js
// Core calculations for SP 36.13330.2012, chapter 12

export function calculateWallThickness({
  diameter,       // Dн, мм
  pressure,       // p, МПа
  category,       // 'B', 'I', 'II', 'III', 'IV'
  yieldStrength,  // Rн, МПа
  k1,             // k1
  kn              // kн
}) {
  const mValues = { B: 0.660, I: 0.825, II: 0.825, III: 0.990, IV: 0.990 };
  const m = mValues[category];

  let n;
  if (category === 'B' || category === 'I') n = 1.10;
  else if (category === 'II') n = 1.00;
  else n = 0.90;

  const R1 = (m * yieldStrength) / (k1 * kn);
  const deltaCalc = (n * pressure * diameter) / (2 * (R1 + n * pressure));

  let deltaMin = diameter / 100;
  if (diameter >= 200)  deltaMin = Math.max(deltaMin, 3);
  else                  deltaMin = Math.max(deltaMin, 4);
  if (diameter >= 1000) deltaMin = Math.max(deltaMin, 12);

  const standardThicknesses = [
    4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 18, 20, 22, 24,
    26, 28, 30, 32, 34, 36, 38, 40
  ];
  const required = Math.max(deltaCalc, deltaMin);
  const deltaNom = standardThicknesses.find(
    t => t >= Math.ceil(required)
  );

  return { m, n, R1, deltaCalc, deltaNom };
}
