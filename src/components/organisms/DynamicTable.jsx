import TableHeader from "../molecules/TableHeader";
import TableBody from "../molecules/TableBody";

const DynamicTable = ({
  columns = [],
  data = [],
  actions = [],
  emptyMessage = "No hay datos disponibles"
}) => (
  <div className="overflow-x-auto rounded-lg shadow">
    <table className="w-full">
      <TableHeader columns={columns} actions={actions} />
      <TableBody columns={columns} data={data} actions={actions} emptyMessage={emptyMessage} />
    </table>
  </div>
);

export default DynamicTable;
