(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(15),a=t.n(c),r=t(6),u=t(3),o=t(2),i=t(0),s=function(e){var n=e.persons,t=e.removeContact;return Object(i.jsx)("ul",{children:n.map((function(e){return Object(i.jsxs)("li",{className:"contacts",children:[e.name," ",e.number,Object(i.jsx)("button",{onClick:t(e.id,e.name),children:"Delete"})]},e.id)}))})},l=function(e){var n=e.value,t=e.onChange;return Object(i.jsxs)("div",{children:["Filter ",Object(i.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.onNameChange,t=e.nameValue,c=e.onNumberChange,a=e.numberValue,r=e.onSubmit;return Object(i.jsxs)("form",{onSubmit:r,children:[Object(i.jsxs)("div",{children:["Write your name: ",Object(i.jsx)("input",{value:t,onChange:n})]}),Object(i.jsxs)("div",{children:["Write your number: ",Object(i.jsx)("input",{value:a,onChange:c})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"Add Contact"})})]})},b=function(e){var n=e.message;return null===n?null:Object(i.jsx)("div",{className:"error",children:n})},m=t(4),j=t.n(m),f="https://stark-tor-98775.herokuapp.com/api/contacts",h={getAll:function(){return j.a.get(f).then((function(e){return e.data}))},create:function(e){return j.a.post(f,e).then((function(e){return e.data}))},update:function(e,n){return j.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},deleteFunction:function(e){return j.a.delete("".concat(f,"/").concat(e)).then((function(e){return e}))}},O=function(){var e=Object(o.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],a=Object(o.useState)(""),m=Object(u.a)(a,2),j=m[0],f=m[1],O=Object(o.useState)(""),p=Object(u.a)(O,2),v=p[0],x=p[1],g=Object(o.useState)(""),C=Object(u.a)(g,2),w=C[0],S=C[1],k=Object(o.useState)(),N=Object(u.a)(k,2),y=N[0],A=N[1];Object(o.useEffect)((function(){h.getAll().then((function(e){c(e)}))}),[]);var D=t.filter((function(e){return e.name.toLowerCase().includes(w.toLowerCase())}));return Object(i.jsxs)("div",{children:[Object(i.jsx)("h1",{children:"Phonebook"}),y&&Object(i.jsx)(b,{message:y}),Object(i.jsx)(l,{value:w,onChange:function(e){return S(e.target.value)}}),Object(i.jsx)("h1",{children:"Add a new contact"}),Object(i.jsx)(d,{onNameChange:function(e){return f(e.target.value)},nameValue:j,onNumberChange:function(e){return x(e.target.value)},numberValue:v,onSubmit:function(e){e.preventDefault();var n={name:j,number:v,date:(new Date).toISOString(),important:Math.random()<.5,id:j+"-"+(t.length+1)};if(function(e){return t.some((function(n){return n.name===e.name}))}(n)){if(window.confirm("".concat(n.name," is already added to phonebook, replace the old number with a new one?"))){var a=t.find((function(e){return e.name===n.name})),u=Object(r.a)(Object(r.a)({},a),{},{id:a.id,number:n.number});h.update(a.id,u).then((function(e){c(t.map((function(n){return n.id!==a.id?n:e}))),A("Number of the contact: '".concat(n.name,"' was updated to '").concat(n.number,"'")),setTimeout((function(){A(null)}),5e3)})).catch((function(e){A("Contact '".concat(n.name," ").concat(n.number,"' was already removed from server")),setTimeout((function(){A(null)}),5e3),c(t.filter((function(e){return e.id!==n.id})))})),f(""),x("")}}else h.create(n).then((function(e){c(t.concat(e)),f(""),x(""),A("Added '".concat(n.name," ").concat(n.number,"'")),setTimeout((function(){A(null)}),5e3)}))}}),Object(i.jsx)("h1",{children:"Contacts"}),Object(i.jsx)(s,{persons:D,removeContact:function(e,n){return function(){window.confirm("Delete ".concat(n,"?"))&&(h.deleteFunction(e).then((function(n){c(t.filter((function(n){return n.id!==e})))})),A("Deleted '".concat(n,"'")),setTimeout((function(){A(null)}),5e3))}}})]})};t(39);a.a.render(Object(i.jsx)(O,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.a7ec4e1f.chunk.js.map