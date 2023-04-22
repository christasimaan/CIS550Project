import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import LazyTable from '../components/LazyTable';
import { Button, Divider, Container, Grid, Link, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { NavLink } from 'react-router-dom';
const config = require('../config.json');

export default function ReviewsPage() {
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [AuthorName, setAuthorName] = useState('');
  const [Review, setReview] = useState('');
  const [Rating, setRating] = useState('');

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/reviews`)
      .then(res => res.json())
      .then(resJson => {
        const reviewsWithId = resJson.map((review) => ({ id: review.ReviewId, ...review}));
        setData(reviewsWithId)
      });
  }, []);

  const review = () => {
    fetch(`http://${config.server_host}:${config.server_port}/reviews?AuthorName=${AuthorName}` +
      `&Review=${Review}` + `&Rating=${Rating}`)
      .then(res => res.json())
      .then(resJson => {
        const reviewsWithId = resJson.map((review) => ({ id: review.ReviewId, ...review}));
        setData(reviewsWithId)
      });
  }

  const columns = [
    {field: 'AuthorName', headerName: 'Author Name', width: 600},
    {field: 'Review', headerName: 'Review', width: 700},
    {field: 'Rating', headerName: 'Rating', width: 200}
  ];

  const authorColumns = [
    {
      field: 'AuthorName',
      headerName: 'Author Name',
      renderCell: (row) => <Link onClick={() => setSelectedAuthorId(row.AuthorId)}>{row.AuthorName}</Link>
    },
    {
      field: 'AverageRecipeRating',
      headerName: 'Average Recipe Rating'
    },
    {
      field: 'TotalRecipeLikes',
      headerName: 'Total Recipe Likes'
    },
  ];

  return (
    <Container>
        {selectedAuthorId && <RecipeCard recipeId={selectedAuthorId} handleClose={() => setSelectedAuthorId(null)} />}
        <h2>Reviews</h2>
        <Grid item xs={10}>
          <TextField label='Author Name' value={AuthorName} onChange={(e) => setAuthorName(e.target.value)} style={{ width: "100%" }}/>
        </Grid>
        <Grid item xs={10}>
          <TextField label='Review Keyword(s)' value={Review} onChange={(e) => setReview(e.target.value)} style={{ width: "100%" }}/>
        </Grid>
        <Grid item xs={10}>
          <TextField label='Rating' value={Rating} onChange={(e) => setRating(e.target.value)} style={{ width: "100%" }}/>
        </Grid>
        <Button onClick={() => review() } style={{ left: '50%', transform: 'translateX(-50%)' }}>
        Find Reviews!
        </Button>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        autoHeight
      />
    <Divider />
      <h2>Top Authors</h2>
      <LazyTable route={`http://${config.server_host}:${config.server_port}/top_authors`} columns={authorColumns} defaultPageSize={5} rowsPerPageOptions={[5, 10]} />
    <Divider />
     </Container>
  );

}