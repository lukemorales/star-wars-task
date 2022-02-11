import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { z } from 'zod';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { modalActions } from '../../slices/modal';
import Input from '../Input';
import Select from '../Select';

const formSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
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
  climate: z.string({
    required_error: 'Climate is required',
  }),
  gravity: z.string({
    required_error: 'Gravity is required',
  }),
  terrain: z.string({
    required_error: 'Terrain is required',
  }),
  surface_water: z.number({
    required_error: 'Surface Water is required',
    invalid_type_error: 'Surface Water must be a number',
  }),
});

type Schema = z.infer<typeof formSchema>;

const TERRAINS =
  'desert,grasslands,mountains,tundra,jungle,ice caves,swamp'.split(',');

const PlanetModal = () => {
  const dispatch = useAppDispatch();
  const defaultValues = useAppSelector((state) => state.modal.formData);

  const formMethods = useForm<Schema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const closeModal = () => dispatch(modalActions.clearData());
  const submitModal = (data: Schema) => dispatch(modalActions.submitData(data));

  return (
    <Modal isOpen centered backdrop toggle={closeModal}>
      <ModalHeader>Edit Planet {defaultValues.name}</ModalHeader>

      <ModalBody>
        <FormProvider {...formMethods}>
          <form
            id="planet-form"
            className="d-flex flex-column"
            onSubmit={formMethods.handleSubmit(submitModal)}
          >
            <Input<Schema> name="name" label="Planet Name" required />

            <Input<Schema>
              name="rotation_period"
              label="Rotation Period"
              required
              settings={{
                valueAsNumber: true,
              }}
            />

            <Input<Schema>
              name="orbital_period"
              label="Orbital Period"
              required
              settings={{
                valueAsNumber: true,
              }}
            />

            <Input<Schema>
              name="diameter"
              label="Diameter"
              required
              settings={{
                valueAsNumber: true,
              }}
            />

            <Input<Schema> name="climate" label="Climate" required />

            <Input<Schema> name="gravity" label="Gravity" required />

            <Select<Schema>
              name="terrain"
              label="Terrain"
              required
              options={[
                defaultValues.terrain,
                ...TERRAINS.filter(
                  (terrain) => terrain !== defaultValues.terrain,
                ),
              ]}
            />

            <Input<Schema>
              name="surface_water"
              label="Surface Water"
              required
              settings={{
                valueAsNumber: true,
              }}
            />
          </form>
        </FormProvider>
      </ModalBody>

      <ModalFooter>
        <Button color="danger" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          form="planet-form"
          type="submit"
          color="primary"
          disabled={!formMethods.formState.isValid}
        >
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default PlanetModal;
