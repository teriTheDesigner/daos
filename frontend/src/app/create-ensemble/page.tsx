"use client";

import { useEffect, useState } from "react";
import Nav from "../components/Nav/Nav";
import { useRouter } from "next/navigation";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";

export default function CreateEnsemblePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instrument, setInstrument] = useState("");
  const [city, setCity] = useState("");
  const [ensembleName, setEnsembleName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleInstrumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstrument(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleEnsembleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnsembleName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create an ensemble.");
      return;
    }

    const ensembleData = {
      description,
      title,
      instrument,
      city,
      ensembleName,
    };

    try {
      const response = await fetch("http://localhost:3000/ensembles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ensembleData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Ensemble created:", data);
        alert("Ensemble created successfully!");
        setTitle("");
        setDescription("");
        setInstrument("");
        setCity("");
        setEnsembleName("");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating ensemble:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div>
      <Nav />
      <div
        className="outer-grid montserrat-regular py-12"
        style={{ backgroundColor: "var(--grey-100" }}
      >
        <div className="inner-grid">
          <h1
            className="oswald-medium col-start-4 col-end-10 my-4 justify-self-center text-4xl"
            style={{ color: "var(--dark-blue)" }}
          >
            Create Ensemble
          </h1>

          {!isLoggedIn ? (
            <div className="col-start-4 col-end-10 flex flex-col items-center gap-4">
              <p>Please login to create an ensemble.</p>
              <PrimaryButton color="blue" size="large" onClick={handleLogin}>
                Log in
              </PrimaryButton>
            </div>
          ) : (
            <form
              className="col-start-4 col-end-10 flex flex-col gap-8"
              onSubmit={handleSubmit}
            >
              <div className="input-field">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Titel (max 120 karakterer)"
                  value={title}
                  onChange={handleTitleChange}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="instrument">Instrument</label>
                <input
                  type="text"
                  id="instrument"
                  name="instrument"
                  placeholder="Vælg instrument"
                  value={instrument}
                  onChange={handleInstrumentChange}
                  required
                />
              </div>
              <div className="input-field">
                <label htmlFor="description">Description</label>
                <p>
                  Her kan du beskrive detaljer om hvad eller hvem du søger med
                  dette opslag. Klik på spørgsmålstegnet hvis du har brug for
                  hjælp.
                </p>
                <input
                  type="text"
                  id="description"
                  placeholder="Skriv en beskrivelse …"
                  name="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="By, postnr. eller adresse"
                  value={city}
                  onChange={handleCityChange}
                  required
                />
              </div>

              <div className="input-field">
                <label htmlFor="ensembleName">Ensemble name</label>
                <p>Hvis ensemblet eller gruppen har et navn.</p>
                <input
                  type="text"
                  id="ensembleName"
                  placeholder="Skriv navnet her"
                  name="ensembleName"
                  value={ensembleName}
                  onChange={handleEnsembleNameChange}
                  required
                />
              </div>

              <PrimaryButton
                color="blue"
                className="mt-4"
                size="large"
                type="submit"
              >
                Create Ensemble
              </PrimaryButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
