"use client"

import api from "../services/api"
import { useState } from "react"
import Image from "next/image"

export default function Home() {
  const [host, setHost] = useState('')
  const [port, setPort] = useState('')
  const [topic, setTopic] = useState('')
  const [method, setMethod] = useState('')
  const [payload, setPayload] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    const json = { "host": host, "port": port, "topic": topic, "method": method, "payload": payload }

    await api.post('/coap_request', json).then(function (response) {alert(`DATA: ${response.data.message}, STATUS: ${response.status}`)}).catch(error => {
      alert(error);
    });
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen -mt-8">
      <Image src="/profile.png" alt="My profile picture" width={75} height={75} style={{borderRadius: '50%', width: '75px', height: '75px'}} />
      <label className="block mt-6 mb-4 text-xl font-medium text-gray-900">Created by: lusca0x01</label>
      <div className="border-t-2 border-gray-300">
        <h1 className="text-4xl font-bold mt-2 mb-8 text-center">Coap Request Maker</h1>
        <form onSubmit={handleSubmit} >
          <div>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium text-gray-900">Hostname</label>
              <input className="bg-gray-100 border border-gray-400 rounded text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:bg-white" placeholder="Hostname" type="text" id="host" name="host" value={host} onChange={event => setHost(event.target.value)} />
            </div>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium text-gray-900">Port</label>
              <input className="bg-gray-100 border border-gray-400 rounded text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:bg-white" placeholder="Port" type="number" id="port" name="port" value={port} onChange={event => setPort(event.target.value)} />
            </div>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium text-gray-900">Topic</label>
              <input className="bg-gray-100 border border-gray-400 rounded text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:bg-white" placeholder="Topic" type="text" id="topic" name="topic" value={topic} onChange={event => setTopic(event.target.value)} />
            </div>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium text-gray-900">Method</label>
              <input className="bg-gray-100 border border-gray-400 rounded text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:bg-white" placeholder="Method" type="text" id="method" name="method" value={method} onChange={event => setMethod(event.target.value)} />
            </div>
            <div className="mb-8">
              <label className="block mb-2 text-sm font-medium text-gray-900">Payload</label>
              <input className="bg-gray-100 border border-gray-400 rounded text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:bg-white" placeholder="Payload" type="text" id="payload" name="payload" value={payload} onChange={event => setPayload(event.target.value)} />
            </div>
            <button className="bg-gray-500 hover:bg-black text-white font-bold py-2 px-4 border rounded-lg w-96" type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  )
}