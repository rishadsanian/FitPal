import React, { useEffect, useState } from "react";
import axios from "axios";
import { useProfileContext } from "../../contexts/ProfileContext";

// Chat GPT motivation message and workout plan generator
const ChatGptDailySummary = () => {
  const { profile } = useProfileContext();
  const [motivationalMessage, setMotivationalMessage] = useState("");
  const [workoutPlan, setWorkoutPlan] = useState("");
  const [lastGeneratedDate, setLastGeneratedDate] = useState(null);

  // Fetch messages and workout plan when profile changes
  useEffect(() => {
    // Fetch the last generated date from storage
    const storedDate = localStorage.getItem("lastGeneratedDate");
    if (storedDate) {
      setLastGeneratedDate(new Date(storedDate));
    }

    fetchMessages();
  }, [profile]);

  useEffect(() => {
    fetchMessages();
  }, [profile]);

  // Fetch motivational message and workout plan
  const fetchMessages = async () => {
    try {
      const currentDate = new Date();
      if (
        !lastGeneratedDate ||
        currentDate.toDateString() !== lastGeneratedDate.toDateString()
      ) {
        const key = process.env.REACT_APP_YOUR_OPENAI_API_KEY;

        // Fetch motivational message
        const prompt = `Generate a one line short motivational message for our fitness app for a user whose fitness level is ${profile.fitness_level} with a goal of ${profile.goal}. Sentence must end before tokens are finished`;

        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            max_tokens: 50,
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

        const newMessage = response.data.choices[0].message.content;
        setMotivationalMessage(newMessage);
        localStorage.setItem("cachedMessage", newMessage);

        // Generate a new workout plan
        const workoutPrompt = `your response and sentence must end before tokens are finished.If there is no ${profile.program_id}, Suggest specific exercise name for the day based on the user's goal: ${profile.goal} and user fitness level: ${profile.fitness_level}. If there is a ${profile.program_id}, ask user to check out the program schedule. `;

        const workoutResponse = await axios.post(
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
              { role: "user", content: workoutPrompt },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${key}`,
            },
          }
        );

        const newWorkoutPlan = workoutResponse.data.choices[0].message.content;
        setWorkoutPlan(newWorkoutPlan);
        localStorage.setItem("cachedWorkoutPlan", newWorkoutPlan);
      } else {
        // Use the cached motivational message
        const cachedMessage = localStorage.getItem("cachedMessage");
        setMotivationalMessage(cachedMessage);

        // Use the cached workout plan
        const cachedWorkoutPlan = localStorage.getItem("cachedWorkoutPlan");
        setWorkoutPlan(cachedWorkoutPlan);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMotivationalMessage(
        "Unlock your potential with every move. Embrace the challenge, push your limits, and celebrate your progress. Your fitness journey is a testament to your strength and determination. Keep going!"
      );
      setWorkoutPlan("Unable to generate workout plan at the moment.");
    }
  };

  return (
    <div className="motivational-message">
      <h2>Daily Summary</h2>
      <p className="text-white">{motivationalMessage}</p>
      <p className="text-white">{workoutPlan}</p>
    </div>
  );
};

export default ChatGptDailySummary;
