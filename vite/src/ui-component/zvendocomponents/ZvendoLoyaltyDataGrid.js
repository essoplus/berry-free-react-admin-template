// File: ZvendoLoyaltyDataGrid.js

import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';

const ZvendoLoyaltyDataGrid = ({
  rows,
  columns,
  pageSize,
  getRowId,
  rowCount,
  pagination,
  onPageChange,
  onPageSizeChange,
  loading,
  onEditCellChangeCommitted,
  onSelectionModelChange
}) => {

  const handleSelectionChange = (selectionModel) => {
    console.log('Selection model:', selectionModel);
    if (onSelectionModelChange) {
      onSelectionModelChange(selectionModel);
    }
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        pageSizeOptions={[15, 24, 40, 90]}
        getRowId={getRowId}
        rowCount={rowCount}
        pagination={pagination}
        paginationMode="server"
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        loading={loading}
        onEditCellChangeCommitted={onEditCellChangeCommitted}
        checkboxSelection
        onSelectionModelChange={handleSelectionChange} // Add this line
        slots={{
          toolbar: GridToolbar,
          LoadingOverlay: LinearProgress
        }}
      />
    </div>
  );
};

export default ZvendoLoyaltyDataGrid;
