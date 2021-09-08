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
import SendMessagePage from "./Views/SendMessagePage";
import ArtworkListPage from "./Views/ArtworkListPage";
import SingleViewArtworkPage from "./Views/SingleViewArtworkPage/SingleViewArtworkPage";
import AddNewArtwork from "./Views/AddNewArtwork/AddNewArtwork";
import RecoveryPasswordPage from './Views/RecoveryPasswordPage/RecoveryPasswordPage';
import ConfirmCodeOtpPage from "./Views/ConfirmCodeOtpPage/ConfirmCodeOtpPage";
import SetpasswordPage from "./Views/SetpasswordPage/SetpasswordPage";
import AuctionsOfHouseAuctionPage from "./Views/AuctionsOfHouseAuctionPage/AuctionsOfHouseAuctionPage";
// import SingleHouseAuctionDetails from "./Views/SingleHouseAuctionDetails/SingleHouseAuctionDetails";
import ShowDetailHouseAuctionPage from "./Views/ShowDetailHouseAuctionPage";
import ParticipantsInAuctionList from "./Views/ParticipantsInAuctionList";
import CheckMembershipAuctionPage from "./Views/CheckMembershipAuctionPage";
import MessagesList from "./Views/MessagesList/MessagesList";
import TicketPage from "./Views/TicketPage/TicketPage";
import SendNewTicket from './Views/SendNewTicketPage';
import ApplicantsMembershipInAuctionList from './Views/ApplicantsMembershipInAuctionList';
import AuctionsPage from "./Views/AuctionsPage";
// import AddNewAuctionPage from "./Views/AddNewAucitonPage/AddNewAuctionPage";
import AddNewAuctionPage from "./Views/AddAuction";
import SalesConsulerPage from "./Views/SalesConsulerPage";
import SingleSaleConsulerPage from "./Views/SingleSaleConsulerPage";
import HouseAuctionOffers from "./Views/HouseAuctionOffers";
import WalletPage from "./Views/WalletPage";
import DetailWalletPage from "./Views/WalletPage/detail";
import WalletDeposit from "./Views/WalletDeposit";
import WalletWithdrawal from "./Views/WalletWithdrawal";
import OrdersListPage from "./Views/OrdersListPage";
import FrequentlyAskedQuestions from "./Views/FrequentlyAskedQuestions";
import SingleFrequentlyAskedQuestions from "./Views/SingleFrequentlyAskedQuestions";
import SingleViewAuctionPage from "./Views/SingleViewAuctionPage/SingleViewAuctionPage";
import AuctionParticipantsListPage from "./Views/AuctionParticipantsListPage/AuctionParticipantsListPage";
import AddNewQuestionCategory from "./Views/AddNewQuestionCategory";
import HouseAuctionRequestPage from "./Views/HouseAuctionRequestPage";
import CreateContentPage from "./Views/CreateContentPage";



// import Main from './public/main'

