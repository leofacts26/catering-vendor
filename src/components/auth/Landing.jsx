import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';

const Landing = () => {
    return (
        <>
            <section className='landing-bg'>
                <Stack  direction="column">
                <h1 className='pb-5 ct-box-landing-title'>Welcome to Caterings & Tiffins</h1>
                <div className="ct-landing-box">
                    <h2 className='ct-box-title'>Register Your Business</h2>
                    <div className='mb-3' style={{ marginTop: '20px', borderTop: '1px solid #e0e3e7' }}>
                        <Divider />
                    </div>
                    <p className='text-center landing-para'>Please choose your service below</p>
                    <Stack direction="column" justifyContent="center" className='text-center'>
                        <Link to="/create-account" className='mb-4 mt-5'> <Button variant="contained" className='ct-box-btn-catering'>Catering Service</Button> </Link>
                        <Link to="https://tiffinvendor.cateringsandtiffins.com/create-account" className=''>  <Button variant="contained" className='ct-box-btn-tiffin'>Tiffin Service</Button> </Link>
                    </Stack>
                </div>
                </Stack>
            </section>
        </>
    )
}

export default Landing