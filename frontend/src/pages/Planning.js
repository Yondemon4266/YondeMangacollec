import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import db from "../db.json";
import Card from "../components/Card";
const Planning = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);
  
  const scheduleDB = localStorage.getItem("scheduleDB");

  const databaseSchedule = scheduleDB ? JSON.parse(scheduleDB) : db;
  useEffect(() => {
    localStorage.setItem("scheduleDB", JSON.stringify(databaseSchedule));
  }, [databaseSchedule]);

  const today = new Date();
  const todayISO = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const daysSemaine = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() + i);
    daysSemaine.push(
      day.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }
  const daysOfWeek = [
    "Mondays",
    "Tuesdays",
    "Wednesdays",
    "Thursdays",
    "Fridays",
    "Saturdays",
    "Sundays",
  ];

  const daysofWeekFR = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  return (
    <div>
      <Navigation />
      <div id="schedules" className="schedules container">
        <div className="connexion">
          <h4>Planning</h4>
        </div>
        {daysOfWeek.map((day, index) => (
          <ul className="schedule-day-container" key={day}>
            <div className="day">
              <h4>
                {daysSemaine[index] === todayISO
                  ? "Aujourd'hui" +
                    " " +
                    daysofWeekFR[index] +
                    " " +
                    daysSemaine[index]
                  : daysofWeekFR[index] + " " + daysSemaine[index]}
              </h4>
            </div>
            <div className="schedule-day-list">
              {databaseSchedule
                .filter((element) => element.broadcast.day === day)
                .map((element) => (
                  <Card manga={element} key={element.mal_id} />
                ))}
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Planning;
