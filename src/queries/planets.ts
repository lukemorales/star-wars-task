/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  Film,
  Planet,
  PlanetWithId,
  Resident,
  SwapiAPIResponse,
} from '../types';

interface GetPlanetFilmsResponse {
  planetName: string;
  films: Film[];
}

interface GetPlanetResidentsResponse {
  planetName: string;
  residents: Resident[];
}

export const planetsApi = createApi({
  reducerPath: 'planetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPlanets: builder.query<SwapiAPIResponse<PlanetWithId>, number>({
      query: (page) => `planets/?page=${page}`,
      transformResponse: (response: SwapiAPIResponse<Planet>) => ({
        ...response,
        results: response.results.map((planet) => ({
          ...planet,
          id: planet.url.match(/.*\/(?<id>[0-9])+./)!.groups!.id,
        })),
      }),
    }),
    getSinglePlanet: builder.query<Planet, string>({
      query: (id) => `planets/${id}`,
    }),
    getPlanetFilms: builder.query<GetPlanetFilmsResponse, string>({
      queryFn: async (planetId, queryApi, _extraOptions, fetchWithBQ) => {
        const apiCache = (queryApi.getState() as any).planetsApi;

        const planetCache = Object.values(apiCache.queries).find(
          (cache) => (cache as any).endpointName === 'getPlanets',
        );

        let planet = (planetCache as any)?.data?.results.find(
          ({ id }: PlanetWithId) => id === planetId,
        ) as Planet | undefined;

        if (!planet) {
          const planetResult = await fetchWithBQ(`planets/${planetId}`);

          if (planetResult.error) throw planetResult.error;

          planet = planetResult.data as Planet;
        }

        const films = await Promise.all(
          planet.films.map((link) => {
            const filmId = link.match(/.*\/(?<id>[0-9]*)+./)!.groups!.id;

            return fetchWithBQ(`films/${filmId}`);
          }),
        );

        return {
          data: {
            planetName: planet.name,
            films: films.map((film) => film.data as Film),
          },
        };
      },
    }),
    getPlanetResidents: builder.query<GetPlanetResidentsResponse, string>({
      queryFn: async (planetId, queryApi, _extraOptions, fetchWithBQ) => {
        const apiCache = (queryApi.getState() as any).planetsApi;

        const planetCache = Object.values(apiCache.queries).find(
          (cache) => (cache as any).endpointName === 'getPlanets',
        );

        let planet = (planetCache as any)?.data?.results.find(
          ({ id }: PlanetWithId) => id === planetId,
        ) as Planet | undefined;

        if (!planet) {
          const planetResult = await fetchWithBQ(`planets/${planetId}`);

          if (planetResult.error) throw planetResult.error;

          planet = planetResult.data as Planet;
        }

        const residents = await Promise.all(
          planet.residents.map((link) => {
            const residentId = link.match(/.*\/(?<id>[0-9]*)+./)!.groups!.id;

            return fetchWithBQ(`people/${residentId}`);
          }),
        );

        return {
          data: {
            planetName: planet.name,
            residents: residents.map((resident) => resident.data as Resident),
          },
        };
      },
    }),
  }),
});

export const {
  useGetPlanetsQuery,
  useGetSinglePlanetQuery,
  useGetPlanetFilmsQuery,
  useGetPlanetResidentsQuery,
} = planetsApi;
