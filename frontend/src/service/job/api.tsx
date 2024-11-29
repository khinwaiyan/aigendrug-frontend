import { AxiosInstance } from "axios";
import { Job, JobCreateDto } from "./interface";

export class jobService {
  private instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;

    this.instance.interceptors.response.use(
      (response) => {
        if (response.data && Array.isArray(response.data)) {
          response.data = response.data.map((item) => {
            if (item.created_at) {
              item.created_at = new Date(item.created_at);
            }
            return item;
          });
        } else if (response.data && response.data.created_at) {
          response.data.created_at = new Date(response.data.created_at);
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
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

  public async uploadLigandFile(id: number, file: File): Promise<void> {
    try {
      await this.instance.post(`/job/${id}/upload`, { file });
    } catch (error) {
      throw error;
    }
  }
}
