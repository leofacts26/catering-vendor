
import TopHeader from "../components/global/TopHeader"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Try } from "@mui/icons-material";
import { api, BASE_URL } from "../api/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../features/user/userSlice";
import LoaderSpinner from "../components/LoaderSpinner";

const Faq = () => {

    const [faq, setFaq] = useState([])
    const { accessToken, isLoading } = useSelector((state) => state?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    const fetchFaqs = async () => {
        dispatch(setIsLoading(true))
        try {
            const response = await api.get(`${BASE_URL}/faq?current_page=1&limit=5&type=vendor`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            // console.log(response, "response");
            // setTotalPages(response?.data?.total_pages)
            setFaq(response?.data?.data);
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setIsLoading(false));
        }
    }


    useEffect(() => {
        fetchFaqs()
    }, [])


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
                                        <ArrowBackIcon className="cursor-pointer" style={{ fontSize: '18px', color: '#c33332' }} onClick={handleBack} /> <h3 className="faq-heading ms-2">FAQ's</h3>
                                    </Stack>

                                    <p className="company-change-password mt-3 mb-2">Click to view</p>

                                    {
                                        isLoading ? (
                                            <LoaderSpinner />
                                        ) : (
                                            <>
                                                {faq.map((item) => (
                                                    <div key={item?.id}>
                                                        <Accordion className="faq-bg" >
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                aria-controls="panel1-content"
                                                                id="panel1-header"
                                                            >
                                                                <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}>
                                                                    {item?.question_text}
                                                                </p>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <p className="faq-para">
                                                                    {item?.answer_text}
                                                                </p>

                                                            </AccordionDetails>
                                                        </Accordion>
                                                    </div>
                                                ))}
                                            </>
                                        )
                                    }

                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container >
        </>
    )
}

export default Faq