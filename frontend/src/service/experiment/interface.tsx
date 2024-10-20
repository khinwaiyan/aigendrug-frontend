export interface Experiment {
  id: number;
  type: number; // 0: with measured value, 1: without measured value
  name: string;
  created_at: string;
  edited_at: string;
  ligand_smiles: string;
  predicted_value: number;
  measured_value: number;
  training_status: number; // 0: not trained, 1: training, 2: trained, 3: failed
  job_id: number;
}

export interface ExperimentCreateDto {
  type: number;
  name: string;
  ligand_smiles: string;
  measured_value: number;
  job_id: number;
}
