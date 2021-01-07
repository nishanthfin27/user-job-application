import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

const JobForm = (props) => {

    const { formSubmit, isSaved, toggleIsSaved } = props

    const designations = ['Front-End Developer','Node.js Developer','MEAN Stack Developer','FULL Stack Developer']
    
    const initialValues = {
        name: '',
        email: '',
        phone: '',
        JobTitle: '',
        experience: '',
        skills:''
    }
      
    const onSubmit = (values,onSubmitProps) => {
            formSubmit(values)

            if(isSaved) {
                onSubmitProps.setSubmitting(false)
                onSubmitProps.resetForm()
                toggleIsSaved()
            }
         }

    const validationSchema = yup.object({
            name: yup.string().required('name field should not be blank'),
            email: yup.string().email('please enter valid email').required('email field should not be blank'),
            phone: yup.string().required('contactNumber field should not be blank'),
            experience: yup.string().required('experience field should not be blank'),
            skills: yup.string().required('skills field should not be blank')
        })
    
    return (
        <div className="p-3 mb-2 bg-danger text-white">
            <h1>Apply for Job</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='form' >

                    <label>Full name</label>
                    <Field type='text' placeholder='name' id='name' name='name'/>
                    <ErrorMessage name='name' className='error'/><br />
                

                    <label>Email address</label>
                    <Field type='text' placeholder='email' id='email' name='email'/>
                    <ErrorMessage name='email' className='error'/><br />
                

                    <label>Contact Number</label>
                    <Field type='text' placeholder='contact number' id='phone' name='phone'/>
                    <ErrorMessage name='phone' className='error'/><br />
                    


                    <label>Applying for Job</label>
                    <Field as='select' id='jobTitle' name='jobTitle'> 
                        <option value="">----Select----</option>
                            {
                                designations.map((designation,i) => {
                                return <option key={i} value={ designation }> { designation } </option>
                                })
                            }
                    </Field> <br /> <br />
                

                    <label>Experience</label>
                    <Field type='text' placeholder='experience' id='experience' name='experience'/>
                    <ErrorMessage name='experience' className='error'/><br />
                

                    <label>Technical Skills</label>
                    <Field type='text' placeholder='skills' id='skills' name='skills'/>
                    <ErrorMessage name='skills' className='error'/><br />


                    <input type="submit" value="send Application" className="btn btn-primary"/>
                
                </Form>
            </Formik>
        </div>
    )
}

export default JobForm