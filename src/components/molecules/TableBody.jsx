import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

const TableBody = ({ columns, data, actions, emptyMessage, onUpdateQty }) => (
  <tbody className="bg-white">

    {data.length === 0 ? (
      <tr>
        <td
          colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
          className="px-6 py-8 text-center text-gray-500 text-lg"
        >
          {emptyMessage}
        </td>
      </tr>
    ) : (
      data.map((row, idx) => (
        <tr key={idx} className="border-b hover:bg-gray-50 transition">

          {columns.map((col) => (
            <td key={col.key} className="px-6 py-4 text-sm text-gray-700">

              {col.key === "image" && (
                <img
                  src={row.imageUrl}
                  alt={row.productName}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
              )}

              {col.key === "product" && (
                <div>
                  <p className="font-semibold text-gray-900">{row.productName}</p>
                  <p className="text-sm text-gray-500">{row.tradeMarkName}</p>
                  <p className="text-xs text-gray-400">{row.categoryName}</p>
                </div>
              )}

              {col.key === "price" && (
                <span>${row.price.toLocaleString("es-CL")}</span>
              )}
              {col.key === "quantity" && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onUpdateQty(row.id, Math.max(row.quantity - 1, 1))}
                    className="w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center"
                  >
                    <MinusIcon className="h-4 w-4 text-gray-700" />
                  </button>

                  <span className="px-3 py-1 bg-gray-100 rounded border">
                    {row.quantity}
                  </span>

                  <button
                    onClick={() => onUpdateQty(row.id, row.quantity + 1)}
                    className="w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center"
                  >
                    <PlusIcon className="h-4 w-4 text-gray-700" />
                  </button>
                </div>
              )}

              {col.key === "subtotal" && (
                <strong className="text-gray-900">
                  ${(row.price * row.quantity).toLocaleString("es-CL")}
                </strong>
              )}
            </td>
          ))}

          {actions.length > 0 && (
            <td className="px-6 py-4 text-sm">
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => action.handler(row)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              ))}
            </td>
          )}

        </tr>
      ))
    )}
  </tbody>
);

export default TableBody;
