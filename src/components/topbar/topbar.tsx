import { LoadingButton } from '@mui/lab';
import { Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { MAP_SETTINGS } from '../map/map.const';

const searchForTaxonId = async (searchName: string) => {
    const response = await fetch(`https://api.inaturalist.org/v1/taxa?order=desc&order_by=observations_count&q=${searchName}&is_active=true`);
    const data = await response.json();
    return data;
};

const getResults = async (taxonId: number) => {
    // TODO: flexible lat / lon / range
    const lat = MAP_SETTINGS.default.lat;
    const lon = MAP_SETTINGS.default.lon;
    const searchRadiusKm = 100;
    const response = await fetch(`https://api.inaturalist.org/v1/observations?order=desc&order_by=created_at&geo=true&mappable=true&photos=true&lat=${lat}&lng=${lon}&radius=${searchRadiusKm}&taxon_id=${taxonId}`)
    const data = await response.json();
    return data;
}

export const Topbar = () => {

    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [taxon, setTaxon] = useState<{name: string, id: number | null}>({name: '', id: null})

    return (
        <Container>
            <Grid 
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={4}>
                    {/* TODO: autocomplete */}
                    <Grid item xs={6}>
                        <TextField 
                            label="What are you looking for"
                            variant="outlined"
                            sx={{
                                width: '100%',
                                margin: '.5em',
                            }}
                            value={searchValue}
                            onChange={(event) => {
                                setSearchValue(event.target.value);
                            }} />
                    </Grid>
                    <Grid item xs={2} alignContent="center">
                        <LoadingButton 
                            variant="contained"
                            loading={loading}
                            onClick={async () => {
                                setLoading(true);
                                const taxonOptions = await searchForTaxonId(searchValue);
                                // TODO: fancier autocomplete options
                                if(taxonOptions?.results?.length){
                                    const result = taxonOptions.results[0];
                                    setTaxon({name: result.preferred_common_name, id: result.id});
                                    setSearchValue(result.preferred_common_name);
                                    const results = await getResults(result.id);
                                    // TODO: display on map (TODO TODO: incorporate REDUX)
                                    console.log(results);
                                }
                                setLoading(false);
                        }}>Search</LoadingButton>
                    </Grid>                        
            </Grid>
        </Container>
    )
}