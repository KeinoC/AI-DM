"use client";

import { useDNDApi } from "@/app/contexts/DNDApiContext";
import React, { useEffect, useState } from "react";

export default function ItemsTab() {
    const { apiItems } = useDNDApi();

    console.log(apiItems)


    function CategoryCards() {
        return (apiItems || []).map((category, index) => {
            return (
                <div key={index} className="card lg:card-side bg-base-100 shadow-xl">
                    <figure>
                        <img
                            src="/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
                            alt="Album"
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{category.name}</h2>
                        <p>Placeholder text</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Click me Zaddy</button>
                        </div>
                    </div>
                </div>
            );
        });
    }


    return (
    <>
    <CategoryCards />
    </>
    )
}
