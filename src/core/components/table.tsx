import Table, { TableProps } from "@mui/joy/Table";

export interface JoyTableColumn<T> {
  header: string;
  accessorKey: keyof T;
  accessorFn?(row: T): React.ReactElement;
}

interface GenericTableProps<T> extends TableProps {
  unique: keyof T;
  data: T[];
  columns: JoyTableColumn<T>[];
  caption?: string;
}

export default function GenericTable<T>(Props: GenericTableProps<T>) {
  return (
    <Table
      size={Props.size}
      stripe="even"
      hoverRow
      borderAxis="xBetween"
      sx={{ captionSide: "bottom" }}
      variant="outlined"
      {...Props}
    >
      <caption>{Props.caption}</caption>
      <thead>
        <tr>
          {Props.columns.map((column, index) => (
            <th key={`${index} - ${column.header}`}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Props.data.map((row, index) => (
          <tr key={`${index}`}>
            {Props.columns.map((column, index) =>
              column.accessorFn ? (
                <td
                  key={`${index}-${row[Props.unique]}`}
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  {column.accessorFn(row)}
                </td>
              ) : (
                <td key={`${index}-${row[Props.unique]}`}>
                  {row[column.accessorKey]?.toString()}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
