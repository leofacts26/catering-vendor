import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { api, BASE_URL } from '../../api/apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { datavalidationerror, successToast } from '../../utils';
import { setIsLoading } from '../../features/user/userSlice';
import useFetchPhotoGallery from '../../hooks/useFetchPhotoGallery';
import { useEffect, useState } from 'react';
import useGetVendor from '../../hooks/useGetVendor';

const CssTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: '2px solid #F0F1F3',
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
        padding: '10px 20px',
    },
}));



const initialState = {
    aadhar_card_number: '',
}

const AadharCardNumber = () => {
    const { settings, getVendorSettingsImages } = useFetchPhotoGallery()
    const { vendorBusinessProfile, vendorSettings, fetchVendorSettingsData } = useGetVendor();
    const { vendor_id } = useSelector((state) => state?.user?.vendorId)

    console.log(vendorSettings, "vendorSettings2333");


    const { accessToken } = useSelector((state) => state.user);
    const { isLoading } = useSelector((state) => state.user);
    const [initialValues, setInitialValues] = useState(initialState);
    const dispatch = useDispatch()

    const schema = Yup.object().shape({
        aadhar_card_number: Yup.string()
            .required('GSTN number is required.')
            .matches(/^\d{12}$/, 'GSTN number must be exactly 12 digits long.')
    });

    const handleSubmit = async (values, resetForm) => {
        const { aadhar_card_number } = values;
        const data = {
            aadhar_card_number: aadhar_card_number,
            vendor_id: vendor_id,
            company_id: vendorBusinessProfile?.company_id,
            phone_number: vendorBusinessProfile?.phone_number
        }

        dispatch(setIsLoading(true))
        try {
            const response = await api.post(`${BASE_URL}/vendor-update-enc`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            toast.success(successToast(response))
            resetForm(initialState);
            dispatch(setIsLoading(false))
            fetchVendorSettingsData()
            getVendorSettingsImages()
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        }

    }

    useEffect(() => {
        if (vendorSettings && vendorSettings.aadhar_card_number) {
            setInitialValues({ ...initialValues, aadhar_card_number: vendorSettings.aadhar_card_number });
        }
    }, [vendorSettings]);


    return (
        <div>
            <Accordion className="faq-bg" >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}> Aadhar Card Number </p>
                </AccordionSummary>
                <AccordionDetails>
                    <p className="settings-small mt-1">Enter your Aadhar Card number below</p>


                    <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={schema} onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}>
                        {({ values, errors, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit} className="px-4">
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <div>
                                        <CssTextField
                                            id="outlined-number"
                                            variant="outlined"
                                            className='mt-2'
                                            type='text'
                                            value={values.aadhar_card_number}
                                            onChange={handleChange}
                                            name="aadhar_card_number"
                                            style={{ width: '100%' }}
                                            InputLabelProps={{
                                                style: { color: '#777777', fontSize: '10px' },
                                            }}
                                            inputProps={{ maxLength: 12 }}
                                            InputProps={{
                                                style: {
                                                    borderRadius: '8px',
                                                    backgroundColor: '#FFFFFF',
                                                }
                                            }}
                                        />
                                        {errors.aadhar_card_number && <small className='text-danger mt-2 ms-1'>{errors.aadhar_card_number}</small>}
                                    </div>


                                    <Button type="submit" variant="contained" className="upload-btn">
                                        {isLoading ? 'Loading...' : 'Submit'}
                                    </Button>
                                </Stack>
                            </form>
                        )}
                    </Formik>


                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default AadharCardNumber