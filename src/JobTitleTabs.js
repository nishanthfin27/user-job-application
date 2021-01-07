import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import DevelopersDetails from './DevelopersDetails'

const JobTitleTabs = (props) => {
    const { appliedDatas, editItem } = props

    const frontEndDevelopers = appliedDatas.filter((developer) => {
        return developer.jobTitle === 'Front-End Developer'
    })

    const nodeJsDevelopers = appliedDatas.filter((developer) => {
        return developer.jobTitle === 'Node.js Developer'
    })

    const meanStackDevelopers = appliedDatas.filter((developer) => {
        return developer.jobTitle === 'MEAN Stack Developer'
    })

    const fullStackDevelopers = appliedDatas.filter((developer) => {
        return developer.jobTitle === 'FULL Stack Developer'
    })

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <Tabs>
                <TabList>
                    <Tab className="btn btn-primary">Front-End Developer</Tab>
                    <Tab className="btn btn-primary">Node.js Developer</Tab>
                    <Tab className="btn btn-primary">MEAN Stack Developer</Tab>
                    <Tab className="btn btn-primary">FULL Stack Developer</Tab>
                </TabList>

                <TabPanel>
                    <h2>Front-End Developers</h2>
                    <p>List of candidates applied for Front-End Developer job</p>
                    <DevelopersDetails 
                        frontEndDevelopers={frontEndDevelopers}
                        editItem={editItem}
                    />
                </TabPanel>
                <TabPanel>
                    <h2>Node.js Developers</h2>
                    <p>List of candidates applied for Node.js Developer job</p>
                    <DevelopersDetails 
                        nodeJsDevelopers={nodeJsDevelopers}
                        editItem={editItem}
                    />
                </TabPanel>
                <TabPanel>
                    <h2>MEAN Stack Developers</h2>
                    <p>List of candidates applied for MEAN Stack Developer job</p>
                    <DevelopersDetails 
                        meanStackDevelopers={meanStackDevelopers}
                        editItem={editItem}
                    />
                </TabPanel>
                <TabPanel>
                    <h2>FULL Stack Developers</h2>
                    <p>List of candidates applied for FULL Stack Developer job</p>
                    <DevelopersDetails 
                        fullStackDevelopers={fullStackDevelopers}
                        editItem={editItem}
                    />
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default JobTitleTabs