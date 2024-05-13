import React, { useState } from 'react'
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
import { setIsLoading, setMultiImageDelete } from '../../features/user/userSlice';
import DeleteModal from './DeleteModal';
import useFetchPhotoGallery from '../../hooks/useFetchPhotoGallery';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import toast from 'react-hot-toast';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const OtherPhotos = () => {

    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.user);

    const {
        gallery,
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

        setUploadTrue,
        uploadTrue,


         // other photos 
         onUploadOtherPhotos,
         onReUploadEditOtherPhotos,
         onHandleRemoveOtherPhotos,

    } = useFetchPhotoGallery()

    // handleChange fn 
    const handleChange = (event) => {

        if (gallery['vendor-other']?.length && gallery['vendor-other']?.length >= 10) {
            toast.error("You can add only 10 Package Images")
            return
        }


        handleClickOpen()
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setPhotoURL(URL.createObjectURL(file));
    }

    console.log(uploadTrue, "uploadTrue uploadTrue");

    // onHandleSubmit 
    const onHandleSubmit = async (event) => {
        event.preventDefault();
        dispatch(setIsLoading(true))
        try {
            if (photoURL) {
                if (!uploadTrue) {
                    await onReUploadEditOtherPhotos();
                } else {
                    await onUploadOtherPhotos();
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


    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    return (
        <>
            <div className="mt-2">
                <p className='cuisines-title text-center'> Other Photos </p>
                <Divider
                    className='mt-2 mb-4'
                    variant="middle"
                    style={{
                        backgroundColor: '#c33332',
                        margin: '0px',
                        width: '35%',
                        margin: '0px auto'
                    }}
                />
                <Stack direction="row" justifyContent="start" flexWrap="wrap" alignItems="center" spacing={0}>
                    {
                        gallery['vendor-other'] !== undefined ? (
                            <>
                                {gallery['vendor-other'].map((item, index) => (
                                    <div className="pg-shadow me-2">
                                        <img key={index} src={item?.image_name[0]?.medium} alt={`Package Menu ${index}`} className="img-fluid pg-gallery-img" />
                                        <div className="pg-img-icons">
                                            <Stack direction="row" justifyContent="space-between" className="py-2 px-2">
                                                <>
                                                    <input
                                                        accept="image/*"
                                                        id="onReUploadEditOtherPhotos"
                                                        multiple
                                                        type="file"
                                                        style={{ display: 'none' }}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            setUploadTrue(false)
                                                            dispatch(setMultiImageDelete(item));
                                                        }}
                                                    />
                                                    <label htmlFor="onReUploadEditOtherPhotos">
                                                        <span variant="contained" component="span" disabled={isLoading}>
                                                            {<EditIcon className="pg-img-icon" />}
                                                        </span>
                                                    </label>
                                                </>

                                                <span variant="contained" component="span" disabled={isLoading} onClick={() => {
                                                    handleBrandClickOpen()
                                                    setUploadTrue(true)
                                                    dispatch(setMultiImageDelete(item))
                                                }}>
                                                    {<DeleteIcon className="pg-img-icon" />}
                                                </span>
                                            </Stack>
                                        </div>
                                    </div>
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

                    <>
                        <input
                            accept="image/*"
                            id="onUploadOtherPhotos"
                            multiple
                            type="file"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                                handleChange(e);
                                setUploadTrue(true)
                            }}
                        />
                        <label htmlFor="onUploadOtherPhotos">

                            <Button variant="contained" component="span" className="cuisines-list-white-btn" disabled={isLoading}>
                                {<AddIcon />}
                            </Button>


                        </label>
                    </>
                </Stack>
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
            <DeleteModal
                DeleteModalopen={BrandDeleteopen}
                handleDeleteModalClose={handleBrandClose}
                onHandleRemoveModalLogo={onHandleRemoveOtherPhotos} />

        </>
    )
}

export default OtherPhotos


const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`;
};