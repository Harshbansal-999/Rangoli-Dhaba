import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Expand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// import VideoModal from './VideoModal';

interface VideoReview {
  id: string;
  customerName: string;
  customerName_hindi: string;
  location: string;
  videoUrl: string;
  thumbnail: string;
  title: string;
  title_hindi: string;
  duration: string;
  rating: number;
}

const VideoReviewCard = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample video reviews data
  const videoReviews: VideoReview[] = [
    {
      id: '1',
      customerName: 'Priya Sharma',
      customerName_hindi: 'प्रिया शर्मा',
      location: 'Delhi',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: '/lovable-uploads/d02ea6f5-965c-486d-a565-edfe162127b8.png',
      title: 'Amazing Butter Chicken Experience',
      title_hindi: 'शानदार बटर चिकन का अनुभव',
      duration: '1:30',
      rating: 5
    },
    {
      id: '2',
      customerName: 'Rajesh Kumar',
      customerName_hindi: 'राजेश कुमार',
      location: 'Mumbai',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: '/lovable-uploads/e1372d37-a5ad-4350-ac24-7111c7829b8e.png',
      title: 'Best Dal Makhani in Town',
      title_hindi: 'शहर की सबसे अच्छी दाल मखनी',
      duration: '2:15',
      rating: 5
    },
    {
      id: '3',
      customerName: 'Anita Singh',
      customerName_hindi: 'अनिता सिंह',
      location: 'Jaipur',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: '/lovable-uploads/d02ea6f5-965c-486d-a565-edfe162127b8.png',
      title: 'Family Friendly Atmosphere',
      title_hindi: 'पारिवारिक माहौल',
      duration: '1:45',
      rating: 5
    }
  ];

  const currentVideo = videoReviews[currentVideoIndex];

  const handlePreviousVideo = () => {
    setCurrentVideoIndex((prev) => 
      prev === 0 ? videoReviews.length - 1 : prev - 1
    );
    setIsPlaying(false);
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prev) => 
      prev === videoReviews.length - 1 ? 0 : prev + 1
    );
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? 'text-dhaba-gold' : 'text-dhaba-cream/30'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="dhaba-card bg-dhaba-charcoal/60 border-dhaba-gold/30 hover:border-dhaba-gold/60 transition-all duration-300 overflow-hidden p-2">
      {/* Header */}
      <div className="p-[0px] sm:p-6 pb-0 text-center">
        <div className="flex items-center justify-center mb-4 ">
          <div >
            <h3 className="dhaba-hindi text-lg sm:text-xl font-semibold text-dhaba-cream mb-1 font-Playpen">
              वीडियो समीक्षा
            </h3>
            <p className="text-dhaba-gold font-medium text-sm sm:text-base">Customer Video Reviews</p>
          </div>
        </div>
      </div>

      {/* Video Player Container */}
      <div className="px-3 sm:px-6 pb-3 sm:pb-4">
        <div 
          className="relative aspect-video bg-dhaba-premium-black rounded-lg overflow-hidden group cursor-pointer"
          onClick={openModal}
        >
          {/* Video Element */}
          <video
            key={currentVideo.id}
            className="w-full h-full object-cover"
            poster={currentVideo.thumbnail}
            muted={isMuted}
            loop
            ref={(video) => {
              if (video) {
                if (isPlaying) {
                  video.play();
                } else {
                  video.pause();
                }
              }
            }}
          >
            <source src={currentVideo.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video Controls Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dhaba-premium-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Play/Pause Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="lg"
                onClick={togglePlay}
                className="w-4 h-8 sm:w-16 sm:h-16 rounded-full bg-dhaba-gold/90 hover:bg-dhaba-gold text-dhaba-charcoal backdrop-blur-sm"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 sm:w-8 sm:h-8" />
                ) : (
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-1" />
                )}
              </Button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="text-white hover:text-dhaba-gold"
                >
                  {isMuted ? (
                    <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                </Button>
                <span className="text-white text-xs sm:text-sm">{currentVideo.duration}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                }}
                className="text-white hover:text-dhaba-gold"
              >
                <Expand className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handlePreviousVideo();
            }}
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-dhaba-premium-black/70 hover:bg-dhaba-gold text-white hover:text-dhaba-charcoal backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleNextVideo();
            }}
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-dhaba-premium-black/70 hover:bg-dhaba-gold text-white hover:text-dhaba-charcoal backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>

      {/* Video Info */}
      

      {/* Video Modal */}
      {/* <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videos={videoReviews}
        initialVideoIndex={currentVideoIndex}
      /> */}
    </div>
  );
};

export default VideoReviewCard;