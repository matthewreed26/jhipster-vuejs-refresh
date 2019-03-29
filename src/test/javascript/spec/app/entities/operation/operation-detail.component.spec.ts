/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import OperationDetailComponent from '@/entities/operation/operation-details.vue';
import OperationClass from '@/entities/operation/operation-details.component';
import OperationService from '@/entities/operation/operation.service';

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
  describe('Operation Management Detail Component', () => {
    let wrapper: Wrapper<OperationClass>;
    let comp: OperationClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<OperationClass>(OperationDetailComponent, {
        store,
        localVue,
        provide: { operationService: () => new OperationService() }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: 123 } }));

        // WHEN
        comp.retrieveOperation(123);
        await comp.$nextTick();

        // THEN
        expect(comp.operation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
