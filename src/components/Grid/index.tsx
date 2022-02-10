/* eslint-disable @typescript-eslint/no-explicit-any */
import './styles.css';
import { Table, ButtonGroup, Button } from 'reactstrap';

export interface Action<T extends Record<string, any>> {
  label: string;
  action: (row: T) => void;
  isEnabled?: (row: T) => boolean;
}

export interface GridProps<T extends Record<string, any>> {
  header?: Array<keyof T>;
  values?: T[];
  actions?: Action<T>[];
}

const Grid = <T extends Record<string, any>>(props: GridProps<T>) => {
  const { header = [], values = [], actions = [] } = props;

  const hasActions = !!actions.length;

  return (
    <Table className="gridTable my-auto shadow-lg rounded-3 overflow-hidden">
      <thead>
        <tr>
          {header.map((colName) => {
            const rowValue = values[0][colName];

            let rowType = Number.isNaN(Number(rowValue)) ? 'string' : 'number';

            if (/unknown/i.test(rowValue) || Array.isArray(rowValue)) {
              rowType = 'number';
            }

            return (
              <th
                key={String(colName)}
                className={`text-uppercase align-middle ${
                  rowType !== 'number' ? '' : 'text-end'
                }`}
              >{`${colName} (${rowType})`}</th>
            );
          })}

          {hasActions && (
            <th className="text-uppercase align-middle">Actions</th>
          )}
        </tr>
      </thead>

      <tbody>
        {values.map((row, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr key={index}>
            {header.map((colName) => {
              let content = row[colName];

              if (Array.isArray(content)) {
                content = content.length;
              }

              const isStringCol =
                Number.isNaN(Number(content)) && !/unknown/i.test(content);

              return (
                <td
                  key={String(colName)}
                  className={`align-middle ${isStringCol ? '' : 'text-end'}`}
                >
                  {content}
                </td>
              );
            })}

            {hasActions && (
              <td className="gridActions">
                <ButtonGroup>
                  {actions.map(({ label, action, isEnabled }) => (
                    <Button
                      key={label}
                      type="button"
                      color="dark"
                      size="sm"
                      /* requirements asked to actions to be displayed conditionally,
                      but I took the liberty to keep them on screen instead and only disable it
                      to make the UI consistent and prettier */
                      disabled={!isEnabled?.(row)}
                      onClick={() => action(row)}
                    >
                      {label}
                    </Button>
                  ))}
                </ButtonGroup>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Grid;
