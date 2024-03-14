import React, { useState, useEffect } from "react";
import MissionEditForm from "./MissionEditForm";

const Missions = () => {
    const [missions, setMissions] = useState([]);
    const [missionId, setMissionId] = useState(null);

    useEffect(() => {
        fetch("/api/missions")
            .then((response) => response.json())
            .then((data) => setMissions(data))
            .catch((error) => console.error("Error fetching missions:", error));
    }, []);

    return (
        <div className="missions-container">
            <h1>Missions</h1>
            {missionId === null ? (
                <ul className="missions-list">
                    {missions.map((mission, index) => (
                        <li
                            key={index}
                            onClick={() => setMissionId(mission.id)}
                        >
                            {mission.name} - {mission.description}
                        </li>
                    ))}
                </ul>
            ) : (
                <MissionEditForm
                    missionId={missionId}
                    setMissionId={setMissionId}
                />
            )}
        </div>
    );
};

export default Missions;