import React, { useState } from 'react'
import axios from 'axios'
import JobForm from './JobForm'

const AddFormData = (props) => {
    const { addItem } = props

    const [isSaved, setIsSaved] = useState(false)

    const formSubmit = (values,onSubmitProps) => {
        axios.post('http://dct-application-form.herokuapp.com/users/application-form', values)
            .then((response) => {
                const result = response.data
                addItem(result)
                setIsSaved(true)
            }) //success
            .catch((err) => {
                alert(err.message)
            }) //error
    }

    const toggleIsSaved = (props) => {
        setIsSaved(false)
    }

    return (
        <div>
            <JobForm 
                formSubmit={formSubmit}
                isSaved={isSaved}
                toggleIsSaved={toggleIsSaved}
            />
        </div>
    )
}

export default AddFormData