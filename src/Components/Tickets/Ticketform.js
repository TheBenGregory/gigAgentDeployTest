import React, { useState } from "react"
import { useHistory, useParams } from "react-router";
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import "./Ticketform.css"

export const TicketForm = () => {

    const { ticketId } = useParams()
    const history = useHistory()
    const [ticket, updateTicket] = useState({
        isComplete: false
    }
    );
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = useState(null)
    const [number, setNumber] = useState()
    const submitTicket = (evt) => {
        evt.preventDefault()
        const newTicket = {
            clientName: ticket.clientName,
            consumerId: parseInt(localStorage.getItem("agent_user")),
            userId: parseInt(ticketId),
            date: selectedDate,
            phoneNumber: number,
            time: ticket.time,
            address: ticket.address,
            isComplete: ticket.isComplete,
            userBio: ticket.userBio

        }


       
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTicket)
        }
        return fetch("http://localhost:8088/reqJobs", fetchOption)
            .then(() => {
                history.push("/providers")
            })
    }

    return (
        <div className="card"><>
            <form className="ticketForm">
                <h2 className="ticketForm__title">Request a Showing</h2>
                <div>
                    <div className="form-group">
                        <label htmlFor="clientName">Client Name:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Client Name"
                            onChange={
                                (evt) => {
                                    const copy = { ...ticket }
                                    copy.clientName = evt.target.value
                                    updateTicket(copy)
                                }
                            } />
                    </div>
                </div>
                
                <div>
                    <div className="form-group">
                        <label htmlFor="address">Showing Address:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Address"
                            onChange={
                                (evt) => {
                                    const copy = { ...ticket }
                                    copy.address = evt.target.value
                                    updateTicket(copy)
                                }
                            } />
                    </div>
                </div>
                <div>
                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <ReactDatePicker
                            placeholderText="Date"
                            required
                            selected={selectedDate}
                            onChange={date => setSelectedDate(date)}
                            dateFormat='dd/MM/yyyy'
                            minDate={new Date()}
                            isClearable
                        />
                        {<div
                            onChange={
                                (evt) => {
                                    const copy = { ...ticket }
                                    copy.date = evt.target.value
                                    updateTicket(copy)
                                }} />
                        }
                    </div>
                </div>
                <div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Client Phone:</label>
                        <PhoneInput
                            placeholder="Enter phone number"
                            country={'us'}
                            disableDropdown={"true"}
                            inputStyle={{
                                border: "3px solid #1C6EA4",
                                borderRadius: "px",
                                width: "auto",
                                
                              }}
                              
                            international={false}
                            value={number}
                            onChange={setNumber} />
                        <div
                            onChange={
                                (evt) => {
                                    const copy = { ...ticket }
                                    copy.phoneNumber = evt.target.value
                                    updateTicket(copy)
                                }
                            } />
                    </div>
                </div>
                <div>
                    <div className="form-group">
                        <label htmlFor="time">Time:</label>
                        <input
                            required autoFocus
                            type="time"
                            className="form-control"
                            placeholder=""
                            value="09:00"
                            style={{
                                border: "3px solid #1C6EA4",
                                borderRadius: "5px",
                                width: "auto"
                            }}
                            onChange={
                                (evt) => {
                                    const copy = { ...ticket }
                                    copy.time = evt.target.value
                                    updateTicket(copy)
                                }
                            } />
                    </div>
                </div>
                

<div className="btn">
                <button className="button" onClick={submitTicket}>
                    Send Request
                </button></div>
            </form>
</></div>
        )
}