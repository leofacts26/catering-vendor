import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { api, BASE_URL } from '../../api/apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading } from '../../features/user/userSlice';
import toast from 'react-hot-toast';
import { datavalidationerror, successToast } from '../../utils';

const initialState = {
    new_password: '',
}

const ResetPasswordSettings = () => {
    // const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [initialValues, setInitialValues] = useState(initialState);
    // const { isLoading } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { accessToken } = useSelector((state) => state.user);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const schema = Yup.object().shape({
        new_password: Yup.string()
            .required('New Password is required.')
    });

     // fetchPassword 
     const fetchPassword = async () => {
        try {
            const response = await api.get(`${BASE_URL}/get-vendor-infos`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            const responseData = response?.data?.data?.password;
            console.log(responseData, "responseData responseData");

            if (typeof responseData === 'string') {
                // Define the regular expression pattern
                let pattern = /%&\^\$([^]*)\^#\*/;

                // Extract the substring using match
                let match = responseData.match(pattern);

                // Extract the password from the captured group
                let password = match ? match[1] : null;
                setInitialValues({ ...initialValues, new_password: password })
            } else {
                console.log("responseData is not a string.");
            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchPassword()
    }, [])


    const handleSubmit = async (values, resetForm) => {
        const { new_password } = values;
        const data = {
            new_password
        }

        setLoading(true)
        try {
            const response = await api.post(`${BASE_URL}/change-vendor-password`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            fetchPassword()
            toast.success(successToast(response))
            resetForm(initialState);
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            setLoading(false)
        }
    }

   

    return (
        <Formik enableReinitialize={true} initialValues={initialValues} validationSchema={schema} onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}>
            {({ values, errors, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit} className="px-4">
                    <div>
                        <TextField
                            id="outlined-number"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={values.new_password}
                            // value="*************"
                            onChange={handleChange}
                            name="new_password"
                            className='mb-1'
                            style={{ width: '100%', }}
                            InputLabelProps={{
                                style: { color: '#777777', fontSize: '12px' },
                            }}
                            InputProps={{
                                style: {
                                    borderRadius: '8px',
                                    backgroundColor: '#FFFFFF',
                                },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleTogglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility style={{ fontSize: '16px' }} /> : <VisibilityOff style={{ fontSize: '16px' }} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {errors.new_password && <small className='text-danger mt-2 ms-1'>{errors.new_password}</small>}

                        <Stack direction="row" justifyContent="end">
                            <button disabled={loading} className="settings-user-number" style={{ background: 'transparant', backgroundColor: 'none', cursor: 'pointer', border: 'none' }}> {loading ? 'Loading...' : 'Reset Password'} </button>
                        </Stack>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default ResetPasswordSettings