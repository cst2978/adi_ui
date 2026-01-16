CREATE TABLE patients (
  patient_id VARCHAR(32) PRIMARY KEY,
  patient_name VARCHAR(120) NOT NULL,
  gender VARCHAR(16),
  date_of_birth DATE,
  primary_diagnosis VARCHAR(160),
  risk_level VARCHAR(32),
  diagnosis_date DATE,
  mutation_type VARCHAR(120),
  ambulatory_status VARCHAR(64),
  current_therapy VARCHAR(160),
  care_team VARCHAR(200),
  test_type VARCHAR(80),
  profile_photo_url VARCHAR(255)
);

CREATE TABLE cardiovascular_metrics (
  metric_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  patient_id VARCHAR(32) NOT NULL REFERENCES patients(patient_id),
  metric_key VARCHAR(64) NOT NULL,
  metric_value NUMERIC(10, 2) NOT NULL,
  metric_unit VARCHAR(16) NOT NULL,
  recorded_at DATE NOT NULL,
  cohort_value NUMERIC(10, 2),
  baseline_value NUMERIC(10, 2),
  average_value NUMERIC(10, 2)
);

INSERT INTO patients (
  patient_id,
  patient_name,
  gender,
  date_of_birth,
  primary_diagnosis,
  risk_level,
  diagnosis_date,
  mutation_type,
  ambulatory_status,
  current_therapy,
  care_team,
  test_type,
  profile_photo_url
) VALUES
  (
    'PAT-123',
    'Ethan Doe',
    'Male',
    '2013-04-11',
    'Duchenne Muscular Dystrophy',
    'High Risk',
    '2016-08-14',
    'Exon 51 deletion',
    'Ambulatory',
    'Steroid (Deflazacort)',
    'Dr. Alvarez / PT: Monica Lee',
    'Quarterly',
    ''
  ),
  (
    'PAT-456',
    'Ava Smith',
    'Female',
    '2011-11-02',
    'Duchenne Muscular Dystrophy',
    'Moderate Risk',
    '2015-05-22',
    'Exon 45 deletion',
    'Ambulatory',
    'Gene Therapy Trial A',
    'Dr. Chen / PT: Diego Park',
    'Monthly',
    ''
  );

INSERT INTO cardiovascular_metrics (
  patient_id,
  metric_key,
  metric_value,
  metric_unit,
  recorded_at,
  cohort_value,
  baseline_value,
  average_value
) VALUES
  ('PAT-123', 'hr_rest', 100, 'bpm', '2025-06-27', 84, 92, 80),
  ('PAT-123', 'hr_variability', 39, 'ms', '2025-06-27', 50, 42, 45),
  ('PAT-123', 'pulse', 98, 'bpm', '2025-06-27', 82, 90, 85),
  ('PAT-123', 'blood_pressure', 118, 'mmHg', '2025-06-27', 110, 112, 108),
  ('PAT-456', 'hr_rest', 95, 'bpm', '2025-06-30', 84, 88, 78),
  ('PAT-456', 'hr_variability', 44, 'ms', '2025-06-30', 50, 46, 48),
  ('PAT-456', 'pulse', 93, 'bpm', '2025-06-30', 82, 86, 83),
  ('PAT-456', 'blood_pressure', 114, 'mmHg', '2025-06-30', 110, 112, 108);
