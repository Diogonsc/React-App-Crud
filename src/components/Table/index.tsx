import React from "react";
import { DataGrid, GridToolbarContainer, GridToolbar } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { ptBR } from "@mui/x-data-grid/locales";
import { ITabelaProps } from "./ITable";
import { BtnIconAdd } from "./tableStyles";
import { Box } from "@mui/material";
import { IClient } from "../../pages/Registration";

const CustomToolbar: React.FC<{ openModal?: () => void }> = ({ openModal }) => {
  return (
    <GridToolbarContainer
      sx={{
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <GridToolbar />
      {openModal && (
        <BtnIconAdd onClick={openModal} title="Adicionar novo cliente">
          <AddIcon /> <span>Novo Cliente</span>
        </BtnIconAdd>
      )}
    </GridToolbarContainer>
  );
};

const TableComponent: React.FC<ITabelaProps> = ({
  columns,
  rows,
  openModal,
}) => {
  return (
    <Box
      sx={{
        height: "calc(100vh - 5rem)",
        width: "100%",
      }}
    >
      <DataGrid
        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        rows={rows || []}
        getRowId={(row: IClient) => row.id}
        columns={columns || []}
        slots={{ toolbar: () => <CustomToolbar openModal={openModal} /> }}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "white",
            fontFamily: "Poppins",
            border: "none",
            color: "#616161",
            textTransform: "uppercase",
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-cell": {
            color: "#000",
            fontFamily: "Poppins",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            textTransform: "uppercase",
          },
          "& .MuiDataGrid-virtualScroller": {
            "&::-webkit-scrollbar": {
              width: "0px",
              background: "transparent",
            },
          },
        }}
      />
    </Box>
  );
};

export default TableComponent;
