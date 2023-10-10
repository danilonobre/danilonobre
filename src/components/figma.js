import * as React from "react"

const Figma = ({url, urlMobile}) => {
  
    return (

        <>

            <div className="block-figma-mobile">
                
                <iframe src={"https://www.figma.com/embed?embed_host=danilonobre&url="+urlMobile+"&hide-ui=1"} allowfullscreen></iframe>  
                
            </div>
            
            <div className="block-figma">
                
                <iframe src={"https://www.figma.com/embed?embed_host=danilonobre&url="+url+"&hide-ui=1"} allowfullscreen></iframe>  
                
            </div>
        
        </>

    )

}
  
export default Figma