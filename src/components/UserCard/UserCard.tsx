import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { FaGoogle, FaLinkedin, FaGithub, FaApple } from "react-icons/fa"; // React Icons'dan gerekli simgeleri içe aktar

const UserCard = ({events, summits }: any) => {
  const { user } = useUser(); // Clerk'in useUser hook'u ile kullanıcı bilgilerini alıyoruz

  if (!user) {
    // Eğer kullanıcı yoksa, henüz giriş yapılmamışsa, loading durumu gösterebiliriz
    return <div>Loading...</div>;
  }

  // Bağlantılı hesaplar (Google, LinkedIn vb.)
  const externalAccounts = user.externalAccounts || [];

  // Bağlantılı hesaplara göre uygun ikonu döndüren fonksiyon
  const getAccountIcon = (provider: string) => {
    switch (provider.toLowerCase()) {
      case "google":
        return <FaGoogle className="text-xl text-blue-500" />;
      case "linkedin_oidc":
        return <FaLinkedin className="text-xl text-blue-700" />;
      case "github":
        return <FaGithub className="text-xl text-blue-600" />;
      case "apple":
        return <FaApple className="text-xl text-blue-600" />;
      default:
        return null;
    }
  };

  // Kullanıcının katıldığı etkinlikleri ve zirveleri bulmak için filtreleme
  const userEvents = events.filter((event: any) =>
    event.participantMemberIds?.includes(user.id)
  );
  const userSummits = summits.filter((summit: any) =>
    summit.participantMemberIds?.includes(user.id)
  );

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        User Profile
      </h4>

      <div className="flex items-center px-7.5 py-3">
        {/* Kullanıcı Avatarı */}
        <div className="relative h-14 w-14 rounded-full">
          <Image
            width={56}
            height={56}
            src={user.imageUrl || "/images/default-avatar.png"} // Varsayılan avatar
            alt="User Avatar"
            style={{
              width: "auto",
              height: "auto",
            }}
          />
        </div>

        {/* Kullanıcı Adı */}
        <div className="ml-4">
          <h5 className="font-medium text-black dark:text-white">
            {user.firstName} {user.lastName}
          </h5>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>

      {/* Bağlantılı Hesaplar */}
      {externalAccounts.length > 0 && (
        <div className="mt-4 px-7.5">
          <h5 className="font-medium text-black dark:text-white">
            Connected Accounts
          </h5>
          <div className="mt-3 flex flex-col gap-4">
            {externalAccounts.map((account, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2"
              >
                {/* Bağlantılı hesap için uygun ikonu göster */}
                {getAccountIcon(account.provider)}
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {
                    account.provider === "apple" && "Apple" ||
                    account.provider === "google" && "Google" ||
                    account.provider === "linkedin_oidc" && "Linkedin" ||
                    account.provider === "github" && "Github"
                  }
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bağlantılı Hesap Olmadığında */}
      {externalAccounts.length === 0 && (
        <div className="mt-4 px-7.5">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No connected accounts found.
          </p>
        </div>
      )}

      {/* Kullanıcının Katıldığı Etkinlikler */}
      {userEvents.length > 0 && (
        <div className="mt-6 px-7.5">
          <h5 className="font-medium text-black dark:text-white">
          Upcoming Events 🎉
          </h5>
          <ul className="mt-3">
            {userEvents.map((event: any) => (
              <li key={event.id} className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                {event.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Kullanıcının Katıldığı Zirveler */}
      {userSummits.length > 0 && (
        <div className="mt-6 px-7.5">
          <h5 className="font-medium text-black dark:text-white">
          Upcoming Summits 🌟
          </h5>
          <ul className="mt-3">
            {userSummits.map((summit: any) => (
              <li key={summit.id} className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                {summit.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserCard;
