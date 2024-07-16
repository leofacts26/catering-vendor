import React from 'react'
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AadharCardFront from './AadharCardFront';
import AadharCardBack from './AadharCardBack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const AadharCard = () => {
    return (
        <>
            <div>
                <Accordion className="faq-bg" >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}> Aadhar Card </p>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Stack direction="row" spacing={2} flexDirection="row">


                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <AadharCardFront />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <AadharCardBack />
                                    </Grid>
                                </Grid>
                            </Box>



                            {/* BACK   */}
                            {/* <AadharCardBack /> */}


                        </Stack>
                    </AccordionDetails>
                </Accordion>
            </div>





        </>
    )
}

export default AadharCard