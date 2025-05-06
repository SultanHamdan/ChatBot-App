import './HeroSection.css';
import { useState, useEffect } from 'react';
import ES from '../Photos/ES.png'; 
import Chatbot from '../InternalUI/Chatbot';

const Typewriter = () => {
    const texts = [
        "WELCOME TO EXCELSOFT AI CHATBOT...",
        "ASK ANYTHING ABOUT EXCELSOFT...",
        "LET'S GET STARTED!"
    ];

    const [textIndex, setTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = texts[textIndex];

        const updatedText = isDeleting
            ? currentText.substring(0, displayedText.length - 1)
            : currentText.substring(0, displayedText.length + 1);

        setDisplayedText(updatedText);

        const typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && updatedText === currentText) {
            setTimeout(() => setIsDeleting(true), 1200);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
        }

        const timeout = setTimeout(() => {}, typingSpeed);
        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, textIndex]);

    return <h1 className="typewriter">{displayedText}</h1>;
};

function HeroSection() {
    const [showChat, setShowChat] = useState(false);

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    return (
        <div className='container'>
            <img src={ES} alt="ExcelSoft Logo" className="logo" />

            <div className="outer1">
                {!showChat && (
                    <Typewriter />
                )}

                {showChat && (
                    <div className="outer2">
                        <div className="mainsection">
                            <Chatbot/>
                        </div>
                    </div>
                )}
            </div>

            <div className="chatbot-button" onClick={toggleChat}>
                💬
            </div>
        </div>
    );
}

export default HeroSection;
