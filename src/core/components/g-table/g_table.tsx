import {
  ArrowDropDown,
  FilterAlt,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  MoreHorizRounded,
  Search,
} from "@mui/icons-material";
import {
  Dropdown,
  MenuButton,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Button,
  Box,
  Modal,
  ModalDialog,
  ModalClose,
  Typography,
  Sheet,
  Input,
  Table,
  Checkbox,
  Link,
  iconButtonClasses,
  TableProps,
} from "@mui/joy";
import {
  CSSProperties,
  Dispatch,
  ReactElement,
  SetStateAction,
  useState,
  useMemo,
  memo,
  createElement,
} from "react";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<T>(
  order: Order,
  orderBy: keyof T
): (a: T, b: T) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)

export interface GTableColumns<T> {
  name: string;
  key: keyof T;
  accessorFn?: (row: T) => ReactElement;
  style?: CSSProperties;
}

interface GTableProps<T> {
  selectable?: boolean;
  id: keyof T;
  actionMenus?: Array<{
    name: string;
    handleClick: Dispatch<SetStateAction<boolean>>;
    delete?: boolean;
  }>;

  data: Array<T>;
  columns: Array<GTableColumns<T>>;
  tableProps?: TableProps;
  sortBy?: keyof T;
}

function GTable<T>(props: GTableProps<T>) {
  const [order, setOrder] = useState<Order>("desc");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [open, setOpen] = useState(false);

  //   function stableSort(array: readonly T[], comparator: (a: T, b: T) => number) {
  //     const stabilizedThis = props?.sortBy
  //       ? array.map((el, index) => [el, index] as [T, number])
  //       : [];
  //     stabilizedThis.sort((a, b) => {
  //       const order = comparator(a[0][props?.sortBy], b[0][props?.sortBy]);
  //       if (order !== 0) {
  //         return order;
  //       }
  //       return a[1] - b[1];
  //     });
  //     return stabilizedThis.map((el) => el[0]);
  //   }

  const RowMenu = useMemo(() => {
    return props?.actionMenus ? (
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{
            root: { variant: "plain", color: "neutral", size: "sm" },
          }}
        >
          <MoreHorizRounded />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          {props?.actionMenus?.map((menu, index) =>
            !menu?.delete ? (
              <MenuItem key={`${index}-${menu.name}`}>{menu.name}</MenuItem>
            ) : (
              <>
                <Divider />
                <MenuItem color="danger">{menu.name}</MenuItem>
              </>
            )
          )}
        </Menu>
      </Dropdown>
    ) : (
      <></>
    );
  }, [props.actionMenus]);

  //   const renderFilters = () => (
  //     <>
  //       <FormControl size="sm">
  //         <FormLabel>Status</FormLabel>
  //         <Select
  //           size="sm"
  //           placeholder="Filter by status"
  //           slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
  //         >
  //           <Option value="paid">Paid</Option>
  //           <Option value="pending">Pending</Option>
  //           <Option value="refunded">Refunded</Option>
  //           <Option value="cancelled">Cancelled</Option>
  //         </Select>
  //       </FormControl>
  //       <FormControl size="sm">
  //         <FormLabel>Category</FormLabel>
  //         <Select size="sm" placeholder="All">
  //           <Option value="all">All</Option>
  //           <Option value="refund">Refund</Option>
  //           <Option value="purchase">Purchase</Option>
  //           <Option value="debit">Debit</Option>
  //         </Select>
  //       </FormControl>
  //       <FormControl size="sm">
  //         <FormLabel>Customer</FormLabel>
  //         <Select size="sm" placeholder="All">
  //           <Option value="all">All</Option>
  //           <Option value="olivia">Olivia Rhye</Option>
  //           <Option value="steve">Steve Hampton</Option>
  //           <Option value="ciaran">Ciaran Murray</Option>
  //           <Option value="marina">Marina Macdonald</Option>
  //           <Option value="charles">Charles Fulton</Option>
  //           <Option value="jay">Jay Hoper</Option>
  //         </Select>
  //       </FormControl>
  //     </>
  //   );
  return (
    <>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: "flex", sm: "none" },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<Search />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAlt />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* {renderFilters()} */}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        {/* <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for order</FormLabel>
          <Input size="sm" placeholder="Search" startDecorator={<Search />} />
        </FormControl> */}
        {/* {renderFilters()} */}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
          }}
          {...props.tableProps}
        >
          <thead style={{}}>
            <tr>
              {props?.selectable && (
                <th
                  style={{
                    width: 48,
                    textAlign: "center",
                    padding: "12px 6px",
                  }}
                >
                  <Checkbox
                    size="sm"
                    indeterminate={
                      selected.length > 0 &&
                      selected.length !== props.data.length
                    }
                    checked={selected.length === props.data.length}
                    onChange={(event) => {
                      setSelected(
                        event.target.checked
                          ? props.data.map((row) => row[props.id] as string)
                          : []
                      );
                    }}
                    color={
                      selected.length > 0 ||
                      selected.length === props.data.length
                        ? "primary"
                        : undefined
                    }
                    sx={{ verticalAlign: "text-bottom" }}
                  />
                </th>
              )}
              {/* <th style={{ width: 240, padding: "12px 6px" }}>Customer</th>
              <th style={{ width: 120, padding: "12px 6px" }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDown />}
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                      transform:
                        order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                    },
                  }}
                >
                  Invoice
                </Link>
              </th> */}

              {props.columns.map((column, index) => (
                <th
                  key={`${index}-${column.name}`}
                  style={{
                    textAlign: "start",
                    padding: "12px 6px",
                    ...(column?.style ?? {}),
                  }}
                >
                  {props?.sortBy === column.key ? (
                    <Link
                      underline="none"
                      color="primary"
                      component="button"
                      onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                      fontWeight="lg"
                      endDecorator={<ArrowDropDown />}
                      sx={{
                        "& svg": {
                          transition: "0.2s",
                          transform:
                            order === "desc"
                              ? "rotate(0deg)"
                              : "rotate(180deg)",
                        },
                      }}
                    >
                      {column.name}
                    </Link>
                  ) : (
                    column.name
                  )}
                </th>
              ))}

              {/* <th style={{ width: 140, padding: "12px 6px" }}>Status</th> */}
              {props?.actionMenus !== undefined && (
                <th style={{ width: 140, padding: "12px 6px" }}> </th>
              )}
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "" }}>
            {/* {stableSort(rowing, getComparator(order, "id")).map((row, idx) => ( */}
            {/* {props.data.slice().sort(getComparator(order, props?.sortBy))(rowing, getComparator(order, "id")).map((row, idx) => ( */}
            {props.data.length > 0 &&
              props.data
                .slice()
                .sort(getComparator<T>(order, props?.sortBy ?? props.id))
                .map((row, index) => (
                  <tr key={`${index}-${row[props.id]}`}>
                    {props.selectable && (
                      <td style={{ textAlign: "center", width: 120 }}>
                        <Checkbox
                          size="sm"
                          checked={selected.includes(row[props.id] as string)}
                          color={
                            selected.includes(row[props.id] as string)
                              ? "primary"
                              : undefined
                          }
                          onChange={(event) => {
                            setSelected((ids) =>
                              event.target.checked
                                ? ids.concat(row[props.id] as string)
                                : ids.filter(
                                    (itemId) =>
                                      itemId !== (row[props.id] as string)
                                  )
                            );
                          }}
                          slotProps={{
                            checkbox: { sx: { textAlign: "left" } },
                          }}
                          sx={{ verticalAlign: "text-bottom" }}
                        />
                      </td>
                    )}
                    {props.columns.map((column, index) =>
                      column?.accessorFn ? (
                        <td
                          key={`${index}-${row[props.id]}`}
                          //   style={{
                          //     display: "flex",
                          //     justifyContent: "start",
                          //     alignItems: "center",
                          //   }}
                        >
                          {column.accessorFn(row)}
                        </td>
                      ) : (
                        <td key={`${index}-${row[props.id]}`}>
                          {row[column.key]?.toString()}
                        </td>
                      )
                    )}
                    {props?.actionMenus !== undefined && (
                      <td>
                        <Box
                          sx={{ display: "flex", gap: 2, alignItems: "center" }}
                        >
                          <Link level="body-xs" component="button">
                            Download
                          </Link>
                          {RowMenu}
                        </Box>
                      </td>
                    )}
                  </tr>
                ))}
            {/* {props.data.map((row, idx) => (
              <tr key={row?.id ?? idx}>
                {props.selectable && (
                  <td style={{ textAlign: "center", width: 120 }}>
                    <Checkbox
                      size="sm"
                      checked={selected.includes(row?.id ?? idx.toString())}
                      color={
                        selected.includes(row?.id ?? idx.toString())
                          ? "primary"
                          : undefined
                      }
                      onChange={(event) => {
                        setSelected((ids) =>
                          event.target.checked
                            ? ids.concat(row.id)
                            : ids.filter((itemId) => itemId !== row.id)
                        );
                      }}
                      slotProps={{ checkbox: { sx: { textAlign: "left" } } }}
                      sx={{ verticalAlign: "text-bottom" }}
                    />
                  </td>
                )}

                
              </tr>
            ))} */}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeft />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {["1", "2", "3", "…", "8", "9", "10"].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? "outlined" : "plain"}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRight />}
        >
          Next
        </Button>
      </Box>
    </>
  );
}

export default GTable;
