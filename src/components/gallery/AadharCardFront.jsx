import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { Cancel } from '@mui/icons-material';
import CropIcon from '@mui/icons-material/Crop';
import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    Slider,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Cropper from 'react-easy-crop';
import { setIsLoading } from '../../features/user/userSlice';
import DeleteModal from './DeleteModal';
import useFetchPhotoGallery from '../../hooks/useFetchPhotoGallery';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const AadharCardFront = () => {

    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.user);

    const [openBox, setOpenBox] = useState(false);
    const handleClickBoxOpen = () => {
        setOpenBox(true);
    };
    const handleBoxClose = () => {
        setOpenBox(false);
    };

    const {
        settings,
        photoURL,
        setPhotoURL,
        setCroppedAreaPixels,
        rotation,
        setRotation,
        handleBrandClose,
        handleClose,
        handleBrandClickOpen,
        handleClickOpen,
        BrandDeleteopen,
        open,

        // Aadhar Card 
        onUploadFrontAadharBanner,
        onReUploadFrontAadharBanner,
        onUploadFrontAadharLogo,
        onReUploadFrontAadharLogo,
        onHandleRemoveFrontAadharLogo,

    } = useFetchPhotoGallery(handleBoxClose)

    // crop 
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);



    // handleChange fn 
    const handleChange = (event) => {
        handleBoxClose()
        handleClickOpen()
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setPhotoURL(URL.createObjectURL(file));
    }


    // onHandleSubmit 
    const onHandleSubmit = async (event) => {
        event.preventDefault();
        dispatch(setIsLoading(true))
        try {
            if (photoURL) {
                if (settings['vendor-enca']?.length && settings['vendor-enca']?.length > 0) {
                    await onReUploadFrontAadharLogo();
                } else {
                    await onUploadFrontAadharLogo();
                }
            } else {
                console.log("No photo URL to submit.");
            }
        } catch (error) {
            dispatch(setIsLoading(false))
        }
    };


    const cropComplete = (croppedArea, croppedAreaPixels) => {
        // console.log(croppedAreaPixels, "croppedAreaPixels");
        setCroppedAreaPixels(croppedAreaPixels);
    };


    return (
        <>
            <div>
                {
                    settings['vendor-enca'] !== undefined ? (
                        <>
                            {settings['vendor-enca']?.map((logo, index) => (
                                <img
                                    className="img-fluid mx-auto"
                                    style={{ width: '100%', height: '200px', objectFit: 'contain', borderRadius: '8px' }}
                                    key={logo?.id}
                                    src={logo?.image_name[0]?.original}
                                    alt={`Brand Logo ${index}`}
                                />
                            ))}
                        </>
                    ) : (
                        <>
                            <Stack direction="row" justifyContent="center">
                                <img
                                    style={{ width: '200px' }}
                                    src={'https://img.freepik.com/premium-vector/illustration-upload_498740-5719.jpg'}
                                    alt={`Brand Logo`}
                                />
                            </Stack>
                        </>
                    )
                }

                <div className="mt-3 text-center">
                    <Stack direction="row" justifyContent="center">
                        <Button variant="contained" component="span" className="cuisines-list-white-btn" onClick={handleClickBoxOpen}>
                            Upload
                        </Button>

                        <Button onClick={handleBrandClickOpen} variant="contained" component="span" className="cuisines-list-white-btn"
                            disabled={isLoading || !(settings['vendor-enca']?.length && settings['vendor-enca']?.length > 0)}
                        >
                            Delete
                        </Button>
                    </Stack>
                </div>
            </div>


            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <form onSubmit={onHandleSubmit}>
                    {open ? (
                        <>
                            <DialogContent
                                dividers
                                sx={{
                                    background: '#333',
                                    position: 'relative',
                                    height: 400,
                                    width: 'auto',
                                    minWidth: { sm: 500 },
                                }}
                            >
                                <Cropper
                                    image={photoURL}
                                    crop={crop}
                                    zoom={zoom}
                                    rotation={rotation}
                                    aspect={3 / 2}
                                    onZoomChange={setZoom}
                                    onRotationChange={setRotation}
                                    onCropChange={setCrop}
                                    onCropComplete={cropComplete}
                                />
                            </DialogContent>
                            <DialogActions sx={{ flexDirection: 'column', mx: 3, my: 2 }}>
                                <Box sx={{ width: '100%', mb: 1 }}>
                                    <Box>
                                        <Typography>Zoom: {zoomPercent(zoom)}</Typography>
                                        <Slider
                                            valueLabelDisplay="auto"
                                            valueLabelFormat={zoomPercent}
                                            min={1}
                                            max={3}
                                            step={0.1}
                                            value={zoom}
                                            onChange={(e, zoom) => setZoom(zoom)}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography>Rotation: {rotation + '°'}</Typography>
                                        <Slider
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={360}
                                            value={rotation}
                                            onChange={(e, rotation) => setRotation(rotation)}
                                        />
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        startIcon={<Cancel />}
                                        onClick={() => handleClose()}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        disabled={isLoading}
                                        type='submit'
                                        variant="contained"
                                        startIcon={<CropIcon />}
                                    >
                                        {isLoading ? 'Loading...' : 'Crop'}
                                    </Button>
                                </Box>
                            </DialogActions>
                        </>
                    ) : (
                        <p>Main Banner Photo</p >
                    )}
                </form>
            </BootstrapDialog>



            {/* Delete Image Modal */}
            <DeleteModal
                DeleteModalopen={BrandDeleteopen}
                handleDeleteModalClose={handleBrandClose}
                onHandleRemoveModalLogo={onHandleRemoveFrontAadharLogo} />


            {/* open Box Modal  */}
            <React.Fragment>
                <BootstrapDialog
                    onClose={handleBoxClose}
                    aria-labelledby="customized-dialog-title"
                    open={openBox}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Upload Image
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleBoxClose}
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
                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} >

                            <div className="text-center">
                                {settings['vendor-enca']?.length && settings['vendor-enca']?.length > 0 ? (
                                    <>
                                        <input
                                            accept="image/*"
                                            id="onReUploadFrontAadharBanner"
                                            multiple
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={onReUploadFrontAadharBanner}
                                        />
                                        <label htmlFor="onReUploadFrontAadharBanner">

                                            <Button variant="contained" component="span" className="upload-btn" disabled={isLoading}>
                                                <CloudUploadIcon style={{ fontSize: '14px' }} className="me-2" /> Re Upload Image </Button>
                                        </label>
                                    </>
                                ) : (
                                    <>
                                        <input
                                            accept="image/*"
                                            id="onUploadFrontAadharBanner"
                                            multiple
                                            type="file"
                                            style={{ display: 'none' }}
                                            onChange={onUploadFrontAadharBanner}
                                        />
                                        <label htmlFor="onUploadFrontAadharBanner">
                                            <Button variant="contained" component="span" className="upload-btn" disabled={isLoading}>
                                                <CloudUploadIcon style={{ fontSize: '14px' }} className="me-2" />  Upload Image </Button>
                                        </label>
                                    </>
                                )}
                            </div>

                            <div> OR </div>

                            <div>
                                <input
                                    accept="image/*"
                                    id="mainbannerlogo"
                                    multiple
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleChange}
                                />
                                <label htmlFor="mainbannerlogo">
                                    <Button variant="contained" component="span" className="cuisines-list-white-btn" disabled={isLoading}>
                                        {settings['vendor-enca']?.length && settings['vendor-enca']?.length > 0 ? 'Re Upload Crop Image' : 'Upload Crop Image'}
                                    </Button>
                                </label>
                            </div>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleBoxClose}>
                            Close
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </React.Fragment>


        </>
    )
}

export default AadharCardFront

const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`;
};