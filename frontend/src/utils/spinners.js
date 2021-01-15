import React from 'react';
import RingLoader from "react-spinners/RingLoader";

export default function Spinner() {
  return (
    <div className="loading"><RingLoader
      size={80}
      color={"#fb0505"}
      loading={true}
    /></div>
  )
}