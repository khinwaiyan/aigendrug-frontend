// mockData.ts
export const mockJobs = [
  {
    id: 1,
    name: "Job 1",
    target_protein_name: "Protein A",
    created_at: new Date("2024-01-01"),
  },
  {
    id: 2,
    name: "Job 2",
    target_protein_name: "Protein B",
    created_at: new Date("2024-02-01"),
  },
  {
    id: 3,
    name: "Job 3",
    target_protein_name: "Protein C",
    created_at: new Date("2024-03-01"),
  },
];

// mockData.ts
import { Experiment } from "@/service/experiment/interface";

export const mockExperiments: Experiment[] = [
  {
    id: 2,
    type: 0,
    name: "Experiment 2 without Measured Value",
    created_at: new Date("2024-02-10"),
    edited_at: new Date("2024-02-12"),
    ligand_smiles: "O=C(C)Oc1ccccc1C(=O)O",
    predicted_value: 0.65,
    measured_value: 0.6,
    training_status: 1, // Trained
    job_id: 1,
  },
  {
    id: 3,
    type: 0,
    name: "Experiment 3 with Measured Value",
    created_at: new Date("2024-03-10"),
    edited_at: new Date("2024-03-11"),
    ligand_smiles: "C1=CC=C(C=C1)C(=O)O",
    predicted_value: 0.45,
    measured_value: 0.5,
    training_status: 2, // Trained
    job_id: 1,
  },
  {
    id: 4,
    type: 1,
    name: "Experiment 4 without Measured Value",
    created_at: new Date("2024-04-01"),
    edited_at: new Date("2024-04-05"),
    ligand_smiles: "CC(C)C1=CC=C(C=C1)C(=O)O",
    predicted_value: 0.7,
    measured_value: null,
    training_status: 2, // Not trained
    job_id: 1,
  },
];
