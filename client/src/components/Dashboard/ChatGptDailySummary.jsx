import React, { useEffect, useState } from "react";
import axios from "axios";
import { useProfileContext } from "../../contexts/ProfileContext";

//Chat GPT motivation message Broiler Pate
const ChatGptDailySummary = () => {
  const { profile } = useProfileContext();
  const [motivationalMessage, setMotivationalMessage] = useState("");
  const [lastGeneratedDate, setLastGeneratedDate] = useState(null);

  //need program for user if they are enrolled in one

  useEffect(() => {
    // Fetch the last generated date from storage
    const storedDate = localStorage.getItem("lastGeneratedDate");
    if (storedDate) {
      setLastGeneratedDate(new Date(storedDate));
    }

    fetchMotivationalMessage();
  }, [profile]);

  const fetchMotivationalMessage = async () => {
    try {
      const currentDate = new Date();
      if (
        !lastGeneratedDate ||
        currentDate.toDateString() !== lastGeneratedDate.toDateString()
      ) {
        // Update the last generated date
        localStorage.setItem("lastGeneratedDate", currentDate.toISOString());
        setLastGeneratedDate(currentDate);

        // Generate a new motivational message
        const prompt = `Generate a one line short motivational message for our fitness app for a user whose fitness level is ${profile.fitness_level} with a goal of ${profile.goal}, and Suggest specific exercises and workouts for the day and a weekly guide based on their goal. Senctence must end before tokens are finished.`;

        const key = process.env.REACT_APP_YOUR_OPENAI_API_KEY;
        console.log("open ai key:", key);

        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            max_tokens: 200,
            temperature: 0.7,
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a personal fitness trainer.",
              },
              { role: "user", content: prompt },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${key}`,
            },
          }
        );
        // console.log("Response data", response.data);
        setMotivationalMessage(response.data.choices[0].message.content);
      } else {
        // Use the cached motivational message
        const cachedMessage = localStorage.getItem("cachedMessage");
        setMotivationalMessage(cachedMessage);
      }
    } catch (error) {
      console.error("Error fetching motivational message:", error);
      setMotivationalMessage(
        "Unlock your potential with every move. Embrace the challenge, push your limits, and celebrate your progress. Your fitness journey is a testament to your strength and determination. Keep going!"
      );
    }
  };

  return (
    <div className="motivational-message">
      <h2>Daily Summary</h2>
      <p className="text-white">{motivationalMessage}</p>
    </div>
  );
};

export default ChatGptDailySummary;
