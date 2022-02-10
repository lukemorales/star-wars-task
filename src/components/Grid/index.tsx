/* eslint-disable @typescript-eslint/no-explicit-any */
import './styles.css';

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
          {header.map((colName) => {
            const rowValue = values[0][colName];

            let rowType = Number.isNaN(Number(rowValue)) ? 'string' : 'number';

            if (/unknown/i.test(rowValue) || Array.isArray(rowValue)) {
              rowType = 'number';
            }

            return (
              <th
                key={String(colName)}
                className={rowType !== 'number' ? '' : 'numberCell'}
              >{`${colName} (${rowType})`}</th>
            );
          })}

          {hasActions && <th>Actions</th>}
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
                  className={isStringCol ? '' : 'numberCell'}
                >
                  {content}
                </td>
              );
            })}

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
