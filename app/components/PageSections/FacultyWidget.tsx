"use client";
import { useState } from "react";
import { FacultyWidgetSection, FacultyMember } from "@/types/page";
import { mediaUrl } from "@/lib/strapi";
import Image from "next/image";

export default function FacultyWidget({ data }: { data: FacultyWidgetSection }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 9; // Grid is 3 cols, so 9 looks good

  const filteredMembers = data.faculty_members.filter((member) => {
    const query = searchQuery.toLowerCase();
    const nameMatch = member.name.toLowerCase().includes(query);
    const designationMatch = member.designation?.toLowerCase().includes(query);
    const deptMatch = member.departments?.some((dept) =>
      dept.name.toLowerCase().includes(query)
    );
    return nameMatch || designationMatch || deptMatch;
  });

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const currentMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const element = document.getElementById("faculty-top");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto relative bg-white shadow-xl rounded-4xl p-8 lg:p-12 border border-primary/10">
      <div
        id="faculty-top"
        className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-secondary pb-8 gap-4"
      >
        <div>
          <h2 className="text-2xl font-display font-bold text-accent">
            {data.title || "Our Scholars"}
          </h2>
          {data.subtitle && (
            <p className="text-sm text-gray-500 mt-1">
              {data.subtitle}
            </p>
          )}
        </div>
        <div className="relative w-full md:w-auto">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            search
          </span>
          <input
            className="pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm w-full md:w-64 focus:ring-primary focus:border-primary"
            placeholder="Search faculty..."
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentMembers.map((member) => (
          <FacultyCard key={member.id} member={member} />
        ))}
      </div>

      {currentMembers.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No faculty members found matching your search.
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <nav aria-label="Pagination" className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-300 hover:border-accent hover:text-accent transition-colors disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:text-gray-500"
            >
              <span className="material-symbols-outlined text-sm">
                chevron_left
              </span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`h-10 w-10 flex items-center justify-center rounded-full transition-all ${
                  currentPage === page
                    ? "bg-accent text-white shadow-lg shadow-accent/20"
                    : "border border-gray-300 hover:border-accent hover:text-accent"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-300 hover:border-accent hover:text-accent transition-colors disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:text-gray-500"
            >
              <span className="material-symbols-outlined text-sm">
                chevron_right
              </span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

function FacultyCard({ member }: { member: FacultyMember }) {
  return (
    <div className="bg-white rounded-xl border border-secondary overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
      <div className="h-64 bg-secondary/30 flex items-center justify-center relative overflow-hidden group-hover:bg-secondary/50 transition-colors">
        {member.photo ? (
          <Image
            src={mediaUrl(member.photo.url)}
            alt={member.photo.alternativeText || member.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="material-symbols-outlined text-6xl text-primary/30 group-hover:scale-110 transition-transform duration-500">
            person
          </span>
        )}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-display font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
          {member.name}
        </h3>
        <p className="text-sm font-medium text-accent uppercase tracking-wide mb-4">
          {member.designation}
        </p>
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-gold text-lg mt-0.5">
              school
            </span>
            <span className="text-sm text-gray-600 font-light capitalize">
              {member.departments && member.departments.length > 0
                ? member.departments.map((d) => d.name).join(", ")
                : "Faculty Member"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
