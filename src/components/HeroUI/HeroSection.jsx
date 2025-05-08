import './HeroSection.css';
import { useState, useEffect } from 'react';
import ES from '../Photos/ES.png';
import BannerImg from '../Photos/banner.jpg'; // Add your banner image
import Chatbot from '../InternalUI/Chatbot';

const Typewriter = () => {
    const texts = [
        "Welcome to ExcelSoft AI Chatbot",
        "Your Knowledge Assistant for ExcelSoft",
        "Let’s Get Started!"
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

    return <h1 className="display-5 fw-bold text-white typewriter text-center">{displayedText}</h1>;
};

function HeroSection() {
    const [showChat, setShowChat] = useState(false);

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    return (
        <div className="hero-container">
            <div className="position-relative">
                <img src={BannerImg} className="img-fluid w-100 banner-image" alt="Banner" />
                <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                    <img src={ES} alt="ExcelSoft Logo" className="mb-4" style={{ width: '200px' }} />
                    <Typewriter />
                </div>
            </div>

            <div className="container py-5">
                <div className="row justify-content-center">
                    {showChat && (
                        <div className="col-md-6">
                            <div className="p-4 bg-white shadow rounded chatbot-box">
                                <Chatbot />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="chatbot-button" onClick={toggleChat}>
                💬
            </div>
        </div>
    );
}

export default HeroSection;
