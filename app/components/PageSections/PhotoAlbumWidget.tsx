'use client';

import React, { useState } from 'react';
import { PhotoAlbumWidgetSection, PhotoAlbum, Photo } from '@/types/page';
import Image from 'next/image';

interface PhotoAlbumWidgetProps {
  data: PhotoAlbumWidgetSection;
}

export default function PhotoAlbumWidget({ data }: PhotoAlbumWidgetProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<PhotoAlbum | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (album: PhotoAlbum, index: number) => {
    setSelectedAlbum(album);
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeLightbox = () => {
    setSelectedAlbum(null);
    document.body.style.overflow = 'auto';
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedAlbum) {
      setLightboxIndex((prev) => (prev + 1) % selectedAlbum.photos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedAlbum) {
      setLightboxIndex((prev) => (prev - 1 + selectedAlbum.photos.length) % selectedAlbum.photos.length);
    }
  };

  return (
    <div className="space-y-16">
      {data.photo_albums.map((album) => (
        <div key={album.id}>
          <h2 className="text-3xl font-display font-bold text-text-light mb-2">
            {album.title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mb-8"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {album.photos.map((photo, index) => (
              <div 
                key={photo.id} 
                className="group cursor-pointer"
                onClick={() => openLightbox(album, index)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-md mb-4 aspect-[4/3]">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 pointer-events-none"></div>
                  <Image
                    src={photo.url}
                    alt={photo.alternativeText || album.title}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-20 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white/90 text-accent rounded-full p-3 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <span className="material-symbols-outlined">zoom_in</span>
                    </span>
                  </div>
                </div>
                {photo.caption && (
                    <p className="text-sm text-gray-600 font-medium mt-2">{photo.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Lightbox Overlay */}
      {selectedAlbum && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50"
            onClick={closeLightbox}
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>

          <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center">
            <div className="relative w-full h-[80vh] flex items-center justify-center">
                {/* Navigation Buttons */}
                {selectedAlbum.photos.length > 1 && (
                    <>
                        <button 
                            className="absolute left-0 p-4 text-white/70 hover:text-white transition-colors z-50 hover:bg-white/10 rounded-full"
                            onClick={prevPhoto}
                        >
                            <span className="material-symbols-outlined text-4xl">chevron_left</span>
                        </button>
                        <button 
                            className="absolute right-0 p-4 text-white/70 hover:text-white transition-colors z-50 hover:bg-white/10 rounded-full"
                            onClick={nextPhoto}
                        >
                            <span className="material-symbols-outlined text-4xl">chevron_right</span>
                        </button>
                    </>
                )}

                <Image
                    src={selectedAlbum.photos[lightboxIndex].url}
                    alt={selectedAlbum.photos[lightboxIndex].alternativeText || selectedAlbum.title}
                    fill
                    className="object-contain"
                    priority
                />
            </div>
            
            <div className="mt-4 text-center text-white">
                <h3 className="text-xl font-display font-bold">{selectedAlbum.title}</h3>
                <p className="text-sm text-white/60">
                    {lightboxIndex + 1} / {selectedAlbum.photos.length}
                </p>
                {selectedAlbum.photos[lightboxIndex].caption && (
                    <p className="text-sm mt-2 text-white/80">{selectedAlbum.photos[lightboxIndex].caption}</p>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
