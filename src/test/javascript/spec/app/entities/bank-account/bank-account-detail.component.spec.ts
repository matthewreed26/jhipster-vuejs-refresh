/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import BankAccountDetailComponent from '@/entities/bank-account/bank-account-details.vue';
import BankAccountClass from '@/entities/bank-account/bank-account-details.component';
import BankAccountService from '@/entities/bank-account/bank-account.service';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

jest.mock('axios', () => ({
  get: jest.fn()
}));

describe('Component Tests', () => {
  describe('BankAccount Management Detail Component', () => {
    let wrapper: Wrapper<BankAccountClass>;
    let comp: BankAccountClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<BankAccountClass>(BankAccountDetailComponent, {
        store,
        localVue,
        provide: { bankAccountService: () => new BankAccountService() }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: 123 } }));

        // WHEN
        comp.retrieveBankAccount(123);
        await comp.$nextTick();

        // THEN
        expect(comp.bankAccount).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
