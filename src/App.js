import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
const APIBASEURL = 'https://cdn-api.co-vin.in/api/v2';
const DISTRICTLISTENDPOINT = '/admin/location/districts/';
const KERALANUMBER = '17';
const DATABYDISTRICTENDPOINT = '/appointment/sessions/public/calendarByDistrict?&district_id=';

function App() {
  const [districtList, setDistrictList] = useState([]);
  const [centerList, setCenterList] = useState([]);
  const [district, setDistrict] = useState('');
  const distRef = useRef(district);
  distRef.current = district;
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(loading);
  loadingRef.current = loading;
  const [loadingDist, setLoadingDist] = useState(false);
  // let timerId;
  const INTERVAL = 10000;
  const [lastRefreshTime, setlastRefreshTime] = useState(moment().format('LTS'));
  const timerId = useRef(null);
  useEffect(() => {
    setLoadingDist(true);
    axios.get(`${APIBASEURL}${DISTRICTLISTENDPOINT}${KERALANUMBER}`)
      .then(resp => {
        setDistrictList(resp.data.districts || []);
        setLoadingDist(false);
        resp.data.districts && resp.data.districts.length > 0 && setDistrict(resp.data.districts[0].district_id);
      })
      .catch(e => {
        alert("error:", e)
        setLoadingDist(false);
      })
    //call api every given interval. starting on mount
    // timerId.current = setInterval(getData, INTERVAL);
    return () => clearInterval(timerId.current);
  }, []);
  useEffect(() => {
    console.log("cleared", timerId.current)
    clearInterval(timerId.current);
    getData();
    timerId.current = setInterval(getData, INTERVAL);
    console.log("new for next", timerId.current)
  }, [district]);
  const getData = async () => {
    console.log("distRef.current", distRef.current, "loadingRef.current", loadingRef.current, "timerId.current", timerId.current)
    if (distRef.current) {
      console.log("calling api")
      setLoading(true);
      const dateInput = moment().format('DD-MM-YYYY');
      axios.get(`${APIBASEURL}${DATABYDISTRICTENDPOINT}${distRef.current}&date=${dateInput}`)
        .then(resp => {
          setCenterList(resp.data.centers);
          setLoading(false);
          setlastRefreshTime(moment().format('LTS'));
        })
        .catch(e => {
          alert("error:", e);
          setLoading(false);
        })
    }
    else {
      console.log("skipped api")
    }
  }
  return (
    <div className="App">
      <div>Select your district to see Covid vaccine slots</div>
      <div className='distList'>
        {
          loadingDist === true ? 'Loading...'
            : <>
              {
                districtList.length > 0 ?
                  <div className=''>
                    {districtList.map(districtItem => {
                      return (
                        <div className={districtItem.district_id === district ? 'chatItem selectedDist' : 'chatItem'} key={districtItem.district_id} onClick={() => setDistrict(districtItem.district_id)}>{districtItem.district_name}</div>
                      )
                    })}
                  </div>
                  : 'No Districts available'
              }
            </>
        }
      </div>
      <div>Auto refreshes in every {INTERVAL / 1000} seconds. Last refresh:{lastRefreshTime}</div>
      <div className='chatWindow'>
        {
          // loading === true ? 'Loading...'
          //   :
          centerList.length > 0 ? centerList.map(center => {
            return (
              <div key={center.center_id} className='messageInBubble'>
                <div className='centerTitle'>
                  <div className='centerName'>{center.name}-{center.block_name}</div>
                  <div className={center.fee_type === 'Free' ? 'greenText centerFee' : 'redText centerFee'}>{center.fee_type}</div>
                </div>
                <div className='centerAddress'>{center.address} - {center.pincode}</div>
                <div className='feeContainer'>
                  {
                    center.vaccine_fees.map(vac => <div className='slotTime'>{`${vac.vaccine} : ₹ ${vac.fee}`}</div>)
                  }
                </div>
                {
                  center.sessions.length > 0 && center.sessions.map(session => {
                    return (
                      <div key={session.session_id} className={session.available_capacity ? 'availableBG sessionContainer' : 'notAvailableBG sessionContainer'}>
                        <div className='vaccineName'>{loading === true ? 'Refreshing...' : session.vaccine}</div>
                        <div className='vaccineDate'>{session.date}</div>
                        <div className='vaccineCapacity'><span>Age limit: {session.min_age_limit || 'NA'} to {session.max_age_limit || 'NA'}</span> <span>Dose1: {session.available_capacity_dose1}</span> <span>Dose2: {session.available_capacity_dose2}</span></div>
                        <div className='slotContainer'>
                          {
                            session.slots.length > 0 && session.slots.map((slot, index) => {
                              return (
                                <div key={index} className='slotTime'>{`${slot.time} (${slot.seats} seats)`}</div>
                              )
                            })
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
            : 'No Centers are available for the selected district. Refresh after some time.'
        }
      </div>
      <div>Have suggestions? Please submit at <a href='https://github.com/imismailpe/vaccinapp'>https://github.com/imismailpe/vaccinapp</a></div>
    </div>
  );
}

export default App;
