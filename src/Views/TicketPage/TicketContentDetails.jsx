import React from 'react'
import TicketBoxAdmin from './TicketBoxAdmin'
import TicketBoxUser from './TicketBoxUser'
import TicketBoxUserFirst from './TicketBoxUserFirst';

function TicketContentDetails({ticketDetails}) {

    return (
        <>
            <TicketBoxUserFirst ticketDetails={ticketDetails}/>

            {ticketDetails?.reply?.map(ticket => (
                (ticket?.owner?.id === ticketDetails?.owner) ? <TicketBoxUser ticket={ticket}/> : <TicketBoxAdmin ticket = {ticket}/>
            ))}
        </>
    )
}

export default TicketContentDetails;