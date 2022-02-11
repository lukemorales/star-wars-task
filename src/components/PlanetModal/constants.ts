import { z } from 'zod';

export const PLANET_FORM_SCHEMA = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(1),
  rotation_period: z.number({
    required_error: 'Rotation Period is required',
    invalid_type_error: 'Rotation Period must be a number',
  }),
  orbital_period: z.number({
    required_error: 'Orbital Period is required',
    invalid_type_error: 'Orbital Period must be a number',
  }),
  diameter: z.number({
    required_error: 'Diameter is required',
    invalid_type_error: 'Diameter must be a number',
  }),
  climate: z
    .string({
      required_error: 'Climate is required',
    })
    .min(1),
  gravity: z
    .string({
      required_error: 'Gravity is required',
    })
    .min(1),
  terrain: z
    .string({
      required_error: 'Terrain is required',
    })
    .min(1),
  surface_water: z.number({
    required_error: 'Surface Water is required',
    invalid_type_error: 'Surface Water must be a number',
  }),
});

export const TERRAINS =
  'desert,grasslands,mountains,tundra,jungle,ice caves,swamp,rainforests,mountain ranges,gas giant,grassy hills,cityscape,ocean'.split(
    ',',
  );
