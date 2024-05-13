
import TopHeader from "../components/global/TopHeader"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { setIsLoading } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { api, BASE_URL } from "../api/apiConfig";
import toast from "react-hot-toast";
import { datavalidationerror, successToast } from "../utils";

const initialState = {
    issue: '',
    comments: '',
}

const RaiseTicket = () => {

    const { accessToken, isLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    // const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // const handleTogglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    const CssTextField = styled(TextField)(({ theme }) => ({
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: '2px solid #e0e3e7',
            },
            '&:hover fieldset': {
                border: '2px solid #e0e3e7',
            },
            '&.Mui-focused fieldset': {
                border: '2px solid #a81e1e',
            },
        },
        '& input': {
            border: 'none',
            fontSize: '16px',
            padding: '10px 20px',
        },
    }));


    const schema = Yup.object().shape({
        issue: Yup.string().required('Issue is required.'),
        comments: Yup.string().required('Comments is required.')
    });


    const handleSubmit = async (values, resetForm) => {
        const { issue, comments } = values;
        const data = {
            issue,
            comments,
        }

        dispatch(setIsLoading(true))
        try {
            const response = await api.post(`${BASE_URL}/vendor-raise-ticket`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            toast.success(successToast(response))
            resetForm(initialState);
            dispatch(setIsLoading(false))
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        }

    }



    return (
        <>
            <TopHeader title="Settings" description="Manage all your personal settings here" />

            <Container maxWidth="lg">
                <div className='card-box-shadow px-5 py-4 mb-4'>
                    <div className='mt-3 bg-primary'>
                    </div>
                    <Grid container spacing={2} className='box-negative'>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <div className="ct-box ct-box-padding">
                                <div className="px-4">
                                    <Stack direction="row" alignItems="center" className="mb-3">
                                        <ArrowBackIcon className="cursor-pointer" style={{ fontSize: '18px', color: '#c33332' }} onClick={handleBack} /> <h3 className="faq-heading ms-2">Help Desk / Support</h3>
                                    </Stack>
                                    <h2 className="rt-heading mb-4 mt-5">Raise a Ticket</h2>
                                    <Formik enableReinitialize={true} initialValues={initialState} validationSchema={schema} onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}>
                                        {({ values, errors, handleChange, handleSubmit }) => (
                                            <form onSubmit={handleSubmit} className="px-4">

                                                <CssTextField
                                                    id="outlined-number"
                                                    variant="outlined"
                                                    label="Issue"
                                                    className='mb-1'
                                                    value={values.issue}
                                                    onChange={handleChange}
                                                    name="issue"
                                                    style={{ width: '100%' }}
                                                    InputLabelProps={{
                                                        style: { color: '#777777', fontSize: '10px' },
                                                    }}
                                                    InputProps={{
                                                        style: {
                                                            borderRadius: '8px',
                                                            backgroundColor: '#FFFFFF',
                                                        }
                                                    }}
                                                />
                                                {errors.issue && <small className='text-danger mt-0 ms-1'>{errors.issue}</small>}


                                                <div className="mt-3">
                                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                        <textarea
                                                            value={values.comments}
                                                            onChange={handleChange}
                                                            name="comments"
                                                            rows="20"
                                                            id="comment_text"
                                                            cols="40"
                                                            placeholder="comments..."
                                                            className="job-textarea"
                                                            autoComplete="off"
                                                            role="textbox"
                                                            aria-autocomplete="list"
                                                            aria-haspopup="true"
                                                        ></textarea>
                                                    </Box>
                                                    {errors.comments && <small className='text-danger mt-2 ms-1'>{errors.comments}</small>}

                                                </div>

                                                <Stack direction="row" justifyContent="center" className="mt-4">
                                                    <Button variant="contained" className="inquiries-red-btn" type="submit" disabled={isLoading}>
                                                        {isLoading ? 'Loading...' : 'Submit'}
                                                    </Button>
                                                </Stack>
                                            </form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    )
}

export default RaiseTicket