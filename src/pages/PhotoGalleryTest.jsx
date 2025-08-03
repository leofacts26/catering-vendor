import React, { useEffect, useState } from 'react'
import TopHeader from '../components/global/TopHeader'
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { Cancel, Try } from '@mui/icons-material';
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
import { setIsLoading } from '../features/user/userSlice';
import toast from 'react-hot-toast';
import { api, BASE_URL } from '../api/apiConfig';
import { datavalidationerror, successToast } from '../utils';
import getCroppedImg from '../components/gallery/cropImage';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const PhotoGalleryTest = () => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.user);
    const { accessToken } = useSelector((state) => state.user);
    const [gallery, setGallery] = useState([]);
    const [photoURL, setPhotoURL] = useState(false)

    const [open, setOpen] = React.useState(false);
    // const [openCrop, setOpenCrop] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // handleChange fn 
    const handleChange = (event) => {
        handleClickOpen()
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setPhotoURL(URL.createObjectURL(file));
    }

    // Brand Logo 
    const onUploadBrandLogo = async () => {
        dispatch(setIsLoading(true))

        const { file, url } = await getCroppedImg(
            photoURL,
            croppedAreaPixels,
            rotation
        );

        const formData = new FormData();
        formData.append('id', '');
        formData.append('image', file);
        formData.append('action_type', 'insert')

        try {
            toast.loading('Uploading brand logo...');
            const response = await api.post(`${BASE_URL}/upload-vendor-brand-logo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorImages();
            toast.success(successToast(response), { duration: 5000 })
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error), { duration: 5000 })
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleClose();
        }
    }

    const onReUploadBrandLogo = async (event) => {

        dispatch(setIsLoading(true))

        const { file, url } = await getCroppedImg(
            photoURL,
            croppedAreaPixels,
            rotation
        );

        const formData = new FormData();
        formData.append('id', parseInt(gallery['vendor-brand-logo'][0]?.id && gallery['vendor-brand-logo'][0]?.id));
        formData.append('image', file);
        formData.append('action_type', 'replace')

        try {
            toast.loading('Re Uploading brand logo...');
            const response = await api.post(`${BASE_URL}/upload-vendor-brand-logo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorImages();
            toast.success(successToast(response), { duration: 5000 })
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error), { duration: 5000 })
        } finally {
            toast.dismiss();
            dispatch(setIsLoading(false))
            handleClose();
        }
    }

    const onHandleRemoveBrandLogo = async () => {
        const formData = new FormData();
        formData.append('id', parseInt(gallery['vendor-brand-logo'][0]?.id && gallery['vendor-brand-logo'][0]?.id));
        formData.append('action_type', 'remove')

        dispatch(setIsLoading(true))
        try {
            toast.loading('Removing brand logo...');
            const response = await api.post(`${BASE_URL}/upload-vendor-brand-logo`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorImages();
            toast.success(successToast(response), { duration: 5000 });
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error), { duration: 5000 });
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
        }
    }

    // onHandleSubmit 
    const onHandleSubmit = async (event) => {
        event.preventDefault();
        dispatch(setIsLoading(true))
        try {
            if (photoURL) {
                if (gallery['vendor-brand-logo']?.length && gallery['vendor-brand-logo']?.length > 0) {
                    await onReUploadBrandLogo();
                } else {
                    await onUploadBrandLogo();
                }
            } else {
                console.log("No photo URL to submit.");
            }
        } catch (error) {
            dispatch(setIsLoading(false))
        }
    };


    // get vendor images 
    const getVendorImages = async () => {
        dispatch(setIsLoading(true))
        try {
            const response = await api.get(`${BASE_URL}/get-vendor-gallery-images`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            setGallery(response?.data?.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    useEffect(() => {
        getVendorImages()
    }, [])

    // crop 
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };


    return (
        <>
            <TopHeader title="Manage All Photos" description="Edit and Upload your Business photos below" />

            <Container maxWidth="lg">
                <div className='card-box-shadow px-5 py-4 mb-4'>

                    {/* Brand Logo  */}
                    <div className="mb-4 mt-2">
                        <p className='cuisines-title text-center'>Brand Logo</p>
                        <Divider
                            className='mt-2 mb-5'
                            variant="middle"
                            style={{
                                backgroundColor: '#c33332',
                                margin: '0px',
                                width: '35%',
                                margin: '0px auto'
                            }}
                        />
                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                            {
                                gallery['vendor-brand-logo'] !== undefined ? (
                                    <>
                                        {gallery['vendor-brand-logo']?.map((logo, index) => (
                                            <img
                                                className="gallery-round"
                                                key={logo?.id}
                                                src={logo?.image_name[0]?.medium}
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

                            <input
                                accept="image/*"
                                id="contained-button-file"
                                multiple
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleChange}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" component="span" className="cuisines-list-white-btn" disabled={isLoading}>
                                    {gallery['vendor-brand-logo']?.length && gallery['vendor-brand-logo']?.length > 0 ? 'Re Upload' : 'Upload'}
                                </Button>
                            </label>


                            <Button onClick={onHandleRemoveBrandLogo} variant="contained" component="span" className="cuisines-list-white-btn" disabled={isLoading}>
                                Delete
                            </Button>

                        </Stack>
                    </div>

                </div>
            </Container>

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
                                    aspect={1}
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

        </>
    )
}

export default PhotoGalleryTest

const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`;
};