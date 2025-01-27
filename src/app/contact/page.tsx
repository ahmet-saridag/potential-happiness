"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useUser } from '@clerk/nextjs'
import axios from "axios";


const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useUser()

  const onSubmit = async (data: any) => {
    setLoading(true);

    const newMessage = {
      ...data,
      user: user
    };

    try {
      const response = await axios.post("/api/sendMessage", {
        data: newMessage,
      });
      setSuccessMessage("Message sent successfully!");
      reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      setSuccessMessage("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto">
        <Breadcrumb pageName="Contact" />

        <div className="grid grid-cols-1 gap-8">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Send your message to us</h3>
            </div>
            <div className="p-7">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5 flex flex-col gap-5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
                      Full Name
                    </label>
                    <input
                      {...register("fullName", { required: true })}
                      className="w-full rounded border border-stroke bg-gray py-3 px-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                      type="text"
                      id="fullName"
                      placeholder="John Doe"
                      defaultValue={user?.fullName ?? ""}
                    />
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="phoneNumber">
                      Phone Number
                    </label>
                    <input
                      {...register("phoneNumber", { required: true })}
                      className="w-full rounded border border-stroke bg-gray px-4 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                      type="text"
                      id="phoneNumber"
                      placeholder="+990 3343 7865"
                      />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="emailAddress">
                    Email Address
                  </label>
                  <input
                    {...register("emailAddress", { required: true })}
                    className="w-full rounded border border-stroke bg-gray px-4 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    type="email"
                    id="emailAddress"
                    placeholder="johndoe@example.com"
                    defaultValue={user?.primaryEmailAddress?.emailAddress ?? ""}
                  />
                </div>

                <div className="mb-5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="message">
                    Your message
                  </label>
                  <textarea
                    {...register("message", { required: true })}
                    className="w-full rounded border border-stroke bg-gray px-4 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    id="message"
                    rows={4}
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                {successMessage && <p className="text-green-500">{successMessage}</p>}

                <div className="flex justify-end gap-4">
                  <button
                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Contact;
