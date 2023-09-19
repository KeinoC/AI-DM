import React, { useState, useEffect } from 'react'
import { useAdventure } from '@/app/contexts/AdventureContext'
import { testRealtimeGet } from '@/app/firebase/firebase-db-adventures'

import { FaDiceD20 } from 'react-icons/fa'
import { BiMapAlt } from 'react-icons/bi'
import { GiEvilMinion } from 'react-icons/gi'
import { LuSettings2 } from 'react-icons/lu'


export default function GridToolbar({gridWidth, setGridWidth, gridHeight, setGridHeight, mapImage, setMapImage, selectedAdventure, updateMap}) { // << removed tokens and set tokens from props, trying global version from context

  const [showTools, setShowTools] = useState(false)
  const [toolsClass, setToolsClass] = useState("hidden")
  const [players, _] = useState(selectedAdventure?.selectedAdventure?.players)
  const { tokens, setTokens } = useAdventure()
  const adventureId = selectedAdventure?.selectedAdventure?.id

  
// useEffect(() => {
//   const updateTokens =  async () => {
//     const tokensData = await testRealtimeGet(selectedAdventure?.selectedAdventure?.id, setTokens)
//     // setTokens(tokensData)
//     // console.log("token set successfully in grid toolbar:", tokensData)
//   }
//   updateTokens()
// },[])


  const handleWidthChange = (e) => {
    setGridWidth(parseInt(e.target.value));
  };

  const handleHeightChange = (e) => {
    setGridHeight(parseInt(e.target.value));
  };

  const handleMapChange = (e) => {
    setMapImage(e.target.value)
  }

  const handleShowTools = () => {
    // state lags in React, so use new Value to control
    const newValue = !showTools
    setShowTools(newValue)
    if (newValue) {
      setToolsClass("")
    } else {
      setToolsClass("hidden")
    }
  }

  return (
    <>
      {/* Toolbar */}
      <div className="absolute z-[2000] left-6">

          {/* Dice Menu Toggle */}
          <span onClick={handleShowTools} className="block bg-[#eab308] rounded-[50%]  cursor-pointer mb-6">
            <FaDiceD20 className="w-[5rem] h-[5rem] p-[1rem]"/>
          </span>

          {/* All Settings Toggle */}
          <span onClick={handleShowTools} className="block bg-[#eab308] rounded-[50%]  cursor-pointer mb-6">
            <LuSettings2 className="w-[5rem] h-[5rem] p-[1rem]"/>
          </span>

        </div>

        {/* Map Modal */}
        <div className={`${toolsClass} absolute z-[2000] bg-[#111827] border-4 border-[#eab308] p-4 rounded-md`}>
          {/* Map Header & Close Button */}
          <div className="flex justify-between">
            <span className="text-xl">Settings</span>
            <span onClick={handleShowTools} className="cursor-pointer">X</span>
          </div>

          {/* Map Icon */}
          <div className="flex justify-center"><BiMapAlt className="w-[3rem] h-[3rem] color-white"/></div>
          Adjust Map Size & Image

          {/* Grid Size Inputs */}
          <div className="flex my-4">
            <label className="mr-2">Width:</label>
            <input
              type="number"
              value={gridWidth}
              onChange={(e) => {updateMap(gridHeight, e.target.value, mapImage);}}
              className="border border-gray-300 p-1"
            />
            <label className="ml-4 mr-2">Height:</label>
            <input
              type="number"
              value={gridHeight}
              onChange={(e) => {updateMap(e.target.value, gridWidth, mapImage);}}
              className="border border-gray-300 p-1"
            />
          </div>
          
          {/* Grid Image Input */}
          <div className="m-4 flex flex-col">
            <label className="mr-2">Map Image:</label>
            <input className="w-[20rem] mr-2" type="text" value={mapImage}placeholder={mapImage} 
              // temporary until mapImage is passed into adventure, then use submit maybe?
              onChange={(e) => {updateMap(gridHeight, gridWidth, e.target.value);}}
            />
            {/* <button type="submit" className="bg-blue-500 rounded-md p-1">Submit</button> */}

            {/* Token Icon */}
            <div className="flex justify-center mt-6"><GiEvilMinion className="w-[3rem] h-[3rem] color-white"/></div>
            {/* <button onClick={() => saveChanges(gridHeight, gridWidth, mapImage)} className=' btn bg-purple-600 text-white btn-sm mb-6 mt-5 hover:bg-purple-700'> Save Map Changes </button> */}

            Manage Tokens<br />

            {tokens?.map((tokenObj) => {
              return (
                <div key={tokenObj.id}>
                  <span className="inline-block w-[5rem] mb-2" >
                    {tokenObj.name}</span>
                  <span className="cursor-pointer">Edit </span>
                  &nbsp;
                  <span className="cursor-pointer"> X </span>
                  <br />
                </div>
              )
            })}

            <button className="bg-red-500 px-2 border-2 mb-8 border-white rounded-md">Add New Token </button><br />
            
            {/* New Token Form */}
            <div className="border-2 border-white rounded-md p-4">
              <span>Character Name </span>
              <input type="text" className="mb-4" placeholder=" Charcter Name" /><br />

              <span>Token Image URL </span>
              <input type="text" className="mb-4" placeholder=" image.png" /><br />

              <span>User </span>
              <select name="dog-names" id="dog-names"> 
                <option value="null">Host Only</option>
                  {players?.map((playersObj) => {
                    return (
                      <option key={playersObj._key.path.segments[6]}> 
                        {playersObj._key.path.segments[6]}
                        </option>
                    )
                  })}
              </select>

            </div>
            
          </div>


        </div>
    </>
  )
}