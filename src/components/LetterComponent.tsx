import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const letterContent = `Happy Birthday Sassyyyyy!!! We just want you to know how happy we are to have you in this little stupid discord life. We love you a lot even though we don't say it we do for sure. Since the day we three had that cheerful vc for the first time together, we always had fun convos, beautiful pretty little moments and loads of funn!!! We always enjoy each other's company and you ofa play a very wonderful 1/3rd part here. Ham ekh doosro ko itna taunt maarte hai kabhi kabhi and sometimes we just cheer eachother up. Serious situations ko bhi funny way mai leke chill hote ho sassy and jahnavi and nitesh ka daant and taunts ufff !! And chahe kitne din ka bhi gap aaye jb bhi baat krte hai phr se thoda sa bhi awkward nahi hote we just enjoy each other's company. We really hope we'll be this close and comfortable with eachother for a long time.... Have a wonderful day!!!!! And and and Ye letter padhke thoda rona vc krke hamare saamne rona so that ham has sakhe Hihihihiiii Love you ♡`;

interface LetterComponentProps {
  onClose: () => void;
  isVisible: boolean;
}

const LetterComponent: React.FC<LetterComponentProps> = ({ onClose, isVisible }) => {
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setTypedText('');
      setIsTypingComplete(false);
      return;
    }

    let i = 0;
    const typingSpeed = window.innerWidth < 768 ? 25 : 30; // Faster on mobile for better UX

    const typingInterval = setInterval(() => {
      if (i < letterContent.length) {
        setTypedText(letterContent.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-2 md:p-4">
      <div className="letter-container">
        <div className="letter-paper">
          <div className="letter-header">
            <h2 className="letter-title">💌 A Special Letter for Sassy 💌</h2>
          </div>
          
          <div className="letter-content">
            <p className="letter-text">{typedText}</p>
            {!isTypingComplete && <span className="typing-cursor">|</span>}
          </div>

          {isTypingComplete && (
            <div className="letter-footer">
              <p className="letter-signature">
                With lots of love,<br/>
                <strong>Nitesh & Jahanvi ❤️</strong>
              </p>
              
              <Button
                onClick={onClose}
                className="close-letter-btn w-full md:w-auto"
              >
                Close Letter 💕
              </Button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .letter-container {
          max-width: 350px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          animation: letterSlideIn 0.8s ease-out;
        }

        .letter-paper {
          background: linear-gradient(145deg, #fefefe 0%, #f8f8f8 100%);
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 
            0 10px 30px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.9);
          position: relative;
          font-family: 'Georgia', serif;
        }

        .letter-paper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 25px;
          width: 1px;
          height: 100%;
          background: linear-gradient(to bottom, transparent 0%, #ffb3d1 20%, #ffb3d1 80%, transparent 100%);
          opacity: 0.3;
        }

        .letter-header {
          text-align: center;
          margin-bottom: 20px;
          border-bottom: 1px solid #ffb3d1;
          padding-bottom: 15px;
        }

        .letter-title {
          font-size: 1.3rem;
          color: #d63384;
          font-weight: bold;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
          margin: 0;
          line-height: 1.2;
        }

        .letter-content {
          margin-bottom: 20px;
          min-height: 150px;
        }

        .letter-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #333;
          text-align: left;
          margin: 0;
          text-indent: 15px;
          font-weight: 400;
        }

        .typing-cursor {
          font-size: 0.95rem;
          color: #d63384;
          animation: blink 1s infinite;
        }

        .letter-footer {
          text-align: center;
          border-top: 1px solid #eee;
          padding-top: 15px;
        }

        .letter-signature {
          font-size: 1rem;
          color: #666;
          margin-bottom: 15px;
          font-style: italic;
        }

        .close-letter-btn {
          background: linear-gradient(45deg, #ff69b4, #ff1493);
          border: none;
          color: white;
          padding: 10px 20px;
          font-size: 1rem;
          font-weight: bold;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 3px 10px rgba(255,20,147,0.3);
          touch-action: manipulation;
        }

        .close-letter-btn:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 0 2px 8px rgba(255,20,147,0.4);
        }

        @keyframes letterSlideIn {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* Tablet and desktop responsive styles */
        @media (min-width: 768px) {
          .letter-container {
            max-width: 700px;
            max-height: 90vh;
          }

          .letter-paper {
            border: 2px solid #ddd;
            border-radius: 15px;
            padding: 40px;
            box-shadow: 
              0 20px 60px rgba(0,0,0,0.3),
              inset 0 1px 0 rgba(255,255,255,0.9);
          }

          .letter-paper::before {
            left: 50px;
            width: 2px;
          }

          .letter-header {
            margin-bottom: 30px;
            border-bottom: 2px solid #ffb3d1;
            padding-bottom: 20px;
          }

          .letter-title {
            font-size: 2rem;
          }

          .letter-content {
            margin-bottom: 30px;
            min-height: 200px;
          }

          .letter-text {
            font-size: 1.1rem;
            line-height: 1.8;
            text-indent: 20px;
          }

          .typing-cursor {
            font-size: 1.1rem;
          }

          .letter-footer {
            padding-top: 20px;
          }

          .letter-signature {
            font-size: 1.2rem;
            margin-bottom: 20px;
          }

          .close-letter-btn {
            padding: 12px 30px;
            font-size: 1.1rem;
            border-radius: 25px;
            box-shadow: 0 4px 15px rgba(255,20,147,0.3);
          }

          .close-letter-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255,20,147,0.4);
            background: linear-gradient(45deg, #ff1493, #ff69b4);
          }
        }

        /* Large desktop optimization */
        @media (min-width: 1200px) {
          .letter-container {
            max-width: 800px;
          }

          .letter-paper {
            padding: 50px;
          }

          .letter-text {
            font-size: 1.2rem;
          }
        }

        /* Small mobile optimization */
        @media (max-width: 480px) {
          .letter-container {
            max-width: 320px;
            max-height: 80vh;
          }

          .letter-paper {
            padding: 15px;
            border-radius: 10px;
          }

          .letter-title {
            font-size: 1.1rem;
          }

          .letter-text {
            font-size: 0.9rem;
            line-height: 1.5;
            text-indent: 10px;
          }

          .close-letter-btn {
            padding: 8px 16px;
            font-size: 0.9rem;
          }

          .letter-signature {
            font-size: 0.9rem;
          }
        }

        /* Fix scrollbar styling */
        .letter-container::-webkit-scrollbar {
          width: 6px;
        }

        .letter-container::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }

        .letter-container::-webkit-scrollbar-thumb {
          background: rgba(255,105,180,0.5);
          border-radius: 3px;
        }

        .letter-container::-webkit-scrollbar-thumb:hover {
          background: rgba(255,105,180,0.7);
        }
      `}</style>
    </div>
  );
};

export default LetterComponent;
