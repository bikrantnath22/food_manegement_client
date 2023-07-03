import React from "react";

export default function NavBtns({ icon, title }) {
  return (
    <div className="group flex flex-row mr-5 items-center">
      <span className="group-hover:animate-bounce group-hover:text-orange-600 mr-2 text-slate-600  ">{icon}</span>
      <p className="opacity-50 group-hover:opacity-100 text-blue"> {title} </p>
    </div>
  );
}