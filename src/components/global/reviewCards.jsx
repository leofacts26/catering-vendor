import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';

const ReviewCards = ({ review }) => {
    return (
        <>
            <Stack direction="row" justifyContent="space-between" spacing={1}>
                <Stack direction="row" spacing={1} style={{ width: '75%' }}>
                    {/* <img src="https://dashkit.goodthemes.co/assets/img/avatars/profiles/avatar-1.jpg" alt="" className="img-fluid ic-img" /> */}
                    <Avatar sx={{ bgcolor: '#C33332' }}>{review?.username?.slice(0, 1)}</Avatar>
                    <div className="">
                        <h5 className='ic-title'> {review?.username} </h5>
                        <p className='ic-desc'> {review?.review_text} </p>
                    </div>
                </Stack>
                <p className='ic-small-text'>{review?.review_date?.slice(0, 10)}</p>
            </Stack>
            <div className='mb-3' style={{ marginTop: '10px', borderTop: '1px solid #e0e3e7' }}>
                <Divider />
            </div>
        </>
    )
}

export default ReviewCards