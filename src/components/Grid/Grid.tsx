/* eslint-disable @typescript-eslint/no-explicit-any */
import './Grid.css';

export interface Action<T extends Record<string, any>> {
  label: string;
  action: (row: T) => void;
  isVisible?: (row: T) => boolean;
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
    <table className="gridTable">
      <thead>
        <tr>
          {header.map((colName) => (
            <th key={String(colName)}>{colName}</th>
          ))}

          {hasActions && <th>Actions</th>}
        </tr>
      </thead>

      <tbody>
        {values.map((row, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr key={index}>
            {header.map((colName) => (
              <td key={String(colName)}>{row[colName]}</td>
            ))}

            {hasActions && (
              <td className="gridActions">
                {actions.map(({ label, action, isVisible }) => {
                  if (!isVisible?.(row)) {
                    return null;
                  }

                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => action(row)}
                    >
                      {label}
                    </button>
                  );
                })}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Grid;
