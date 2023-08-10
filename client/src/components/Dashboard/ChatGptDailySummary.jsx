import React, { useEffect, useState } from "react";
import axios from "axios";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useWorkoutContext } from "../../contexts/WorkoutContext";

//Chat GPT motivation message Broiler Pate
const ChatGptDailySummary = () => {
  const { profile} = useProfileContext();
  const [motivationalMessage, setMotivationalMessage] = useState("");
  const [lastGeneratedDate, setLastGeneratedDate] = useState(null);

  //need program for user if they are enrolled in one

  useEffect(() => {
    // Fetch the last generated date from storage (localStorage, AsyncStorage, etc.)
    const storedDate = localStorage.getItem("lastGeneratedDate");
    if (storedDate) {
      setLastGeneratedDate(new Date(storedDate));
    }

    fetchMotivationalMessage();
  }, [profile]);

  // const fetchMotivationalMessage = async () => {
  //   try {
  //     const currentDate = new Date();
  //     if (
  //       !lastGeneratedDate ||
  //       currentDate.toDateString() !== lastGeneratedDate.toDateString()
  //     ) {
  //       // Update the last generated date
  //       localStorage.setItem("lastGeneratedDate", currentDate.toISOString());
  //       setLastGeneratedDate(currentDate);

  //       // Generate a new motivational message
  //       const prompt = `Generate a motivational message for our fitnes app for a user who is a ${profile.fitness_level} with a goal of ${profile.goal}. Recommend exercises for the day and a weekly program`; //to add session name, list of exerciss.
  //       // const prompt = `Generate a motivational message for our fitnes app for a user who is a ${profile.fitness_level} with a goal of ${profile.goal}. They recently completed a workout that included ${recentWorkout.exercise_name} with ${recentWorkout.resistance} lbs of resistance and ${recentWorkout.reps} reps.`; //to add session name, list of exerciss.

  //       const response = await axios.post(
  //         // "https://api.openai.com/v1/engines/davinci-codex/completions",
  //         "https://api.openai.com/v1/chat/completions",
  //         {
  //           prompt: prompt, //different prompts can be passed depending on use cases
  //           max_tokens: 100, // need to adjust this for length of message
  //           temperature: 0.7,
  //           api_key: process.env.YOUR_OPENAI_API_KEY, //need .env and .env example to be setup
  //         }
  //       );

  //       setMotivationalMessage(response.data.choices[0].text);
  //     } else {
  //       // Use the cached motivational message
  //       const cachedMessage = localStorage.getItem("cachedMessage");
  //       setMotivationalMessage(cachedMessage);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching motivational message:", error);
  //     setMotivationalMessage(
  //       "Unlock your potential with every move. Embrace the challenge, push your limits, and celebrate your progress. Your fitness journey is a testament to your strength and determination. Keep going!"
  //     ); //54 tokens
  //   }
  // };

  const fetchMotivationalMessage = async () => {
    try {
      const currentDate = new Date();
      if (
        !lastGeneratedDate ||
        currentDate.toDateString() !== lastGeneratedDate.toDateString()
      ) 
      {
        // Update the last generated date
        localStorage.setItem("lastGeneratedDate", currentDate.toISOString());
        setLastGeneratedDate(currentDate);

        // Generate a new motivational message
        const prompt = `Generate a motivational message for our fitness app for a user who is a ${profile.fitness_level} with a goal of ${profile.goal}. Recommend exercises for the day and a weekly program`;

        const response = await axios.post(
          "https://api.openai.com/v1/engines/davinci-codex/completions",
          {
            prompt: prompt,
            max_tokens: 100,
            temperature: 0.7,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.YOUR_OPENAI_API_KEY}`,
            },
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
      setMotivationalMessage(
        "Unlock your potential with every move. Embrace the challenge, push your limits, and celebrate your progress. Your fitness journey is a testament to your strength and determination. Keep going!"
      );
    }
  };

  return (
    <div className="motivational-message">
      <p className="col-md-8 fs-4">{motivationalMessage}</p>
    </div>
  );
};

export default ChatGptDailySummary;
