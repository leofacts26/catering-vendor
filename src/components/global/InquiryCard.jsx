import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import PhoneIcon from '@mui/icons-material/Phone';
import toast from 'react-hot-toast';
import moment from "moment";

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
                    <p className="inquiries-date">{item?.area} </p>
                    <p className="inquiries-date"> {item.food_types.length > 0 && item.food_types?.map((item) => item?.food_type_name)} </p>
                    <p className="inquiries-desc mb-1">{item?.cuisines.length > 0 && item?.cuisines.map((item) => <span>{item.cuisine_name}, {" "}</span> )}</p>
                    <p className="inquiries-desc mb-1">{item?.service_types.length > 0 && item?.service_types.map((item) => <span>{item.service_type_name}, {" "}</span> )}</p>
                    <p className="inquiries-desc mb-1">{item?.occasions.length > 0 && item?.occasions.map((item) => <span>{item.occasion_name}, {" "}</span> )}</p>
                    <p className="inquiries-date">  {moment(item?.enquiry_date).format("DD MMM, YYYY")}</p>
                    <p className="inquiries-desc">{item?.user_phone_number}</p>
                </div>
                <div>
                    <Button variant="contained" className="inquiries-btn-green" onClick={() => handleCopyText(item?.user_phone_number)}> <PhoneIcon style={{ fontSize: '14px' }} className="me-2" /> Call now</Button>
                </div>
            </Stack>
        </>
    )
}

export default InquiryCard