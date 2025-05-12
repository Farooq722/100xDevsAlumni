import { BookCopy, BriefcaseBusiness, Users } from "lucide-react";

export const Page2 = () => {
  return (
    <div className="mt-28 px-4">
      <div className="text-center font-semibold">
        <h1 className="text-2xl sm:text-3xl bg-gradient-to-bl from-teal-500 to-pink-500 bg-clip-text text-transparent italic">
          Exclusive Benefits
        </h1>
      </div>
      <div className="text-center font-medium mt-4">
        <h1 className="text-slate-600 text-sm sm:text-base">
          Unlock a world of opportunities available only to 100xDevs alumni
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-stretch mt-10 gap-10">
        {[
          {
            icon: <Users />,
            title: "Elite Community",
            desc: "Connect with a curated network of exceptional developers who have completed the rigorous 100xDevs program. Build relationships that will last throughout your career.",
          },
          {
            icon: <BookCopy />,
            title: "Advanced Resources",
            desc: "Access exclusive workshops, courses, and learning materials that go beyond the core curriculum. Stay at the cutting edge of technology with continuous learning opportunities.",
          },
          {
            icon: <BriefcaseBusiness />,
            title: "Career Acceleration",
            desc: "Gain access to exclusive job opportunities, referrals, and networking events with top tech companies actively seeking 100xDevs talent.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="w-full sm:w-64 min-h-[320px] flex flex-col border bg-gradient-to-bl from-teal-100 to-pink-100 rounded-xl p-5"
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-2 transform transition-transform duration-300 hover:scale-105 hover:rotate-1">
              {item.icon}
              <h2 className="text-center text-lg">{item.title}</h2>
              <p className="font-normal text-slate-600 text-center text-sm sm:text-base">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
