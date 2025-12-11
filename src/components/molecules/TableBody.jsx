import { TrashIcon, PlusIcon, MinusIcon, PencilIcon } from "@heroicons/react/24/outline";

const TableBody = ({ columns, data, actions, emptyMessage, onUpdateQty }) => (
  <tbody className="bg-gray-900">

    {data.length === 0 ? (
      <tr>
        <td
          colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
          className="px-6 py-8 text-center text-gray-400 text-lg"
        >
          {emptyMessage}
        </td>
      </tr>
    ) : (
      data.map((row, idx) => (
        <tr key={idx} className="border-b border-gray-700 hover:bg-gray-800 transition">

          {columns.map((col) => (
            <td key={col.key} className="px-6 py-4 text-sm text-gray-300">
              {col.key === "image" && (
                <img
                  src={row.imageUrl}
                  alt={row.productName}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
              )}

              {col.key === "product" && (
                <div>
                  <p className="font-semibold text-gray-100">{row.productName}</p>
                  <p className="text-sm text-gray-400">{row.tradeMarkName}</p>
                  <p className="text-xs text-gray-500">{row.categoryName}</p>
                </div>
              )}

              {col.key === "price" && (
                <span>${row.price?.toLocaleString?.("es-CL") || row.price}</span>
              )}

              {col.key === "quantity" && onUpdateQty && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onUpdateQty(row.id, Math.max(row.quantity - 1, 1))}
                    className="w-7 h-7 bg-white hover:bg-gray-200 rounded flex items-center justify-center"
                  >
                    <MinusIcon className="h-4 w-4 text-black" />
                  </button>

                  <span className="px-3 py-1 bg-white rounded border border-gray-300 text-black font-semibold">
                    {row.quantity}
                  </span>

                  <button
                    onClick={() => onUpdateQty(row.id, row.quantity + 1)}
                    className="w-7 h-7 bg-white hover:bg-gray-200 rounded flex items-center justify-center"
                  >
                    <PlusIcon className="h-4 w-4 text-black" />
                  </button>
                </div>
              )}

              {col.key === "subtotal" && (
                <strong className="text-gray-100">
                  ${(row.price * row.quantity)?.toLocaleString?.("es-CL") || row.price * row.quantity}
                </strong>
              )}

              {!["image", "product", "price", "quantity", "subtotal"].includes(col.key) && (
                <span>{col.render ? col.render(row) : row[col.key]}</span>
              )}
            </td>
          ))}

          {actions.length > 0 && (
            <td className="px-6 py-4 text-sm flex gap-3">
              {actions.map((action) => (
                <button
                    key={action.id}
                    onClick={() => action.handler(row)}
                    className={`p-2 rounded ${
                      action.variant === "danger"
                        ? "text-red-600 hover:bg-red-900/30"
                        : "text-blue-600 hover:bg-blue-900/30"
                    }`}
                    title={action.label}
                  >
                    {action.variant === "danger" && (
                      <TrashIcon className="h-5 w-5" />
                    )}
                    {action.variant === "primary" && (
                      <PencilIcon className="h-5 w-5" />
                    )}
                    {!["danger", "primary"].includes(action.variant) && (
                      <PencilIcon className="h-5 w-5" />
                    )}
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
