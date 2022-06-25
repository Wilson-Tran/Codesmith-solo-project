import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import DeleteDialog from './DeleteDialog';
import { ButtonGroup } from '@mui/material';





const Patients = () => {
  const [ patients, setPatients ] = useState([]);
  const [ fetchedPatients, setFetchedPatients ] = useState(false);
  

  useEffect(() => {
    fetch('/api/patients')
      .then(res => {
        console.log('first .then ', res);
        return res.json();
      })
      .then((patientData) => {
        if (!Array.isArray(patientData)) {
          console.log('not an array');
          patientData = [];
        } 
        setPatients(patientData);
        setFetchedPatients(true);
      })
      .catch(err => console.log('Patients.componentDidMount: get characters: ERROR: ', err));
  }, []);
  
  if (!fetchedPatients) return (
    <div>
      <h1>Loading data, please wait...</h1>
    </div>
  );


  // console.log('this is patients in state: ', patients);  
    
  // if (!patients) return null;

  // if (!patients.length) return (
  //   <div>Sorry, no patients found</div>
  // );

  // const patientElems = patients.map((char, i) => {
  //   return (
  //   // <div className='patientContainer' key={i}>
  //   //   <div className='patientInfo'>Patient ID: {char._id.slice(-7)}</div >
  //   //   <div className='patientInfo'>Name: {char.firstName} {char.lastName}</div >
  //   //   <div className='patientInfo'>Date of Birth: {Moment(char.dob).format('MM/DD/YYYY')}</div >
  //   //   <div className='patientInfo'>Physician: {char.doctor}</div>
  //   //   <Button className='editPatientBtn' variant=''>Edit Patient Info</Button>
  //   // </div>

  //     {char}
  //   );
  // });

  // return (
  //   <section className="mainSection">
  //     <header className="pageHeader">
  //       <h2>All Patients</h2>
  //       <Link to={'/create'}>
  //         <button
  //           type="button"
  //           className="btnSecondary">
  //           Create Patient
  //         </button>
  //       </Link>
  //     </header>
  //     <div className="patientContainer">
  //       <br></br>
  //       <ul className="no-bullets">
  //         {patientElems}
  //       </ul>
          
  //     </div>
  //   </section>
  // );

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row._id.slice(-7)}
          </TableCell>
          <TableCell align="right">{row.firstName} {row.lastName}</TableCell>
          <TableCell align="right">{row.contact ? row.contact.phone : 'N/A'}</TableCell>
          <TableCell align="right">{row.doctor}</TableCell>
          <TableCell align="right">
            <Link to={'/update/' + row._id} className="backLink">
              <Button size="medium" variant="contained">Edit Info</Button>
            </Link>
            <DeleteDialog id={row._id}></DeleteDialog>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.appointments.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell>
                        <TableCell align="right">
                          {Math.round(historyRow.amount * row.price * 100) / 100}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
    
  return (
    <div className="patientsContainer">
      <div className="newPatientBtnContainer">
        <Link to="/create" className="backLink">
          <Button className="newPatientBtn" variant="contained">New Patient</Button>
        </Link>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Patient ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Contact</TableCell>
              <TableCell align="right">Physician</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};


export default Patients;