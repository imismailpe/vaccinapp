import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
const APIBASEURL = 'https://cdn-api.co-vin.in/api/v2';
const DISTRICTLISTENDPOINT = '/admin/location/districts/'
const KERALANUMBER = '17';
const DATABYDISTRICTENDPOINT = '/appointment/sessions/public/calendarByDistrict?&district_id='

function App() {
  const [districtList, setDistrictList] = useState([]);
  const [centerList, setCenterList] = useState([]);
  const [district, setDistrict] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get(`${APIBASEURL}${DISTRICTLISTENDPOINT}${KERALANUMBER}`)
      .then(resp => {
        setDistrictList(resp.data.districts);
        setLoading(false);
      })
      .catch(e => {
        alert("error:", e)
        setLoading(false);
      })
  }, []);
  useEffect(() => {
    setLoading(true);
    const dateInput = moment().format('DD-MM-YYYY');
    district && axios.get(`${APIBASEURL}${DATABYDISTRICTENDPOINT}${district}&date=${dateInput}`)
      .then(resp => {
        setCenterList(resp.data.centers);
        setLoading(false);
      })
      .catch(e => {
        alert("error:", e);
        setLoading(false);
      })
  }, [district]);
  return (
    <div className="App">
      <div>Select a district to see Covid vaccine slot details</div>
      <div>
        {
          loading === true ? 'Loading...'
            : <>
              {
                districtList.length > 0 ?
                  districtList.map(districtItem => {
                    return (
                      <div className={districtItem.district_id === district ? 'chatItem selectedDist': 'chatItem'} key={districtItem.district_id} onClick={() => setDistrict(districtItem.district_id)}>{districtItem.district_name}</div>
                    )
                  })
                  : 'No Districts available'
              }
              <div className='chatWindow'>
                {
                  centerList.length > 0 ? centerList.map(center => {
                    return (
                      <div key={center.center_id} className='messageInBubble'>
                        <div className='centerName'>{center.name}-{center.block_name}</div>
                        <div className='centerAddress'>{center.address}-{center.pincode}</div>
                        <div className='centerFee'>{center.fee_type}</div>
                        {
                          center.sessions.length > 0 && center.sessions.map(session => {
                            return (
                              <div key={session.session_id} className={session.available_capacity ? 'availableBG sessionContainer' : 'notAvailableBG sessionContainer'}>
                                <div className='vaccineName'>{session.vaccine}</div>
                                <div className='vaccineDate'>{session.date}</div>
                                <div className='vaccineCapacity'>Available capacity: {session.available_capacity}, Dose1: {session.available_capacity_dose1}, Dose2: {session.available_capacity_dose2}</div>
                                <div className='slotContainer'>
                                {
                                  session.slots.map(slot => {
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
            </>
        }
      </div>
    </div>
  );
}

export default App;
