"use client";
import React from "react";
import dynamic from "next/dynamic";
import { VideoSection } from "@/types/page";

interface VideoGalleryWidgetProps {
  data: VideoSection;
}

export default function VideoGalleryWidget({ data }: VideoGalleryWidgetProps) {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-8 w-1 bg-accent rounded-full"></span>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-text-light">
            {data.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.videos.map((video) => (
            <div
              key={video.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-secondary/50 hover:border-primary/30 flex flex-col h-full"
            >
              <div className="relative aspect-video bg-gray-900">
                {video.video_file?.url ? (
                  <video
                    src={video.video_file.url}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/50">
                    No Video Source
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-display font-bold text-lg text-gray-900 mb-2 leading-snug group-hover:text-accent transition-colors">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {video.description}
                  </p>
                )}

                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {/* Duration placeholder if needed */}
                  </div>
                  <button className="text-accent hover:text-primary transition-colors" title="Share">
                    <span className="material-symbols-outlined">share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
