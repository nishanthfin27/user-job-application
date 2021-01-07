import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AddFormData from './AddFormData'
import JobTitleTabs from './JobTitleTabs'
import { Link, Route } from 'react-router-dom'
import Home from './Home'
import { SliderData } from './SliderData'
import './App.css'

const Container = (props) => {
    const [appliedDatas, setAppliedDatas] = useState([])

    useEffect(() => {
        axios.get('https://dct-application-form.herokuapp.com/users/application-forms')
            .then((response) => {
                const result = response.data
                setAppliedDatas(result)
            }) // success
            .catch((err) => {
                alert(err.message)
            }) // error
    })

    const addItem = (item) => {
        setAppliedDatas([...appliedDatas, item])
    }

    const editItem = (item) => {
        const result = appliedDatas.map((data) => {
            if(data._id === item._id) {
                return {...data, ...item}
            } else {
                return {...data}
            }
        })
        setAppliedDatas(result)
    }

    return (
        <div>
            <Link to='/'>Home</Link> ||
            <Link to='/jobForm'>Job Form</Link> ||
            <Link to='/adminDashboard'>Admin Dashboard</Link>

            
            <Route  exact path='/' render={(props) => {
                    return <Home
                    {...props}
                    slides={SliderData}
                    />
            }} />

            <Route  exact path='/jobForm' render={(props) => {
                    return <AddFormData
                    {...props}
                    addItem={addItem}
                    />
            }} />

            <Route  exact path='/adminDashboard' render={(props) => {
                    return <JobTitleTabs
                    {...props}
                    appliedDatas={appliedDatas}
                    editItem={editItem}
                    />
            }} />
        </div>
    )
}

export default Container