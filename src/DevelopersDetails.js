import React, { useState } from 'react'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


toast.configure()
const DevelopersDetails = (props) => {
    const { frontEndDevelopers, nodeJsDevelopers, meanStackDevelopers, fullStackDevelopers, editItem } = props

    const [user, setUser] = useState({})
    const [show, setShow] = useState(false)

    let developers
    if(frontEndDevelopers) {
        developers = frontEndDevelopers
    }else if(nodeJsDevelopers) {
        developers = nodeJsDevelopers
    } else if(meanStackDevelopers) {
        developers = meanStackDevelopers
    }else {
        developers = fullStackDevelopers
    }


    const viewDetails = (id) => {

        axios.get(`http://dct-application-form.herokuapp.com/users/application-form/${id}`)
            .then((response) => {
                const result = response.data
                setUser(result)
                setShow(true)
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    const handleClose = () => {
        setShow(false)
    }

    const updateShortlist = (data) => {
        
        const obj = { 'status': 'shortlisted'}
        axios.put(`https://dct-application-form.herokuapp.com/users/application-form/update/${data._id}`, obj)
        .then((response) => {
            const result = response.data
            editItem(result)
            toast.success('shortlisted')
        })
        .catch((err) => {
            alert(err.message)
        })
    }

    const updateReject = (data) => {
        
        const obj = { 'status': 'rejected'}
        axios.put(`https://dct-application-form.herokuapp.com/users/application-form/update/${data._id}`, obj)
        .then((response) => {
            const result = response.data
            editItem(result)
            toast.error('rejected')
        })
        .catch((err) => {
            alert(err.message)
        })
    }

    return (
        <div>
            <table  className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Technical Skills</th>
                    <th>Experience</th>
                    <th>Applied Date</th>
                    <th>View Details</th>
                    <th>Update Application Status</th>
                </tr>
                </thead>
                <tbody>
                    { 
                        developers.map((data) => {
                            return (
                                <tr key={data._id}>
                                    <td> {data.name} </td>
                                    <td> {data.skills} </td>
                                    <td> {data.experience} </td>
                                    <td> {data.createdAt.slice(0,10)} </td>
                                    <td> <button onClick={() => {
                                        viewDetails(data._id)
                                    }} type="button" className="btn btn-info">
                                    View Details</button> </td>
                                    {data.status === 'applied' ? (
                                        <td>
                                        <button onClick={() => {
                                            updateShortlist(data)
                                        }} type="button" className="btn btn-success">
                                            Shortlist</button>
                                        <button onClick={() => {
                                            updateReject(data)
                                        }} type="button" className="btn btn-danger">
                                            Reject</button>
                                    </td>
                                    ) : data.status === 'shortlisted' ? (
                                        <td> 
                                            <button type="button" className="btn btn-success">Shortlisted
                                            </button> 
                                        </td>
                                    ) : (
                                        <td> 
                                            <button  type="button" className="btn btn-danger">Rejected
                                            </button> 
                                        </td>
                                    ) }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{user.name} Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> contact number: {user.phone}</p>
                    <p> email: {user.email}</p>
                    <p> skills: {user.skills}</p>
                    <p> experience: {user.experience}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DevelopersDetails