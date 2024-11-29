export interface Experiment {
  id: number;
  type: number; // 0: with measured value, 1: without measured value
  name: string;
  created_at: Date;
  edited_at: Date;
  ligand_smiles: string;
  predicted_value: number | null;
  measured_value: number | null;
  training_status: number; // 0: not trained, 1: training, 2: trained, 3: failed
  job_id: number;
}

export interface ExperimentCreateDto {
  type: number; // 0: with measured value, 1: without measured value
  name: string;
  ligand_smiles: string;
  measured_value: number;
  job_id: number;
}
