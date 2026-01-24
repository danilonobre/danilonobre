import React from "react"
const Contacts = ({ data, ...props }) => (

  <>

    <ul>
      
      <li><a href={data.email} target="_blank" rel="noreferrer"><span>Email</span></a></li>
      
      <li><a href={data.linkedin} target="_blank" rel="noreferrer"><span>Linkedin</span></a></li>

    </ul>

  </>
  
)
export default Contacts