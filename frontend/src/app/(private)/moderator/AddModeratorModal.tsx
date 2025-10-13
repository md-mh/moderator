import Moderator from "@/services/Moderator.service";
import { ModeratorFormValues } from "@/types/moderator";
import { moderatorSchema } from "@/types/moderator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";

export default function AddModeratorModal({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<ModeratorFormValues>({
    resolver: zodResolver(moderatorSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: addModerator } = Moderator.useAddModeratorMutation();

  const handleAddModerator = (data: ModeratorFormValues) => {
    addModerator(data);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center drop-shadow-xl">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-8 mx-2">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-black text-lg cursor-pointer"
            aria-label="Close"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            &#10005;
          </button>
          <h2 className="text-center text-[18px] font-semibold mb-7 text-[#232a34]">
            Add Moderator Form
          </h2>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleAddModerator)}
          >
            <div>
              <input
                type="text"
                placeholder="Enter Moderator Name"
                className="w-full bg-[#f4f5f6] border border-gray-200 rounded-[4px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#232a34] text-[#232a34]"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Enter Moderator email"
                className="w-full bg-[#f4f5f6] border border-gray-200 rounded-[4px] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#232a34] text-[#232a34]"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full bg-[#f4f5f6] border border-gray-200 rounded-[4px] px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#232a34] text-[#232a34]"
                  {...register("password")}
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full bg-[#f4f5f6] border border-gray-200 rounded-[4px] px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#232a34] text-[#232a34]"
                  {...register("confirmPassword")}
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full mt-2 bg-[#232a34] hover:bg-white text-[#e2b49a] hover:text-[#232a34] font-medium py-2 px-4 rounded-[6px] shadow transition cursor-pointer hover:border-2 hover:border-[#111820]"
              disabled={isSubmitting}
            >
              Add Moderator
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
