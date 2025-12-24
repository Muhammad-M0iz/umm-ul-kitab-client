"use client";
import { useState } from "react";
import { DownloadsWidgetSection, DownloadItem } from "@/types/page";
import { mediaUrl } from "@/lib/strapi";

export default function DownloadsWidget({ data }: { data: DownloadsWidgetSection }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const filteredDownloads = data.downloads.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.file.name.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredDownloads.length / itemsPerPage);
  const currentDownloads = filteredDownloads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const element = document.getElementById("downloads-top");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto relative z-10">
      {/* Search Bar */}
      <div className="bg-white p-2 rounded-full shadow-lg border border-primary/10 mb-12 flex items-center max-w-lg mx-auto transform -translate-y-8 lg:-translate-y-12">
        <span className="material-symbols-outlined pl-4 text-gray-400">search</span>
        <input
          className="w-full pl-3 pr-4 py-2 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 text-base"
          placeholder="Search downloads..."
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div
        id="downloads-top"
        className="bg-white rounded-4xl shadow-xl border border-secondary/50 overflow-hidden p-6 sm:p-10"
      >
        <div className="mb-8 pb-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-accent">
              Available Resources
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Select and download the files you need.
            </p>
          </div>
          <div className="hidden sm:block">
            <span className="material-symbols-outlined text-4xl text-primary/20">
              folder_open
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {currentDownloads.map((item) => (
            <DownloadCard key={item.id} item={item} />
          ))}
          
          {currentDownloads.length === 0 && (
             <div className="text-center py-8 text-gray-500">
                No documents found matching your search.
             </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-10 w-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-secondary hover:text-accent transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors font-medium text-sm ${
                  currentPage === page
                    ? "bg-accent text-white shadow-md font-bold"
                    : "text-gray-500 hover:bg-secondary hover:text-accent"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-10 w-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-secondary hover:text-accent transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function DownloadCard({ item }: { item: DownloadItem }) {
  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return { icon: 'picture_as_pdf', color: 'text-red-500', bg: 'bg-red-50 group-hover:bg-red-100' };
      case 'doc':
      case 'docx':
        return { icon: 'description', color: 'text-blue-500', bg: 'bg-blue-50 group-hover:bg-blue-100' };
      case 'xls':
      case 'xlsx':
        return { icon: 'table_chart', color: 'text-green-600', bg: 'bg-green-50 group-hover:bg-green-100' };
      case 'ppt':
      case 'pptx':
        return { icon: 'slideshow', color: 'text-orange-500', bg: 'bg-orange-50 group-hover:bg-orange-100' };
      case 'zip':
      case 'rar':
        return { icon: 'folder_zip', color: 'text-yellow-600', bg: 'bg-yellow-50 group-hover:bg-yellow-100' };
      default:
        return { icon: 'article', color: 'text-gray-500', bg: 'bg-gray-50 group-hover:bg-gray-100' };
    }
  };

  const style = getFileIcon(item.file.name);

  return (
    <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-md hover:bg-secondary/10 transition-all duration-300 bg-background-light/50">
      <div className="flex items-start gap-4 mb-4 sm:mb-0">
        <div className={`h-12 w-12 rounded-xl ${style.bg} ${style.color} flex items-center justify-center flex-shrink-0 transition-colors`}>
          <span className="material-symbols-outlined">{style.icon}</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-light group-hover:text-accent transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1 font-mono text-xs break-all">
            {item.file.name}
          </p>
        </div>
      </div>
      <a
        href={mediaUrl(item.file.url)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-primary hover:bg-accent text-white px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md text-sm font-bold tracking-wide"
      >
        <span>Download</span>
        <span className="material-symbols-outlined text-lg">download</span>
      </a>
    </div>
  );
}
