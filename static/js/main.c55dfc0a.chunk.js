(this.webpackJsonpvaccinapp=this.webpackJsonpvaccinapp||[]).push([[0],{22:function(e,t,c){},24:function(e,t,c){},45:function(e,t,c){"use strict";c.r(t);var a=c(1),n=c.n(a),s=c(17),i=c.n(s),r=(c(22),c(4)),d=c.n(r),o=c(5),l=c(3),u=(c(24),c(6)),j=c.n(u),b=c(7),h=c.n(b),m=c(0),v="https://cdn-api.co-vin.in/api/v2";var f=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),c=t[0],n=t[1],s=Object(a.useState)([]),i=Object(l.a)(s,2),r=i[0],u=i[1],b=Object(a.useState)([]),f=Object(l.a)(b,2),p=f[0],O=f[1],g=Object(a.useState)(""),x=Object(l.a)(g,2),N=x[0],_=x[1],S=Object(a.useState)(""),y=Object(l.a)(S,2),w=y[0],C=y[1],I=Object(a.useRef)(w);I.current=w;var D=Object(a.useState)(!1),L=Object(l.a)(D,2),k=L[0],F=L[1];Object(a.useRef)(k).current=k;var T=Object(a.useState)(!1),A=Object(l.a)(T,2),E=A[0],B=A[1],R=Object(a.useState)(!1),Y=Object(l.a)(R,2),M=Y[0],P=Y[1],G=Object(a.useState)(h()().format("LTS")),J=Object(l.a)(G,2),H=J[0],W=J[1],q=Object(a.useRef)(null),z=function(){var e=Object(o.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:P(!0),j.a.get("".concat(v).concat("/admin/location/states")).then((function(e){n(e.data.states||[]),P(!1),e.data.states&&e.data.states.length>0&&_(e.data.states[17].state_id)})).catch((function(e){alert("Error in getting states:",e),P(!1)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),K=function(){var e=Object(o.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:B(!0),u([]),O([]),C(""),I.current=null,j.a.get("".concat(v).concat("/admin/location/districts/").concat(t)).then((function(e){u(e.data.districts||[]),B(!1),e.data.districts&&e.data.districts.length>0&&(C(e.data.districts[0].district_id),I.current=e.data.districts[0].district_id)})).catch((function(e){alert("Error in getting districts:",e),B(!1),_(c[17].state_id)}));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){return z(),function(){return clearInterval(q.current)}}),[]),Object(a.useEffect)((function(){N&&(clearInterval(q.current),K(N))}),[N]),Object(a.useEffect)((function(){w&&(clearInterval(q.current),Q(),q.current=setInterval(Q,1e4))}),[w]);var Q=function(){var e=Object(o.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:I.current?(F(!0),t=h()().format("DD-MM-YYYY"),j.a.get("".concat(v).concat("/appointment/sessions/public/calendarByDistrict?&district_id=").concat(I.current,"&date=").concat(t)).then((function(e){var t,c;console.log("resp.data?.centers",null===(t=e.data)||void 0===t?void 0:t.centers),O((null===(c=e.data)||void 0===c?void 0:c.centers)||[]),W(h()().format("LTS")),F(!1)})).catch((function(e){alert("Error in getting centers:",e),window.location.reload()}))):console.log("skipped api");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(m.jsxs)("div",{className:"App",children:[Object(m.jsx)("div",{className:"distList",children:!0===M?"Loading...":Object(m.jsx)(m.Fragment,{children:c.length>0?Object(m.jsx)("div",{className:"",children:c.map((function(e){return Object(m.jsx)("div",{className:e.state_id===N?"chatItem selectedDist":"chatItem",onClick:function(){return _(e.state_id)},children:e.state_name},e.state_id)}))}):"No States available"})}),Object(m.jsx)("hr",{}),Object(m.jsx)("div",{className:"distList",children:!0===E?"Loading...":Object(m.jsx)(m.Fragment,{children:r.length>0?Object(m.jsx)("div",{className:"",children:r.map((function(e){return Object(m.jsx)("div",{className:e.district_id===w?"chatItem selectedDist":"chatItem",onClick:function(){return C(e.district_id)},children:e.district_name},e.district_id)}))}):"No Districts available"})}),Object(m.jsxs)("div",{children:["Auto refreshes in every ",10," seconds. Last refresh:",H]}),Object(m.jsx)("div",{className:"chatWindow",children:!0===k?"Loading...":p.length>0?p.map((function(e){return Object(m.jsxs)("div",{className:"messageInBubble",children:[Object(m.jsxs)("div",{className:"centerTitle",children:[Object(m.jsxs)("div",{className:"centerName",children:[e.name,"-",e.block_name]}),Object(m.jsx)("div",{className:"Free"===e.fee_type?"greenText centerFee":"redText centerFee",children:e.fee_type})]}),Object(m.jsxs)("div",{className:"centerAddress",children:[e.address," - ",e.pincode]}),Object(m.jsx)("div",{className:"feeContainer",children:e.vaccine_fees.map((function(e){return Object(m.jsx)("div",{className:"slotTime",children:"".concat(e.vaccine," : \u20b9 ").concat(e.fee)})}))}),e.sessions.length>0&&e.sessions.map((function(e){return Object(m.jsxs)("div",{className:e.available_capacity?"availableBG sessionContainer":"notAvailableBG sessionContainer",children:[Object(m.jsx)("div",{className:"vaccineName",children:!0===k?"Refreshing...":e.vaccine}),Object(m.jsx)("div",{className:"vaccineDate",children:e.date}),Object(m.jsxs)("div",{className:"vaccineCapacity",children:[Object(m.jsxs)("span",{children:["Age limit: ",e.min_age_limit||"NA"," to ",e.max_age_limit||"NA"]})," ",Object(m.jsxs)("span",{children:["Dose1: ",e.available_capacity_dose1]})," ",Object(m.jsxs)("span",{children:["Dose2: ",e.available_capacity_dose2]})]}),Object(m.jsx)("div",{className:"slotContainer",children:e.slots.length>0&&e.slots.map((function(e,t){return Object(m.jsx)("div",{className:"slotTime",children:"".concat(e.time," (").concat(e.seats," seats)")},t)}))})]},e.session_id)}))]},e.center_id)})):"No Centers are available for the selected district. Refresh after some time."}),Object(m.jsxs)("div",{children:["Have suggestions? Please submit at ",Object(m.jsx)("a",{href:"https://github.com/imismailpe/vaccinapp",children:"https://github.com/imismailpe/vaccinapp"})]})]})},p=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,46)).then((function(t){var c=t.getCLS,a=t.getFID,n=t.getFCP,s=t.getLCP,i=t.getTTFB;c(e),a(e),n(e),s(e),i(e)}))};i.a.render(Object(m.jsx)(n.a.StrictMode,{children:Object(m.jsx)(f,{})}),document.getElementById("root")),p()}},[[45,1,2]]]);
//# sourceMappingURL=main.c55dfc0a.chunk.js.map