import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';
import EditCustomer from './EditCustomer';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
        close: {
                padding: theme.spacing(0.5),
        },
}));

export default function Customers() {

    const classes = useStyles();
    const [customers, setCustomers] = useState([]);
    const [openSave, setOpenSave] = React.useState(false);
    const [openDel, setOpenDel] = React.useState(false);
    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
                return;
        }
        setOpenDel(false);
        setOpenSave(false);
    };

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err));
	setOpenSave(true);
    }

    const editCustomer = (customer, link) => {
        fetch(link,   {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(customer)
     })
        .then(res => fetchData())
        .catch(err => console.error(err));
	setOpenSave(true);
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
       	  fetch(link, {method: 'DELETE'})
          .then(res => fetchData())
          .catch(err => console.error(err));
        }
	setOpenDel(true);
    }

    const addTraining = (training, link) => {
	console.log(link);
        fetch('https://customerrest.herokuapp.com/api/trainings', {
          method : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err));
	setOpenSave(true);
      }

    const columns = [

        {
            Header: 'First name',
            accessor: 'firstname'
        },
        {
            Header: 'Last name',
            accessor: 'lastname'
        },
        {
            Header: 'Street Address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <EditCustomer editCustomer={editCustomer} customer={row.original}/>
        },
        {
            sortable: false,
            filterable: false,
            width: 150,
            accessor: "links[0].href",
            Cell: row => <AddTraining addTraining={addTraining} training={row.original}/>
          },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links[0].href',
            Cell: row => <Button color="secondary" size="small" onClick={() => deleteCustomer(row.value)}>Delete</Button>
        }


    ]


    return(
        <div>
	    		<AddCustomer addCustomer={addCustomer} />
            		<ReactTable filterable={true} sortable={true} data={customers} columns={columns} />
                        <Snackbar
                                anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                }}
                                open={openDel}
                                autoHideDuration={6000}
                                onClose={handleClose}
                                ContentProps={{
                                        'aria-describedby': 'message-id',
                                }}
                                message={<span id="message-id">Deleted!</span>}
                                action={[
                                        <IconButton
                                                key="close"
                                                aria-label="close"
                                                color="inherit"
                                                className={classes.close}
                                                onClick={handleClose}
                                        >
                                                <CloseIcon />
                                        </IconButton>,
                                ]}
                        />
                        <Snackbar
                                anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                }}
                                open={openSave}
                                autoHideDuration={6000}
                                onClose={handleClose}
                                ContentProps={{
                                        'aria-describedby': 'message-id',
                                }}
                                message={<span id="message-id">Saved!</span>}
                                action={[
                                        <IconButton
                                                key="close"
                                                aria-label="close"
                                                color="inherit"
                                                className={classes.close}
                                                onClick={handleClose}
                                        >
                                                <CloseIcon />
                                        </IconButton>,
                                ]}
                        />
        </div>
    );
}
