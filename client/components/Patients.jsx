import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedPatients: false,
      patients: []
    };
  }

  componentDidMount() {
    fetch('/api/patients')
      .then(res => {
        return res.json();
      })
      .then((patients) => {
        if (!Array.isArray(patients)) {
          console.log('response is not an array');
          patients = [];
        } 
        return this.setState({
          patients, 
          fetchedPatients: true
        });
      })
      .catch(err => console.log('Patients.componentDidMount: get characters: ERROR: ', err));
  }

  render() {
    if (!this.state.fetchedPatients) return (
      <div>
        <h1>Loading data, please wait...</h1>
      </div>
    );

    const { patients } = this.state;
    console.log('this is patients in state: ', patients);  
    if (!patients) return null;

    if (!patients.length) return (
      <div>Sorry, no patients found</div>
    );

    const patientElems = patients.map((char, i) => {
      return (
        <li key={i}>{char.firstName} {char.lastName}, {char.doctor}</li>
      );
    });

    return (
      <section className="mainSection">
        <header className="pageHeader">
          <h2>All Patients</h2>
          <Link to={'/create'}>
            <button
              type="button"
              className="btnSecondary">
              Create Patient
            </button>
          </Link>
        </header>
        <div className="patientContainer">
          <br></br>
          <ul className="no-bullets">
            {patientElems}
          </ul>
          
        </div>
      </section>
    );
  }
}

export default Patients;