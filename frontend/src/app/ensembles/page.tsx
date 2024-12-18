"use client";

import { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import { useRouter } from "next/navigation";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import PostingCard from "../components/PostingCard/PostingCard";
import Modal from "../components/Modal/Modal";

interface Ensemble {
  _id: string;
  title: string;
  description: string;
  city: string;
  ensembleName: string;
  instrument: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  ensembles?: string[];
}

export default function EnsemblesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnsembleId, setSelectedEnsembleId] = useState<string | null>(
    null,
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const openModal = (ensembleId: string) => {
    setSelectedEnsembleId(ensembleId);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken);
    setIsLoggedIn(!!storedToken);

    if (storedToken) {
      fetchUserProfile(storedToken);

      fetchEnsembles();
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
        setUserId(data.id);
      } else {
        const errorData = await response.json();
        alert(`Error fetching user profile: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleJoin = async () => {
    if (!selectedEnsembleId || !userId || !token) {
      alert("You must be logged in to join an ensemble.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/ensembles/${selectedEnsembleId}/join`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        },
      );

      if (response.ok) {
        alert("Successfully joined the ensemble!");
        closeModal();
        fetchEnsembles();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error joining ensemble:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const fetchEnsembles = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to view ensembles.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/ensembles", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEnsembles(data);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error fetching ensembles:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const createEnsamble = () => {
    router.push("/create-ensemble");
  };

  return (
    <div>
      <Nav />
      <div className="outer-grid montserrat-regular">
        <div className="inner-grid w-full py-24">
          <h1
            className="oswald-medium col-start-1 col-end-13 mb-4 text-4xl"
            style={{ color: "var(--dark-blue)" }}
          >
            Ensembles
          </h1>
          {!isLoggedIn ? (
            <div className="col-start-1 col-end-5 my-8 flex flex-col gap-8">
              <p>Please login to create and join ensembles</p>
              <PrimaryButton color="blue" size="large" onClick={handleLogin}>
                Log in
              </PrimaryButton>
            </div>
          ) : (
            <div className="col-start-1 col-end-13">
              <p className="my-4">
                {ensembles.length > 0
                  ? `${ensembles.length} Ensembles found`
                  : "No Ensembles found"}
              </p>

              <PrimaryButton onClick={createEnsamble} color="blue" size="large">
                Create Ensemble
              </PrimaryButton>
              <div className="grid grid-cols-3 gap-6 py-12">
                {ensembles.length > 0 ? (
                  ensembles.map((ensemble) => (
                    <div
                      key={ensemble._id}
                      onClick={() => openModal(ensemble._id)}
                    >
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
                  <p>No ensembles available.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>{" "}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAction={handleJoin}
        title="Would you like to join this ensemble?"
        description="By joining this ensemble, you will be able to chat with other members and participate in events."
        actionButtonText="Join"
        closeButtonText="Cancel"
      />
    </div>
  );
}
