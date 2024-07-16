import React, { useEffect, useState } from 'react'
import { api, BASE_URL } from '../api/apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { datavalidationerror, successToast } from '../utils';
import { setIsLoading } from '../features/user/userSlice';
import getCroppedImg from '../components/gallery/cropImage';
import getSettingsCroppedImg from '../components/gallery/settingsCropImage';



const useFetchPhotoGallery = (handleBoxClose) => {
    const [gallery, setGallery] = useState([]);
    const [settings, setSettings] = useState([]);
    const { accessToken, multiImageDelete } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [photoURL, setPhotoURL] = useState(false)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [rotation, setRotation] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [BrandDeleteopen, setBrandDeleteopen] = React.useState(false);
    const [uploadTrue, setUploadTrue] = useState(false)


    const handleBrandClose = () => {
        setBrandDeleteopen(false);
    };
    const handleClose = () => {
        setOpen(false);
        setUploadTrue(false)
    };

    const handleBrandClickOpen = () => {
        setBrandDeleteopen(true);
    };
    const handleClickOpen = () => {
        setOpen(true);
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

    // get-vendor-settings-info
    const getVendorSettingsImages = async () => {
        dispatch(setIsLoading(true))
        try {
            const response = await api.get(`${BASE_URL}/get-vendor-settings-info`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            setSettings(response?.data?.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    useEffect(() => {
        getVendorSettingsImages()
    }, [])


    // Upload Brand Logo 

    const onUploadBoxBrand = async (event) => {
        const formData = new FormData();
        formData.append('id', '');
        formData.append('image', event.target.files[0]);
        formData.append('action_type', 'insert')

        dispatch(setIsLoading(true))
        try {
            toast.loading('Uploading Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-brand-logo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleBoxClose()
        }
    }

    const onReUploadBoxBrand = async (event) => {
        const formData = new FormData();
        formData.append('id', parseInt(gallery['vendor-brand-logo'][0]?.id && gallery['vendor-brand-logo'][0]?.id));
        formData.append('image', event.target.files[0]);
        formData.append('action_type', 'replace')

        dispatch(setIsLoading(true))
        try {
            toast.loading('Uploading Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-brand-logo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleBoxClose()
        }
    }

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
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
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
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
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
            toast.success(successToast(response));
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error));
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleBrandClose()
        }
    }

    // ----------------------------------------------------------------START------------------------------------------------------------------------------

    // Main Banner Photo
    const onUploadBoxBanner = async (event) => {
        const formData = new FormData();
        formData.append('id', '');
        formData.append('image', event.target.files[0]);
        formData.append('action_type', 'insert')

        dispatch(setIsLoading(true))
        try {
            toast.loading('Uploading Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-banner-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleBoxClose()
        }
    }

    const onReUploadBoxBanner = async (event) => {
        const formData = new FormData();
        formData.append('id', parseInt(gallery['vendor-banner'][0]?.id && gallery['vendor-banner'][0]?.id));
        formData.append('image', event.target.files[0]);
        formData.append('action_type', 'replace')

        dispatch(setIsLoading(true))
        try {
            toast.loading('Uploading Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-banner-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleBoxClose()
        }
    }


    const onUploadBannerLogo = async (event) => {
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
            toast.loading('Uploading Banner logo...');
            const response = await api.post(`${BASE_URL}/upload-vendor-banner-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleClose();
            handleBrandClose()
        }
    }

    const onReUploadBannerLogo = async (event) => {
        dispatch(setIsLoading(true))
        const { file, url } = await getCroppedImg(
            photoURL,
            croppedAreaPixels,
            rotation
        );
        const formData = new FormData();
        formData.append('id', parseInt(gallery['vendor-banner'][0]?.id && gallery['vendor-banner'][0]?.id));
        formData.append('image', file);
        formData.append('action_type', 'replace')

        try {
            toast.loading('Re Uploading Banner logo...');
            const response = await api.post(`${BASE_URL}/upload-vendor-banner-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleClose();
            handleBrandClose()
        }
    }

    const onHandleRemoveBannerLogo = async () => {
        const formData = new FormData();
        formData.append('id', parseInt(gallery['vendor-banner'][0]?.id && gallery['vendor-banner'][0]?.id));
        formData.append('action_type', 'remove')

        dispatch(setIsLoading(true))
        try {
            toast.loading('Removing Banner logo...');
            const response = await api.post(`${BASE_URL}/upload-vendor-banner-image`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorImages();
            toast.success(successToast(response));
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error));
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleBrandClose()
        }
    }

    // ----------------------------------------------------------------END------------------------------------------------------------------------------

    // Package / Menu 
    const onUploadBannerPackageMenu = async (event) => {
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
            toast.loading('Uploading Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-menu-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleClose();
            handleBrandClose()
        }
    }

    const onReUploadPackageMenu = async () => {
        dispatch(setIsLoading(true))
        const { file, url } = await getCroppedImg(
            photoURL,
            croppedAreaPixels,
            rotation
        );
        const formData = new FormData();
        formData.append('id', parseInt(multiImageDelete?.id && multiImageDelete?.id));
        formData.append('image', file);
        formData.append('action_type', 'replace')
        try {
            toast.loading('Uploading Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-menu-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleClose();
            handleBrandClose()
        }
    }

    const onHandleRemovePackageMenu = async () => {
        const formData = new FormData();
        formData.append('id', parseInt(multiImageDelete?.id && multiImageDelete?.id));
        formData.append('action_type', 'remove')

        dispatch(setIsLoading(true))
        try {
            toast.loading('Removing Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-menu-image`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            toast.success(successToast(response));
            getVendorImages();
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error));
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleBrandClose()
        }
    }

    // other service 
    const onUploadService = async (event) => {
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
            toast.loading('Uploading Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-service-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleClose();
            handleBrandClose()
        }
    }

    const onReUploadEditService = async () => {
        dispatch(setIsLoading(true))
        const { file, url } = await getCroppedImg(
            photoURL,
            croppedAreaPixels,
            rotation
        );
        const formData = new FormData();
        formData.append('id', parseInt(multiImageDelete?.id && multiImageDelete?.id));
        formData.append('image', file);
        formData.append('action_type', 'replace')
        try {
            toast.loading('Uploading Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-service-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleClose();
            handleBrandClose()
        }
    }

    const onHandleRemoveService = async () => {
        const formData = new FormData();
        formData.append('id', parseInt(multiImageDelete?.id && multiImageDelete?.id));
        formData.append('action_type', 'remove')

        dispatch(setIsLoading(true))
        try {
            toast.loading('Removing Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-service-image`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            toast.success(successToast(response));
            getVendorImages();
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error));
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleBrandClose()
        }
    }

    // other photos 
    const onUploadOtherPhotos = async () => {
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
            toast.loading('Uploading Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-other-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleClose();
            handleBrandClose()
        }
    }

    const onReUploadEditOtherPhotos = async () => {
        dispatch(setIsLoading(true))
        const { file, url } = await getCroppedImg(
            photoURL,
            croppedAreaPixels,
            rotation
        );
        const formData = new FormData();
        formData.append('id', parseInt(multiImageDelete?.id && multiImageDelete?.id));
        formData.append('image', file);
        formData.append('action_type', 'replace')
        try {
            toast.loading('Uploading Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-other-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleClose();
            handleBrandClose()
        }
    }

    const onHandleRemoveOtherPhotos = async () => {
        const formData = new FormData();
        formData.append('id', parseInt(multiImageDelete?.id && multiImageDelete?.id));
        formData.append('action_type', 'remove')

        dispatch(setIsLoading(true))
        try {
            toast.loading('Removing Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-other-image`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            toast.success(successToast(response));
            getVendorImages();
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error));
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleBrandClose()
        }
    }

    // Aadhar card 
    const onUploadAdharCard = async (event) => {
        const formData = new FormData();
        formData.append('id', '');
        formData.append('image', event.target.files[0]);
        formData.append('action_type', 'insert')

        dispatch(setIsLoading(true))
        try {
            toast.loading('Uploading Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-enca`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorSettingsImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
        }
    }

    const onReUploadAdharCard = async (event) => {
        const formData = new FormData();
        formData.append('id', parseInt(settings['vendor-enca'][0]?.id && settings['vendor-enca'][0]?.id));
        formData.append('image', event.target.files[0]);
        formData.append('action_type', 'replace')

        dispatch(setIsLoading(true))
        try {
            toast.loading('Uploading Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-enca`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorSettingsImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
        }
    }

    const onUploadAdharCardBack = async (event) => {
        const formData = new FormData();
        formData.append('id', '');
        formData.append('image', event.target.files[0]);
        formData.append('action_type', 'insert')

        dispatch(setIsLoading(true))
        try {
            toast.loading('Uploading Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-enca-back`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorSettingsImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
        }
    }

    const onReUploadAdharCardBack = async (event) => {
        const formData = new FormData();
        formData.append('id', parseInt(settings['vendor-enca-back'][0]?.id && settings['vendor-enca-back'][0]?.id));
        formData.append('image', event.target.files[0]);
        formData.append('action_type', 'replace')

        dispatch(setIsLoading(true))
        try {
            toast.loading('Uploading Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-enca-back`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorSettingsImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
        }
    }




    // Pan Card 
    const onUploadPancard = async (event) => {
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
            toast.loading('Removing Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-encp`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorSettingsImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleClose();
        }
    }

    const onReUploadPancard = async (event) => {
        dispatch(setIsLoading(true))
        const { file, url } = await getSettingsCroppedImg(
            photoURL,
            croppedAreaPixels,
            rotation
        );
        const formData = new FormData();
        formData.append('id', parseInt(settings['vendor-encp'][0]?.id && settings['vendor-encp'][0]?.id));
        formData.append('image', file);
        formData.append('action_type', 'replace')
        try {
            toast.loading('Uploading Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-encp`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorSettingsImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleClose();
        }
    }


    // fssai Licence
    // const onUploadFssai = async (event) => {
    //     dispatch(setIsLoading(true))
    //     const { file, url } = await getCroppedImg(
    //         photoURL,
    //         croppedAreaPixels,
    //         rotation
    //     );
    //     const formData = new FormData();
    //     formData.append('id', '');
    //     formData.append('image', file);
    //     formData.append('action_type', 'insert')
    //     try {
    //         toast.loading('Uploading Image...');
    //         const response = await api.post(`${BASE_URL}/upload-vendor-encf`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 Authorization: `Bearer ${accessToken}`,
    //             },
    //         });
    //         getVendorSettingsImages();
    //         toast.success(successToast(response))
    //     } catch (error) {
    //         console.log(error);
    //         toast.error(datavalidationerror(error))
    //     } finally {
    //         dispatch(setIsLoading(false))
    //         toast.dismiss();
    //         handleClose();
    //     }
    // }

    // const onReUploadFssai = async (event) => {
    //     dispatch(setIsLoading(true))
    //     const { file, url } = await getSettingsCroppedImg(
    //         photoURL,
    //         croppedAreaPixels,
    //         rotation
    //     );
    //     const formData = new FormData();
    //     formData.append('id', parseInt(settings['vendor-encf'][0]?.id && settings['vendor-encf'][0]?.id));
    //     formData.append('image', file);
    //     formData.append('action_type', 'replace')

    //     try {
    //         toast.loading('Uploading Image...');
    //         const response = await api.post(`${BASE_URL}/upload-vendor-encf`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 Authorization: `Bearer ${accessToken}`,
    //             },
    //         });
    //         getVendorSettingsImages();
    //         toast.success(successToast(response))
    //     } catch (error) {
    //         console.log(error);
    //         toast.error(datavalidationerror(error))
    //     } finally {
    //         dispatch(setIsLoading(false))
    //         toast.dismiss();
    //         handleClose();
    //     }
    // }





    // FSSAI START 
    // Main Banner Photo
    const onUploadFssaiBanner = async (event) => {
        const formData = new FormData();
        formData.append('id', '');
        formData.append('image', event.target.files[0]);
        formData.append('action_type', 'insert')

        dispatch(setIsLoading(true))
        try {
            toast.loading('Uploading Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-encf`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorSettingsImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleBoxClose()
        }
    }

    const onReUploadFssaiBanner = async (event) => {
        const formData = new FormData();
        formData.append('id', parseInt(settings['vendor-encf'][0]?.id && settings['vendor-encf'][0]?.id));
        formData.append('image', event.target.files[0]);
        formData.append('action_type', 'replace')

        dispatch(setIsLoading(true))
        try {
            toast.loading('Uploading Image...');
            const response = await api.post(`${BASE_URL}/upload-vendor-encf`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorSettingsImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleBoxClose()
        }
    }


    const onUploadFssaiLogo = async (event) => {
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
            toast.loading('Uploading Banner logo...');
            const response = await api.post(`${BASE_URL}/upload-vendor-encf`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorSettingsImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleClose();
            handleBrandClose()
        }
    }

    const onReUploadFssaiLogo = async (event) => {
        dispatch(setIsLoading(true))
        const { file, url } = await getCroppedImg(
            photoURL,
            croppedAreaPixels,
            rotation
        );
        const formData = new FormData();
        formData.append('id', parseInt(settings['vendor-encf'][0]?.id && settings['vendor-encf'][0]?.id));
        formData.append('image', file);
        formData.append('action_type', 'replace')

        try {
            toast.loading('Re Uploading Banner logo...');
            const response = await api.post(`${BASE_URL}/upload-vendor-encf`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorSettingsImages();
            toast.success(successToast(response))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleClose();
            handleBrandClose()
        }
    }

    const onHandleRemoveFssaiLogo = async () => {
        const formData = new FormData();
        formData.append('id', parseInt(settings['vendor-encf'][0]?.id && settings['vendor-encf'][0]?.id));
        formData.append('action_type', 'remove')

        dispatch(setIsLoading(true))
        try {
            toast.loading('Removing Banner logo...');
            const response = await api.post(`${BASE_URL}/upload-vendor-encf`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            getVendorSettingsImages();
            toast.success(successToast(response));
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error));
        } finally {
            dispatch(setIsLoading(false))
            toast.dismiss();
            handleBrandClose()
        }
    }




    return {
        gallery,
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

        setUploadTrue,
        uploadTrue,


        // Brand Logo 
        onUploadBoxBrand,
        onReUploadBoxBrand,
        onUploadBrandLogo,
        onReUploadBrandLogo,
        onHandleRemoveBrandLogo,

        // banner Logo
        onUploadBoxBanner,
        onReUploadBoxBanner,
        onUploadBannerLogo,
        onReUploadBannerLogo,
        onHandleRemoveBannerLogo,

        // Package / Menu 
        onUploadBannerPackageMenu,
        onReUploadPackageMenu,
        onHandleRemovePackageMenu,

        // Service photos 
        onUploadService,
        onReUploadEditService,
        onHandleRemoveService,

        // other photos 
        onUploadOtherPhotos,
        onReUploadEditOtherPhotos,
        onHandleRemoveOtherPhotos,

        // Aadhar Card 
        onUploadAdharCard,
        onReUploadAdharCard,

        onUploadAdharCardBack,
        onReUploadAdharCardBack,

        // Pan card
        onUploadPancard,
        onReUploadPancard,

        // Fssai Licence
        // onUploadFssai,
        // onReUploadFssai,
        onUploadFssaiBanner,
        onReUploadFssaiBanner,
        onUploadFssaiLogo,
        onReUploadFssaiLogo,
        onHandleRemoveFssaiLogo,

        getVendorSettingsImages

    }
}

export default useFetchPhotoGallery