import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import {GoogleGenerativeAI,  HarmCategory,
    HarmBlockThreshold,} from "@google/generative-ai"

const AiChatbox = ({user}) => {
    const MODEL_NAME = "gemini-1.0-pro";
    const API_KEY = import.meta.env.VITE_GEMINI_KEY
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    
    async function runChat(content) {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      
        const generationConfig = {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        };
      
        const safetySettings = [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ];
      
        const chat = model.startChat({
          generationConfig,
          safetySettings,
          history: [
          ],
        });
      
        const result = await chat.sendMessage(content);
        const response = result.response;
        return response.text()
      }
      

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(message === "")return


        // const response = await runChat(message)
        // console.log(response)

        setMessage("")
    }
  return (
    <>
    <div className='h-[82.5%] mb-1 overflow-auto'>
      hjdhf
   
    </div>








    {/* chat footer */}
    <form className='bg-[grey]  min-h-[10%] rounded-md flex items-center px-2 w-[100%] relative' onSubmit={e => handleSubmit(e)}>
            <input onChange = { e => setMessage(e.target.value.trim())} className = " border-solid border-2 border-black  rounded-xl p-3 pr-[2rem] w-[100%]"/>
            <IoSend className='absolute right-4 text-2xl cursor-pointer' onClick={e => handleSubmit(e)} />

          </form>
    </>
  )
}

export default AiChatbox