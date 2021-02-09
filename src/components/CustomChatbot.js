//https://medium.com/javascript-in-plain-english/may-i-help-you-build-a-chatbot-in-10-minutes-with-react-df19e940bbc8
import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { useHistory } from "react-router-dom";
import utahPlaces from "../modules/utahPlaces.json";
function CustomChatbot({setLocation}) {
    let history = useHistory();
    const findLocation = zip => {
        const match = utahPlaces.find(
            city => city.fields.zip.toLowerCase() === zip.toLowerCase()
        )
        if(!match || !match.fields) {
            return "Ask Zip Again"
        }
        console.log(match.fields);
        console.log(history.location.pathname)
        if(history.location.pathname.startsWith("/map")) {
            setLocation([match.fields.latitude, match.fields.longitude]);
        } else {
            history.push("/reports?district=sb" + match.UtahLeg.schoolBoard);
        }
        return "schoolBoardDistrictdone";

    };
    const theme = {
        background: "white",
        fontFamily: "Arial, Helvetica, sans-serif",
        headerBgColor: "#251B0C",
        headerFontColor: "#fff",
        headerFontSize: "25px",
        botBubbleColor: "#251B0C",
        botFontColor: "#fff",
        userBubbleColor: "#fff",
        userFontColor: "#4c4c4c"
       };
const config = {
    width: "300px",
    height: "400px",
    floating: true
};
  const steps = [
    {
        id: "Greet",
        message: "Hello there!",
        trigger: "How can help"
     },
     {
        id: "How can help",
        message: "How can I help you",
        trigger: "Categories"
     },
     {
        id: "Categories",
        options: [
             {
               value: "school",
               label: "Find a school",
               trigger: () => history.push("/map") || "Done"
             },
             { 
               value: "reports",
               label: "Get Reports",
               trigger: () => history.push("/reports") || "DoneReports"
             } 
        ]
       },
      {
       id: "Done",
       message: "Check out the maps page!",
       trigger: "Ask Zip"
      },
      {
       id: "DoneReports",
       message: "Check out the reports page!",
       trigger: "Ask Zip"
      },
      {
        id: "Ask Zip",
        message: "What is your zip code?",
        trigger: "Waiting user input for city"
     },
     {
        id: "Ask Zip Again",
        message: "I'm sorry I couldn't find that zip code",
        trigger: "Ask Zip"
     },
     {
        id: "Waiting user input for city",
        user: true,
        trigger: input => findLocation(input.value) 
     },
     {
        id: "done",
        message: "Zoom in to the map and take a closer look!",
        end: true
     },
     {
        id: "schoolBoardDistrictdone",
        message: "I have loaded the reports for schools in your area with the nearest State School Board District",
        end: true
     },
    ];
  return <ThemeProvider theme={theme}>
         <ChatBot steps={steps} {...config} />
      </ThemeProvider>
}
export default CustomChatbot;