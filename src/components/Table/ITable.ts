import { GridColDef } from "@mui/x-data-grid";

export interface ITabelaProps {
  columns: GridColDef[] | null;
  rows: FormData | [];
  openModal?: () => void;
  loading: boolean;
}
