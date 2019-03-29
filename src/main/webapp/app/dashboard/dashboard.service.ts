import axios, { AxiosPromise } from 'axios';
import { Store } from 'vuex';

export default class DashboardService {
  constructor() {}

  public retrieveDashboard(): AxiosPromise<any> {
    return axios.get('api/dashboard');
  }
}
