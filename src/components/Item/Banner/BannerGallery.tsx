"use client";
import React from "react";
import { Gallery } from "react-grid-gallery";

const images = [
  { id: "img-1", src: "/images/p1.jpg", thumbnail: "/images/p1.jpg", thumbnailWidth: 800, thumbnailHeight: 600, width: 800, height: 600 },
  { id: "img-2", src: "/images/p2.jpg", thumbnail: "/images/p2.jpg", thumbnailWidth: 400, thumbnailHeight: 300, width: 400, height: 300 },
  { id: "img-3", src: "/images/p3.jpg", thumbnail: "/images/p3.jpg", thumbnailWidth: 400, thumbnailHeight: 300, width: 400, height: 300 },
  { id: "img-4", src: "/images/p4.jpg", thumbnail: "/images/p4.jpg", thumbnailWidth: 400, thumbnailHeight: 300, width: 400, height: 300 },
  { id: "img-5", src: "/images/p5.jpg", thumbnail: "/images/p5.jpg", thumbnailWidth: 400, thumbnailHeight: 300, width: 400, height: 300 },
];

const BannerGallery = () => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "1 1 50%" }}>
        <img src={images[0].src} alt="Main Image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ flex: "1 1 50%" }}>
        <Gallery
          images={images.slice(1).map((image, index) => ({
            ...image,
            id: `${image.id}-${index}`, // Ensure uniqueness
            customOverlay: <div key={`overlay-${image.id}-${index}`} />, // Unique key
          }))}
          enableImageSelection={false}
        />
      </div>
    </div>
  );
};

export default BannerGallery;
