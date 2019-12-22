import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function AddTraining(props) {

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
          .then((response) => response.json())
          .then((responseData) => {
            setCustomer(responseData.content)
          });
      };

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState([]);
    const [training, setTraining] = React.useState({
        activity: '', date: new Date(), duration: ''
    });

    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value});
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    
      
    const handleClose = () => {
        setOpen(false);
    };

    const addTraining = () => {
		props.addTraining(training);
		handleClose();
    };


    return(
        <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>Add training</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                <TextField
	    					margin="dense"
						variant="outlined"
						style={{ marginBottom: 15 }}
						onChange={(e) => handleInputChange(e)}
	    					name="date"
						type="datetime-local"
						value={training.date}
					/>

                    <TextField
                        id="outlined-basic"
						margin="dense"
						variant="outlined"
						style={{ marginBottom: 15, marginLeft: 5 }}
						label="Duration"
						onChange={(e) => handleInputChange(e)}
						name="duration"
						value={training.duration}
                    >
                    </TextField>
                    <TextField
						id="outlined-basic"
						margin="dense"
						variant="outlined"
						style={{ marginBottom: 15 }}
						label="Activity"
						onChange={(e) => handleInputChange(e)}
						name="activity"
						value={training.activity}
		    >
                    </TextField>
                    <TextField
                        			select
			                        margin="dense"
	    					style={{ marginBottom: 15, marginLeft: 25 }}
                        			name="customer"
			                        defaultValue={fetchData}
                        			value={training.customer}
                        			helperText="Customer"
                    >
                    			        {customer.map(customer => (
                        			<MenuItem value={customer.links[0].href} key={customer.links[0].href}>
                            				{customer.firstname} {customer.lastname}
                        			</MenuItem>
                        			))}
                    </TextField>

                </DialogContent>
                <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button autoFocus onClick={addTraining} color="primary">
                            Add
                        </Button>
                    </DialogActions>
            </Dialog>
        </div>
        
    );

}
