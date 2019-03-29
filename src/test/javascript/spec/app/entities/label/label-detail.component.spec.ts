/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import LabelDetailComponent from '@/entities/label/label-details.vue';
import LabelClass from '@/entities/label/label-details.component';
import LabelService from '@/entities/label/label.service';

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
  describe('Label Management Detail Component', () => {
    let wrapper: Wrapper<LabelClass>;
    let comp: LabelClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<LabelClass>(LabelDetailComponent, { store, localVue, provide: { labelService: () => new LabelService() } });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: 123 } }));

        // WHEN
        comp.retrieveLabel(123);
        await comp.$nextTick();

        // THEN
        expect(comp.label).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
