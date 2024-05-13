import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';

const BranchesCard = ({ branches, onHandleEdit, handleToggleStatus }) => {
    return (
        <>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                <div className="branches-card">
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" alignItems="center" spacing={1} className='green-switch'>
                            <p className='branches-active'>Active</p>
                            <Switch onChange={() => handleToggleStatus(branches)} checked={branches?.status === "1"} size="small" style={{ color: '#459412' }} />
                        </Stack>
                        <div>
                            <EditIcon style={{ color: '#c33332', fontSize: '18px' }} onClick={() => onHandleEdit(branches)} />
                        </div>
                    </Stack>
                    <div className='mt-3'>
                        <h4 className='branches-title'>{branches?.catering_service_name}</h4>
                        <p className='branches-desc mb-1'>{branches?.contact_person_name}</p>
                        <p className='branches-desc mb-1'>{branches?.phone_number}</p>
                        <p className='branches-desc'>{branches?.formatted_address}</p>
                    </div>
                </div>
            </Grid>
        </>
    )
}

export default BranchesCard