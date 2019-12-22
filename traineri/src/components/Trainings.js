import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'react-moment'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
        close: {
                padding: theme.spacing(0.5),
        },
}));

export default function Trainings() {

    const classes = useStyles();
    const [trainings, setTrainings] = useState([]);
    const [openDel, setOpenDel] = React.useState(false);
    const delLink = "https://customerrest.herokuapp.com/api/trainings/";

    useEffect(() => fetchData() , []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings', {method: 'GET'})
        	.then(response => response.json())
        	.then(data => setTrainings(data))
		.catch(err => console.error(err));
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
                 return;
         }
         setOpenDel(false);
    };

    const deleteTraining = (link) => {
        if (window.confirm('Are you sure?')) {
        	fetch(delLink + link, { method: 'DELETE' })
                	.then(res => fetchData())
                	.catch(err => console.error(err));
		setOpenDel(true);
        }
    }

    const columns = [
        {
            Header: 'Date',
            accessor: 'date',
            Cell: row => <Moment format="DD/MM/YYYY">{row.date}</Moment>
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'First name',
            accessor: 'customer.firstname'
        },
        {
            Header: 'Last name',
            accessor: 'customer.lastname'
        },
	{
	    sortable: false,
	    filterable: false,
	    width: 100,
	    accessor: "id",
	    Cell: row => <Button color="secondary" size="small" onClick={() => deleteTraining(row.value)}>Delete</Button>
 	}
    ]

    return(
        <div>
		        <ReactTable filterable={true} sortable={true} data={trainings} columns={columns} />
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
        </div>
    );
}
