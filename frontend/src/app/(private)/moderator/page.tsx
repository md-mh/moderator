"use client";

import React, { useState } from "react";
import AddUserMale from "@/assets/icons/AddUserMale.png";
import Image from "next/image";
import Moderator from "@/services/Moderator.service";
import { Moderator as ModeratorType, ModeratorList } from "@/types/moderator";
import AddModeratorModal from "./AddModeratorModal";

export default function ModeratorPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError } = Moderator.useGetModeratorListQuery({
    page: "1",
    limit: "10",
  }) as {
    data: ModeratorList;
    isLoading: boolean;
    isError: boolean;
  };

  const { mutate: deleteModerator } = Moderator.useDeleteModeratorMutation();
  const handleDeleteModerator = (id: number) => {
    deleteModerator({ id });
  };
  return (
    <>
      <div className="min-h-screen bg-[#ecf0f0] flex flex-col w-full overflow-x-auto">
        {/* Add Moderator Button */}
        <div className="flex justify-end w-full pr-8 pt-6">
          <button
            className="flex items-center gap-2 bg-[#232a34] hover:bg-[#191e22] text-[#e2b49a] px-5 py-2 rounded-[8px] shadow-lg focus:outline-none"
            onClick={() => setIsOpen(true)}
          >
            <span className="w-[30px] h-[30px]">
              <Image src={AddUserMale} alt="AddUserMale" />
            </span>
            <span> Add Moderator</span>
          </button>
        </div>

        {/* Main Card */}

        {isLoading && <div>Loading...</div>}
        {isError && <div>Error</div>}
        {data && (
          <div className="flex items-center justify-center mt-10 md:mt-20 px-2 sm:px-4">
            <div className="w-full max-w-5xl bg-white rounded-[16px] shadow-xl py-6 px-2 sm:px-4 md:px-10">
              <h2 className="text-center text-base sm:text-lg md:text-xl font-bold mb-5">
                Moderator List ({data?.data?.length})
              </h2>
              {/* Responsive Table Wrapper */}
              <div className="rounded-lg overflow-x-auto">
                <table className="min-w-[700px] w-full text-sm">
                  <thead>
                    <tr>
                      <th className="bg-[#232a34] text-white p-2 font-medium min-w-[110px]">
                        Name
                      </th>
                      <th className="bg-[#232a34] text-white p-2 font-medium min-w-[140px]">
                        Email
                      </th>
                      <th className="bg-[#232a34] text-white p-2 font-medium min-w-[95px]">
                        User ID
                      </th>
                      <th className="bg-[#232a34] text-white p-2 font-medium min-w-[125px]">
                        Total Collection
                      </th>
                      <th className="bg-[#232a34] text-white p-2 font-medium min-w-[90px]">
                        Joined
                      </th>
                      <th className="bg-[#232a34] text-white p-2 font-medium min-w-[110px]">
                        Form Link
                      </th>
                      <th className="bg-[#232a34] text-white p-2 font-medium min-w-[82px]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.map((item: ModeratorType, idx: number) => (
                      <tr key={idx} className="hover:bg-[#f5f5f5] transition">
                        <td className="border-t p-2 text-center break-words">
                          {item.name}
                        </td>
                        <td className="border-t p-2 text-center break-words">
                          {item.email}
                        </td>
                        <td className="border-t p-2 text-center">
                          {item.userId}
                        </td>
                        <td className="border-t p-2 text-center">{0}</td>
                        <td className="border-t p-2 text-center">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="border-t p-2 text-center">{0}</td>
                        <td className="border-t p-2 text-center">
                          <button
                            className="bg-[#ff3b3b] hover:bg-[#d32f2f] text-white px-3 py-1 rounded-[6px] text-xs sm:text-sm font-semibold transition"
                            onClick={() => handleDeleteModerator(item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      {isOpen && <AddModeratorModal setIsOpen={setIsOpen} />}
    </>
  );
}
