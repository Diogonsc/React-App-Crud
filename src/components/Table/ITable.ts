import { GridColDef } from "@mui/x-data-grid";
import { IClient } from "../../pages/Registration";

export interface ITabelaProps {
  columns: GridColDef[] | null;
  rows: IClient[] | null;
  openModal?: () => void;
}
