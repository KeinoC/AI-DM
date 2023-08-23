"use client";

import { useDNDApi } from "@/app/contexts/DNDApiContext";
import { getEquipmentListByCategory } from "@/app/dnd-api/api-equipment";
import React, { useEffect, useState } from "react";

export default function EquipmentTab() {
    const {
        apiEquipment,
        equipCatObjs,
        selectedCat,
        setSelectedCat,
        selectedArray,
        setSelectedArray,
    } = useDNDApi();

    // *** Equipment Category Workflow ***

    // 1. User selects a category from the dropdown
    const EquipCatFilterOptions = () => (
        <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
        >
            {equipCatObjs.map((cat) => (
                <option key={cat.index} value={cat.index}>
                    {cat.name}
                </option>
            ))}
        </select>
    );

    // 2. User selects a category from the dropdown
    useEffect(() => {
        if (selectedCat) {
            async function fetchEquipmentList() {
                try {
                    const categoryArray = await getEquipmentListByCategory(
                        selectedCat
                    );
                    console.log(categoryArray); // Corrected the variable name from 'selectedArray' to 'categoryArray'
                    setSelectedArray(categoryArray);
                } catch (error) {
                    console.error("Error fetching equipment list: ", error);
                }
            }

            fetchEquipmentList();
        }
    }, [selectedCat]);

    // ****** Render Cards by passing in array of equipment **********

    function RenderEquipmentCards(equipmentArray) {
        return (equipmentArray || []).map((category, index) => {
            return (
                <div
                    key={index}
                    className="border-2 z-0 border-transparent card w-1/5 min-h-40% bg-base-100 shadow-2xl shadow-xl bg-opacity-50 overflow-hidden transform hover:border-yellow-500 hover:bg-opacity-90 hover:scale-105 ease-in-out duration-300 "
                >
                    <figure>
                        <img
                            src="https://www.tribality.com/wp-content/uploads/2021/04/elle-shengxuan-shi-0061.jpg"
                            alt={category.name}
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{category.name}</h2>
                        <p className="text-xs text-slate-400 overflow-y-scroll h-20">
                            {category.desc || ""}
                        </p>

                        <div className={"card-actions justify-end"}>
                            <button className="btn hover:bg-yellow-500 hover:text-slate-500">
                                Click me Zaddy
                            </button>
                        </div>
                    </div>
                </div>
            );
        });
    }

    function CategoryCards() {
        return (apiEquipment || []).map((category, index) => {
            return (
                <div
                    key={index}
                    className="border-2 z-0 border-transparent card w-1/5 min-h-40% bg-base-100 shadow-2xl shadow-xl bg-opacity-50 overflow-hidden transform hover:border-yellow-500 hover:bg-opacity-90 hover:scale-105 ease-in-out duration-300 "
                >
                    <figure>
                        <img
                            src="https://www.tribality.com/wp-content/uploads/2021/04/elle-shengxuan-shi-0061.jpg"
                            alt={category.name}
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{category.name}</h2>
                        <p className="text-xs text-slate-400 overflow-y-scroll h-20">
                            {category.desc || ""}
                        </p>

                        <div className={"card-actions justify-end"}>
                            <button className="btn hover:bg-yellow-500 hover:text-slate-500">
                                Click me Zaddy
                            </button>
                        </div>
                    </div>
                </div>
            );
        });
    }

    function CategoryCardsDisplay() {}

    return (
        <div className="relative pt-40 flex flex-wrap justify-center gap-6 z-[-1]">
            <EquipCatFilterOptions />
            {/* <RenderEquipmentCards equipmentArray={getEquipmentListByCategory(selectedCat)} /> */}
            {/* <CategoryCards /> */}
        </div>
    );
}
