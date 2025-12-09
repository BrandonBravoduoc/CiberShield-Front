const DynamicTable = ({
  columns = [],
  data = [],
  actions = [],
  emptyMessage = "No hay datos disponibles"
}) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 border-b">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700"
              >
                {column.label}
              </th>
            ))}
            {actions.length > 0 && (
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                className="px-6 py-4 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 text-sm text-gray-700">
                    {row[column.key] ?? "-"}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className="px-6 py-4 text-sm space-x-2 flex">
                    {actions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => action.handler(row)}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          action.variant === "danger"
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        }`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
