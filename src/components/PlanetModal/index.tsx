import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { z } from 'zod';

import { FormData } from '../../slices/modal';
import Input from '../Input';
import Select from '../Select';
import { PLANET_FORM_SCHEMA, TERRAINS } from './constants';

type Schema = z.infer<typeof PLANET_FORM_SCHEMA>;

interface PlanetModalProps {
  defaultValues: FormData;
  onClose: () => void;
  onSubmit: (data: Schema) => void;
}

const PlanetModal = (props: PlanetModalProps) => {
  const { defaultValues, onClose, onSubmit } = props;

  const formMethods = useForm<Schema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(PLANET_FORM_SCHEMA),
  });

  return (
    <Modal isOpen centered backdrop toggle={onClose}>
      <ModalHeader>Edit Planet {defaultValues.name}</ModalHeader>

      <ModalBody>
        <FormProvider {...formMethods}>
          <form
            id="planet_form"
            className="d-flex flex-column"
            onSubmit={formMethods.handleSubmit(onSubmit)}
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
        <Button color="danger" onClick={onClose}>
          Cancel
        </Button>
        <Button
          form="planet_form"
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
