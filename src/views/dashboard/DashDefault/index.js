import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { Row, Col, Card, Table, Button, } from 'react-bootstrap';
import axios from 'axios';
// import AmChartEarnings from './chart/AmChartEarnings';
// import AmChartStatistics6 from './chart/AmChartStatistics6';
import { API_SERVER } from './../../../config/constant';
import avatar from '../../../assets/images/user/avatar-neutral.png';
// import avatar2 from '../../../assets/images/user/avatar-2.jpg';
// import avatar3 from '../../../assets/images/user/avatar-3.jpg';




const DashDefault = () => {
    let history = useHistory();
    const [candidates, setCandidates] = useState([]);
    const [acceptedcandidates, setAcceptedCandidates] = useState([]);
    const [rejectedcandidates, setRejectedCandidates] = useState([]);
    const [pendingcandidates, setPendingCandidates] = useState([]);
    const [refreshdata, setRefreshdata] = useState(false);
    // console.log(candidates);
    useEffect(() => {
        axios
          .get(API_SERVER+'candidate')
          .then((response) => {
                    // console.log(response.data);
                    setCandidates(response.data);
                    // setCandidates(response.data.filter(candidate => candidate.status === 'Applied'));
                    setPendingCandidates(response.data.filter(candidate => candidate.status === 'Applied'));
                    setAcceptedCandidates(response.data.filter(candidate => candidate.status === 'Accepted'));
                    setRejectedCandidates(response.data.filter(candidate => candidate.status === 'Rejected'));
                    setRefreshdata(false);
                }
                
                )
          .catch((error) => console.log(error));
        
        }, [refreshdata]);
          
    // Handling Reject Candidates button
    
    const handleReject = (event) => {
        event.preventDefault();
        event.stopPropagation();
        axios
            .patch(API_SERVER + `candidate/${event.target.id}`,{
                status: 'Rejected'
            })
            .then((response) => {
                console.log(response.data);
                var rejectedlist = rejectedcandidates;
                rejectedlist.push(response.data);
                setRejectedCandidates(rejectedlist);
                setPendingCandidates(candidates.filter(candidate => candidate.id !== event.target.id && candidate.status === 'Applied'));
                setRefreshdata(true);
                
            })
            .catch((error) => console.log(error));
    }
    // Handling Accept Candidates button
    const handleAccept = (event) => {
        event.preventDefault();
        event.stopPropagation();
        axios
            .patch(API_SERVER + `candidate/${event.target.id}`,{
                status: 'Accepted'
            })
            .then((response) => {
                console.log(response.data);
                var acceptedlist = rejectedcandidates;
                acceptedlist.push(response.data);
                setAcceptedCandidates(acceptedlist);
                setRefreshdata(true)
                setPendingCandidates(candidates.filter(candidate => candidate.id !== event.target.id && candidate.status === 'Applied'));
            
                
            })
            .catch((error) => console.log(error));
    }      
    
    const handleView = (event) => {
        event.preventDefault();
        event.stopPropagation();
        history.push(`/detailedView/${event.target.id}`);
    }
    
    const PendingCandidateTable = () =>{
        if(pendingcandidates.length >0){
            return(
            pendingcandidates.map((candidate,index) => {
                                            
                return (
                    <tr className="unread">
                    <td>
                        <img className="rounded-circle" style={{ width: '40px', marginLeft:'10px' }} src={avatar} alt="activity-user" />
                    </td>
                    <td>
                        <h6 className="mb-1">{candidate.name}</h6>
                        <a rel="noreferrer" target="_blank" href={candidate.resume} className="m-0" style={{maxWidth:'50px'}}><i className="feather icon-link-2"></i> <span style={{ fontSize: '0.9em'}}>View Resume</span></a>
                    </td>
                    <td>
                        <h6 className="text-muted">
                        {/* <i className="fa fa-circle text-c-green f-10 r-15 b-0" /> */}
                            <div className="col">
                                <div className="row justify-content-center"><h5>Status</h5></div>
                                <div className="row justify-content-center">{candidate.status}</div>
                            </div>
                            
                        </h6>
                    </td>
                    <td>
                        <Button id={candidate.id}  onClick={e =>{handleView(e)}}   className="label theme-bg2 text-white f-12">
                            View More
                        </Button>
                        <Button id={candidate.id} onClick={e=>handleAccept(e)} className="label theme-bg text-white f-12">
                            Approve
                        </Button>
                        <Button id={candidate.id} onClick={e=>handleReject(e)} className="label theme-bg3 text-white f-12">
                            Reject
                        </Button>
                    </td>
                </tr>
                )
            })
            )
        }
        else{
            return(
                <tr>
                    <td colSpan="4" className="text-center">No Pending Candidates</td>
                </tr>
            )
        }
    }
    // To handle Accepted Candidates Table
    const AcceptedCandidateTable = () =>{
        if(acceptedcandidates.length >0){
            return(
                acceptedcandidates.map((candidate,index) => {
                                            
                    return (
                        <tr className="unread">
                        <td>
                            <img className="rounded-circle" style={{ width: '40px',marginLeft: '10px' }} src={avatar} alt="activity-user" />
                        </td>
                        <td>
                            <h6 className="mb-1">{candidate.name}</h6>
                            {/* <p className="m-0" style={{maxWidth:'50px'}}>{candidate.description}</p> */}
                        </td>
                        <td>
                            <h6 className="text-muted">
                            {/* <i className="fa fa-circle text-c-green f-10 r-15 b-0" /> */}
                                <div className="col">
                                    <div className="row justify-content-center"><h5>Status</h5></div>
                                    <div className="row justify-content-center">{candidate.status}</div>
                                </div>
                                
                            </h6>
                        </td>
                        <td>
                        <Button id={candidate.id}  onClick={e =>{handleView(e)}}   className="label theme-bg2 text-white f-12">
                                View More
                            </Button>
                        </td>
                    </tr>
                    )
                })
            )
        }
        else{
            return(
                <tr>
                    <td colSpan="4" className="text-center">No Accepted Candidates</td>
                </tr>
            )
        }
    }
    // Function ends here
    // To handle Rejected Candidates Table
    const RejectedCandidateTable = () =>{
        if(rejectedcandidates.length >0){
            return(
                rejectedcandidates.map((candidate,index) => {
                    return (
                        <tr className="unread">
                        <td>
                            <img className="rounded-circle" style={{ width: '40px' }} src={avatar} alt="activity-user" />
                        </td>
                        <td>
                            <h6 className="mb-1">{candidate.name}</h6>
                            {/* <p className="m-0" style={{maxWidth:'50px'}}>{candidate.description}</p> */}
                        </td>
                        <td>
                            <h6 className="text-muted">
                            {/* <i className="fa fa-circle text-c-green f-10 r-15 b-0" /> */}
                                <div className="col">
                                    <div className="row justify-content-center"><h5>Status</h5></div>
                                    <div className="row justify-content-center">{candidate.status}</div>
                                </div>
                                
                            </h6>
                        </td>
                        <td>
                        <Button id={candidate.id}  onClick={e =>{handleView(e)}}   className="label theme-bg2 text-white f-12">
                                View More
                            </Button>
                        </td>
                    </tr>
                    )
                })
            )
        }
        else{
            return(
                <tr>
                    <td colSpan="4" className="text-center">No Rejected Candidates</td>
                </tr>
            )
        }
    }

    return (
        <React.Fragment>
            <Row>
                <Col md={6} xl={8}>
                <Card className="Recent-Users">
                        <Card.Header>
                            <Card.Title as="h5">Candidates to be reviewed</Card.Title>
                        </Card.Header>
                        <Card.Body className="px-0 py-2">
                            <Table responsive hover>
                                <tbody>
                                    {   
                                       
                                        PendingCandidateTable()
                                       
                                    } 
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={4}>
                    <Card>
                        <Card.Body className="border-bottom">
                            <div className="row d-flex align-items-center">
                                <div className="col-auto">
                                    <i className="feather icon-user f-30 text-c-blue" />
                                </div>
                                <div className="col">
                                    <h3 className="f-w-300">{pendingcandidates.length}</h3>
                                    <span className="d-block text-uppercase">PENDING REVIEW</span>
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Body className="border-bottom">
                            <div className="row d-flex align-items-center">
                                <div className="col-auto">
                                    <i className="feather icon-check-circle f-30 text-c-green" />
                                </div>
                                <div className="col">
                                    <h3 className="f-w-300">{acceptedcandidates.length}</h3>
                                    <span className="d-block text-uppercase">ACCEPTED</span>
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Body className="border-bottom">
                            <div className="row d-flex align-items-center">
                                <div className="col-auto">
                                    <i className="feather icon-x-circle f-30 text-c-red" />
                                </div>
                                <div className="col">
                                    <h3 className="f-w-300">{rejectedcandidates.length}</h3>
                                    <span className="d-block text-uppercase">REJECTED</span>
                                </div>
                            </div>
                        </Card.Body>
                        
                    </Card>
                </Col>
            </Row>
            <Row>
            <Col md={6} xl={6}>
                <Card className="Recent-Users">
                        <Card.Header>
                            <Card.Title as="h5">Accepted Candidates</Card.Title>
                        </Card.Header>
                        <Card.Body className="px-0 py-2">
                            <Table responsive hover>
                                <tbody>
                                    {
                                      AcceptedCandidateTable()  
                                    }
                                     </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={6}>
                <Card className="Recent-Users">
                        <Card.Header>
                            <Card.Title as="h5">Rejected Candidates</Card.Title>
                        </Card.Header>
                        <Card.Body className="px-0 py-2">
                            <Table responsive hover>
                                <tbody>
                                    {
                                      RejectedCandidateTable() 
                                    }
                                     </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default DashDefault;
