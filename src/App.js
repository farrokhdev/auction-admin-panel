import React from "react";
import {Router, HashRouter, Route, Switch , Redirect} from "react-router-dom";
import {createHashHistory} from "history";
import HouseAuctionsPage from "./Views/HouseAuctionsPage";
import SingleMemberInfoPage from "./Views/SingleMemberInfoPage";
import {connect} from 'react-redux';
// import ArtworksPage from "./Views/ArtworksPage";
// import SingleViewArtworkPage from "./Views/SingleViewArtworkPage";
// import AuctionPage from "./Views/AuctionsPage";
// import SingleAuctionPage from "./Views/SingleAuctionPage";
// import MembersAuction from "./Views/MembersAuction";
// import MemberAuctionInfo from "./Views/MemberAuctionInfo";
import MembersPage from "./Views/MembersPage";
import LoginPage from "./Views/LoginPage";
// import RegisterPage from "./Views/RegisterPage";
import Main from "./Views/Main";
import Home from "./Views/Home";


// import Main from './public/main'


function App(props) {
    return (
       
            <HashRouter >
                <Router history={createHashHistory()}>
                    <Switch>

                        <Route exact path="/home" render={props=><Main {...props}><Home {...props} /></Main>}/>
                        <Route exact path="/login" render={props=><LoginPage {...props} />}/>
                        {/* <Route exact path="/" render={props=><Main {...props} />}/> */}
                        <Route exact path="/" render={props=><Main {...props}><Home {...props} /></Main>}/>

                        {/* {props.auth.is_logged_in ?  */}
                        
                        <>
                            <Route exact path="/house-auctions" render={props=><Main {...props}><HouseAuctionsPage {...props} /></Main>}/>
                            {/* <Route exact path="/auctions/:id" render={props=><Main {...props} ><SingleAuctionPage {...props}/></Main>}/> */}
                            {/* <Route exact path="/auctions-members/:id" component={MemberAuctionInfo}/>
                            <Route exact path="/auctions-members" component={MembersAuction}/>
                            <Route exact path="/auctions" component={AuctionPage}/>
                            <Route exact path="/artworks/:id" component={SingleViewArtworkPage}/>
                            <Route exact path="/artworks" component={ArtworksPage}/> */}
                            <Route exact path="/members/:id" render={props=><Main {...props} ><SingleMemberInfoPage {...props}/></Main>}/>
                            <Route exact path="/members" render={props=><Main {...props}><MembersPage {...props} /></Main>}/>
                            {/* <Route exact path="/register" render={props=><RegisterPage {...props} />}/> */}
                            {/* <Route exact path="/login" render={props=><LoginPage {...props} />}/> */}
                        </>
                        {/* : <Redirect to = {{pathname : "/login"}} />} */}

                        

                    </Switch>
                </Router>
            </HashRouter>
        
    );
}

// export default App;

const mapStateToProps = (store) => {
    return {
        auth : store.authReducer
    }
}


export default connect(mapStateToProps , null)(App)