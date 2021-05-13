import React, {useState, useEffect} from "react";

const  Footer = () => {

    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "#4556b3",
                height: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            <div
                style={{
                    position: "absolute",
                    // right: 50,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div style={{marginLeft: 20}}>
                    <p style={{color: "white", margin: 0, fontSize: 12}}>
                        Copyright © 2021
                    </p>
                </div>
            </div>
        </div>
    );
};

export  default Footer;

