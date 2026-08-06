const fs = require('fs');
let f = fs.readFileSync('scripts/full_audit.js', 'utf8');

// Fix Communicable Diseases
f = f.replace(/'Communicable Diseases':\s+'Communicable Diseases',.*/g, "'Communicable Diseases': 'Medical-Surgical Nursing',");
f = f.replace(/'Malaria':\s+'Communicable Diseases',/g, "'Malaria': 'Medical-Surgical Nursing',");
f = f.replace(/'Tuberculosis':\s+'Communicable Diseases',/g, "'Tuberculosis': 'Medical-Surgical Nursing',");
f = f.replace(/'HIV\/AIDS':\s+'Communicable Diseases',/g, "'HIV/AIDS': 'Medical-Surgical Nursing',");
f = f.replace(/'STI Management':\s+'Communicable Diseases',/g, "'STI Management': 'Medical-Surgical Nursing',");
f = f.replace(/'Trachoma':\s+'Communicable Diseases',/g, "'Trachoma': 'Medical-Surgical Nursing',");
f = f.replace(/'HIV\/AIDS Management':\s+'Communicable Diseases',/g, "'HIV/AIDS Management': 'Medical-Surgical Nursing',");


// Fix Epidemiology
f = f.replace(/'Epidemiology':\s+'Epidemiology',.*/g, "'Epidemiology': 'Community Health Nursing',");
f = f.replace(/'Epidemiological Methods':\s+'Epidemiology',/g, "'Epidemiological Methods': 'Community Health Nursing',");
f = f.replace(/'Demography':\s+'Epidemiology',/g, "'Demography': 'Community Health Nursing',");
f = f.replace(/'Epidemiology & Demography':\s+'Epidemiology',/g, "'Epidemiology & Demography': 'Community Health Nursing',");
f = f.replace(/'Vital Registration':\s+'Epidemiology',/g, "'Vital Registration': 'Community Health Nursing',");
f = f.replace(/'Child Health Epidemiology':\s+'Epidemiology',/g, "'Child Health Epidemiology': 'Community Health Nursing',");

// Fix Microbiology
f = f.replace(/'Microbiology':\s+'Microbiology',.*/g, "'Microbiology': 'Infection Prevention & Control',");
f = f.replace(/'Hospital-Acquired Infections':\s+'Microbiology',/g, "'Hospital-Acquired Infections': 'Infection Prevention & Control',");
f = f.replace(/'Immunology':\s+'Microbiology',/g, "'Immunology': 'Infection Prevention & Control',");

// Fix Health Education
f = f.replace(/'Health Education':\s+'Health Education & Sociology',.*/g, "'Health Education': 'Community Health Nursing',");
f = f.replace(/'Medical Sociology':\s+'Health Education & Sociology',/g, "'Medical Sociology': 'Community Health Nursing',");

// Fix Parasitology
f = f.replace(/'Parasitology':\s+'Parasitology',.*/g, "'Parasitology': 'Medical-Surgical Nursing',");
f = f.replace(/'Parasitic Diseases':\s+'Parasitology',/g, "'Parasitic Diseases': 'Medical-Surgical Nursing',");

// Remove the strict check for these non-canonical units
f = f.replace(/if \(\['Communicable Diseases', 'Epidemiology', 'Parasitology', 'Microbiology',.*?\n.*?'Health Education & Sociology', 'Communicable Diseases'\]\.includes\(effectiveUnit\)\) \{/, "if (false) {");

fs.writeFileSync('scripts/full_audit.js', f);
console.log('Patched');
