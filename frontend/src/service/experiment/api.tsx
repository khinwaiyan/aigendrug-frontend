import { AxiosInstance } from "axios";
import { Experiment, ExperimentCreateDto } from "./interface";

export class experimentService {
  private instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  // Get all experiments by jobId
  public async getAllExperimentsByJobId(jobId: number): Promise<Experiment[]> {
    try {
      const response = await this.instance.get<Experiment[]>(
        `/experiment/job/${jobId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Get experiment by ID
  public async getExperimentById(experimentId: number): Promise<Experiment> {
    try {
      const response = await this.instance.get<Experiment>(
        `/experiment/${experimentId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Create a new experiment
  public async createExperiment(
    experimentData: ExperimentCreateDto
  ): Promise<Experiment> {
    try {
      const response = await this.instance.post<Experiment>(
        "/experiment",
        experimentData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async deleteExperiment(experimentId: number): Promise<void> {
    try {
      await this.instance.delete(`/experiment/${experimentId}`);
    } catch (error) {
      throw error;
    }
  }
}
