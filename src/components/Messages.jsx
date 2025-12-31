import { Link } from 'react-router-dom';
import '../styles/Messages.css';

function Messages() {
  // Add your custom messages here
  const messages = [
    {
      id: 1,
      title: "To My Love",
      text: "You are the reason I smile every day. Thank you for being you and for making every moment special. Here's to another amazing year together! 💕"
    },
    {
      id: 2,
      title: "Our Journey",
      text: "Every day with you is a new adventure. From our first hello to this moment, you've filled my life with joy, laughter, and endless love. I can't wait to create more memories with you in 2026! 🌟"
    },
    {
      id: 3,
      title: "Forever Grateful",
      text: "I'm so grateful for every moment we share. You're my best friend, my partner, and my everything. Cheers to us and to the beautiful future ahead! 🥂"
    },
    {
      id: 4,
      title: "New Year Wishes",
      text: "As we step into 2026, I want you to know that my love for you grows stronger every day. May this year bring us even closer and fill our lives with happiness, success, and unforgettable memories. Happy New Year, my darling! 🎊"
    }
  ];

  return (
    <div className="messages-container">
      <Link to="/home" className="back-btn">← Back to Home</Link>
      
      <div className="messages-header">
        <h1>💌 Love Notes For You 💌</h1>
        <p>Words straight from my heart</p>
      </div>

      <div className="messages-grid">
        {messages.map(message => (
          <div key={message.id} className="message-card">
            <div className="message-icon">💖</div>
            <h3>{message.title}</h3>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;
