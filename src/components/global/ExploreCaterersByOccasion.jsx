import Grid from '@mui/material/Grid';

const ExploreCaterersByOccasion = ({ occasion }) => {
    return (
        <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
            <div className="explore-cator-box">
                <img src={occasion?.file_name?.medium} alt="" className="img-fluid caterers-occasion-img image-shadow" />
                <h4 className='text-center caterers-occasion-title'>{occasion?.name}</h4>
            </div>
        </Grid>
    )
}

export default ExploreCaterersByOccasion