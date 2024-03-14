import React, { useState, useEffect } from "react";
import axios from "axios";

const MissionEditForm = ({ missionId, setMissionId }) => {
    const [people, setPeople] = useState([]);
const [personId, setPersonId] = useState('');
    const [mission, setMission] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        year: "",
        outcome: "",
    });

    const loadPeople = async () => {
        try {
            const response = await axios.get("/api/people");
            setPeople(response.data.people);
        } catch (error) {
            console.error("Error loading people:", error);
        }
    };


    useEffect(() => {
        loadPeople()
        if (missionId) {
            fetch(`/api/missions/${missionId}`)
                .then((response) => response.json())
                .then((data) => setMission(data))
                .catch((error) =>
                    console.error("Error fetching mission:", error)
                );
        }
    }, [missionId]);

    useEffect(() => {
        if (mission) {
            setFormData({
                name: mission.name,
                year: mission.year,
                outcome: mission.outcome,
            });
        }
    }, [mission]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");
            const response = await axios.put(
                `/api/missions/${missionId}`,
                formData,
                {
                    headers: {
                        "X-CSRF-TOKEN": token,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error("Error submitting mission data:", error);
        }
    };
   
    const handleAssignmentOfPeople = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/api/missions/assign-person", {
                personId: personId,
                missionId: mission.id,
            });
        } catch (error) {
            console.error("Error assigning person to mission:", error);
        }
    };

    const handlePersonChange = (event) => {
        setPersonId(event.target.value);
    };
    const handleClose = () => {
        setMissionId(null);
    };

    return (
        <div className="form-container">
            <h2>Edit Form for Mission {missionId}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="year">Year:</label>
                    <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="outcome">Outcome:</label>
                    <select
                        name="outcome"
                        value={formData.outcome}
                        onChange={handleChange}
                    >
                        <option value="success">Success</option>
                        <option value="failure">Failure</option>
                    </select>
                </div>

                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
            <button onClick={handleClose} className="close-button">
                &times;
            </button>

            {/* People assignment form */}
            <form onSubmit={handleAssignmentOfPeople}>
                <label htmlFor="people">Assign Person to Mission:</label>
                <select
                    name="people"
                    id="people"
                    onChange={handlePersonChange}
                    value={personId}
                >
                    <option value={null}>Select a person</option>
                    {people.length > 0 && people.map((person) => (
                        <option key={person.id} value={person.id}>
                            {person.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Assign</button>
            </form>
        </div>
    );
};

export default MissionEditForm;
