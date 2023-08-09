import React, { useEffect, useState } from "react";
import axios from "axios";
import { useProfileContext } from "../../contexts/ProfileContext";

const MotivationalMessage = () => {
  const { profile, recentWorkout } = useProfileContext();
  const [motivationalMessage, setMotivationalMessage] = useState("");
  const [lastGeneratedDate, setLastGeneratedDate] = useState(null);

  useEffect(() => {
    // Fetch the last generated date from storage (localStorage, AsyncStorage, etc.)
    const storedDate = localStorage.getItem("lastGeneratedDate");
    if (storedDate) {
      setLastGeneratedDate(new Date(storedDate));
    }

    fetchMotivationalMessage();
  }, []);

  const fetchMotivationalMessage = async () => {
    try {
      const currentDate = new Date();
      if (!lastGeneratedDate || currentDate.toDateString() !== lastGeneratedDate.toDateString()) {
        // Update the last generated date
        localStorage.setItem("lastGeneratedDate", currentDate.toISOString());
        setLastGeneratedDate(currentDate);

        // Generate a new motivational message
        const prompt = `Generate a motivational message for our fitnes app for a user who is a ${profile.fitness_level} with a goal of ${profile.goal}. They recently completed a workout that included ${recentWorkout.exercise_name} with ${recentWorkout.resistance} lbs of resistance and ${recentWorkout.reps} reps.`;

        const response = await axios.post(
          "https://api.openai.com/v1/engines/davinci-codex/completions",
          {
            prompt: prompt,
            max_tokens: 50,
            temperature: 0.7,
            api_key: "YOUR_OPENAI_API_KEY",
          }
        );

        setMotivationalMessage(response.data.choices[0].text);
      } else {
        // Use the cached motivational message
        const cachedMessage = localStorage.getItem("cachedMessage");
        setMotivationalMessage(cachedMessage);
      }
    } catch (error) {
      console.error("Error fetching motivational message:", error);
    }
  };

  return (
    <div className="motivational-message">
      <p>{motivationalMessage}</p>
    </div>
  );
};

export default MotivationalMessage;
