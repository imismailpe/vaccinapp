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
  const [loadingDist, setLoadingDist] = useState(false);
  let timerId;
  const INTERVAL = 10000;
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
    //nested settimeout to refresh data every given interval
    timerId = setTimeout(function tick() {
      clearTimeout(timerId);
      getData();
      timerId = setTimeout(tick, INTERVAL);
    }, INTERVAL);
    return () => clearTimeout(timerId);
  }, []);
  useEffect(() => {
    getData();
  }, [district]);
  const getData = () => {
    setLoading(true);
    const dateInput = moment().format('DD-MM-YYYY');
    distRef.current && axios.get(`${APIBASEURL}${DATABYDISTRICTENDPOINT}${distRef.current}&date=${dateInput}`)
      .then(resp => {
        setCenterList(resp.data.centers);
        setLoading(false);
      })
      .catch(e => {
        alert("error:", e);
        setLoading(false);
      })
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
      <div>Data will auto refresh in every {INTERVAL/1000} seconds.</div>
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
                  {
                    center.sessions.length > 0 && center.sessions.map(session => {
                      return (
                        loading === true ? 'Loading...'
                        :<div key={session.session_id} className={session.available_capacity ? 'availableBG sessionContainer' : 'notAvailableBG sessionContainer'}>
                          <div className='vaccineName'>{session.vaccine}</div>
                          <div className='vaccineDate'>{session.date}</div>
                          <div className='vaccineCapacity'>Age limit: {session.min_age_limit || 'NA'} to {session.max_age_limit || 'NA'}, Dose1: {session.available_capacity_dose1}, Dose2: {session.available_capacity_dose2}</div>
                          <div className='slotContainer'>
                            {
                              session.slots.length > 0 && session.slots.map(slot => {
                                return (
                                  <div key={slot} className='slotTime'>{slot}</div>
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
    </div>
  );
}

export default App;
