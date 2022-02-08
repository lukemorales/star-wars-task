import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Planet } from '../types';

export const planetsApi = createApi({
  reducerPath: 'planetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPlanets: builder.query<Planet[], string>({
      query: () => `planets`,
    }),
  }),
});

export const { useGetPlanetsQuery } = planetsApi;
