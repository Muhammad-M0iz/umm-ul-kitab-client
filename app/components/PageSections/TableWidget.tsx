import { TableSection } from "@/types/page";

export default function TableWidget({ data }: { data: TableSection }) {
  if (!data.Table || !data.Table.columns || !data.Table.rows) return null;

  return (
    <div className="my-12 overflow-hidden rounded-2xl border border-secondary/50 shadow-sm bg-white">
      {data.title && (
        <div className="bg-primary/5 px-6 py-4 border-b border-secondary/30">
          <h3 className="text-xl font-display font-bold text-primary">{data.title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {data.Table.columns.map((col, idx) => (
                <th 
                  key={idx} 
                  className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.Table.rows.map((row, rowIdx) => (
              <tr 
                key={rowIdx} 
                className="hover:bg-gray-50/50 transition-colors"
              >
                {row.map((cell, cellIdx) => (
                  <td 
                    key={cellIdx} 
                    className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
