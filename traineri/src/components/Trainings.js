import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Moment from 'react-moment'

export default function Trainings() {
    const [trainings, setTrainings] = useState([]);
    
    useEffect(() => fetchData() , []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
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
            Header: 'Customer',
            accessor: 'cstomer.id'
        },
    ]

    return(
        <div>
            <ReactTable filterable={true} data={trainings} columns={columns} />

        </div>
    );
}
