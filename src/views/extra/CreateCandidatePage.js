import axios from 'axios';
import React, { useState} from 'react';
import { Row, Col, Card, Form, Button, Alert, } from 'react-bootstrap';
import { Country, State, City }  from 'country-state-city';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import { API_SERVER } from '../../config/constant';

const CreateCandidatePage = () => {
    let history = useHistory();
    
    // const [validatedTooltip, setValidatedTooltip] = useState(false);
    // const [supportedCheckbox, setSupportedCheckbox] = useState(false);
    // const [supportedRadio, setSupportedRadio] = useState(false);
    // const [supportedSelect, setSupportedSelect] = useState(0);
    // const [supportedFile, setSupportedFile] = useState(0);

    const allCountries = Country.getAllCountries();
    const allStates = State.getAllStates();
    const allCities = City.getAllCities();
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [candidateName, setCandidateName] = useState("");
    const [candidateEmail, setCandidateEmail] = useState("");
    const [candidateDescription, setCandidateDescription] = useState("");
    const [candidateZipcode, setCandidateZipcode] = useState("");
    const [candidateAddress, setCandidateAddress] = useState("");
    const [candidatePhone, setCandidatePhone] = useState("");
    const [candidateEducation, setCandidateEducation] = useState("");
    const [candidateExperience, setCandidateExperience] = useState("");
    const [candidateWebsite, setCandidateWebsite] = useState("");
    const [candidateResume, setCandidateResume] = useState([]);
    const [candidateStatus, setCandidateStatus] = useState("Applied");
    

    
    function getStates(countryisocode){
        // console.log(country.isoCode);
        let states = allStates.filter(s => s.countryCode === countryisocode);
        // console.log(states);
        return states
    }
    
    function getCities(countryisocode,stateisocode){
        let cities = allCities.filter(s => s.countryCode === countryisocode && s.stateCode === stateisocode);
        // console.log(cities);
        return cities
    }

    function ValidateEmail(input) {

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(input === ""){
            return true;
        }
        else if (input.match(validRegex)) {
          return true;
      
        } else {
      
          toast.error("Invalid email address!",{
              duration: 3000,
          });
          setCandidateEmail('');
          return false;
      
        }
      
      }
    
      function ValidatePhone(input) {

        var validRegex = /^[0-9]{10}$/;
        if(input === ""){
            return true;
        }
        else if (input.match(validRegex)) {
          return true;
      
        } else {
      
          toast.error("Invalid phone number!");
          setCandidatePhone('');
          return false;
      
        }
      
      
      }

    function ValidateURL(input){
         const validurlregex = new RegExp(/[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/ig);
         if(input === ""){
             return true
         }
         else if(input.match(validurlregex)){
            return true;
         }
            else{
                toast.error("Invalid Portfolio URL!",{
                    duration: 3000,
                });
                setCandidateWebsite('');
                return false;
            }

    }
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        var isvalid =false;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            console.log("False");
            isvalid = false;
            
        }
    //    else{ setValidated(true);}

        if (candidateEmail === '' || candidateEmail === null || candidateEmail === undefined) {
            toast.error("Email is required!",{
                duration: 3000,
            });
            isvalid = false;
        }
        else if (candidateName === '' || candidateName === null || candidateName === undefined) {
            toast.error("Name is required!",{
                duration: 3000,
            });
            isvalid = false;    
        }
        else if (candidatePhone === '' || candidatePhone === null || candidatePhone === undefined) {
            toast.error("Phone number is required!",{
                duration: 3000,
            });
            isvalid = false;    
        }
        else if(candidateEducation === "" || candidateEducation === null){
            toast.error("Please enter your education details",{
                duration: 3000,
            });
            isvalid = false;   
        }
        else if(candidateExperience === "" || candidateExperience === null){
            toast.error("Please enter your experience details",{
                duration: 3000,
            });
            isvalid = false;   
        }
        else if(candidateResume === "" || candidateResume === null){
            toast.error("Please upload your resume",{
                duration: 3000,
            });
        }
        else if(candidateZipcode === "" || candidateZipcode === null || candidateZipcode === undefined){ 
            toast.error("Please enter your zipcode",{
                duration: 3000,
            });
            isvalid = false;
        }
        else if(candidateAddress === "" || candidateAddress === null || candidateAddress === undefined){ 
            toast.error("Please enter your Address",{
                duration: 3000,
            });
            isvalid = false;
        }
        else{ 
            if(form.checkValidity() === true){
                if(ValidateEmail(candidateEmail) && ValidatePhone(candidatePhone) && ValidateURL(candidateWebsite)){
                    isvalid = true;
                }
                else{
                    isvalid = false;
                }
            }
        }

        if(isvalid){
            setCandidateStatus('Applied');
            console.log("True");
            console.log("Files",event.target.files)
            var file = candidateResume;
            console.log("Resume",candidateResume);
            var formData = new FormData();
            formData.append('resume', file[0]);
            formData.append('name', candidateName);
            formData.append('email', candidateEmail);
            formData.append('description', candidateDescription);
            formData.append('zipcode', candidateZipcode);
            formData.append('address', candidateAddress);
            formData.append('phone', candidatePhone);
            formData.append('education', candidateEducation);
            formData.append('experience', candidateExperience);
            formData.append('website', candidateWebsite);
            formData.append('status', candidateStatus);
            formData.append('country', allCountries.find(country => country.isoCode===selectedCountry).name);
            formData.append('state', allStates.find(state => state.isoCode===selectedState && state.countryCode === selectedCountry).name);
            formData.append('city', selectedCity);
            console.log("FormData",formData);
            axios.post(API_SERVER + 'candidate', formData)
            .then(function (response) {
                console.log(response);
                if(response.status === 201){
                    history.push('/dashboard/default');
                    
                }
                else{
                    toast.error(response.data,{
                        duration: 3000,
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
                var msg = "";
                for (let [key, value] of Object.entries(error.response.data)) {
                    msg+=`${key}: ${value} \n`;
                  }
                toast.error(msg,{
                    duration: 3000,
                });          
            });
        }
    };

    return (
        <React.Fragment>
            <Row>
            <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Add Candidate</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email<small> *</small></Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" value={candidateEmail} onChange = {e => setCandidateEmail(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Name<small> *</small></Form.Label>
                                        <Form.Control type="text" placeholder="Name" value = {candidateName} onChange = {e => setCandidateName(e.target.value)}/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Phone No<small> *</small></Form.Label>
                                        <Form.Control type="text" placeholder="Enter Phone No" value={candidatePhone} onChange = {e => setCandidatePhone(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Website URL</Form.Label>
                                        <Form.Control type="url" placeholder="Enter portfolio URL" value={candidateWebsite} onChange = {e => setCandidateWebsite(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Education<small> *</small></Form.Label>
                                        <Form.Control type="text" placeholder="Institution Name" value = {candidateEducation} onChange = {e => setCandidateEducation(e.target.value)} />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Describe why you think you are suitable for the job</Form.Label>
                                        <Form.Control as="textarea" rows="3" value={candidateDescription} onChange = {e => setCandidateDescription(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Past Experiences<small> *(enter NA if not applicable)</small></Form.Label>
                                        <Form.Control as="textarea" rows="3" value={candidateExperience} onChange = {e => setCandidateExperience(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Address<small> *</small></Form.Label>
                                    <Form.Control placeholder="1234 Main St" value = {candidateAddress} onChange = {e => setCandidateAddress(e.target.value)} />
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridCountry">
                                        <Form.Label>Country <small>*</small></Form.Label>
                                        <Form.Control as="select" value={selectedCountry} onChange ={e => setSelectedCountry( e.target.value)} >
                                            <option>Choose...</option>
                                            {

                                            allCountries.map((country, index) => {
                                                // console.log(selectedCountry);
                                                return <option key={index}  value={country.isoCode}>{country.name}</option>
                                            })
                                            
                                            }
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridState">
                                        <Form.Label>State<small> *</small></Form.Label>
                                        <Form.Control as="select" value={selectedState} onChange={e => setSelectedState(e.target.value)}>
                                            <option>Choose...</option>
                                            {
                                                getStates(selectedCountry).map((state, index) => {
                                                    // console.log(selectedState);
                                                    return <option key={index} value={state.isoCode}>{state.name}</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Form.Group>

                                   <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>City<small> *</small></Form.Label>
                                       <Form.Control as="select" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
                                            <option>Choose...</option>
                                            {
                                                getCities(selectedCountry,selectedState).map((city, index) => {
                                                    return <option key={index} value={city.name} formval = {city.name}>{city.name}</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridZip">
                                        <Form.Label>Zip<small> *</small></Form.Label>
                                        <Form.Control required value = {candidateZipcode} onChange = {e => setCandidateZipcode(e.target.value)}/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label> Upload Resume<small> *</small></Form.Label>
                                    <Form.Control required onChange={e => {setCandidateResume(e.target.files)}} type="file" />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick = {(e)=>handleSubmit(e)}>Add Candidate</Button>
                            </Form>
                            <Alert>* mark implies mandatory fields</Alert>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CreateCandidatePage;
