import React, { useEffect, useState } from 'react'
import TopHeader from '../components/global/TopHeader'
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { api, BASE_URL } from '../api/apiConfig';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { datavalidationerror, successToast } from '../utils';


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

const CssTextFieldSmall = styled(TextField)(({ theme }) => ({
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
        padding: '6px 20px',
    },
    '& input::placeholder': {
        fontSize: '10px', // Adjust the font size here
    },
}));

const packages = [
    {
        "id": "1",
        "food_type_name": "Veg",
        "selected": "0",
        "start_price": null
    },
    {
        "id": "2",
        "food_type_name": "Non Veg",
        "selected": "0",
        "start_price": null
    },
    {
        "id": "3",
        "food_type_name": "Vegan",
        "selected": "0",
        "start_price": null
    }
]

const serviceTypesList = [
    {
        "id": "1",
        "service_type_name": "Delivery",
        "selected": "0"
    },
    {
        "id": "2",
        "service_type_name": "Takeaway",
        "selected": "0"
    }
]

const servingTypesList = [
    {
        "id": "1",
        "serving_type_name": "Table Service",
        "selected": "0"
    },
    {
        "id": "2",
        "serving_type_name": "Buffet Service",
        "selected": "0"
    }
]

const Packages = () => {
    const { accessToken } = useSelector((state) => state.user)
    const [foodTypes, setFoodTypes] = useState(packages)
    const [serviceTypes, setServiceTypes] = useState(serviceTypesList)
    const [servingTypes, setServingTypes] = useState(servingTypesList)
    const [maximumCapacity, setMaximumCapacity] = useState("")
    const [minimumCapacity, setMinimumCapacity] = useState("")
    const [startPrice, setStartPrice] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleFoodSwitchToggle = (index) => {
        const updatedFoodTypes = foodTypes.map((food, i) =>
            i === index ? { ...food, selected: food.selected === "1" ? "0" : "1" } : food
        );
        setFoodTypes(updatedFoodTypes);

    };

    const handleSwitchToggle = (index) => {
        const updatedServiceTypes = serviceTypes.map((service, i) =>
            i === index ? { ...service, selected: service.selected === "1" ? "0" : "1" } : service
        );
        setServiceTypes(updatedServiceTypes);
    };

    const handleServingSwitchToggle = (index) => {
        const updatedServingTypes = servingTypes.map((serving, i) =>
            i === index ? { ...serving, selected: serving.selected === "1" ? "0" : "1" } : serving
        );
        setServingTypes(updatedServingTypes);
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();

        if (parseInt(minimumCapacity) >= parseInt(maximumCapacity)) {
            toast.error("Minimum capacity should be less than maximum capacity.");
            return;
        }


        setLoading(true)

        const updatedFoodTypes = foodTypes.map(food => ({ id: +food.id, selected: +food.selected }));
        const updatedServiceTypes = serviceTypes.map(service => ({ id: +service.id, selected: +service.selected }));
        const updatedServingTypes = servingTypes.map(serving => ({ id: +serving.id, selected: +serving.selected }));

        const data = {
            foodTypes: JSON.stringify(updatedFoodTypes),
            serviceTypes: JSON.stringify(updatedServiceTypes),
            servingTypes: JSON.stringify(updatedServingTypes),
            maximumCapacity: maximumCapacity,
            minimumCapacity: minimumCapacity,
            startPrice: startPrice
        };
        try {
            const response = await api.post(`${BASE_URL}/update-vendor-business-package-details`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            toast.success(successToast(response))
            fetchPackages()
        } catch (error) {
            console.log(error);
            toast.error(datavalidationerror(error))
        } finally {
            setLoading(false)
        }
    }


    const fetchPackages = async () => {
        try {
            const response = await api.get(`${BASE_URL}/get-vendor-package-details`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            const { foodTypes, maximum_capacity, minimum_capacity, serviceTypes, servingTypes, start_price } = response?.data?.data;
            setServiceTypes(serviceTypes)
            setServingTypes(servingTypes)
            setFoodTypes(foodTypes)
            setMaximumCapacity(maximum_capacity)
            setMinimumCapacity(minimum_capacity)
            setStartPrice(start_price)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPackages();
    }, [])


    return (
        <>
            <TopHeader title="Manage Your Package" description="Add your Package below" />

            <Container maxWidth="lg">
                <form onSubmit={onHandleSubmit}>
                    <div className='card-box-shadow px-5 pt-2 pb-4 mb-4'>
                        <Grid container spacing={2} className='mt-0'>
                            <Grid item xs={12} lg={6}>
                                <h3 className='package-capacity mt-0'>Choose your food type Below</h3>
                                <p className='max-min-capacity-para text-center mb-3'>If you provide both Veg and Non-Veg, please select both</p>

                                {foodTypes.slice(0, 2).map((food, index) => (
                                    <Stack key={food.id} direction="row" alignItems="center" justifyContent="center" spacing={2} className={food.selected ? 'mb-5 green-switch' : 'mb-5'}>
                                        <h4 className={food.food_type_name === 'Veg' ? 'package-vn-title-veg' : 'package-vn-title-nonveg'}>{food.food_type_name}</h4>

                                        <Switch
                                            size="small"
                                            checked={food.selected === "1"}
                                            onChange={() => handleFoodSwitchToggle(index)}
                                        />

                                        {/* <Switch
                                            size='small'
                                            checked={food.selected === "1"}
                                            onChange={() => handleFoodSwitchToggle(index)}
                                            sx={{
                                                "&.MuiSwitch-root .MuiSwitch-switchBase": {
                                                    color: food.food_type_name === 'Veg' ? "#459412" : "#7c1e1e"
                                                },
                                                "&.MuiSwitch-root .Mui-checked": {
                                                    color: food.food_type_name === 'Non Veg' ? "#7c1e1e" : "#459412",
                                                }
                                            }}
                                        /> */}
                                    </Stack>
                                ))}
                            </Grid>


                            <Grid item xs={12} lg={6}>
                                <Stack direction="row" justifyContent="center" flexDirection="column">
                                <h3 className='package-capacity mt-0'>Starting Price / Plate</h3>
                                <p className='max-min-capacity-para-green text-center mt-2 mb-2'>Enter Starting price / Plate</p>
                                    <CssTextFieldSmall
                                        value={startPrice}
                                        onChange={(e) => setStartPrice(e.target.value)}
                                        id="outlined-number"
                                        variant="outlined"
                                        placeholder="Enter Minimum Capacity - Eg: 100plates"
                                        className='text-center mx-auto'
                                        style={{ width: '50%' }}
                                        InputLabelProps={{
                                            style: { color: '#777777', fontSize: '10px' },
                                        }}
                                        InputProps={{
                                            style: {
                                                borderRadius: '8px',
                                                width: '100%',
                                                backgroundColor: '#FFFFFF',
                                            }
                                        }}
                                    />
                                </Stack>

                                {/* <p className='max-min-capacity-para-red text-center mt-3'>Enter Non veg Starting price / plate</p>
                                <Stack direction="row" justifyContent="end">
                                    <CssTextFieldSmall
                                        id="outlined-number"
                                        variant="outlined"
                                        placeholder="Enter Minimum Capacity - Eg: 100plates"
                                        className='mt-1'
                                        style={{ width: '75%' }}
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
                                </Stack> */}

                            </Grid>
                        </Grid>


                        <Divider
                            className='mt-4'
                            variant="middle"
                            style={{
                                backgroundColor: '#c33332',
                                margin: '0px'
                            }}
                        />

                        <Grid container spacing={2} className='mt-2'>
                            <Grid item xs={12} lg={6}>
                                <h3 className='package-capacity mt-3'>Choose your Service type Below</h3>
                                <p className='max-min-capacity-para text-center'>If you provide both Delivery and Takeaway, please select both</p>
                                {serviceTypes?.slice(0, 2).map((service, index) => {
                                    // console.log(`/img/icons/${service.service_type_name.toLowerCase()}.png`, "service RRR");
                                    return (
                                        <Stack key={service.id} direction="row" justifyContent="center" alignItems="center" spacing="2" className='mt-3'>
                                            <img src={`/img/package/${service.service_type_name.toLowerCase()}.png`} alt="" className='package-icons' />
                                            <p className='px-3 package-icon-title'>{service.service_type_name}</p>
                                            <Switch
                                                size="small"
                                                checked={service.selected === "1"}
                                                onChange={() => handleSwitchToggle(index)}
                                            />
                                        </Stack>
                                    )
                                }

                                )}
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <h3 className='package-capacity mt-3'>Choose your Serving type Below</h3>
                                <p className='max-min-capacity-para text-center'>If you provide both table and buffet service, please select both </p>
                                {
                                    servingTypes.map((servingType, index) => {
                                        // console.log(`/img/icons/${servingType.serving_type_name.toLowerCase().replace(/\s+/g, '-')}.png`, "servingType servingType");
                                        return (
                                            <Stack direction="row" justifyContent="center" alignItems="center" spacing="2" className='mt-3' key={index}>
                                                <img src={`/img/package/${servingType.serving_type_name.toLowerCase().replace(/\s+/g, '-')}.png`} alt="" className='package-icons' />
                                                <p className='px-3 package-icon-title'>{servingType.serving_type_name.toLowerCase().replace(/\s+/g, '-')}</p>
                                                <Switch size="small" checked={servingType.selected === "1"} onChange={() => handleServingSwitchToggle(index)} />
                                            </Stack>
                                        )
                                    }
                                    )
                                }
                            </Grid>
                        </Grid>


                        <Divider
                            className='mt-4'
                            variant="middle"
                            style={{
                                backgroundColor: '#c33332',
                                margin: '0px'
                            }}
                        />

                        <h3 className='package-capacity mt-3'>Capacity</h3>

                        <Grid container spacing={2} className='mt-2'>
                            <Grid item xs={12} lg={6}>
                                <p className='max-min-capacity mb-2'>Minimum Capacity</p>
                                <CssTextField
                                    value={minimumCapacity}
                                    onChange={(e) => setMinimumCapacity(e.target.value)}
                                    type='number'
                                    id="outlined-number"
                                    variant="outlined"
                                    placeholder="Enter Minimum Capacity - Eg: 100plates"
                                    className='mt-0'
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
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <p className='max-min-capacity mb-2'>Maximum Capacity</p>
                                <CssTextField
                                    value={maximumCapacity}
                                    onChange={(e) => setMaximumCapacity(e.target.value)}
                                    type='number'
                                    id="outlined-number"
                                    variant="outlined"
                                    placeholder="Enter Maximum Capacity - Eg: 7000plates"
                                    className='mt-0'
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
                            </Grid>
                        </Grid>

                        <Stack direction="row" justifyContent="center" className="mt-4">
                            <Button variant="contained" className="inquiries-red-btn" type="submit"> {loading ? 'Loading...' : 'Update'}  </Button>
                        </Stack>
                    </div>
                </form>
            </Container>
        </>
    )
}

export default Packages