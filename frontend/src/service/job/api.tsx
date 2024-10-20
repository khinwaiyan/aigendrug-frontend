import { AxiosInstance } from "axios";
import { Job, JobCreateDto } from "./interface";

export class jobService {
  private instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  public async createJob(jobData: JobCreateDto): Promise<Job> {
    try {
      const response = await this.instance.post<Job>("/job", jobData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getAllJobs(): Promise<Job[]> {
    try {
      const response = await this.instance.get<Job[]>("/job");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getJobById(id: number): Promise<Job> {
    try {
      const response = await this.instance.get<Job>(`/job/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async deleteJob(id: number): Promise<void> {
    try {
      await this.instance.delete(`/job/${id}`);
    } catch (error) {
      throw error;
    }
  }
}
