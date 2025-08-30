import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { X, Share, Flag } from "lucide-react";

export default function ResultScreen(): JSX.Element {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const state = searchParams.get("state");
  const expected = searchParams.get("expected");
  const isCorrect = state === "correct";

  const duoCharacters = [
    "/Duo Character 1.svg",
    "/Duo Character 2.svg", 
    "/Duo Character 3.svg",
    "/Duo Character 4.svg",
    "/Duo Character 5.svg"
  ];
  
  const [randomDuoCharacter] = React.useState(() => 
    duoCharacters[Math.floor(Math.random() * duoCharacters.length)]
  );

  React.useEffect(() => {
    if (isCorrect) {
      // Play correct answer sound
      const correctSound = new Audio("https://raw.githubusercontent.com/cjeon94/duolingo-sound-assets/main/Voicy_Correct%20answer%20sound%20effect.mp3");
      correctSound.play().catch(() => {
        console.log("Could not play correct answer sound");
      });
    } else {
      // Play incorrect answer sound
      const incorrectSound = new Audio("https://raw.githubusercontent.com/cjeon94/duolingo-sound-assets/main/Voicy_Bad%20answer.mp3");
      incorrectSound.play().catch(() => {
        console.log("Could not play incorrect answer sound");
      });
    }
  }, [isCorrect]);

  const handleContinue = () => {
    // Navigate back to lesson or next lesson
    navigate("/lesson/translate");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Main Canvas */}
      <div className="relative w-[390px] h-[844px] bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Status Bar */}
        <div className="flex justify-between items-center px-4 py-3 h-[54px]">
          <div className="text-[17px] font-semibold text-[#454a53]">9:41</div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 bg-[#454a53] rounded-sm"></div>
            <div className="w-6 h-3 border border-[#454a53] rounded-sm"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-4 px-4 mb-6">
          <button 
            className="w-8 h-8 flex items-center justify-center"
            onClick={() => navigate("/lesson/translate")}
          >
            <X className="w-5 h-5 text-[#6b7280]" />
          </button>
          <div className="flex-1 h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
            <div className="w-3/5 h-full bg-[#58cc02] rounded-full"></div>
          </div>
        </div>

        {/* Level Badge and Review Badge */}
        <div className="flex items-center justify-between px-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#ce82ff] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">6</span>
            </div>
            <span className="text-[#ce82ff] font-bold text-sm tracking-wider">LEVEL 6</span>
          </div>
          
          <div className="bg-[#ff9600] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            Review in 2 days
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-32">
          {/* Title */}
          <h1 className="text-2xl font-bold text-[#4b4b4b] mb-8">
            Translate this sentence
          </h1>

          {/* Character and Speech Bubble Row */}
          <div className="flex items-start gap-4 mb-8">
            {/* Duo Character */}
            <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
              <img 
                src={randomDuoCharacter} 
                alt="Duo character" 
                className="w-20 h-20 object-contain"
              />
            </div>
            
            {/* Speech Bubble */}
            <div className="flex-1 relative">
              <div className="bg-white border-2 border-[#e4e4e4] rounded-2xl p-4 shadow-sm relative">
                <div className="text-lg text-[#4b4b4b] font-medium">
                  Dear Ana, how are you?
                </div>
                {/* Speech bubble tail */}
                <div className="absolute left-[-8px] top-6 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-[#e4e4e4]"></div>
                <div className="absolute left-[-6px] top-6 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-white"></div>
              </div>
            </div>
          </div>

          {/* User's Answer Input */}
          <div className="mb-8">
            <div className="w-full min-h-[120px] p-4 border-2 border-[#e4e4e4] rounded-xl bg-gray-50 text-lg text-[#4b4b4b]">
              Ana, como estas?
            </div>
          </div>
        </div>

        {/* Incorrect Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#ffeaea] border-t-2 border-[#ff4b4b]">
          {/* Top Section with Icons */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#ffcccc]">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#ff4b4b] rounded-full flex items-center justify-center">
                <X className="w-4 h-4 text-white" />
              </div>
              <span className="text-[#ff4b4b] font-bold text-lg">Incorrect</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="w-8 h-8 flex items-center justify-center">
                <Share className="w-5 h-5 text-[#6b7280]" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center">
                <Flag className="w-5 h-5 text-[#6b7280]" />
              </button>
            </div>
          </div>

          {/* Correct Answer Section */}
          <div className="px-4 py-3">
            <div className="mb-3">
              <span className="text-[#ff4b4b] font-semibold text-base">Correct Answer:</span>
            </div>
            <div className="mb-4">
              <span className="text-[#ff4b4b] font-bold text-lg underline">
                Querida
              </span>
              <span className="text-[#4b4b4b] text-lg"> Ana, ¿cómo estás?</span>
            </div>
            
            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full h-12 rounded-xl text-white font-bold text-base bg-[#ff4b4b] shadow-[0_3px_0_#d73527] active:translate-y-[2px] active:shadow-none transition-all"
            >
              GOT IT
            </button>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-[134px] h-[5px] bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export { ResultScreen };