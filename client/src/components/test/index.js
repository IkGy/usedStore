import { io } from "socket.io-client";
import React, {useState, useEffect} from "react";
import { API_URL } from "../config/contansts";

let socket


function Test(){
  console.log("TEST 실행됨");
  useEffect(() => {
    socket = io(`${API_URL}/chat`)
    const { room } = "room1"

    socket.emit('join', { room } , (error) => {
      if (error) {
        alert(error)
      }
    })
    // socket.emit('disconnect')
  },[])



  return(
    <>

    </>
  )
}

<Test></Test>

export default Test;