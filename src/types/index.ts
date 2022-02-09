export interface SwapiAPIResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface PlanetWithId extends Planet {
  id: string;
}
