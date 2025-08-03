import React, { useState } from 'react'
import TopHeader from '../components/global/TopHeader'
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';

import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import useFetchCuisines from '../hooks/useFetchCuisines';
import LoaderSpinner from '../components/LoaderSpinner';
import { Box, Grid } from '@mui/material';
import { api, BASE_URL } from '../api/apiConfig';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const CssTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '2px solid #F0F1F3',
            borderRadius: '8px'
        },
        '&:hover fieldset': {
            border: '2px solid #F0F1F3',
        },
        '&.Mui-focused fieldset': {
            border: '2px solid #c33332',
        },
    },
    '& input': {
        border: 'none',
        fontSize: '16px',
        padding: '10px 0px',
    },
}));


const CssTextFieldMultiSelect = styled(TextField)(({ theme }) => ({
    '& .MuiInputLabel-root': { // Style for the label
        fontSize: '12px', // Set the font size for the label
        color: '#777777',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '2px solid #F0F1F3',
            borderRadius: '12px',
        },
        '&:hover fieldset': {
            border: '2px solid #F0F1F3',
        },
        '&.Mui-focused fieldset': {
            border: '2px solid #c33332',
        },
    },
    '& input': {
        border: 'none',
        padding: '0px 0px',
        height: '10px'
    },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));




const Cuisines = () => {

    const { cuisinesList, loading, setCuisinesList, fetchCuisines } = useFetchCuisines()
    // const [selectedOptions, setSelectedOptions] = useState({});
    const [open, setOpen] = React.useState(false);
    const { accessToken } = useSelector((state) => state?.user);
    const [isLoading, setIsLoading] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleAutocompleteChange = (event, value, parentItem) => {
        const updatedCuisinesList = cuisinesList.map(cuisine => {
            if (cuisine.id === parentItem.id) {
                return {
                    ...cuisine,
                    children: cuisine.children.map(child => ({
                        ...child,
                        selected: value.includes(child.name) ? "1" : "0"
                    }))
                };
            }
            return cuisine;
        });
        setCuisinesList(updatedCuisinesList);
    };

    const handleCheckboxToggle = (event, option, parentItem) => {
        const updatedCuisinesList = cuisinesList.map(cuisine => {
            if (cuisine.id === parentItem.id) {
                if (option === 'All') {
                    const allSelected = parentItem.children.every(child => child.selected === "1");
                    return {
                        ...cuisine,
                        children: cuisine.children.map(child => ({
                            ...child,
                            selected: allSelected ? "0" : "1"
                        }))
                    };
                }
                return {
                    ...cuisine,
                    children: cuisine.children.map(child =>
                        child.name === option ? { ...child, selected: child.selected === "1" ? "0" : "1" } : child
                    )
                };
            }
            return cuisine;
        });
        setCuisinesList(updatedCuisinesList);
    };


    const handleSubmit = async (event) => {
        setIsLoading(true)
        event.preventDefault();
        // const updatedOccasions = await handleAutocompleteChange();

        const cuisinesData = cuisinesList?.map((item) => {
            return item.children.map((childItem) => {
                return {
                    cuisine_id: parseInt(childItem?.id),
                    selected: parseInt(childItem?.selected)
                }
            })
        }).flat()

        const data = {
            cuisines: JSON.stringify(cuisinesData)
        }

        // console.log(data, "data");

        await api.post(`${BASE_URL}/update-vendor-cuisine`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        toast.success("Cuisines Updated Successfully...", { duration: 5000 })
        setIsLoading(false)
        setOpen(false);
        fetchCuisines()
    };

    // console.log(cuisinesList, "cuisinesList"); 

    return (
        <>
            <TopHeader title="Manage Your Cuisines" description="Add your Cuisines below" />

            <Container maxWidth="lg">
                <div className='card-box-shadow px-5 py-4 mb-4'>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <p className='cuisines-title'>Cuisines You cater</p>
                        <Button variant="contained" className="add-inquiries-btn" onClick={handleClickOpen}>
                            {cuisinesList?.some(item => item.children.some(childItem => childItem.selected === "1"))
                                ? '+ Update Cuisines'
                                : '+ Add Cuisines'}
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
                        <Stack className='mt-4'>
                            {cuisinesList?.length >= 0 && cuisinesList?.map((item) => (
                                <Box sx={{ flexGrow: 1 }} key={item?.id}>
                                    {item.children.some(childItem => childItem.selected === "1") ? (
                                        <>
                                            <h6 className='top-header-desc'> {item?.name}</h6>
                                            <Grid container spacing={2} className='mt-1 mb-3' marginLeft={{ marginLeft: '40px' }}>
                                                {item.children.filter(childItem => childItem.selected === "1").map((childItem) => (
                                                    <Stack direction="row" flexWrap="wrap" spacing={2} key={childItem.id}>
                                                        <Button variant="contained" className="cuisines-list-btn mb-2 me-2"> {childItem?.name} </Button>
                                                    </Stack>
                                                ))}
                                            </Grid>
                                        </>
                                    ) : null}
                                </Box>
                            ))}
                            {!cuisinesList.some(item => item.children.some(childItem => childItem.selected === "1")) && (
                                <div className="error-box">
                                    <h2 className='text-center'>No Cuisines Found</h2>
                                </div>
                            )}
                        </Stack>
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
                <form onSubmit={handleSubmit}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        <h2 className='cusines-modal-title'>Choose Your Cuisines From the List</h2>
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
                    <DialogContent dividers>
                        <Grid container spacing={2}>
                            {cuisinesList?.map((item) => (
                                item.children.length > 0 && (
                                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={item.id}>
                                        <Autocomplete
                                            multiple
                                            id="checkboxes-tags-demo"
                                            options={['All', ...item.children.map(child => child.name)]}
                                            disableCloseOnSelect
                                            getOptionLabel={(option) => option}
                                            renderOption={(props, option, { selected }) => (
                                                <li {...props} style={{ fontSize: '10px' }} onClick={(event) => handleCheckboxToggle(event, option, item)}>
                                                    <Checkbox
                                                        style={{ marginRight: 8, fontSize: '10px' }}
                                                        checked={
                                                            option === 'All'
                                                                ? item.children.every(child => child.selected === "1")
                                                                : item.children.some(child => child.name === option && child.selected === "1")
                                                        }
                                                    />
                                                    {option}
                                                </li>
                                            )}
                                            renderTags={(value, getTagProps) =>
                                                value.map((option, index) => (
                                                    <li key={index} {...getTagProps({ index })} style={{ fontSize: '10px' }}>
                                                        {option}
                                                    </li>
                                                ))
                                            }
                                            style={{ width: '100%' }}
                                            renderInput={(params) => (
                                                <CssTextFieldMultiSelect
                                                    label={item?.name}
                                                    {...params}
                                                />
                                            )}
                                            onChange={(event, value) => handleAutocompleteChange(event, value, item)}
                                            value={item.children.filter(child => child.selected === "1").map(child => child.name)}
                                        />
                                    </Grid>
                                )
                            ))}
                        </Grid>
                    </DialogContent>
                    <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="submit" variant="contained" className="inquiries-btn" disabled={isLoading}> {isLoading ? 'Loading...' : 'Submit'} </Button>
                    </DialogActions>
                </form>
            </BootstrapDialog>

        </>
    )
}

export default Cuisines
