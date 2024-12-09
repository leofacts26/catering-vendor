import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';


const ReviewCards = ({ review }) => {
    return (
        <>
            <Stack direction="row" justifyContent="space-between" spacing={1}>
                <Stack direction="row" spacing={1} style={{ width: '75%' }}>
                    <Avatar sx={{ bgcolor: '#C33332' }}>{review?.username?.slice(0, 1)}</Avatar>
                    <div className="">
                        <Stack direction="row" alignItems="center">
                            <h5 className='ic-title me-2'> {review?.username}
                            </h5>
                            <StarIcon fontSize="small" sx={{ color: '#459412', marginRight: '3px'  }} />
                            <span style={{ color: '#57636c' }}>
                                {parseFloat(review?.rating).toFixed(1)}
                            </span>
                        </Stack>
                        <p className='ic-desc mt-2'> {review?.review_text} </p>
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