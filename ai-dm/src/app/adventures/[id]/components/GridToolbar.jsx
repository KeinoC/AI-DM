import React, { useState, useEffect } from 'react'

import { BiMapAlt } from 'react-icons/bi'

export default function GridToolbar({gridWidth, setGridWidth, gridHeight, setGridHeight, mapImage, setMapImage}) {

  const [showTools, setShowTools] = useState(false)
  const [toolsClass, setToolsClass] = useState("hidden")

  const handleWidthChange = (e) => {
    setGridWidth(parseInt(e.target.value));
  };

  const handleHeightChange = (e) => {
    setGridHeight(parseInt(e.target.value));
  };

  const handleMapChange = (e) => {
    setMapImage(e.target.value)
    console.log(mapImage)
  }

  const handleShowTools = () => {
    setShowTools(!showTools)
    if (showTools) {
      setToolsClass("")
    } else {
      setToolsClass("hidden")
    }
  }

  return (
    <>
      {/* Toolbar */}
      <div className="absolute z-[2000] left-6">
          {/* Map Menu Toggle */}
          <span onClick={handleShowTools} className="block bg-[#eab308] rounded-[50%]  cursor-pointer">
            <BiMapAlt className="w-[5rem] h-[5rem] p-[1rem]"/>
          </span>
        </div>

        {/* Map Modal */}
        <div className={`${toolsClass} absolute z-[2000] bg-[#111827] border-4 border-[#eab308] p-4 rounded-md`}>
          <div className="flex justify-between">
            <span>Adjust Map</span>
            <span onClick={handleShowTools} className="cursor-pointer">X</span>
          </div>

          {/* Grid Size Inputs */}
          <div className="flex my-4">
            <label className="mr-2">Width:</label>
            <input
              type="number"
              value={gridWidth}
              onChange={handleWidthChange}
              className="border border-gray-300 p-1"
            />
            <label className="ml-4 mr-2">Height:</label>
            <input
              type="number"
              value={gridHeight}
              onChange={handleHeightChange}
              className="border border-gray-300 p-1"
            />
          </div>
          
          {/* Grid Image Input */}
          <div className="m-4">
            <label className="mr-2">Map Image:</label>
            <input className="w-[20rem] mr-2" type="text" value={mapImage}placeholder={mapImage} 
              // temporary until mapImage is passed into adventure, then use submit maybe?
              onChange={handleMapChange}
            />
            {/* <button type="submit" className="bg-blue-500 rounded-md p-1">Submit</button> */}
          </div>
        </div>
    </>
  )
}