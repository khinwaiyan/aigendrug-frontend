import { AxiosInstance } from "axios";

export class experimentService {
  private instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  // async getGroupById({ group_id }: { group_id: number }): Promise<Group> {
  //   const res = await this.instance.get(`/group/${group_id}`);
  //   return res.data;
  // }
}
