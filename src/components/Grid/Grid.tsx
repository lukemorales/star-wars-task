import type { Planet, PlanetWithId } from '../../types';
import './Grid.css';

export interface Action {
  label: string;
  action: (row: PlanetWithId) => void;
}

interface GridProps {
  header?: Array<keyof Planet>;
  values?: PlanetWithId[];
  actions?: Action[];
}

const Grid = ({ header = [], values = [], actions = [] }: GridProps) => {
  const hasActions = !!actions.length;

  return (
    <table className="gridTable">
      <thead>
        <tr>
          {header.map((colName) => (
            <th key={colName}>{colName}</th>
          ))}

          {hasActions && <th>Actions</th>}
        </tr>
      </thead>

      <tbody>
        {values.map((row, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr key={index}>
            {header.map((colName) => (
              <td key={colName}>{row[colName]}</td>
            ))}

            {hasActions && (
              <td className="gridActions">
                {actions.map(({ label, action }) => (
                  <button key={label} type="button" onClick={() => action(row)}>
                    {label}
                  </button>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
