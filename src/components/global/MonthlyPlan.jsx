import * as React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { api, BASE_URL } from '../../api/apiConfig';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOrderTotal, createOneTimePayment, fetchSubscriptionTypes, setCouponCode, setDiscountedData, setSelectedSubscription, setSubscribeData, toggleSubscriptionCheck } from '../../features/subscriptionSlice';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';

import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import { datavalidationerror, successToast } from '../../utils';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const MonthlyPlan = () => {
    // const { vendor_id } = useSelector((state) => state?.user?.vendorId)
    const { accessToken } = useSelector((state) => state.user)
    const { subscriptionData, selectedSubscription, isLoading, couponCode, checkedSubscriptionIds, discoundedData, subscribeData } = useSelector((state) => state.subscription);
    const dispatch = useDispatch();
    const [openCouponModal, setOpenCouponModal] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(fetchSubscriptionTypes());
    }, []);

    // openCouponModal 
    const onHandleCouponModalOpen = () => {
        setOpenCouponModal(true);
    };
    const onHandleCouponModalClose = async () => {
        setOpenCouponModal(false);
        await dispatch(setCouponCode(""));
    };

    const handleCheckboxChange = async (subscriptionTypeId, item) => {
        await dispatch(setSelectedSubscription(item))
        if (!checkedSubscriptionIds.includes(subscriptionTypeId)) {
            await dispatch(toggleSubscriptionCheck(subscriptionTypeId));
        } else {
            await dispatch(toggleSubscriptionCheck(subscriptionTypeId));
        }
        setOpenCouponModal(true);
    };


    const onCouponCodeSubmit = async (e) => {
        e.preventDefault();
        await dispatch(setCouponCode(couponCode));
        const response = await dispatch(calculateOrderTotal(selectedSubscription));
        // if (response.payload.status === "success") {
        //     handleClickOpen()
        // }
        dispatch(setDiscountedData(response?.payload))
        onHandleCouponModalClose()
    }

    console.log(discoundedData, "discoundedData");
    console.log(subscribeData, "subscribeData");

    // onHandleSubscribe 
    const onHandleSubscribe = async (item) => {
        await dispatch(setSubscribeData(item))
        const response = await dispatch(calculateOrderTotal(item));
        await dispatch(setDiscountedData(response?.payload)) // without dispach will work for now coupon issue
        console.log(response, "responseresponse");
        if (response.payload.status === "success") {
            handleClickOpen()
        }
    }


    // loadScript 
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

    console.log(couponCode, "couponCode");

    // displayRazorpay 
    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await dispatch(createOneTimePayment())

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        console.log(result, "result result TTTTTTTTTTTTTTt");
        console.log(result?.payload?.data?.order, "result result");

        const { amount, id, currency } = result?.payload?.data?.order;

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

        handleClose()
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
                                    <div className="coupon-flex">
                                        <span className='coupon-text'>
                                            Apply Coupon if any
                                        </span>
                                        <Checkbox size="small" {...label}
                                            checked={checkedSubscriptionIds.includes(item.subscriptionTypeId)}
                                            onChange={() => handleCheckboxChange(item.subscriptionTypeId, item)} />
                                    </div>

                                    <Link to="javascript:void(0)" className="text-decoration-none mt-3">
                                        <Button variant="contained" className={`sub-plan-btn mx-auto taxt-center ${color}`}
                                            onClick={() => onHandleSubscribe(item)}
                                        > Subscribe Now </Button>
                                    </Link>
                                    <br />
                                </div>
                            </Stack>
                        </Grid>
                    )
                })}
            </Grid>


            {/* coupon modal  */}
            <React.Fragment>
                <BootstrapDialog
                    onClose={onHandleCouponModalOpen}
                    aria-labelledby="customized-dialog-title"
                    open={openCouponModal}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Apply Coupon
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={onHandleCouponModalClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <form className="search-wrapper cf" onSubmit={onCouponCodeSubmit}>
                            <input name="couponCode" value={couponCode} onChange={(e) => dispatch(setCouponCode(e.target.value))}
                                type="text" placeholder="Enter Coupon Code" required style={{ boxShadow: 'none' }} />
                            <button type="submit">Apply</button>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={onHandleCouponModalClose}>
                            Close
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </React.Fragment>

            {/* make payment */}
            <React.Fragment>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    size="lg"
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Payment Details
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <div className="" style={{ width: '300px' }}>
                            <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: '10px' }} spacing={2}>
                                <h4 className='diaplay-amt'> <span>couponCode:</span></h4>
                                <h4 className='diaplay-amt'>{discoundedData?.couponCode ? discoundedData?.couponCode : 'N/A'}</h4>
                            </Stack>
                            <hr style={{ marginBottom: '10px' }} className='subscription-hr' />
                            <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: '10px' }} spacing={2}>
                                <h4 className='diaplay-amt'> <span>discountAmount:</span></h4>
                                <h4 className='diaplay-amt'>{discoundedData?.discountAmount}</h4>
                            </Stack>
                            <hr style={{ marginBottom: '10px' }} className='subscription-hr' />
                            <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: '10px' }} spacing={2}>
                                <h4 className='diaplay-amt'> <span>endDate:</span></h4>
                                <h4 className='diaplay-amt'>{discoundedData?.endDate}</h4>
                            </Stack>
                            <hr style={{ marginBottom: '10px' }} className='subscription-hr' />
                            <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: '10px' }} spacing={2}>
                                <h4 className='diaplay-amt'> <span>startDate:</span></h4>
                                <h4 className='diaplay-amt'>{discoundedData?.startDate?.slice(0, 10)}</h4>
                            </Stack>
                            <hr style={{ marginBottom: '10px' }} className='subscription-hr' />
                            <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: '10px' }} spacing={2}>
                                <h4 className='diaplay-amt'> <span>status:</span></h4>
                                <h4 className='diaplay-amt'>{discoundedData?.status}</h4>
                            </Stack>
                            <hr style={{ marginBottom: '10px' }} className='subscription-hr' />
                            <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: '10px' }} spacing={2}>
                                <h4 className='diaplay-amt'> <span>subAmount:</span></h4>
                                <h4 className='diaplay-amt'>{discoundedData?.subAmount}</h4>
                            </Stack>
                            <hr style={{ marginBottom: '10px' }} className='subscription-hr' />
                            <Stack direction="row" justifyContent="space-between" sx={{ marginBottom: '10px' }} spacing={2}>
                                <h4 className='diaplay-amt'> <span>finalAmount:</span></h4>
                                <h4 className='diaplay-amt'>{discoundedData?.finalAmount}</h4>
                            </Stack>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={() => displayRazorpay()}>
                            Make Payment
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </React.Fragment>


        </>
    )
}

export default MonthlyPlan