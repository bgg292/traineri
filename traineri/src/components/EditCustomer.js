import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Editcustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
    })

  const handleClickOpen = () => {
    setCustomer({firstname: props.customer.firstname, lastname: props.customer.lastname, 
        streetaddress: props.customer.streetaddress, postcode: props.customer.postcode, 
        city: props.customer.city, email: props.customer.email, phone: props.customer.phone})
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value })
  }

  const editCustomer = () => {
     props.editCustomer(customer, props.customer.links[0].href);
     handleClose();
  }

    return(
       <div>
      <Button size="small" color="primary" onClick={handleClickOpen}>
       Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
        <DialogContent>
        <TextField
                autoFocus
                margin="dense"
                name="firstname"
                value={customer.firstname}
                onChange={e => handleInputChange(e)}
                label="First name"
                fullWidth
            />
            <TextField
                margin="dense"
                name="lastname"
                value={customer.lastname}
                onChange={e => handleInputChange(e)}
                label="Last name"
                fullWidth
            />
            <TextField
                margin="dense"
                name="streetaddress"
                value={customer.streetaddress}
                onChange={e => handleInputChange(e)}
                label="Street address"
                fullWidth
            />
            <TextField
                margin="dense"
                name="postcode"
                value={customer.postcode}
                onChange={e => handleInputChange(e)}
                label="Postcode"
                fullWidth
            />
            <TextField
                margin="dense"
                name="city"
                value={customer.city}
                onChange={e => handleInputChange(e)}
                label="City"
                fullWidth
            />
            <TextField
                margin="dense"
                name="email"
                value={customer.email}
                onChange={e => handleInputChange(e)}
                label="Email"
                fullWidth
            />
            <TextField
                margin="dense"
                name="phone"
                value={customer.phone}
                onChange={e => handleInputChange(e)}
                label="Phone"
                fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editCustomer} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}
