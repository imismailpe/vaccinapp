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
  const [loadingDist, setLoadingDist] = useState(false);
  const [timer, setTimer] = useState(0);
  let timerObj;
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
  }, []);
  useEffect(() => {
    getData();
  }, [district]);
  // useEffect(() => {
  //   if (timer === 0) {
  //     // console.log("timer is zero")
  //     // clearTimeout(timerObj);
  //     getData();
  //   }
  //   if(timer > 0){
  //     // timerObj = setTimeout(handleTimer, 1000);
  //   }
  // }, [timer]);
  const getData = () => {
    setLoading(true);
    const dateInput = moment().format('DD-MM-YYYY');
    district && axios.get(`${APIBASEURL}${DATABYDISTRICTENDPOINT}${district}&date=${dateInput}`)
      .then(resp => {
        setCenterList(resp.data.centers);
        setLoading(false);
        // setTimer(5000);
        // handleTimer();
      })
      .catch(e => {
        alert("error:", e);
        setLoading(false);
      })
  }
  const handleTimer = () => {
    setTimer(timer - 1000);
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
      {/* <div>Data will refresh in {timer / 1000} seconds.</div> */}
      <div className='chatWindow'>
        {
          loading === true ? 'Loading...'
            :
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
    </div>
  );
}

export default App;
