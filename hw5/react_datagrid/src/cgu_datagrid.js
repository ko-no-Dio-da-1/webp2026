import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';

export default function CGU_DataGrid() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentType, setCurrentType] = useState('posts');

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/${currentType}`)
      .then(res => res.json())
      .then(data => {
        setRows(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [currentType]);

  const columns = React.useMemo(() => {
    if (currentType === 'posts') {
      return [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'userId', headerName: 'User ID', width: 100 },
        { field: 'title', headerName: '標題', flex: 1, minWidth: 300 },
        { field: 'body', headerName: '內容', flex: 2, minWidth: 400 },
      ];
    } else if (currentType === 'users') {
      return [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'name', headerName: '姓名', width: 150 },
        { field: 'username', headerName: '帳號', width: 120 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'phone', headerName: '電話', width: 150 },
      ];
    } else {
      return [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'postId', headerName: 'Post ID', width: 100 },
        { field: 'name', headerName: '姓名', width: 150 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'body', headerName: '留言內容', flex: 2, minWidth: 400 },
      ];
    }
  }, [currentType]);

  return (
    <Box sx={{ height: '100vh', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        HW5 - MUI DataGrid + useEffect
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Button variant="contained" onClick={() => setCurrentType('posts')} sx={{ mr: 2 }}>
          Posts
        </Button>
        <Button variant="contained" onClick={() => setCurrentType('users')} sx={{ mr: 2 }}>
          Users
        </Button>
        <Button variant="contained" onClick={() => setCurrentType('comments')}>
          Comments
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 15, 25, 50]}
          initialState={{ pagination: { paginationModel: { pageSize: 15 } } }}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
}