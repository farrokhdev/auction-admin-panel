import React, {Component} from 'react';
import {FaMapMarker} from "react-icons/fa";
import { Modal } from 'reactstrap';
import {IoIosArrowRoundForward,IoIosArrowDropleft,IoIosClose} from "react-icons/io";
import  { Map, TileLayer, Marker, Popup }  from 'react-leaflet'
import L from "leaflet";


// import './leaflet.scss';
import '../../assets/SCSS/leaflet.scss';

class Location extends Component {
   
    constructor(props) {
        
        super(props);

        this.state={

            isOpen:false,
            isOpenMap:false,
            zoom:13,
            position :this.props.singleSpacification?.project_location ? this.props.singleSpacification?.project_location :["35.790655" , "51.420518"] 

        }
        
    }
    

    
    componentDidMount(){
        if(this.props.singleSpacification?.project_location){
            this.setState({position : this.props.singleSpacification?.project_location})
        }
              

        delete L.Icon.Default._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });

        navigator.geolocation.getCurrentPosition(function(location) {

        });
    }
    render() {
        
        return (
            <>
                {/* <button value={""} onClick={()=>this.setState({isOpenMap:true})} className="box-detail py-3 p-2 d-block w-100 mt-2">

                    <p className="d-flex align-items-center justify-content-between "
                       style={{lineHeight: '2.2rem'}}>
                                <span>
                                      <span className="text-MainColor"><FaMapMarker/></span>
                                <span className="mr-2">
                                </span>
                                </span>
                        <span className="text-MainColor font-size-2"><IoIosArrowDropleft/></span>
                    </p>
                </button> */}
                {/* <Modal centered={true} size="lg" isOpen={this.state.isOpenMap} onClosed={()=>this.setState({isOpenMap:false})}> */}
                     {/* <button onClick={()=>this.setState({isOpenMap:false})}>X</button> */}
                <div className="contentMap">

                    <Map
                        ref={r=>this.map=r}
                        center={this.props.singleSpacification?.project_location ? this.props.singleSpacification?.project_location : ["35.790655" , "51.420518"] }
                        zoom={this.state.zoom}
                        onzoomend={e=>this.setState({zoom:e.target._zoom})}
                        style={{width:"100%",height:"500px"}}
                        // onclick={e=>{
                        //     this.setState({position:[e.latlng.lat,e.latlng.lng]})}}
                             >
                        <TileLayer
                            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            // attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            attribution="<a href=http://app.biithome.com>app.biithome.com</a>"
                            />
                        <Marker
                            position={this.props.singleSpacification?.project_location ? this.props.singleSpacification?.project_location : ["35.790655" , "51.420518"] }
                        
                          >
                            <Popup>موقعیت ملک</Popup>
                        </Marker>
                    </Map>
                            </div>
                {/* </Modal> */}
            </>
        );
    }
}

export default Location;
