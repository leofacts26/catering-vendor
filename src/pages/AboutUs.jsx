
import TopHeader from "../components/global/TopHeader"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, IconButton } from '@mui/material';
import { useState } from "react";
import Divider from '@mui/material/Divider';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';


const AboutUs = () => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
                                        <ArrowBackIcon className="cursor-pointer" style={{ fontSize: '18px', color: '#c33332' }} onClick={handleBack} /> <h3 className="faq-heading ms-2">About Us</h3>
                                    </Stack>

                                    <p className="company-change-password mt-3 mb-2">Click to view</p>

                                    <div>
                                        <Accordion className="faq-bg" >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}> About </p>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <p className="faq-para">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dicta voluptatem beatae suscipit consectetur officiis itaque sunt velit iure odit, eligendi expedita illum quis ipsa possimus nesciunt? Sint, deleniti voluptatibus!
                                                </p>

                                            </AccordionDetails>
                                        </Accordion>
                                    </div>


                                    <div>
                                        <Accordion className="faq-bg" >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}> Privacy Policy </p>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <p className="faq-para">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dicta voluptatem beatae suscipit consectetur officiis itaque sunt velit iure odit, eligendi expedita illum quis ipsa possimus nesciunt? Sint, deleniti voluptatibus!
                                                </p>

                                            </AccordionDetails>
                                        </Accordion>
                                    </div>


                                    <div>
                                        <Accordion className="faq-bg" >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}> Security Policy </p>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <p className="faq-para">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dicta voluptatem beatae suscipit consectetur officiis itaque sunt velit iure odit, eligendi expedita illum quis ipsa possimus nesciunt? Sint, deleniti voluptatibus!
                                                </p>

                                            </AccordionDetails>
                                        </Accordion>
                                    </div>


                                    <div>
                                        <Accordion className="faq-bg" >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}> Terms and Conditions </p>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <p className="faq-para">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dicta voluptatem beatae suscipit consectetur officiis itaque sunt velit iure odit, eligendi expedita illum quis ipsa possimus nesciunt? Sint, deleniti voluptatibus!
                                                </p>

                                            </AccordionDetails>
                                        </Accordion>
                                    </div>


                                    <div>
                                        <Accordion className="faq-bg" >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}> Disclaimer </p>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <p className="faq-para">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dicta voluptatem beatae suscipit consectetur officiis itaque sunt velit iure odit, eligendi expedita illum quis ipsa possimus nesciunt? Sint, deleniti voluptatibus!
                                                </p>

                                            </AccordionDetails>
                                        </Accordion>
                                    </div>






                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    )
}

export default AboutUs