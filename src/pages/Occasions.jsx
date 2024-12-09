import React, { useEffect, useState } from 'react'
import TopHeader from '../components/global/TopHeader'
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Checkbox from '@mui/material/Checkbox';
import ExploreCaterersByOccasion from '../components/global/ExploreCaterersByOccasion';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useFetchOccasions from '../hooks/useFetchOccasions';
import LoaderSpinner from '../components/LoaderSpinner';
import { api, BASE_URL } from '../api/apiConfig';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Occasions = () => {
    const [open, setOpen] = React.useState(false);
    const { occasionsList, loading, setOccasionsList, fetchOccations } = useFetchOccasions();
    const { accessToken } = useSelector((state) => state?.user);
    const [isLoading, setIsLoading] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
        fetchOccations()
    };
    const handleClose = () => {
        setOpen(false);
        // fetchOccations()
    };

    const handleSelectChange = async (item) => {
        const updatedOccasions = occasionsList?.map((occasion) => {
            if (occasion?.id === item?.id) {
                return { ...occasion, selected: item?.selected === "1" ? "0" : "1" };
            } else {
                return occasion;
            }
        })
        setOccasionsList(updatedOccasions);
        return updatedOccasions
    }

    const handleOccasionSubmit = async (event) => {
        setIsLoading(true)
        event.preventDefault()
        const updatedOccasions = await handleSelectChange();

        const occasionsData = updatedOccasions?.map((updatedOccasion) => {
            return {
                occasion_id: parseInt(updatedOccasion?.id),
                selected: parseInt(updatedOccasion?.selected)
            }
        })

        const data = {
            occasions: JSON.stringify(occasionsData)
        }

        await api.post(`${BASE_URL}/update-vendor-occasion`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        toast.success("Occasions Updated Successfully...")
        setIsLoading(false)
        setOpen(false);
        fetchOccations()
    }

    return (
        <>
            <TopHeader title="Manage Your Occasions" description="Add your Occasions below" />

            <Container maxWidth="lg">
                <div className='card-box-shadow px-5 py-4 mb-4'>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <p className='cuisines-title'>Occasions You cater</p>
                        <Button variant="contained" className="add-inquiries-btn" onClick={handleClickOpen}>
                            {occasionsList?.filter((item) => item?.selected === "1").length > 0 ? '+ Update Occasions' : '+ Add Occasions'}
                        </Button>
                    </Stack>
                    <Divider
                        className='mt-4'
                        variant="middle"
                        style={{
                            backgroundColor: '#c33332',
                            margin: '0px'
                        }}
                    />


                    {loading ? (
                        <LoaderSpinner />
                    ) : (
                        <Box sx={{ flexGrow: 1 }} style={{ marginTop: '20px' }}>
                            <Grid container spacing={2}>
                                {occasionsList?.length >= 0 ? (
                                    occasionsList?.filter((item) => item?.selected === "1").length > 0 ? (
                                        occasionsList.filter((item) => item?.selected === "1").map((occasion, index) => (
                                            <ExploreCaterersByOccasion occasion={occasion} key={index} />
                                        ))
                                    ) : (
                                        <Grid item xs={12}>
                                            <h2 className='text-center'>No Occasions Found</h2>
                                        </Grid>
                                    )
                                ) : (
                                    <h2>No Occasions Found</h2>
                                )}
                            </Grid>
                        </Box>
                    )}

                </div>
            </Container>



            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="sm"
                fullWidth
            >
                <form onSubmit={handleOccasionSubmit} >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        <h2 className='cusines-modal-title'>Select Occasions from below</h2>
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers style={{ height: '70vh' }}>

                        {occasionsList?.length >= 0 && occasionsList?.map((occasion) => (
                            <div className='card-box-shadow px-1 py-1 mb-3' key={occasion?.id}>
                                <Stack direction="row" justifyContent="space-between" >
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <img className='occasions-modal-img' src={occasion?.file_name?.medium} alt="" />
                                        <p className='occasions-modal-desc'>{occasion?.name}</p>
                                    </Stack>
                                    <div>
                                        <Checkbox {...label} size="small" checked={occasion?.selected === "1"} onChange={() => handleSelectChange(occasion)} />
                                    </div>
                                </Stack>
                            </div>
                        ))}

                    </DialogContent>
                    <DialogActions style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'absolute', bottom: 0 }}>
                        <Button variant="contained" className="inquiries-btn" type="submit" onClick={handleClickOpen}>
                            {isLoading
                                ? 'Loading...'
                                : (occasionsList?.filter((item) => item?.selected === "1").length > 0
                                    ? '+ Update Occasions'
                                    : '+ Add Occasions')}                             </Button>
                    </DialogActions>
                </form>
            </BootstrapDialog>

        </>
    )
}

export default Occasions
