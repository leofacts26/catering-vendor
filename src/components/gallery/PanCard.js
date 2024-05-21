import React, { useState } from 'react'
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const PanCard = () => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.user);

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

        // Fssai Photo
        // onUploadPancard,
        // onReUploadFssai

        // Pan card
        onUploadPancard,
        onReUploadPancard,

    } = useFetchPhotoGallery()

    // console.log(settings['vendor-encp']?.length && settings['vendor-encp']?.length > 0, "settings");

    // handleChange fn 
    const handleChange = (event) => {
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
                if (settings['vendor-encp']?.length && settings['vendor-encp']?.length > 0) {
                    await onReUploadPancard();
                } else {
                    await onUploadPancard();
                }
            } else {
                console.log("No photo URL to submit.");
            }
        } catch (error) {
            dispatch(setIsLoading(false))
        }
    };

    // crop 
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    // console.log(crop, "crop");
    // console.log(zoom, "zoom");

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        // console.log(croppedAreaPixels, "croppedAreaPixels");
        setCroppedAreaPixels(croppedAreaPixels);
    };


    // const [aspect, setAspect] = useState(1); // Initialize aspect ratio to 1:1

    // useEffect(() => {
    //     // Fetch the image dimensions and calculate the aspect ratio
    //     const image = new Image();
    //     image.src = photoURL;
    //     image.onload = () => {
    //         const imageAspectRatio = image.width / image.height;
    //         setAspect(imageAspectRatio);
    //     };
    // }, [photoURL]);

    return (
        <>
            <div>
                <Accordion className="faq-bg">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}> Pan Card </p>
                    </AccordionSummary>
                    <AccordionDetails>
                        {
                            settings['vendor-encp'] !== undefined ? (
                                <>
                                    {settings['vendor-encp']?.map((logo, index) => (
                                        <img
                                            className="img-fluid mx-auto gallery-round"
                                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
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

                        <p className="settings-small mt-1">Upload PAN Card</p>

                        <div className="mt-3 text-center">
                            <input
                                accept="image/*"
                                id="vendor-encp"
                                multiple
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleChange}
                            />
                            <label htmlFor="vendor-encp">
                                <Button variant="contained" component="span" className="cuisines-list-white-btn" disabled={isLoading}>
                                    {settings['vendor-encp']?.length && settings['vendor-encp']?.length > 0 ? 'Re Upload' : 'Upload'}
                                </Button>
                            </label>
                        </div>

                    </AccordionDetails>
                </Accordion>
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
                        <p>KFMBlkn</p >
                    )}
                </form>
            </BootstrapDialog>

            {/* Delete Image Modal */}
            {/* <DeleteModal
                DeleteModalopen={BrandDeleteopen}
                handleDeleteModalClose={handleBrandClose}
                onHandleRemoveModalLogo={onHandleRemoveBrandLogo} /> */}

        </>
    )
}

export default PanCard

const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`;
};