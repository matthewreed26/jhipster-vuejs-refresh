import { Component, Vue, Inject } from 'vue-property-decorator';
import DashboardService from './dashboard.service';
import { IBankAccount } from '@/shared/model/bank-account.model';
import { IOperation } from '@/shared/model/operation.model';

@Component
export default class Dashboard extends Vue {
  @Inject('dashboardService')
  private dashboardService: () => DashboardService;
  public bankAccounts: IBankAccount[] = [];
  public operations: IOperation[] = [];

  mounted() {
    this.retrieveDashboard();
  }

  public retrieveDashboard(): void {
    this.dashboardService()
      .retrieveDashboard()
      .then(response => {
        this.bankAccounts = response.data.bankAccounts;
        this.operations = response.data.operations;
      });
  }
}
