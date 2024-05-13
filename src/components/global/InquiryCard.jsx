import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import PhoneIcon from '@mui/icons-material/Phone';

const InquiryCard = ({item}) => {
    return (
        <>
            <Stack className="inquiries-box mb-3" direction="row" justifyContent="space-between" alignItems="center">
                <div>
                    <h4 className="inquiries-title">{item?.user_name}</h4>
                    <p className="inquiries-date">{item?.enquiry_date.slice(0,10)}</p>
                    <p className="inquiries-desc">{item?.description}</p>
                </div>
                <div>
                    <Button variant="contained" className="inquiries-btn"> <PhoneIcon style={{ fontSize: '14px' }} className="me-2" /> Call now</Button>
                </div>
            </Stack>
        </>
    )
}

export default InquiryCard