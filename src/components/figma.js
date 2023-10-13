import * as React from "react"

const Figma = ({url, urlMobile}) => {
  
    return (

        <>

            <div className="block-figma-mobile">
                
                <iframe title="Figma prototype - Mobile" src={"https://www.figma.com/embed?embed_host=danilonobre&url="+urlMobile+"&hide-ui=1&hotspot-hints=1&scaling=scale-down-width"} allowfullscreen></iframe>  
                
            </div>
            
            <div className="block-figma">
                
                <iframe title="Figma prototype" src={"https://www.figma.com/embed?embed_host=danilonobre&url="+url+"&hide-ui=1&hotspot-hints=1&scaling=scale-down-width"} allowfullscreen></iframe>  
                
            </div>
        
        </>

    )

}
  
export default Figma