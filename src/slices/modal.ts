/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PlanetWithId } from '../types';

export interface FormData {
  name: string;
  rotation_period: number;
  orbital_period: number;
  diameter: number;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: number;
}

export interface ModalState {
  isVisible: boolean;
  requestStatus: 'idle' | 'success' | 'error';
  formData: FormData;
}

const INITIAL_STATE = {
  isVisible: false,
  formData: {},
  requestStatus: 'idle',
} as ModalState;

const modalSlice = createSlice({
  name: '@modal',
  initialState: INITIAL_STATE,
  reducers: {
    setData(draft, action: PayloadAction<PlanetWithId>) {
      const {
        name,
        rotation_period,
        orbital_period,
        diameter,
        climate,
        gravity,
        terrain,
        surface_water,
      } = action.payload;

      const convertToNumber = (data: string) =>
        /unknown/i.test(data) ? 0 : Number(data);

      draft.isVisible = true;
      draft.formData = {
        name,
        climate,
        gravity,
        terrain: terrain.split(',')[0],
        rotation_period: convertToNumber(rotation_period),
        orbital_period: convertToNumber(orbital_period),
        diameter: convertToNumber(diameter),
        surface_water: convertToNumber(surface_water),
      };
    },
    submitData(_, action: PayloadAction<FormData>) {
      console.log(action.payload);

      return {
        ...INITIAL_STATE,
        requestStatus: Math.random() < 0.5 ? 'success' : 'error',
      };
    },
    clearData() {
      return INITIAL_STATE;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
