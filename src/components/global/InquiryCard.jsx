import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import PhoneIcon from '@mui/icons-material/Phone';
import toast from 'react-hot-toast';

const InquiryCard = ({ item }) => {

    const handleCopyText = (number) => {
        navigator.clipboard.writeText(number)
            .then(() => {
                toast.success("Number copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
            });
    };

    return (
        <>
            <Stack className="inquiries-box mb-3" direction="row" justifyContent="space-between" alignItems="center">
                <div>
                    <h4 className="inquiries-title">{item?.user_name}</h4>
                    <p className="inquiries-date">{item?.enquiry_date.slice(0, 10)}</p>
                    <p className="inquiries-desc">{item?.user_phone_number}</p>
                    <p className="inquiries-desc mt-1">{item?.description}</p>
                </div>
                <div>
                    <Button variant="contained" className="inquiries-btn-green" onClick={() => handleCopyText(item?.user_phone_number)}> <PhoneIcon style={{ fontSize: '14px' }} className="me-2" /> Call now</Button>
                </div>
            </Stack>
        </>
    )
}

export default InquiryCard