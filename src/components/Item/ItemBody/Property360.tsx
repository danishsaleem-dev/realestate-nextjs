"use client";
import { useEffect } from "react";
import CloudImage360 from "js-cloudimage-360-view";

const Property360 = () => {
    useEffect(() => {
        const instance = new CloudImage360();
        
        const container = document.getElementById("property-360");
        if (container) {
          instance.init(container, {
            folder: "https://scaleflex.cloudimg.io/v7/demo/suv-orange-car-360/", // Change this to your image folder
            filenameX: "orange-{index}.jpg", // Image naming format (adjust accordingly)
            amountX: 73, // Total number of images
            responsive: "scaleflex",
          });
        }
      }, []);
    
      return <div id="property-360" className="w-full h-auto md:h-[500px] rounded-2xl"></div>;
}

export default Property360