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
    const [ errors, setErrors ] = useState({
        start: '',
        end: '',
        overtime: '',
        pay: '',
        overtimePay: ''
    });

    const validate = () => {
        const reg = {
            number: '^[1-9][0-9]{2,}$',
            time: '^[0-2][0-9]{2}$',
        };
        let start = '',
            end = '',
            pay = '',
            overtime = '',
            overtimePay = '';
        const regexNumber = new RegExp(reg.number);
        const regexTime = new RegExp(reg.time);

        if(!regexNumber.test(pay)) {
            pay = 'Input must be number';
        }
        if(!regexNumber.test(overtimePay)) {
            overtimePay = 'Input must be number'
        }
        if(!regexNumber.test(overtimeLimit)) {
            overtime = 'Input must be number';
        }
        if(!regexTime.test(start)) {
            start = 'Invalid time input';
        }
        if(!regexTime.test(end)) {
            end = 'Invalid time input';
        }
        setErrors({ ...errors, start, end, pay, overtime, overtimePay });
        const keys = Object.keys(errors);
        keys.forEach(item => {
            if(!errors[item]) {
                setShow(false);
            }
        });
    };

    const submitData = e => {
        e.preventDefault();
        let ttl = total;
        const startTime = moment(`${date} ${start}`);
        const endTime = moment(`${date} ${end}`);
        const diff = Math.ceil( endTime.diff(startTime, 'hours') );
        if(diff > overtimeLimit) {
            ttl += (diff - overtimeLimit) * overtimePay;
        }
        ttl += (pay * overtimeLimit);
        setTotal(ttl);
    };

    return (
        <div>
            <form onSubmit={submitData}>
                <div>
                    <label>Start Time</label>
                    <TimePicker value={start} onChange={setStart} />
                    <span>{ errors.start }</span>
                </div>
                <div>
                    <label>End Time</label>
                    <TimePicker value={end} onChange={setEnd} />
                    <span>{ errors.end }</span>
                </div>
                <div>
                    <label>Overtime Hour Limit</label>
                    <input value={overtimeLimit} onChange={e => setOvertimeLimit(e.target.value)}/>
                    <span>{ errors.overtime }</span>
                </div>
                <div>
                    <label>Basic Pay Rate</label>
                    <input value={pay} onChange={e => setPay(e.target.value)}/>
                    <span>{ errors.pay }</span>
                </div>
                <div>
                    <label>Overtime Pay Rate</label>
                    <input value={overtimePay} onChange={e => setOvertimePay(e.target.value)}/>
                    <span>{ errors.overtimePay }</span>
                </div>
                <div>
                    <button type="submit" onClick={() => setShow(true)}>Show your working</button>
                </div>
                {
                    show
                    ? <div>
                        <label>Total Pay</label>
                        <input value={total} readOnly/>
                    </div>
                    : null
                }
            </form>
        </div>
    );
};

export default App;
