import React,{useState, useEffect} from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import {useParams, useHistory} from 'react-router-dom';
import Card from '../../components/Card/MainCard';
import { API_SERVER } from '../../config/constant';
import axios from 'axios';
import toast from 'react-hot-toast';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const DetailedCandidateView = () => {
    const params = useParams();
    let history = useHistory();
    const candidateid = params.id;
    const [candidateDetails, setCandidateDetails] = useState({});
    const [status,setStatus] = useState('Applied');
    const status_states = ['Applied','Accepted','Rejected']
    useEffect(() => {
        axios.get(API_SERVER + `candidate/${candidateid}`)
        .then(res => {
            setCandidateDetails(res.data);
            setStatus(res.data.status);
        })
        .catch(err => {
            if(err.response.status === 404){
                toast.error("Candidate not found",{
                    duration: 3000,
                });
                history.push('/dashboard/default');
            }
        })
    }, [candidateid,history]);

    const handleStatusSelect = (event) =>{
        console.log(event.target.value);
        setStatus(event.target.value);
    }

    const handleSaveStatus = (event) =>{
        event.preventDefault();
        event.stopPropagation();
        if(window.confirm("Are you sure you want to save this status?"))
        {
            axios.patch(API_SERVER + `candidate/${candidateid}`,{status:status})
            .then(res => {
                toast.success("Status saved successfully",{
                    duration: 3000,
                });
            })
            .catch(err => {
                toast.error(err.response.data,{
                    duration: 3000,
                });
            })
        }   
    } 
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card title="Status Actions" isOption>
                    <Form.Group as={Row} controlId="formPlaintextEmail1">
                                <Form.Label column sm="3">
                                    Status
                                </Form.Label>
                                <Col sm="9">
                               
                                <select className={status==='Accepted' ? 'border p-1 btn-success': status==='Rejected'? 'border p-1 btn-danger': 'border p-1 btn-primary'} value={status} onChange={e => handleStatusSelect(e)}>
                                    <option>{status}</option>
                                    {status_states.filter(s=>s!==status).map((state,index) => {
                                        return <option key={index} value={state}>{state}</option>
                                    })}
                                </select>
                        
                                </Col>
                                <button className="btn btn-secondary ml-2 mt-5 mb-0" onClick={e => handleSaveStatus(e)}>Save Changes</button>
                            </Form.Group>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card title="Personal Information" isOption>
                            <Form.Group as={Row} controlId="formPlaintextEmail1">
                                <Form.Label column sm="3">
                                    Name
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue={candidateDetails.name} />
                                </Col>
                                <Form.Label column sm="3">
                                    Email
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue={candidateDetails.email} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="3">
                                    Education
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue={candidateDetails.education===""?"NA":candidateDetails.education} />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="3">
                                    Phone Number
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue={candidateDetails.phone==="" || candidateDetails.phone===null?"Not Provided":candidateDetails.phone} />
                                </Col>
                                <Form.Label column sm="3">
                                    Address
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue={candidateDetails.address==="" || candidateDetails.address===null?"Not Provided":candidateDetails.address} />
                                </Col>
                                <Form.Label column sm="3">
                                    Country
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue={candidateDetails.country==="" || candidateDetails.country===null?"Not Provided":candidateDetails.country} />
                                </Col>
                                <Form.Label column sm="3">
                                    State
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue={candidateDetails.state==="" || candidateDetails.state===null?"Not Provided":candidateDetails.state} />
                                </Col>
                                <Form.Label column sm="3">
                                    City
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue={candidateDetails.city==="" || candidateDetails.city===null?"Not Provided":candidateDetails.city} />
                                </Col>
                                <Form.Label column sm="3">
                                    Zip Code
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue={candidateDetails.zipcode==="" || candidateDetails.zipcode===null?"Not Provided":candidateDetails.zipcode} />
                                </Col>
                            </Form.Group>
                    </Card>
                </Col>
            </Row>
            {/* Next Section */}
            <Row>
                <Col>
                    <Card title="Description" isOption>
                            <p>{candidateDetails.description==="" || candidateDetails.description === null?'Not Provided':candidateDetails.description}</p>
                    </Card>
                </Col>
            </Row>
            {/* Next Section */}
            <Row>
                <Col>
                    <Card title="Experience" isOption>
                            <p>{candidateDetails.experience==="" || candidateDetails.experience === null?'Not Provided':candidateDetails.experience}</p>
                    </Card>
                </Col>
            </Row>

            {/* Next Section */}
            <Row>
                <Col>
                    <Card title="Portfolio Links" isOption>
                        <Form.Group as={Row} controlId="formPlaintextEmail1">
                                <Form.Label column sm="3">
                                    Website
                                </Form.Label>
                                <Col sm="9">
                                <p><a rel="noreferrer" target="_blank" style={candidateDetails.website===""||candidateDetails.website===null?{color:"black",pointerEvents:"none"}:{}} href={candidateDetails.website===""||candidateDetails.website===null?"#":candidateDetails.website}>{candidateDetails.website===""||candidateDetails.website===null?"Not Provided":candidateDetails.website}</a></p> 
                                </Col>
                                
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextEmail1">
                                <Form.Label column sm="3">
                                    Resume
                                </Form.Label>
                                <Col sm="9">
                                    
                                    <p><a rel="noreferrer" target="_blank" href={candidateDetails.resume}>{candidateDetails.resume===""||candidateDetails.resume===null?"Not Provided":<DocViewer pluginRenderers={DocViewerRenderers} documents = {[{uri:candidateDetails.resume}]} />}</a></p> 
                                   
                                </Col>
                                
                        </Form.Group>
                        
                    </Card>
                </Col>
            </Row>

        </React.Fragment>
    );
};

export default DetailedCandidateView;
