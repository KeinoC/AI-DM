"use client";

import { useDNDApi } from "@/app/contexts/DNDApiContext";
import React, { useEffect, useState } from "react";

export default function ItemsTab() {
    const { apiItems } = useDNDApi();

    console.log(apiItems)


// *** Styles ***



    function CategoryCards() {
        return (apiItems || []).map((category, index) => {
            return (
                <div key={index} className="border-2 z-0 border-transparent card w-1/5 min-h-40% bg-base-100 shadow-2xl shadow-xl bg-opacity-50 overflow-hidden transform hover:border-yellow-500 hover:bg-opacity-90 hover:scale-105 ease-in-out duration-300 ">
                    <figure>
                        <img
                            src="https://www.tribality.com/wp-content/uploads/2021/04/elle-shengxuan-shi-0061.jpg"
                            alt={category.name}
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{category.name}</h2>
                        <p className="text-xs text-slate-400 overflow-y-scroll h-20">{category.desc || ""}</p>


                        <div className={"card-actions justify-end"}>
                            <button className="btn hover:bg-yellow-500 hover:text-slate-500">Click me Zaddy</button>
                        </div>
                    </div>
                </div>
            );
        });
    }


    return (
    <div className= 'relative pt-40 flex flex-wrap justify-center gap-6 z-[-1]'>
    <CategoryCards />
    </div>
    )
}
