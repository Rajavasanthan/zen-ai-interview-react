import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";

function Conversation() {
  const [message, setMessage] = useState("hi");
  const [messages, setMessages] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef(null);

  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchConversation = async () => {
      // Logic to fetch and display conversation based on session ID
      try {
        const conversation = await axios.post(
          `${config.api}/conversation/${id}`,
          {
            message,
          },
        );
        setMessages((prevMessages) => [...prevMessages, conversation.data]);
        setIsComplete(conversation.data.isComplete);
      } catch (err) {
        console.error("Failed to fetch conversation", err);
      }
    };
    fetchConversation();
  }, [id]);

  useEffect(() => {
    if (isComplete) {
      setIsLoading(false);
      navigate(`/summary/${id}`);
    }
  }, [isComplete]);

  let handleSend = async (e) => {
    e?.preventDefault();
    if (!message.trim()) return;

    const currentMsg = message;
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: currentMsg, sender: "user" },
    ]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${config.api}/conversation/${id}`,
        {
          message: currentMsg,
        },
      );
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setIsComplete(response.data.isComplete);
    } catch (error) {
      console.error("Error sending message:", error);
      // Start of Selection
      setMessages((prevMessages) => [...prevMessages, { content: "Error: Could not reach the server.", sender: "ai", isError: true }]);
      // End of Selection
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="bg-slate-800/80 p-4 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            AI
          </div>
          <div>
            <h2 className="font-semibold text-white">Interview Session</h2>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
        <div className="text-xs text-slate-500 font-mono">
          ID: {id?.slice(0, 8)}...
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
            <div className="p-4 rounded-full bg-slate-800/50">
              <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <p>Start the conversation to begin your interview.</p>
          </div>
        )}
        {messages.map((msg, index) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={index}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${isUser
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : msg.isError ? "bg-red-900/50 border border-red-700 text-red-100 rounded-bl-none" : "bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none"
                  }`}
              >
                {!isUser && !msg.isError && (
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 font-bold">AI Interviewer</div>
                )}
                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-none px-5 py-4 shadow-sm flex items-center space-x-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-800/50 border-t border-slate-700 backdrop-blur-sm">
        <form
          className="flex items-center gap-3 max-w-4xl mx-auto"
          onSubmit={handleSend}
        >
          <input
            type="text"
            name="message"
            id="message"
            className="flex-1 bg-slate-900 border border-slate-700 text-white text-sm rounded-full focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3.5 px-6 shadow-inner placeholder-slate-500 transition-all"
            placeholder="Type your answer here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="p-3.5 bg-indigo-600 rounded-full hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-600/30 text-white"
          >
            <svg
              className="w-5 h-5 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
            <span className="sr-only">Send message</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Conversation;
