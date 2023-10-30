import{j as e,a as _,R,b as q,r as f,A as F,u as V,l as H,c as W}from"./index-b17c1395.js";import{r as n,u as S,W as A}from"./http-hooks-560482fa.js";import{r as T}from"./react-router-dom.min-6ba8ddb1.js";import"./tiny-invariant-dfc6b89e.js";const U=({toogleAlert:t,openAlert:r,onDelete:l})=>e.jsx(e.Fragment,{children:e.jsxs(n.Dialog,{open:r,handler:t,size:"sm",children:[e.jsx(n.DialogHeader,{className:"bg-[#ff0055] text-white rounded-t-lg shadow-md text-lg md:text-2xl",children:"Yakin untuk menghapus?"}),e.jsx(n.DialogBody,{divider:!0,children:"Tempat akan terhapus dan tidak dapat untuk dikembalikan lagi"}),e.jsxs(n.DialogFooter,{children:[e.jsx(n.Button,{variant:"text",onClick:t,className:"mr-1",children:e.jsx("span",{children:"Batal"})}),e.jsx(n.Button,{variant:"gradient",color:"red",onClick:l,children:e.jsx("span",{children:"Hapus"})})]})]})});/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var B=Object.getOwnPropertySymbols,Y=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable;function J(t){if(t==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}function K(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de",Object.getOwnPropertyNames(t)[0]==="5")return!1;for(var r={},l=0;l<10;l++)r["_"+String.fromCharCode(l)]=l;var i=Object.getOwnPropertyNames(r).map(function(c){return r[c]});if(i.join("")!=="0123456789")return!1;var a={};return"abcdefghijklmnopqrst".split("").forEach(function(c){a[c]=c}),Object.keys(Object.assign({},a)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}var Q=K()?Object.assign:function(t,r){for(var l,i=J(t),a,c=1;c<arguments.length;c++){l=Object(arguments[c]);for(var d in l)Y.call(l,d)&&(i[d]=l[d]);if(B){a=B(l);for(var s=0;s<a.length;s++)G.call(l,a[s])&&(i[a[s]]=l[a[s]])}}return i};const X=_(Q),Z=({url:t,allowFullScreen:r,position:l,display:i,height:a,width:c,overflow:d,styles:s,onLoad:j,onMouseOver:g,onMouseOut:w,scrolling:p,id:u,frameBorder:h,ariaHidden:C,sandbox:y,allow:b,className:M,title:v,ariaLabel:k,ariaLabelledby:N,name:P,target:O,loading:D,importance:E,referrerpolicy:x,allowpaymentrequest:$,src:z,key:I})=>{const L=X({src:z||t,target:O||null,style:{position:l||null,display:i||"initial",overflow:d||null},scrolling:p||null,allowpaymentrequest:$||null,importance:E||null,sandbox:y&&[...y].join(" ")||null,loading:D||null,styles:s||null,name:P||null,className:M||null,allowFullScreen:"allowFullScreen",referrerpolicy:x||null,title:v||null,allow:b||null,id:u||null,"aria-labelledby":N||null,"aria-hidden":C||null,"aria-label":k||null,width:c||null,height:a||null,onLoad:j||null,onMouseOver:g||null,onMouseOut:w||null,key:I||"iframe"});let o=Object.create(null);for(let m of Object.keys(L))L[m]!=null&&(o[m]=L[m]);for(let m of Object.keys(o.style))o.style[m]==null&&delete o.style[m];if(o.styles)for(let m of Object.keys(o.styles))o.styles.hasOwnProperty(m)&&(o.style[m]=o.styles[m]),Object.keys(o.styles).pop()==m&&delete o.styles;if(r)if("allow"in o){const m=o.allow.replace("fullscreen","");o.allow=`fullscreen ${m.trim()}`.trim()}else o.allow="fullscreen";return h>=0&&(o.style.hasOwnProperty("border")||(o.style.border=h)),R.createElement("iframe",Object.assign({},o))},ee=({lat:t,long:r})=>e.jsx(Z,{src:`https://maps.google.com/maps?q=${t},${r}&t=&z=17&ie=UTF8&iwloc=&output=embed`,width:"99.9%",height:"350",style:"border:0;",allowFullScreen:"",loading:"lazy"}),te=({toogleModal:t,openModal:r,coordinates:l,address:i})=>{const a=e.jsx(e.Fragment,{children:e.jsxs(n.Dialog,{open:r,handler:t,size:"lg",children:[e.jsx(n.DialogHeader,{className:"bg-[#ff0055] text-white rounded-t-lg shadow-md text-lg md:text-2xl",children:i}),e.jsx(n.DialogBody,{divider:!0,className:"p-0",children:e.jsx(ee,{lat:l.lat,long:l.long})}),e.jsx(n.DialogFooter,{children:e.jsx(n.Button,{variant:"text",onClick:t,children:e.jsx("span",{children:"Ok"})})})]})});return q.createPortal(a,document.getElementById("modal-hook"))},le=({id:t,image:r,title:l,address:i,description:a,coordinates:c,onDelete:d,creatorId:s})=>{const{isLoading:j,error:g,sendRequest:w,clearError:p}=S(),u=f.useContext(F),[h,C]=f.useState(!1),[y,b]=f.useState(!1),[M,v]=f.useState(!1),k=V(),N=()=>C(x=>!x),P=()=>b(x=>!x),O=()=>v(x=>!x),D=()=>{k.push(`/places/${t}`)},E=async()=>{v(!1);try{await w(`https://mern-practice-be-wwsf.onrender.com/api/places/${t}`,"DELETE",null,{Authorization:"Bearer "+u.token}),d(t),k.push(`/${u.userId}/places`)}catch(x){console.log(x),b(!0)}};return e.jsxs(e.Fragment,{children:[e.jsx(A,{toogleModal:P,openModal:y,message:g,onClear:p}),e.jsx(te,{toogleModal:N,address:i,openModal:h,coordinates:c}),e.jsx(U,{toogleAlert:O,openAlert:M,onDelete:E}),j?e.jsx("div",{className:"flex justify-center",children:e.jsx("img",{className:"w-[150px]",src:H,alt:"loading"})}):e.jsx("li",{className:"place-item mx-0 my-8",children:e.jsx(n.Card,{id:t,children:e.jsxs(n.CardBody,{className:"place-item__content p-0",children:[e.jsx("div",{className:"place-item__image w-full h-full",children:e.jsx("img",{src:`https://mern-practice-be-wwsf.onrender.com/${r}`,alt:l,className:"w-full h-full md:h-[20rem] object-cover rounded-tl-xl rounded-tr-xl"})}),e.jsxs("div",{className:"place-item__info p-4 text-left",children:[e.jsx("h2",{className:"text-2xl mb-2 font-semibold text-[#292929]",children:l}),e.jsx("h3",{className:"text-md mb-4",children:i}),e.jsx("p",{className:"mb-0",children:a})]}),e.jsxs("div",{className:"place-item__actions p-4 text-center border-solid border-t-2 border-t-[#ccc] flex flex-col md:flex-row justify-center md:justify-between gap-1 md:gap-8",children:[e.jsxs(n.Button,{variant:"text",size:"sm",className:"flex items-center gap-3",onClick:N,children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"})}),"View on Map"]}),e.jsx("div",{className:"flex flex-col md:flex-row gap-1 md:gap-4",children:s===u.userId&&e.jsxs(e.Fragment,{children:[e.jsxs(n.Button,{onClick:D,variant:"text",size:"sm",className:"flex items-center gap-3",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"})}),"Edit"]}),e.jsxs(n.Button,{onClick:O,variant:"text",color:"red",size:"sm",className:"flex items-center gap-3",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"})}),"Delete"]})]})})]})]})})})]})},se=({items:t,userId:r,onDelete:l})=>{const i=f.useContext(F),a=T.useHistory(),c=()=>{a.push("/places/new")};let d;return t.length>0?d=e.jsx("ul",{className:"list-none mx-auto my-1 p-0 w-[90%] max-w-[40rem]",children:t.map(s=>e.jsx(le,{id:s.id,image:s.image,title:s.title,address:s.address,description:s.description,creatorId:r,coordinates:s.location,onDelete:l},s.id))}):r!==i.userId?d=e.jsx("div",{className:"my-0 mx-auto p-0 w-[90%] md:max-w-[50rem] flex justify-center flex-wrap",children:e.jsx(n.Card,{className:"m-[1rem] w-[90%] md:w-[45%] text-center flex justify-center items-center p-5 mt-5",children:e.jsx("h2",{children:"No places found"})})}):d=e.jsx("div",{className:"my-0 mx-auto p-0 w-[90%] md:max-w-[50rem] flex justify-center flex-wrap",children:e.jsxs(n.Card,{className:"m-[1rem] w-[90%] md:w-[45%] text-center flex justify-center items-center p-5 mt-5",children:[e.jsx("h2",{children:"No places found. Maybe create one?"}),e.jsx(n.Button,{onClick:c,className:"mt-4",color:"blue",children:"Share Place"})]})}),e.jsx(e.Fragment,{children:d})},ce=()=>{const t=W().userId,[r,l]=f.useState([]),[i,a]=f.useState(!1),{isLoading:c,error:d,sendRequest:s,clearError:j}=S();f.useEffect(()=>{(async()=>{try{const u=await s(`https://mern-practice-be-wwsf.onrender.com/api/places/user/${t}`);l(u.userPlaces)}catch(u){console.log(u),a(!0)}})()},[s,t]);const g=()=>{a(p=>!p)},w=p=>{l(u=>u.filter(h=>h.id!==p))};return e.jsxs(e.Fragment,{children:[e.jsx(A,{toogleModal:g,openModal:i,message:d,onClear:j}),c?e.jsx("div",{className:"flex justify-center",children:e.jsx("img",{className:"w-[150px]",src:H,alt:"loading"})}):e.jsx(se,{items:r,userId:t,onDelete:w})]})};export{ce as default};
