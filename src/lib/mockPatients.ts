export type PatientRecord = {
  patient_id: string;
  patient_name: string;
  [key: string]: string;
};

export const mockPatients: PatientRecord[] = [
  {
    patient_id: "PAT-123",
    patient_name: "Ethan Doe",
    gender: "Male",
    date_of_birth: "2013-04-11",
    primary_diagnosis: "Duchenne Muscular Dystrophy",
    risk_level: "High Risk",
    diagnosis_date: "2016-08-14",
    mutation_type: "Exon 51 deletion",
    ambulatory_status: "Ambulatory",
    current_therapy: "Steroid (Deflazacort)",
    care_team: "Dr. Alvarez / PT: Monica Lee",
    test_type: "Quarterly",
    profile_photo_url: ""
  },
  {
    patient_id: "PAT-456",
    patient_name: "Ava Smith",
    gender: "Female",
    date_of_birth: "2011-11-02",
    primary_diagnosis: "Duchenne Muscular Dystrophy",
    risk_level: "Moderate Risk",
    diagnosis_date: "2015-05-22",
    mutation_type: "Exon 45 deletion",
    ambulatory_status: "Ambulatory",
    current_therapy: "Gene Therapy Trial A",
    care_team: "Dr. Chen / PT: Diego Park",
    test_type: "Monthly",
    profile_photo_url: ""
  }
];