function App(props) {
    
    console.log("LOgin ))) ",props.auth.is_logged_in);


    return (
       
            <HashRouter >
                <Router history={createHashHistory()}>
                    <Switch>

                        <Route exact path="/home" render={props=><Main {...props}><Home {...props} /></Main>}/>
                        <Route exact path="/login" render={props=><LoginPage {...props} />}/>
                        <Route exact path="/recovery-password" render={props=><RecoveryPasswordPage {...props} />}/>
                        <Route exact path="/confirm-code" render={props=><ConfirmCodeOtpPage {...props} />}/>
                        <Route exact path="/set-password" render={props=><SetpasswordPage {...props} />}/>
                        {/* <Route exact path="/" render={props=><Main {...props} />}/> */}
                        {/* <Route exact path="/" render={props=><Main {...props}><Home {...props} /></Main>}/> */}
                        <Route exact path="/" render={props=><Main {...props}><LoginPage {...props} /></Main>}/>

                        {props.auth.is_logged_in ? 
                        
                        <>
                            <Route exact path="/house-auctions-offers" render={props=><Main {...props}><HouseAuctionOffers {...props} /></Main>}/>
                            <Route exact path="/sales-consuler" render={props=><Main {...props}><SalesConsulerPage {...props} /></Main>}/>
                            <Route exact path="/sales-consuler/:id" render={props=><Main {...props}><SingleSaleConsulerPage {...props} /></Main>}/>
                            <Route exact path="/house-auctions/auctions/:id/:name" render={props=><Main {...props}><AuctionsOfHouseAuctionPage {...props} /></Main>}/>
                            <Route exact path="/house-auctions-participants/:id" render={props=><Main {...props}><ParticipantsInAuctionList {...props} /></Main>}/>
                            <Route exact path="/house-auctions-applicants/:id" render={props=><Main {...props}><ApplicantsMembershipInAuctionList {...props} /></Main>}/>
                            <Route exact path="/check-membership-auctions/:id" render={props=><Main {...props}><CheckMembershipAuctionPage {...props} /></Main>}/>
                            <Route exact path="/house-auctions/:id" render={props=><Main {...props}><ShowDetailHouseAuctionPage {...props} /></Main>}/>
                            <Route exact path="/house-auctions" render={props=><Main {...props}><HouseAuctionsPage {...props} /></Main>}/>
                            <Route exact path="/house-auctions-requests" render={props=><Main {...props}><HouseAuctionRequestPage {...props} /></Main>}/>
                            {/*<Route exact path="/add-new-auction" render={props=><Main {...props}><AddNewAuctionPage {...props} /></Main>}/>*/}
                            <Route exact path="/add-new-auction/:auctionId" render={props=><Main {...props}><AddNewAuctionPage {...props} /></Main>}/>
                            <Route exact path="/auctions" render={props=><Main {...props}><AuctionsPage {...props} /></Main>}/>
                            <Route exact path="/auctions/:id" render={props=><Main {...props}><SingleViewAuctionPage {...props} /></Main>}/>
                            <Route exact path="/auctions-participants/:id" render={props=><Main {...props} ><AuctionParticipantsListPage {...props}/></Main>}/>
                            <Route exact path="/inbox-messages" render={props=><Main {...props}><MessagesList {...props} /></Main>}/>
                            <Route exact path="/send-message" render={props=><Main {...props}><SendMessagePage {...props} /></Main>}/>
                            <Route exact path="/tickets" render={props=><Main {...props}><TicketPage {...props} /></Main>}/>
                            <Route exact path="/wallets" render={props=><Main {...props}><WalletPage {...props} /></Main>}/>
                            <Route exact path="/wallets/:id" render={props=><Main {...props}><DetailWalletPage {...props} /></Main>}/>
                            <Route exact path="/wallet-deposit" render={props=><Main {...props}><WalletDeposit {...props} /></Main>}/>
                            <Route exact path="/wallet-withdrawal" render={props=><Main {...props}><WalletWithdrawal {...props} /></Main>}/>
                            <Route exact path="/orders" render={props=><Main {...props}><OrdersListPage {...props} /></Main>}/>
                            <Route exact path="/add-question-category" render={props=><Main {...props}><AddNewQuestionCategory {...props} /></Main>}/>
                            <Route exact path="/frequently-asked-questions" render={props=><Main {...props}><FrequentlyAskedQuestions {...props} /></Main>}/>
                            <Route exact path="/frequently-asked-questions/:id" render={props=><Main {...props}><SingleFrequentlyAskedQuestions {...props} /></Main>}/>
                            <Route exact path="/create-content" render={props=><Main {...props}><CreateContentPage {...props} /></Main>}/>
                            {/* <Route exact path="/send-ticket" render={props=><Main {...props}><SendNewTicket {...props} /></Main>}/> */}
                            {/* <Route exact path="/auctions/:id" render={props=><Main {...props} ><SingleAuctionPage {...props}/></Main>}/> */}
                            {/* <Route exact path="/auctions-members/:id" component={MemberAuctionInfo}/>
                            <Route exact path="/auctions-members" component={MembersAuction}/>
                            <Route exact path="/auctions" component={AuctionPage}/>
                            <Route exact path="/artworks/:id" component={SingleViewArtworkPage}/>
                            <Route exact path="/artworks" component={ArtworksPage}/> */}
                            <Route exact path="/members/:id" render={props=><Main {...props} ><SingleMemberInfoPage {...props}/></Main>}/>
                            <Route exact path="/members" render={props=><Main {...props}><MembersPage {...props} /></Main>}/>
                            <Route exact path="/artworks" render={props=><Main {...props}><ArtworkListPage {...props} /></Main>}/>
                            <Route exact path="/artworks/:id" render={props=><Main {...props}><SingleViewArtworkPage {...props} /></Main>}/>
                            <Route exact path="/add-artwork" render={props=><Main {...props}><AddNewArtwork {...props} /></Main>}/>
                            {/* <Route exact path="/register" render={props=><RegisterPage {...props} />}/> */}
                            {/* <Route exact path="/login" render={props=><LoginPage {...props} />}/> */}
                        </>

                        : <Redirect to = {{pathname : "/login"}} />}

                        

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
