import { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { Button, Checkbox, Container, FormControlLabel, Grid, Link, Slider, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { formatDuration } from '../helpers/formatter';
const config = require('../config.json');

export default function SearchPage() {
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [CookTime, setCookTime] = useState([0, 11358720]);
  const [PrepTime, setPrepTime] = useState([0, 525600]);
  const [TotalTime, setTotalTime] = useState([0, 11394720]);
  const [SaturatedFatContent, setSaturatedFatContent] = useState([0, 841.9]);
  const [CholesterolContent, setCholesterolContent] = useState([0, 9167.2]);
  const [SodiumContent, setSodiumContent] = useState([0, 704129.6]);
  const [CarbohydrateContent, setCarbohydrateContent] = useState([0, 4320.9]);
  const [FiberContent, setFiberContent] = useState([0, 835.7]);
  const [SugarContent, setSugarContent] = useState([0, 3623.9]);
  const [ProteinContent, setProteinContent] = useState([0, 1802.9]);
  const [RecipeServings, setRecipeServings] = useState([0, 32767]);
  const [RecipeYield, setRecipeYield] = useState([0, 100]);
  const [IngredientsCount, setIngredientsCount] = useState([0, 39]);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/search`)
      .then(res => res.json())
      .then(resJson => {
        const recipesWithId = resJson.map((recipe) => ({ id: recipe.recipeID, ...recipe}));
        setData(recipesWithId);
      });
  }, []);

  const search = () => {
    fetch(`http://${config.server_host}:${config.server_port}/search?Name=${Name}` +
      `Description=${Description}` +
      `&CookTime_low=${CookTime[0]}&CookTime_high=${CookTime[11358720]}` +
      `&PrepTime_low=${PrepTime[0]}&PrepTime_high=${PrepTime[525600]}` +
      `&TotalTime_low=${TotalTime[0]}&TotalTime_high=${TotalTime[11394720]}` +
      `&SaturatedFatContent_low=${SaturatedFatContent[0]}&SaturatedFatContent_high=${SaturatedFatContent[841.9]}` +
      `&CholesterolContent_low=${CholesterolContent[0]}&CookTime_high=${CholesterolContent[9167.2]}` +
      `&SodiumContent_low=${SodiumContent[0]}&SodiumContent_high=${SodiumContent[704129.6]}` +
      `&CarbohydrateContent_low=${CarbohydrateContent[0]}&CarbohydrateContent_high=${CarbohydrateContent[4320.9]}` +
      `&FiberContent_low=${FiberContent[0]}&FiberContent_high=${FiberContent[835.7]}` +
      `&SugarContent_low=${SugarContent[0]}&SugarContent_high=${SugarContent[3623.9]}` +
      `&ProteinContent_low=${ProteinContent[0]}&ProteinContent_high=${ProteinContent[1802.9]}` +
      `&RecipeServings_low=${RecipeServings[0]}&RecipeServings_high=${RecipeServings[32767]}` +
      `&RecipeYield_low=${RecipeYield[0]}&RecipeYield_high=${RecipeYield[100]}` +
      `&IngredientsCount_low=${IngredientsCount[0]}&IngredientsCount_high=${IngredientsCount[39]}` 
    )
      .then(res => res.json())
      .then(resJson => {
        // DataGrid expects an array of objects with a unique id.
        // To accomplish this, we use a map with spread syntax (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
        const recipesWithId = resJson.map((recipe) => ({ id: recipe.recipeID, ...recipe}));
        setData(recipesWithId);
      });
  }

  const columns = [
    { field: 'Name', headerName: 'Name', width: 300, renderCell: (params) => (
        <Link onClick={() => setSelectedRecipeId(params.row.recipeID)}>{params.value}</Link>
    ) },
    { field: 'Description', headerName: 'Description' },
    { field: 'CookTime', headerName: 'CookTime' },
    { field: 'PrepTime', headerName: 'PrepTime' },
    { field: 'TotalTime', headerName: 'TotalTime' },
    { field: 'SaturatedFatContent', headerName: 'SaturatedFatContent' },
    { field: 'CholesterolContent', headerName: 'CholesterolContent' },
    { field: 'SodiumContent', headerName: 'SodiumContent' },
    { field: 'CarbohydrateContent', headerName: 'CarbohydrateContent' },
    { field: 'FiberContent', headerName: 'FiberContent' },
    { field: 'SugarContent', headerName: 'SugarContent' },
    { field: 'ProteinContent', headerName: 'ProteinContent' },
    { field: 'RecipeServings', headerName: 'RecipeServings' },
    { field: 'RecipeYield', headerName: 'RecipeYield' },
    { field: 'IngredientsCount', headerName: 'IngredientsCount' },
  ]

  return (
    <Container>
      {selectedRecipeId && <RecipeCard recipeID={selectedRecipeId} handleClose={() => selectedRecipeId(null)} />}
      <h2>Search Recipes</h2>
      <Grid container spacing={6}>
        <Grid item xs={9}>
          <TextField label='Name' value={Name} onChange={(e) => setName(e.target.value)} style={{ width: "100%" }}/>
        </Grid>
        <Grid item xs={9}>
          <TextField label='Description' value={Description} onChange={(e) => setDescription(e.target.value)} style={{ width: "100%" }}/>
        </Grid>
        <Grid item xs={4}>
          <p>Cook Time</p>
          <Slider
            value={CookTime}
            min={0}
            max={11358720}
            step={100}
            onChange={(e, newValue) => setCookTime(newValue)}
            valueLabelDisplay='auto'
            valueLabelFormat={value => <div>{formatDuration(value/(60))}</div>}
          />
        </Grid>
        <Grid item xs={4}>
          <p>Prep Time</p>
          <Slider
            value={PrepTime}
            min={0}
            max={525600}
            step={100}
            onChange={(e, newValue) => setPrepTime(newValue)}
            valueLabelDisplay='auto'
            valueLabelFormat={value => <div>{formatDuration(value/(60))}</div>}
          />
        </Grid>
        <Grid item xs={4}>
          <p>Total Time</p>
          <Slider
            value={TotalTime}
            min={0}
            max={11394720}
            step={100}
            onChange={(e, newValue) => setTotalTime(newValue)}
            valueLabelDisplay='auto'
            valueLabelFormat={value => <div>{formatDuration(value/(60))}</div>}
          />
        </Grid>
        <Grid item xs={3}>
          <p>Saturated Fat Content</p>
          <Slider
            value={SaturatedFatContent}
            min={0}
            max={841.9}
            step={100}
            onChange={(e, newValue) => setSaturatedFatContent(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={3}>
          <p>Carbohydrate Content</p>
          <Slider
            value={CarbohydrateContent}
            min={0}
            max={4320.9}
            step={100}
            onChange={(e, newValue) => setCarbohydrateContent(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={3}>
          <p>Sugar Content</p>
          <Slider
            value={SugarContent}
            min={0}
            max={3623.9}
            step={100}
            onChange={(e, newValue) => setSugarContent(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={3}>
          <p>Protein Content</p>
          <Slider
            value={ProteinContent}
            min={0}
            max={1802.9}
            step={100}
            onChange={(e, newValue) => setProteinContent(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={4}>
          <p>Recipe Servings</p>
          <Slider
            value={RecipeServings}
            min={0}
            max={32767}
            step={100}
            onChange={(e, newValue) => setRecipeServings(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={4}>
          <p>Recipe Yield</p>
          <Slider
            value={RecipeYield}
            min={0}
            max={100}
            step={10}
            onChange={(e, newValue) => setRecipeYield(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
        <Grid item xs={4}>
          <p>IngredientsCount</p>
          <Slider
            value={IngredientsCount}
            min={0}
            max={39}
            step={5}
            onChange={(e, newValue) => setIngredientsCount(newValue)}
            valueLabelDisplay='auto'
          />
        </Grid>
      </Grid>
      <Button onClick={() => search() } style={{ left: '50%', transform: 'translateX(-50%)' }}>
        Search
      </Button>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 25]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        autoHeight
      />
    </Container>
  );

}