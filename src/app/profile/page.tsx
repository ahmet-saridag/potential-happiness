import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { UserProfile } from "@clerk/nextjs";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Swarm Connection",
  description:
    "Swarm Connection",
};

const Profile = () => {
  return (
    <DefaultLayout>

<Breadcrumb pageName="Profile" />

      <UserProfile routing="virtual" />
    </DefaultLayout>
  );
};

export default Profile;
