"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import Nav from "../components/Nav/Nav";

export default function UpdateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [instrument, setInstrument] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [ensembles, setEnsembles] = useState<string[] | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken);
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
        const data = await response.json();
        setUserId(data.id);
        setName(data.name);
        setEmail(data.email);
        setCity(data.city);
        setInstrument(data.instrument);
        setEnsembles(data.ensembles);
        setPassword("");
      } else {
        const errorData = await response.json();
        alert(`Error fetching user profile: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleNameChange = (e: any) => setName(e.target.value);
  const handleEmailChange = (e: any) => setEmail(e.target.value);
  const handleCityChange = (e: any) => setCity(e.target.value);
  const handleInstrumentChange = (e: any) => setInstrument(e.target.value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const updatedUser: any = {};

    if (name !== "") updatedUser.name = name;
    if (email !== "") updatedUser.email = email;
    if (city !== "") updatedUser.city = city;
    if (instrument !== "") updatedUser.instrument = instrument;

    if (password !== "") updatedUser.password = password;

    if (ensembles !== undefined) updatedUser.ensembles = ensembles;

    const result = await updateUserProfile(userId, updatedUser);

    if (result.error) {
      console.error(result.error);
    } else {
      router.push("/profile");
    }
  };

  async function updateUserProfile(id: string, updatedUser: any) {
    const url = `http://localhost:3000/users/${id}`;
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || "Failed to update user");
      }

      return json;
    } catch (error) {
      console.error(error);
      return { error: (error as Error).message || "An error occurred" };
    }
  }

  return (
    <div>
      <Nav />
      <div className="outer-grid montserrat-regular py-12">
        <div className="inner-grid">
          <h1
            className="oswald-medium col-start-1 col-end-13 my-8 text-4xl"
            style={{ color: "var(--dark-blue)" }}
          >
            Update Profile
          </h1>
          <form
            className="col-start-1 col-end-4 flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="input-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>

            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>

            <div className="input-field">
              <label htmlFor="instrument">Instrument</label>
              <input
                type="text"
                id="instrument"
                name="instrument"
                value={instrument}
                onChange={handleInstrumentChange}
                required
              />
            </div>

            <div className="input-field">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={handleCityChange}
                required
              />
            </div>

            <PrimaryButton
              color="blue"
              className="mt-4"
              size="large"
              type="submit"
            >
              Save Changes
            </PrimaryButton>
          </form>
        </div>
      </div>
    </div>
  );
}
