import type { Planet } from '../types';
import './Grid.css';

export interface Action {
  label: string;
  action: (row: Planet) => void;
}

interface GridProps {
  data: {
    header?: Array<keyof Planet>;
    values?: Planet[];
    actions?: Action[];
  };
}

function Grid(props: GridProps) {
  const {
    data: { header = [], values = [], actions = [] },
  } = props;

  return (
    <table className="gridTable">
      <thead>
        <tr>
          {header.map((colName) => (
            <th key={colName}>{colName}</th>
          ))}
          {!!actions.length && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {values.map((row, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr key={index}>
            {header.map((colName) => (
              <td key={colName}>{row[colName]}</td>
            ))}
            {!!actions.length && (
              <td className="gridActions">
                {actions.map(({ label, action }) => (
                  <button type="button" onClick={() => action(row)}>
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
}

export default Grid;
