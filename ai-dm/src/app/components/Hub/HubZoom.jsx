import React from "react";

const HubZoom = ({ zoom, handleZoom, incrementZoom, decrementZoom }) => {
    return (
        <div className="fixed top-[17vh] right-11 transform -translate-y-1/2 bg-slate-800 bg-opacity-20 p-2 rounded-lg shadow-md z-50">
            <button
                onClick={incrementZoom}
                className="bg-purple-600 text-white w-8 h-8 flex items-center justify-center mb-2"
            >
                +
            </button>
            <input
                type="range"
                min="50"
                max="200"
                value={zoom}
                onChange={handleZoom}
                className="w-32 h-1 bg-gray-300 opacity-70 transform rotate-90"
            />
            <button
                onClick={decrementZoom}
                className="bg-purple-600 text-white w-8 h-8 flex items-center justify-center mt-2"
            >
                -
            </button>
        </div>
    );
};

export default HubZoom;
