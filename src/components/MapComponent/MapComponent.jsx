import React , {useState , useEffect} from 'react'
import  { Map, TileLayer, Marker, Popup }  from 'react-leaflet'
import L from "leaflet";


function MapComponent({location}) {

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenMap, setisOpenMap] = useState(false);
    const [zoom, setZoom] = useState(13);
    const [position, setPosition] = useState(["35.790655" , "51.420518"]);


    useEffect(() => {
      

        if(location){
            setPosition(location)
        }
              

        delete L.Icon.Default._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });

        navigator.geolocation.getCurrentPosition(function(location) {

        });
    }, []);

    return (
         <React.Fragment>
            <div className="contentMap">

                <Map
                    // ref={r=>this.map=r}
                    center={ location ? location : ["35.790655" , "51.420518"] }
                    zoom={zoom}
                    onzoomend={e=>setZoom(e.target._zoom)}
                    style={{width:"100%",height:"200px"}}

                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        // attribution="<a href=http://biithome.com>biithome.com</a>"
                    />
                    <Marker
                        position={location ? location : ["35.790655" , "51.420518"] }
                    >
                        <Popup>موقعیت خانه حراجی</Popup>
                    </Marker>
                </Map>
                
            </div>
        </React.Fragment>
    )
}

export default MapComponent




// import React, {Component} from 'react';
// import  { Map, TileLayer, Marker, Popup }  from 'react-leaflet'
// import L from "leaflet";
// import '../../assets/style/leaflet.scss';

// class MapComponent extends Component {


    
   
//     constructor(props) {
        
//         super(props);

//         this.state={

//             isOpen:false,
//             isOpenMap:false,
//             zoom:13,
//             position : this.props.singleEstate?.estate_location ? this.props.singleEstate?.estate_location :["35.790655" , "51.420518"] 

//         }
        
//     }
    
//     componentDidMount(){
//         if(this.props.singleEstate?.estate_location){
//             this.setState({position : this.props.singleEstate?.estate_location})
//         }
              

//         delete L.Icon.Default._getIconUrl;

//         L.Icon.Default.mergeOptions({
//             iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//             iconUrl: require("leaflet/dist/images/marker-icon.png"),
//             shadowUrl: require("leaflet/dist/images/marker-shadow.png")
//         });

//         navigator.geolocation.getCurrentPosition(function(location) {

//         });
//     }
//     render() {
        
//         return (
//             <React.Fragment>
                
//                 <div className="contentMap">

//                     <Map
//                         ref={r=>this.map=r}
//                         center={this.props.singleEstate?.estate_location ? this.props.singleEstate?.estate_location : ["35.790655" , "51.420518"] }
//                         zoom={this.state.zoom}
//                         onzoomend={e=>this.setState({zoom:e.target._zoom})}
//                         style={{width:"100%",height:"200px"}}
                    
//                     >
//                         <TileLayer
//                             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                             // attribution="<a href=http://biithome.com>biithome.com</a>"
//                         />
//                         <Marker
//                             position={this.props.singleEstate?.estate_location ? this.props.singleEstate?.estate_location : ["35.790655" , "51.420518"] }
//                         >
//                             <Popup>موقعیت خانه حراجی</Popup>
//                         </Marker>
//                     </Map>
//                             </div>
//             </React.Fragment>
//         );
//     }
// }

// export default MapComponent;