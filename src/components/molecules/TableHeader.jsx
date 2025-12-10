const TableHeader = ({ columns, actions }) => (
  <thead>
    <tr className="bg-gray-800 border-b border-gray-700">
      {columns.map((column) => (
        <th
          key={column.key}
          className="px-6 py-3 text-left text-sm font-semibold text-gray-200"
        >
          {column.label}
        </th>
      ))}
      {actions.length > 0 && (
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-200">
          Acciones
        </th>
      )}
    </tr>
  </thead>
);

export default TableHeader;
