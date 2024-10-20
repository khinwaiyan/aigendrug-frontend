export interface Job {
  id: number;
  name: string;
  target_protein_name: string;
}

export interface JobCreateDto {
  name: string;
  target_protein_name: string;
}
