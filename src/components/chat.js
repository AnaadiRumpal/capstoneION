import React, { useEffect, useRef, useState } from 'react';
import { Settings, Search, Clock, User, MessageSquare, Send, Menu } from 'lucide-react';

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [ticketPopup,setTicketPopup] = useState(false);
  const [ticketBox, setTicketBox] = useState(false);

  const mssgEnd = useRef( );
  const userData = {
    name: "Developer",
    email: "ion.dev@company.com",
    role: "Dev@Commodities",
    productVersion: "v3.2.1",
    subscriptionStatus: "Active"
  };

  const previousChats = [
    { id: 1, title: "API Integration Issue", date: "2025-01-27", status: "Resolved" },
    { id: 2, title: "Payment Gateway Setup", date: "2025-01-25", status: "In Progress" },
    { id: 3, title: "Dashboard Access", date: "2025-01-22", status: "Resolved" }
  ];

  useEffect(() => {
    mssgEnd.current?.scrollIntoView({ behavior: "smooth" });  
  }, [messages]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessage = { type: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/faq", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { type: 'bot', content: data.answer }]);
      // Showing the ticket popup after the first response
      if (!ticketPopup) {
        setTicketPopup(true);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'bot',
        content: "I apologize, but I'm having trouble connecting to the server. Please try again or contact support if the issue persists."
      }]);
    }

    setLoading(false);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-gradient-to-bl from-blue-950 via-blue-900 to-blue-950 to-50%">
      {/* Mobile Menu Toggle */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-blue-600/80 backdrop-blur-lg rounded-xl shadow-lg text-white hover:bg-blue-600 transition-all"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Left Sidebar */}
      <div className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 fixed lg:relative w-80 h-full bg-blue-950/40 backdrop-blur-2xl border-r border-blue-400/10 flex flex-col z-40 shadow-2xl`}>
        {/* User Profile Section */}
        <div className="p-6 border-b border-blue-400/10">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-bl from-blue-400 to-blue-600 p-4 rounded-2xl shadow-lg ring-2 ring-blue-500/20">
              <User className="text-white" size={24} />
            </div>
            <div>
              <h2 className="font-semibold text-white text-lg">{userData.name}</h2>
              <p className="text-sm text-blue-200/80">{userData.role}</p>
            </div>
          </div>
          <div className="mt-6 space-y-2 text-sm bg-blue-900/20 p-5 rounded-2xl ring-1 ring-blue-400/10 backdrop-blur-md">
            <p className="text-blue-200/80">Version: {userData.productVersion}</p>
            <p className="text-blue-200/80">Status: {userData.subscriptionStatus}</p>
          </div>
        </div>

        {/* Search Previous Chats */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search previous chats..."
              className="w-full pl-11 pr-4 py-3.5 bg-blue-900/20 border-blue-400/10 border rounded-xl text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3.5 top-4 text-blue-300/50" size={18} />
          </div>
        </div>

        {/* Previous Chats List */}
        <div className="flex-1 overflow-y-auto space-y-3 p-4">
          {previousChats.map(chat => (
            <div 
              key={chat.id} 
              className="p-4 rounded-2xl hover:bg-blue-800/20 cursor-pointer transition-all group border border-blue-400/10 hover:border-blue-400/20 backdrop-blur-sm hover:backdrop-blur-lg"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                  <h3 className="font-medium text-blue-100 group-hover:text-white transition-colors">
                    {chat.title}
                  </h3>
                  <p className="text-sm text-blue-300/70 flex items-center gap-2">
                    <Clock size={14} />
                    {chat.date}
                  </p>
                </div>
                <span className={`px-3.5 py-1.5 rounded-xl text-xs ${
                  chat.status === 'Resolved' 
                    ? 'bg-green-900/30 text-green-200 border border-green-400/20' 
                    : 'bg-yellow-900/30 text-yellow-200 border border-yellow-400/20'
                }`}>
                  {chat.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-blue-950/50 to-blue-900/30 backdrop-blur-lg">
        {/* Chat Header */}
        <div className="backdrop-blur-xl bg-blue-950/30 border-b border-blue-400/10 p-5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-900/30 rounded-xl border border-blue-400/10">
              <MessageSquare className="text-blue-400" size={24} />
            </div>
            <h1 className="text-xl font-semibold text-white">Developer Support</h1>
          </div>
          <button className="p-3 hover:bg-blue-800/30 rounded-xl transition-colors border border-transparent hover:border-blue-400/10">
            <Settings className="text-blue-400" size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 p-6 rounded-2xl backdrop-blur-xl border border-blue-400/10 shadow-lg">
            <p className="text-blue-100">
              Welcome to our Developer Support. I'm here to help you with resolving any fixes/ issues that need to be addressed.
              Please describe your concern, and I'll guide you through the solution.
            </p>
          </div>

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`p-6 rounded-2xl max-w-3xl backdrop-blur-xl shadow-lg ${
                msg.type === 'user'
                  ? 'bg-gradient-to-bl from-blue-400 to-blue-600 text-white'
                  : 'bg-gradient-to-bl from-blue-950/50 to-blue-900/50 text-blue-100 border border-blue-400/10'
              }`}>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={mssgEnd} />
        </div>
        {/* Input Area */}
        <div className="border-t border-blue-400/10 p-5 backdrop-blur-xl bg-blue-950/30">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 bg-blue-900/20 border border-blue-400/10 rounded-xl px-5 py-3.5 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-bl from-blue-400 to-blue-600 text-white px-6 py-3.5 rounded-xl hover:from-blue-500 hover:to-blue-700 disabled:from-blue-800 disabled:to-blue-800 disabled:text-blue-200/50 transition-all flex items-center gap-2 shadow-lg"
            >
              {loading ? "Sending..." : (
                <>
                  Send <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;