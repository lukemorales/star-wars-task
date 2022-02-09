import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Planet, PlanetWithId, SwapiAPIResponse } from '../types';

export const planetsApi = createApi({
  reducerPath: 'planetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPlanets: builder.query<SwapiAPIResponse<PlanetWithId>, void | null>({
      query: () => `planets`,
      transformResponse: (response: SwapiAPIResponse<Planet>) => ({
        ...response,
        results: response.results.map((planet) => ({
          ...planet,
          id:
            planet.url.match(/.*\/(?<id>[0-9])+./)?.groups?.id ||
            `${Math.random()}`,
        })),
      }),
    }),
  }),
});

export const { useGetPlanetsQuery } = planetsApi;
