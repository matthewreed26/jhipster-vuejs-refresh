import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { ILabel } from '@/shared/model/label.model';
import AlertService from '@/shared/alert/alert.service';

import LabelService from './label.service';

@Component
export default class Label extends Vue {
  @Inject('alertService')
  private alertService: () => AlertService;
  @Inject('labelService')
  private labelService: () => LabelService;
  private removeId: string = null;
  public labels: ILabel[] = [];

  public dismissCountDown: number = this.$store.getters.dismissCountDown;
  public dismissSecs: number = this.$store.getters.dismissSecs;
  public alertType: string = this.$store.getters.alertType;
  public alertMessage: any = this.$store.getters.alertMessage;

  public getAlertFromStore() {
    this.dismissCountDown = this.$store.getters.dismissCountDown;
    this.dismissSecs = this.$store.getters.dismissSecs;
    this.alertType = this.$store.getters.alertType;
    this.alertMessage = this.$store.getters.alertMessage;
  }

  public countDownChanged(dismissCountDown: number) {
    this.alertService().countDownChanged(dismissCountDown);
    this.getAlertFromStore();
  }

  public mounted(): void {
    this.retrieveAllLabels();
  }

  public clear(): void {
    this.retrieveAllLabels();
  }

  public retrieveAllLabels(): void {
    this.labelService()
      .retrieve()
      .then(res => {
        this.labels = res.data;
      });
  }

  public prepareRemove(instance): void {
    this.removeId = instance.id;
  }

  public removeLabel(): void {
    this.labelService()
      .delete(this.removeId)
      .then(() => {
        const message = 'A Label is deleted with identifier ' + this.removeId;
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllLabels();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
