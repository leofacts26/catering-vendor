import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


const YearlyPlan = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3} className='mb-3' style={{ display: 'flex', justifyContent: 'center', padding: '0px 5px' }}>
                    <div className="subscription-plans-shadow">
                        <div className="sub-box-violet">
                            <div className="sub-box-violet-title">
                                <h3 className="sub-box-name">Branded Caterer</h3>
                            </div>
                            <div className="sub-body px-2 pt-2">
                                <div className="sub-price">
                                    <h3 className="text-center"> ₹4000 / <sub className="sub-plan-month">month</sub></h3>
                                </div>
                                <p className="sub-plan-brand mb-3 mt-3">List as Branded Caterer</p>
                                <p className="sub-plan-para">Benifits:</p>
                                <p className="sub-plan-para">- Gets clean dashboard </p>
                                <p className="sub-plan-para">- Track your incomes </p>
                                <p className="sub-plan-para">- Gets clean order PDF </p>
                                <p className="sub-plan-para">- Includes calender feature so you never missout any info reading dates </p>
                                <p className="sub-plan-para">- Gets notify via email, SMS, app notification </p>
                                <p className="sub-plan-para">- Phone/chat feature with customers </p>
                                <p className="sub-plan-para">- Data analysis/improvement recommendation</p>
                                <br />
                                <Link to="javascript:void(0)" className="text-decoration-none mt-3">
                                    <Button variant="contained" className="sub-plan-btn mx-auto taxt-center"> Subscribe Now </Button>
                                </Link>
                                <br />
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3} className='mb-3' style={{ display: 'flex', justifyContent: 'center', padding: '0px 5px' }}>
                    <div className="subscription-plans-shadow">
                        <div className="sub-box-violet">
                            <div className="sub-box-green-title">
                                <h3 className="sub-box-name">Popular Caterer</h3>
                            </div>
                            <div className="sub-body px-2 pt-2">
                                <div className="sub-price">
                                    <h3 className="text-center"> ₹3000 / <sub className="sub-plan-month">month</sub></h3>
                                </div>
                                <p className="sub-plan-brand mb-3 mt-3">List as Popular Caterer</p>
                                <p className="sub-plan-para">Benifits:</p>
                                <p className="sub-plan-para">- Gets clean dashboard </p>
                                <p className="sub-plan-para">- Track your incomes </p>
                                <p className="sub-plan-para">- Gets clean order PDF </p>
                                <p className="sub-plan-para">- Includes calender feature so you never missout any info reading dates </p>
                                <p className="sub-plan-para">- Gets notify via email, SMS, app notification </p>
                                <p className="sub-plan-para">- Phone/chat feature with customers </p>
                                <p className="sub-plan-para">- Data analysis/improvement recommendation</p>
                                <br />
                                <Link to="javascript:void(0)" className="text-decoration-none mt-3">
                                    <Button variant="contained" className="sub-plan-btn-green mx-auto taxt-center"> Subscribe Now </Button>
                                </Link>
                                <br />
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3} className='mb-3' style={{ display: 'flex', justifyContent: 'center', padding: '0px 5px' }}>
                    <div className="subscription-plans-shadow">
                        <div className="sub-box-violet">
                            <div className="sub-box-red-title">
                                <h3 className="sub-box-name">Recommended Caterer</h3>
                            </div>
                            <div className="sub-body px-2 pt-2">
                                <div className="sub-price">
                                    <h3 className="text-center"> ₹2000 / <sub className="sub-plan-month">month</sub></h3>
                                </div>
                                <p className="sub-plan-brand mb-3 mt-3">List as Recommended Caterer</p>
                                <p className="sub-plan-para">Benifits:</p>
                                <p className="sub-plan-para">- Gets clean dashboard </p>
                                <p className="sub-plan-para">- Track your incomes </p>
                                <p className="sub-plan-para">- Gets clean order PDF </p>
                                <p className="sub-plan-para">- Includes calender feature so you never missout any info reading dates </p>
                                <p className="sub-plan-para">- Gets notify via email, SMS, app notification </p>
                                <p className="sub-plan-para">- Phone/chat feature with customers </p>
                                <p className="sub-plan-para">- Data analysis/improvement recommendation</p>
                                <br />
                                <Link to="javascript:void(0)" className="text-decoration-none mt-3">
                                    <Button variant="contained" className="sub-plan-btn-red mx-auto taxt-center"> Subscribe Now </Button>
                                </Link>
                                <br />
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3} xl={3} className='mb-3' style={{ display: 'flex', justifyContent: 'center', padding: '0px 5px' }}>
                    <div className="subscription-plans-shadow">
                        <div className="sub-box-violet">
                            <div className="sub-box-yellow-title">
                                <h3 className="sub-box-name">Normal Caterer</h3>
                            </div>
                            <div className="sub-body px-2 pt-2">
                                <div className="sub-price">
                                    <h3 className="text-center"> ₹1000 / <sub className="sub-plan-month">month</sub></h3>
                                </div>
                                <p className="sub-plan-brand mb-3 mt-3">List as Normal Caterer</p>
                                <p className="sub-plan-para">Benifits:</p>
                                <p className="sub-plan-para">- Gets clean dashboard </p>
                                <p className="sub-plan-para">- Track your incomes </p>
                                <p className="sub-plan-para">- Gets clean order PDF </p>
                                <p className="sub-plan-para">- Includes calender feature so you never missout any info reading dates </p>
                                <p className="sub-plan-para">- Gets notify via email, SMS, app notification </p>
                                <p className="sub-plan-para">- Phone/chat feature with customers </p>
                                <p className="sub-plan-para">- Data analysis/improvement recommendation</p>
                                <br />
                                <Link to="javascript:void(0)" className="text-decoration-none mt-3">
                                    <Button variant="contained" className="sub-plan-btn-yellow mx-auto taxt-center"> Subscribe Now </Button>
                                </Link>
                                <br />
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default YearlyPlan