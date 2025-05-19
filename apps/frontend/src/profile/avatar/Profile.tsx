

const Profile = () => {
     const profile = "https://github.com/shadcn.png";

  return (
    <div className="rounded-full overflow-hidden w-32 h-32 sm:w-50 sm:h-50 md:ml-2 md:w-[300px] md:h-[300px] border-2 border-gray-900 dark:border-gray-900">
      <img
        src={profile}
        alt="User profile picture"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Profile;
