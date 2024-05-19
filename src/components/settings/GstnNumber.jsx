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
    gstnNumber: '',
}

const GstnNumber = () => {
    const { settings, getVendorSettingsImages } = useFetchPhotoGallery()
    const { accessToken } = useSelector((state) => state.user);
    const { isLoading } = useSelector((state) => state.user);
    const [initialValues, setInitialValues] = useState(initialState);
    const dispatch = useDispatch()

    const schema = Yup.object().shape({
        gstnNumber: Yup.string()
            .required('GSTN number is required.')
            .matches(/^\d{15}$/, 'GSTN number must be exactly 15 digits long.')
    });

    const handleSubmit = async (values, resetForm) => {
        const { gstnNumber } = values;
        const data = {
            gstin_number: gstnNumber
        }

        dispatch(setIsLoading(true))
        try {
            const response = await api.post(`${BASE_URL}/update-vendor-gs`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            toast.success(successToast(response))
            resetForm(initialState);
            dispatch(setIsLoading(false))
            getVendorSettingsImages()
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        }

    }

    useEffect(() => {
        if (settings && settings.gstin_number) {
            setInitialValues({ ...initialValues, gstnNumber: settings.gstin_number });
        }
    }, [settings]);


    return (
        <div>
            <Accordion className="faq-bg" >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}> GSTIN Number </p>
                </AccordionSummary>
                <AccordionDetails>
                    <p className="settings-small mt-1">Enter your GSTIN number below</p>


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
                                            value={values.gstnNumber}
                                            onChange={handleChange}
                                            name="gstnNumber"
                                            style={{ width: '100%' }}
                                            InputLabelProps={{
                                                style: { color: '#777777', fontSize: '10px' },
                                            }}
                                            inputProps={{ maxLength: 15 }}
                                            InputProps={{
                                                style: {
                                                    borderRadius: '8px',
                                                    backgroundColor: '#FFFFFF',
                                                }
                                            }}
                                        />
                                        {errors.gstnNumber && <small className='text-danger mt-2 ms-1'>{errors.gstnNumber}</small>}
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

export default GstnNumber