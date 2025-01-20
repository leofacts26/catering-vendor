import TopHeader from "../components/global/TopHeader"
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DatePickerSearch from "../components/global/DatePickerSearch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api, BASE_URL } from "../api/apiConfig";
import InquiryCard from "../components/global/InquiryCard";
import LoadingAnimation from "../components/LoadingAnimation";
import Pagination from '@mui/material/Pagination';
import { Page_Limit } from "../constant";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import dayjs from 'dayjs';

const CssTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '2px solid #F0F1F3',
      borderRadius: '8px'
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
    padding: '10px 0px',
  },
}));


const Inquiries = () => {
  const { accessToken } = useSelector((state) => state?.user);
  const [loading, setLoading] = useState(false)
  const [inquiries, setInquiries] = useState([]);
  const [totalPages, setTotalPages] = useState(null)
  const [totalRowCount, setTotalRowCount] = useState(null)
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("")
  const [error, setError] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null);
  const formattedDate = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : '';


  console.log(formattedDate, "formattedDate formattedDate");

  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => { };
  }, [cleared]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const fetchInquiries = async () => {
    setLoading(true)
    try {
      const response = await api.get(`${BASE_URL}/get-vendor-enquiries?search_term=${search}&enquiry_date=${formattedDate || ''}&limit=${Page_Limit}&current_page=${page}&order_by=newest_first`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      // console.log(response, "response");
      setTotalPages(response?.data?.total_pages)
      setTotalRowCount(response?.data?.actual_rows_count)
      setInquiries(response?.data?.enquiries)
    } catch (error) {
      setError(error?.response?.data?.message)
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInquiries()
    setError(null)
  }, [page, selectedDate])


  const handleSubmit = (e) => {
    e.preventDefault()
    fetchInquiries()
    setError(null)
  }

  // console.log(inquiries, "inquiries");

  return (
    <>
      <TopHeader title="Customer Inquiries" description="All customer details listed below" />

      <Container maxWidth="lg">
        <div className='card-box-shadow px-5 py-4 mb-4'>

          <Stack direction="row" justifyContent="space-between" alignItems="center" className="mb-4">
            <form onSubmit={handleSubmit}>
              <Stack direction="row" spacing={2} alignItems="center">
                <CssTextField
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  id="outlined-number"
                  variant="outlined"
                  placeholder="Search With Username"
                  style={{ width: '100%' }}
                  InputLabelProps={{
                    style: { color: '#777777', fontSize: '12px' },
                  }}
                  InputProps={{
                    style: {
                      borderRadius: '8px',
                      backgroundColor: '#FFFFFF',
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon className="text-primary" style={{ fontSize: '18px' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button variant="contained" className="inquiries-red-btn" type="submit">Search</Button>
              </Stack>
            </form>



            <div className="inquiries-name">
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker
                  value={selectedDate ? dayjs(selectedDate) : null}
                  onChange={date => setSelectedDate(date)}
                  format="DD/MM/YYYY"
                  slots={{
                    openPickerIcon: () => <CalendarMonthIcon style={{ color: '#c33332' }} />,
                  }}
                  sx={{
                    width: 260,
                    height: 20,
                    '.MuiInputAdornment-root': {
                      color: 'c33332',
                    },
                  }}
                  slotProps={{
                    field: { clearable: true, onClear: () => setCleared(true) },
                  }}
                />
              </LocalizationProvider>
            </div>


          </Stack>

          <>
            {
              error !== null ? (
                <div className="error-box">
                  <h2 className='text-center my-5'>{error}</h2>
                </div>
              ) : (
                <>
                  {
                    loading ? (
                      <LoadingAnimation reviewHeight="review-height" />
                    ) : (
                      inquiries?.length > 0 ? (
                        inquiries.map((item, index) => (
                          <InquiryCard item={item} key={index} />
                        ))
                      ) : (
                        <div className="error-box">
                          <h2 className='text-center my-5'>No Inquiries Found</h2>
                        </div>
                      )
                    )}
                </>
              )
            }

          </>

          {error === null && <Stack spacing={2} direction="row" justifyContent="center">
            <Pagination count={parseInt(totalRowCount)} page={page} onChange={handleChange} />
          </Stack>}
        </div>

      </Container >

    </>
  )
}

export default Inquiries