"use client";
import { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import { useRouter } from "next/navigation";
import PostingCard from "../components/PostingCard/PostingCard";

interface User {
  id: string;
  name: string;
  email: string;
  city: string;
  instrument: string;
  createdAt: string;
  updatedAt: string;
  ensembles?: string[];
}

interface Ensemble {
  _id: string;
  title: string;
  description: string;
  city: string;
  ensembleName: string;
  instrument: string;
}

export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken);
    setIsLoggedIn(!!storedToken);

    if (storedToken) {
      fetchUserProfile(storedToken);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch("http://localhost:3000/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: User = await response.json();
        setUserData(data);

        if (data.ensembles && data.ensembles.length > 0) {
          fetchEnsembles(data.ensembles, token);
        }
      } else {
        const errorData = await response.json();
        alert(`Error fetching user profile: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const fetchEnsembles = async (ensembleIds: string[], token: string) => {
    try {
      const fetchedEnsembles: Ensemble[] = [];
      for (const id of ensembleIds) {
        const response = await fetch(`http://localhost:3000/ensembles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data: Ensemble = await response.json();
          fetchedEnsembles.push(data);
        } else {
          console.error(`Failed to fetch ensemble with ID: ${id}`);
        }
      }
      setEnsembles(fetchedEnsembles);
    } catch (error) {
      console.error("Error fetching ensembles:", error);
    }
  };

  function createEnsamble() {
    router.push("/create-ensemble");
  }

  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <div>
      <Nav />
      <div className="outer-grid montserrat-regular">
        <div className="inner-grid w-full py-24">
          {!isLoggedIn ? (
            <div className="col-start-1 col-end-5 my-8 flex flex-col gap-8">
              <h1
                className="oswald-medium mb-4 text-4xl"
                style={{ color: "var(--dark-blue)" }}
              >
                Profile
              </h1>
              <p> Please log in to view your profile.</p>
              <PrimaryButton color="blue" size="large" onClick={handleLogin}>
                Log in
              </PrimaryButton>
            </div>
          ) : (
            <div className="col-start-1 col-end-13 mb-10 mt-4">
              <h1
                className="oswald-medium mb-4 text-4xl"
                style={{ color: "var(--dark-blue)" }}
              >
                Min profil
              </h1>
              <div className="flex gap-24 border-b border-gray-200 pb-10">
                <div className="rounded-xl bg-white p-3 shadow-md shadow-gray-200">
                  <div className="rounded-lg bg-gray-100 p-16">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36.489"
                      height="37.876"
                      viewBox="0 0 30.489 31.876"
                    >
                      <path
                        id="icons8-user"
                        d="M19.245,3a8.315,8.315,0,0,0-8.315,8.315V12.7a8.315,8.315,0,0,0,16.631,0V11.315A8.315,8.315,0,0,0,19.245,3Zm0,22.175c-5.552,0-12.676,3-14.725,5.668a2.517,2.517,0,0,0,2.017,4.033h25.42a2.517,2.517,0,0,0,2.017-4.033C31.921,28.179,24.794,25.175,19.242,25.175Z"
                        transform="translate(-4 -3)"
                        fill="#353a5d"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h3
                    className="oswald-medium mb-4 text-4xl"
                    style={{ color: "var(--dark-red)" }}
                  >
                    {userData?.name}
                  </h3>{" "}
                  <div className="flex flex-col gap-2 text-sm">
                    <p className="text-gray-500">{userData?.email}</p>
                    <p className="text-gray-500">City: {userData?.city}</p>
                    <p className="text-gray-500">
                      Instrument: {userData?.instrument}
                    </p>
                    <p className="text-gray-500">
                      Account Created At:{" "}
                      {userData?.createdAt
                        ? new Date(userData.createdAt).toLocaleString()
                        : "N/A"}
                    </p>
                    <p className="text-gray-500">
                      Last Updated:{" "}
                      {userData?.updatedAt
                        ? new Date(userData.updatedAt).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-4 mt-8 flex justify-between">
                <h2
                  className="oswald-medium text-4xl"
                  style={{ color: "var(--dark-blue)" }}
                >
                  Mine opslag
                </h2>
                <PrimaryButton
                  onClick={createEnsamble}
                  color="white"
                  size="medium"
                >
                  Create Ensemble
                </PrimaryButton>
              </div>
              <div className="grid grid-cols-3 gap-6 py-8">
                {ensembles.length > 0 ? (
                  ensembles.map((ensemble) => (
                    <div key={ensemble._id}>
                      <PostingCard
                        title={ensemble.title}
                        description={ensemble.description}
                        author={ensemble.ensembleName}
                        instrument={ensemble.instrument}
                        date="09-01-2025"
                        location={ensemble.city}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-start-1 col-end-13 mx-auto flex flex-col place-items-center gap-6">
                    <img
                      className="w-40"
                      src="/red-notebook.png"
                      alt="red notebook"
                    />
                    <h4
                      className="montserrat-bold"
                      style={{ color: "var(--dark-blue)" }}
                    >
                      Du har ingen opslag endnu
                    </h4>
                    <p className="max-w-[400px] text-center text-gray-400">
                      Opret et opslag så du kan finde, eller blive fundet af
                      andre musikere.
                    </p>
                    <PrimaryButton
                      onClick={createEnsamble}
                      color="blue"
                      size="large"
                    >
                      Create Ensemble
                    </PrimaryButton>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
