import React, { useState } from 'react';
import TimePicker from 'react-time-picker';
import moment from 'moment';

const App = () => {
    const now = moment().format('HH:MM');
    const date = moment().format('MM/DD/YYYY');
    const [ start, setStart ] = useState(now);
    const [ end, setEnd ] = useState(now);
    const [ overtimeLimit, setOvertimeLimit ] = useState(0);
    const [ pay, setPay ] = useState(0);
    const [ overtimePay, setOvertimePay ] = useState(0);
    const [ show, setShow ] = useState(false);
    const [ total, setTotal ] = useState(0);

    const submitData = e => {
        let ttl = total;
        e.preventDefault();
        const startTime = moment(`${date} ${start}`);
        const endTime = moment(`${date} ${end}`);
        const diff = Math.ceil( endTime.diff(startTime, 'hours') );
        if(diff > overtimeLimit) {
            ttl += (diff - overtimeLimit) * overtimePay;
            console.log('ttl', ttl);
        }
        ttl += (pay * overtimeLimit);
        console.log('ttl', ttl);
        setTotal(ttl);
    };

    return (
        <div>
            <form onSubmit={submitData}>
                <div>
                    <label>Start Time</label>
                    <TimePicker value={start} onChange={setStart} />
                </div>
                <div>
                    <label>End Time</label>
                    <TimePicker value={end} onChange={setEnd} />
                </div>
                <div>
                    <label>Overtime Hour Limit</label>
                    <input value={overtimeLimit} onChange={e => setOvertimeLimit(e.target.value)}/>
                </div>
                <div>
                    <label>Basic Pay Rate</label>
                    <input value={pay} onChange={e => setPay(e.target.value)}/>
                </div>
                <div>
                    <label>Overtime Pay Rate</label>
                    <input value={overtimePay} onChange={e => setOvertimePay(e.target.value)}/>
                </div>
                <div>
                    <button type="submit" onClick={() => setShow(true)}>Show your working</button>
                </div>
                {
                    show
                    ? <div>
                        <label>Total Pay</label>
                        <input value={total} readonly/>
                    </div>
                    : null
                }
            </form>
        </div>
    );
};

export default App;
