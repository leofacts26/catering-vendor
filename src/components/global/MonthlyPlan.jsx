import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { api, BASE_URL } from '../../api/apiConfig';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptionTypes } from '../../features/subscriptionSlice';
import { useEffect } from 'react';
import Stack from '@mui/material/Stack';



const MonthlyPlan = () => {
    const { vendor_id } = useSelector((state) => state?.user?.vendorId)
    const { subscriptionData, isLoading } = useSelector((state) => state.subscription);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSubscriptionTypes());
    }, []);

    console.log(subscriptionData, "subscriptionData");



    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }


    async function displayRazorpay(item) {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await api.post(`/rz-create-one-time-payment`, {
            vendorId: vendor_id,
            subscriptionTypeId: Number(item?.subscriptionTypeId),
            subscriptionDuration: 'monthly',
            couponCode: 'MAR0324'
        });

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        console.log(result?.data?.order, "result result");

        const { amount, id, currency } = result?.data?.order;

        const options = {
            key: "rzp_test_2M5D9mQwHZp8iP",
            amount: amount.toString(),
            currency: currency,
            name: "Caterings And Tiffins",
            description: "Test Transaction",
            // image: { logo },
            order_id: id,
            handler: async function (response) {
                console.log(response, "response response");
                const data = {
                    orderCreationId: id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                console.log(data);
                
            },
            prefill: {
                name: "Caterings And Tiffins",
                email: "cateringsandtiffin@example.com",
                contact: "9879879879",
            },
            notes: {
                address: "Caterings And Tiffins Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <>
            <Grid container spacing={2}>

                {subscriptionData?.length > 0 && subscriptionData?.map((item, index) => {
                    let color = '';
                    if (item?.subscriptionType === 'normal') {
                        color = 'normal-color'
                    } else if (item?.subscriptionType === 'popular') {
                        color = 'popular-color'
                    } else if (item?.subscriptionType === 'branded') {
                        color = 'branded-color'
                    }

                    return (
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={4} className='mb-3' style={{ display: 'flex', justifyContent: 'center', padding: '0px 5px' }} key={index}>
                            <Stack className="subscription-plans-shadow" justifyContent="space-between">
                                <div className="sub-box-violet">
                                    <div className={`sub-box-violet-title ${color}`}>
                                        <h3 className="sub-box-name"> {item?.subscriptionType} Caterer</h3>
                                    </div>
                                    <div className="sub-body px-2 pt-2">
                                        <div className="sub-price">
                                            <h3 className="text-center"> {`₹ ${item?.monthlyCharges}`} / <sub className="sub-plan-month">month</sub></h3>
                                        </div>
                                        <p className="sub-plan-brand mb-3 mt-3">List as {item?.subscriptionType} Caterer</p>
                                        <p className="sub-plan-para">Benifits:</p>
                                        {item?.benefits.map((benefit, index) => (
                                            <p className="sub-plan-para" key={index}>- {benefit}</p>
                                        ))}
                                        <br />
                                    </div>
                                </div>
                                <div className="">
                                    <Link to="javascript:void(0)" className="text-decoration-none mt-3">
                                        <Button variant="contained" className={`sub-plan-btn mx-auto taxt-center ${color}`} onClick={() => displayRazorpay(item)}> Subscribe Now </Button>
                                    </Link>
                                    <br />
                                </div>
                            </Stack>
                        </Grid>
                    )
                })}


                {/* <Grid item xs={12} sm={6} md={6} lg={3} xl={3} className='mb-3' style={{ display: 'flex', justifyContent: 'center', padding: '0px 5px' }}>
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
                                    <Button variant="contained" className="sub-plan-btn-green mx-auto taxt-center" onClick={displayRazorpayPopular}> Subscribe Now </Button>
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
                </Grid> */}
            </Grid>
        </>
    )
}

export default MonthlyPlan