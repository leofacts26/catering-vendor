
import TopHeader from "../components/global/TopHeader"
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { InputAdornment, IconButton } from '@mui/material';
import { useState } from "react";
import Divider from '@mui/material/Divider';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';


const AboutUs = () => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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



    return (
        <>
            <TopHeader title="Settings" description="Manage all your personal settings here" />

            <Container maxWidth="lg">
                <div className='card-box-shadow px-5 py-4 mb-4'>
                    <div className='mt-3 bg-primary'>
                    </div>
                    <Grid container spacing={2} className='box-negative'>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                            <div className="ct-box ct-box-padding">
                                <div className="px-4">

                                    <Stack direction="row" alignItems="center" className="mb-3">
                                        <ArrowBackIcon className="cursor-pointer" style={{ fontSize: '18px', color: '#c33332' }} onClick={handleBack} /> <h3 className="faq-heading ms-2">About Us</h3>
                                    </Stack>

                                    <p className="company-change-password mt-3 mb-2">Click to view</p>


                                    <div>
                                        <Accordion className="faq-bg" >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}> About </p>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <h4 className="mb-2">Company's Journey</h4>
                                                <p className="faq-para">
                                                    At Caterings and Tiffins, our journey began with a simple yet profound realization: great food brings people together. Founded 2024, our marketplace was born out of frustration with the limited options available for high-quality catering and tiffin services. We set out to create a platform that would connect customers with reliable, diverse, and talented food providers in their locality. Today, we proudly stand as a leading online marketplace that features a wide array of catering and tiffin services, celebrating culinary diversity while making delicious food easily accessible to everyone.
                                                </p>

                                                <h4 className="mb-2 mt-3">Purpose and Goals</h4>
                                                <p className="faq-para mb-2">Our purpose at Caterings and Tiffins goes beyond just connecting users with food providers; it is about enhancing the overall culinary experience. We aim to simplify the search for catering and tiffin services while ensuring top-notch quality and convenience. Our goals are to:</p>

                                                <p className="faq-para"> •	Foster local vendors and help them reach a broader audience.  </p>
                                                <p className="faq-para"> •	Provide our customers with an easy-to-use platform that offers choice and flexibility.  </p>
                                                <p className="faq-para"> •	Ensure satisfaction for all parties involved through transparency and quality assurance.  </p>

                                                <h4 className="mb-2 mt-3">Introduction to the Team</h4>
                                                <p className="faq-para">
                                                    The heart of Caterings and Tiffins lies in our dedicated team of food enthusiasts, tech experts, and customer service professionals. From our experienced founders who share a passion for gastronomy to our innovative web developers ensuring a seamless user experience, every member brings unique skills and a shared commitment to excellence. Together, we strive to build lasting relationships with our vendors and customers, reinforcing our mission of connecting people through food.
                                                </p>

                                                <h4 className="mb-2 mt-3">Offerings</h4>
                                                <p className="faq-para">
                                                    Caterings and Tiffins offers a comprehensive range of services designed to meet the needs of individuals, families, and businesses:
                                                </p>

                                                <p className="faq-para mt-3"> <b>Catering Services:</b> Find caterers specializing in everything from corporate events to intimate gatherings. Our platform allows you to explore menus, read client reviews, and book directly with service providers.</p>
                                                <p className="faq-para mt-3"> <b>Tiffin Services:</b> Explore a variety of nutritious meals delivered right to your doorstep. Our tiffin options cater to all diets and preferences, ensuring everyone can enjoy home-cooked goodness wherever they are.</p>
                                                <p className="faq-para mt-3"> <b>Customizable Packages:</b> We understand that everyone’s needs are unique. Our platform offers customizable packages that allow you to tailor your services, ensuring the best fit for your occasion or taste.</p>


                                                <h4 className="mb-2 mt-3">Let’s Join Together & Celebrate the Culinary Diversity</h4>
                                                <p className="faq-para">
                                                    Join us in celebrating the joy of good food! Whether you’re planning an event, searching for daily meal options, or simply looking to support local vendors, Caterings and Tiffins is your go-to marketplace. Explore our platform today and discover the wide range of catering and tiffin services we offer. Let us connect you with delectable options that suit your taste and needs. Visit www.cateringsandtiffins.com to get started!
                                                </p>

                                            </AccordionDetails>
                                        </Accordion>
                                    </div>


                                    <div>
                                        <Accordion className="faq-bg" >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}> Cancellation & Refund Policy </p>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <p className="faq-para">
                                                    Thank you for subscribing to Caterings & Tiffins. We value your business and strive to provide excellent service. Please read this policy carefully regarding the cancellation of your subscription.
                                                </p>

                                                <h4 className="mb-2 mt-3">Cancellation Process</h4>
                                                <p className="faq-para">
                                                    You may cancel your Monthly subscription within 3 days & Annual subscription within 7 days from the date of subscription. Refund will be issued, if the cancellation raised within this time period on a prorate basis.
                                                </p>

                                                <h4 className="mb-2 mt-3">Refund Policy</h4>
                                                <p className="faq-para">
                                                    We do not issue refunds for full or partial subscription periods after the cancellation date. When you cancel, you will continue to have access to your subscription until the end of your current billing period.
                                                </p>

                                                <h4 className="mb-2 mt-3">Recurring Billing</h4>
                                                <p className="faq-para">
                                                    Subscriptions are automatically renewed unless cancelled. You authorize us to charge your provided payment method at the beginning of each billing period.
                                                </p>

                                                <h4 className="mb-2 mt-3">Renewal Cancellation Deadline</h4>
                                                <p className="faq-para">
                                                    To avoid being charged for the next billing cycle, you must cancel your subscription 48 hours before the renewal date. Cancellations made after the renewal date will be effective for the following billing cycle.
                                                </p>




                                            </AccordionDetails>
                                        </Accordion>
                                    </div>


                                    <div>
                                        <Accordion className="faq-bg" >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}> Disclaimer </p>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <p className="faq-para">
                                                    This Disclaimer governs your use of the [Cateringsandtiffins.com] online marketplace for listing and promoting catering and tiffin services. By registering as a vendor, caterer, or tiffin service provider, you acknowledge and agree to the following:
                                                </p>

                                                <h4 className="mb-2 mt-3">1. Platform as a Service Provider</h4>
                                                <p className="faq-para">
                                                    1.	[Cateringsandtiffins.com] acts solely as a facilitator connecting vendors, caterers, and tiffin service providers with customers. We do not provide or guarantee catering or tiffin services directly.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    2.	The platform does not take ownership of the food quality, delivery, or any other service provided by vendors. Vendors are solely responsible for fulfilling orders and adhering to applicable standards.
                                                </p>

                                                <h4 className="mb-2 mt-3">2. Vendor Responsibilities</h4>
                                                <p className="faq-para mb-3">
                                                    1.	Vendors, caterers, and tiffin service providers are solely responsible for:
                                                </p>
                                                <p className="faq-para mb-2">
                                                    o Ensuring the quality, hygiene, and safety of food prepared and delivered.
                                                </p>
                                                <p className="faq-para mb-2">
                                                    o Complying with local food safety regulations and obtaining required certifications, such as FSSAI licenses or equivalents.
                                                </p>
                                                <p className="faq-para">
                                                    o Providing accurate descriptions, prices, and availability of their services on the platform.
                                                </p>

                                                <h4 className="mb-2 mt-3">2. The platform will not be liable for: </h4>
                                                <p className="faq-para mb-2">
                                                    o	Misrepresentation of services or unauthorized claims made by vendors.
                                                </p>
                                                <p className="faq-para">
                                                    o	Foodborne illnesses, quality issues, or any other customer grievances related to the vendor’s service.
                                                </p>


                                                <h4 className="mb-2 mt-3">3. Limitation of Liability</h4>
                                                <p className="faq-para">
                                                    1.	[Cateringsandtiffins.com] will not be liable for:
                                                </p>
                                                <p className="faq-para mt-3">
                                                    o	Losses, damages, or disputes arising out of vendor’s interactions with customers.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    o	Any interruptions in the platform’s services due to technical issues, maintenance, or unforeseen circumstances.
                                                </p>

                                                <p className="faq-para mt-3">
                                                    2.	Vendors are encouraged to maintain their own liability insurance to cover potential claims related to their services.
                                                </p>



                                                <h4 className="mb-2 mt-3">4. Data Accuracy and Privacy</h4>
                                                <p className="faq-para">
                                                    1.	Vendors must ensure the accuracy of the information provided on the platform, including business details, menu items, and pricing.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    2.	Vendors are required to handle customer data obtained through the platform responsibly and in compliance with applicable privacy laws. Misuse of customer data is strictly prohibited.
                                                </p>


                                                <h4 className="mb-2 mt-3">5. Compliance and Indemnification</h4>
                                                <p className="faq-para">
                                                    1.	Vendors, caterers, and tiffin service providers agree to comply with all applicable laws, including food safety, tax regulations, and business licensing requirements.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    2.	Vendors agree to indemnify and hold [Cateringsandtiffins.com] harmless from any claims, losses, or damages arising from:
                                                </p>

                                                <p className="faq-para mt-3">
                                                    o	Violation of laws or regulations.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    o	Breach of the platform’s terms and conditions.
                                                </p>

                                                <p className="faq-para mt-3">
                                                    o	Customer disputes or complaints regarding the vendor’s services.
                                                </p>



                                                <h4 className="mb-2 mt-3">6. Disclaimer of Warranties</h4>
                                                <p className="faq-para">
                                                    1.	[Cateringsandtiffins.com] does not guarantee:
                                                </p>

                                                <p className="faq-para mt-3">
                                                    o	The volume or frequency of orders received by vendors.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    o	Continuous or error-free access to the platform.
                                                </p>

                                                <p className="faq-para mt-3">
                                                    2.	Vendors acknowledge that the platform may experience downtimes or technical issues, and these do not entitle vendors to any claims or compensation.
                                                </p>


                                                <h4 className="mb-2 mt-3">7. Amendments</h4>
                                                <p className="faq-para">
                                                    1.	[Cateringsandtiffins.com] reserves the right to update or modify this disclaimer at any time. Vendors will be notified of significant changes via email or platform notifications.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    2.	Continued use of the platform after such updates constitutes acceptance of the revised disclaimer.
                                                </p>


                                                <h4 className="mb-2 mt-3">8. Governing Law</h4>
                                                <p className="faq-para">
                                                    This disclaimer is governed by the laws of [Country/Region]. Any disputes will fall under the jurisdiction of [Local Courts/Arbitration Rules].
                                                </p>
                                                <p className="faq-para mt-3">
                                                    By registering and using [Cateringsandtiffins.com] as a vendor, caterer, or tiffin service provider, you agree to adhere to this disclaimer and the platform’s terms of service. Non-compliance may result in account suspension or termination.
                                                </p>




                                            </AccordionDetails>
                                        </Accordion>
                                    </div>


                                    <div>
                                        <Accordion className="faq-bg" >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1-content"
                                                id="panel1-header"
                                            >
                                                <p className="settings-faq-title" style={{ fontSize: '14px', fontWeight: '500' }}> Terms and Conditions </p>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <p className="faq-para">
                                                    This document outlines the terms and conditions governing the participation of vendors, including caterers and tiffin service providers, on cateringsandtiffins.com. By registering as a vendor, you agree to these terms. Failure to comply may result in suspension or termination of your account.
                                                </p>

                                                <h4 className="mb-2 mt-3">1. Definitions</h4>
                                                <p className="faq-para">
                                                    •	<b>Platform:</b> Refers to [Platform Name], the online marketplace facilitating the connection between vendors and customers.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    •	<b>Vendor:</b> Refers to caterers, tiffin service providers, or any registered business offering food-related services on the platform.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    •	<b>Customer:</b> Individuals or entities availing services through the platform.
                                                </p>



                                                <h4 className="mb-2 mt-3">2. Vendor Registration</h4>
                                                <h5 className="mb-2 mt-3"> Eligibility:</h5>
                                                <p className="faq-para">
                                                    o	Vendors must have all necessary legal permits, licenses (e.g., FSSAI for India), and certifications to operate.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    o	Vendors must be at least 18 years old and legally authorized to run their business.
                                                </p>


                                                <h5 className="mb-2 mt-3"> Documentation Required:</h5>
                                                <p className="faq-para">
                                                    o	Business registration certificates.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    o	FSSAI (Food Safety and Standards Authority of India) license or equivalent.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    o	GST registration (if applicable).
                                                </p>


                                                <h5 className="mb-2 mt-3"> Account Information:</h5>
                                                <p className="faq-para">
                                                    o	Vendors must provide accurate details, including business name, address, contact information, and services offered.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    o	Vendors are responsible for maintaining the confidentiality of login credentials.
                                                </p>



                                                <h4 className="mb-2 mt-3">3. Vendor Obligations</h4>
                                                <h5 className="mb-2 mt-3"> Service Quality:</h5>
                                                <p className="faq-para">
                                                    o	Vendors must ensure the highest standards of food quality, hygiene, and safety.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    o	Tiffin services must provide meals that adhere to dietary preferences and food safety regulations.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    o	Caterers must deliver orders as per the agreed specifications, quantity, and timeline.
                                                </p>


                                                <h5 className="mb-2 mt-3">Order Management:</h5>
                                                <p className="faq-para">
                                                    o	Vendors must promptly accept or reject orders within the time specified.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    o	Orders accepted must be fulfilled without delays or quality compromises.
                                                </p>


                                                <h5 className="mb-2 mt-3"> Communication:</h5>
                                                <p className="faq-para">
                                                    o	Vendors must respond to customer inquiries and platform notifications in a timely and professional manner.
                                                </p>

                                                <h5 className="mb-2 mt-3">Content and Listings:</h5>
                                                <p className="faq-para">
                                                    o	Vendors must provide accurate descriptions, pricing, and photographs of their services.
                                                </p>
                                                <p className="faq-para">
                                                    o	Misleading or inappropriate content will lead to removal or suspension.
                                                </p>

                                                <h5 className="mb-2 mt-3"> Compliance:</h5>
                                                <p className="faq-para">
                                                    o	Vendors must comply with local laws, food safety regulations, and the platform's policies.
                                                </p>



                                                <h4 className="mb-2 mt-3">4. Customer Feedback</h4>
                                                <p className="faq-para">
                                                    Customers have the right to rate and review vendor services.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    Vendors may not manipulate or solicit fake reviews. Any such actions will result in penalties.
                                                </p>


                                                <h4 className="mb-2 mt-3">5. Payments and Commissions</h4>
                                                <p className="faq-para mt-3">
                                                    Payments are processed on a [weekly/monthly] basis, after deducting applicable fees and commissions.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    Vendors must ensure their banking details are accurate to avoid payment delays.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    The platform is not liable for delays caused by incorrect vendor information.
                                                </p>


                                                <h4 className="mb-2 mt-3">6. Suspension and Termination</h4>
                                                <p className="faq-para mt-3">
                                                    The platform reserves the right to suspend or terminate vendor accounts for:
                                                </p>

                                                <p className="faq-para mt-2">
                                                    o	Repeated complaints from customers.
                                                </p>
                                                <p className="faq-para mt-2">
                                                    o	Breach of terms and conditions.
                                                </p>

                                                <p className="faq-para mt-2">
                                                    o	Non-payment of fees or penalties.
                                                </p>

                                                <p className="faq-para mt-3">
                                                    Vendors may terminate their account with prior notice of 30 days. Fees already paid will not be refunded.
                                                </p>



                                                <h4 className="mb-2 mt-3">7. Liability</h4>
                                                <p className="faq-para mt-3">
                                                    Vendors are solely responsible for the quality, preparation, and delivery of food/services.
                                                </p>

                                                <p className="faq-para mt-3">
                                                    The platform is not liable for:
                                                </p>

                                                <p className="faq-para mt-2">
                                                    o	Food quality issues.
                                                </p>
                                                <p className="faq-para mt-2">
                                                    o	Delays caused by the vendor.
                                                </p>

                                                <p className="faq-para mt-2">
                                                    o	Any disputes between the vendor and customers.
                                                </p>


                                                <h4 className="mb-2 mt-3">8. Confidentiality</h4>
                                                <p className="faq-para mt-3">
                                                    Vendors must maintain the confidentiality of customer data obtained through the platform.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    Vendors are prohibited from using platform information for unauthorized purposes.
                                                </p>


                                                <h4 className="mb-2 mt-3">9. Dispute Resolution</h4>
                                                <p className="faq-para mt-3">
                                                    Disputes between the vendor and platform will be resolved amicably.
                                                </p>
                                                <p className="faq-para mt-3">
                                                    Unresolved disputes will be subject to arbitration in accordance with [Applicable Laws/Local Jurisdiction].
                                                </p>


                                                <h4 className="mb-2 mt-3">10. Amendments</h4>
                                                <p className="faq-para mt-3">
                                                    The platform reserves the right to modify these terms. Vendors will be notified of changes via email or platform notifications. Continued use of the platform constitutes acceptance of the updated terms.
                                                </p>


                                                <h4 className="mb-2 mt-3">11. Governing Law</h4>
                                                <p className="faq-para mt-3">
                                                    These terms are governed by the laws of [Country/Region]. Any disputes will fall under the jurisdiction of [Local Courts/Arbitration Rules].
                                                </p>


                                            </AccordionDetails>
                                        </Accordion>
                                    </div>





                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    )
}

export default AboutUs