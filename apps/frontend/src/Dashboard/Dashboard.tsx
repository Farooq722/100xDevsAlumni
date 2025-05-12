import { Navbar } from "../body/Navbar/Navbar";
import AlumniCard from "./card/AlumniCard";


export default function Dashboard() {

    const users = [
    {
        name: "farooq",
        bio: "aklsjhgsghsa",
        company: "google",
        role: "alumni"
    },
    {
        name: "farooq1",
        bio: "aklsjhgsghsa",
        company: "google",
        role: "alumni"
    },
    {
        name: "farooq2",
        bio: "aklsjhgsghsa",
        company: "google",
        role: "alumni"
    },
    {
        name: "farooq3",
        bio: "aklsjhgsghsa",
        company: "google",
        role: "alumni"
    }
];

    return(
       <div className="bg-slate-200 min-h-screen">
        <>
          <Navbar />
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {users.map((item) => (
                <div>
                  <AlumniCard user={item} />,
                </div>
              ))}
            </div>
          </div>
        </>
        </div>
    )
}