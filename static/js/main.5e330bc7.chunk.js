(this.webpackJsonpvaccinapp=this.webpackJsonpvaccinapp||[]).push([[0],{20:function(e,t,c){},21:function(e,t,c){},42:function(e,t,c){"use strict";c.r(t);var i=c(2),a=c.n(i),s=c(14),n=c.n(s),r=(c(20),c(3)),d=(c(21),c(5)),l=c.n(d),o=c(15),j=c.n(o),b=c(0),m="https://cdn-api.co-vin.in/api/v2";var u=function(){var e=Object(i.useState)([]),t=Object(r.a)(e,2),c=t[0],a=t[1],s=Object(i.useState)([]),n=Object(r.a)(s,2),d=n[0],o=n[1],u=Object(i.useState)(""),v=Object(r.a)(u,2),h=v[0],O=v[1],f=Object(i.useState)(!1),p=Object(r.a)(f,2),x=p[0],N=p[1],g=Object(i.useState)(!1),_=Object(r.a)(g,2),C=_[0],y=_[1],D=Object(i.useState)(0),S=Object(r.a)(D,2);S[0],S[1],Object(i.useEffect)((function(){y(!0),l.a.get("".concat(m).concat("/admin/location/districts/").concat("17")).then((function(e){a(e.data.districts||[]),y(!1),e.data.districts&&e.data.districts.length>0&&O(e.data.districts[0].district_id)})).catch((function(e){alert("error:",e),y(!1)}))}),[]),Object(i.useEffect)((function(){F()}),[h]);var F=function(){N(!0);var e=j()().format("DD-MM-YYYY");h&&l.a.get("".concat(m).concat("/appointment/sessions/public/calendarByDistrict?&district_id=").concat(h,"&date=").concat(e)).then((function(e){o(e.data.centers),N(!1)})).catch((function(e){alert("error:",e),N(!1)}))};return Object(b.jsxs)("div",{className:"App",children:[Object(b.jsx)("div",{children:"Select your district to see Covid vaccine slots"}),Object(b.jsx)("div",{className:"distList",children:!0===C?"Loading...":Object(b.jsx)(b.Fragment,{children:c.length>0?Object(b.jsx)("div",{className:"",children:c.map((function(e){return Object(b.jsx)("div",{className:e.district_id===h?"chatItem selectedDist":"chatItem",onClick:function(){return O(e.district_id)},children:e.district_name},e.district_id)}))}):"No Districts available"})}),Object(b.jsx)("div",{className:"chatWindow",children:!0===x?"Loading...":d.length>0?d.map((function(e){return Object(b.jsxs)("div",{className:"messageInBubble",children:[Object(b.jsxs)("div",{className:"centerTitle",children:[Object(b.jsxs)("div",{className:"centerName",children:[e.name,"-",e.block_name]}),Object(b.jsx)("div",{className:"Free"===e.fee_type?"greenText centerFee":"redText centerFee",children:e.fee_type})]}),Object(b.jsxs)("div",{className:"centerAddress",children:[e.address," - ",e.pincode]}),e.sessions.length>0&&e.sessions.map((function(e){return Object(b.jsxs)("div",{className:e.available_capacity?"availableBG sessionContainer":"notAvailableBG sessionContainer",children:[Object(b.jsx)("div",{className:"vaccineName",children:e.vaccine}),Object(b.jsx)("div",{className:"vaccineDate",children:e.date}),Object(b.jsxs)("div",{className:"vaccineCapacity",children:["Age limit: ",e.min_age_limit||"NA","to",e.max_age_limit||"NA",", Dose1: ",e.available_capacity_dose1,", Dose2: ",e.available_capacity_dose2]}),Object(b.jsx)("div",{className:"slotContainer",children:e.slots.length>0&&e.slots.map((function(e){return Object(b.jsx)("div",{className:"slotTime",children:e},e)}))})]},e.session_id)}))]},e.center_id)})):"No Centers are available for the selected district. Refresh after some time."})]})},v=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,43)).then((function(t){var c=t.getCLS,i=t.getFID,a=t.getFCP,s=t.getLCP,n=t.getTTFB;c(e),i(e),a(e),s(e),n(e)}))};n.a.render(Object(b.jsx)(a.a.StrictMode,{children:Object(b.jsx)(u,{})}),document.getElementById("root")),v()}},[[42,1,2]]]);
//# sourceMappingURL=main.5e330bc7.chunk.js.map