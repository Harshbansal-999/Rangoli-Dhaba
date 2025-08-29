// import React, { useState, useRef, useEffect } from 'react';
// import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, X } from 'lucide-react';

// interface VideoReview {
//   id: string;
//   customerName: string;
//   customerName_hindi: string;
//   location: string;
//   videoUrl: string;
//   thumbnail: string;
//   title: string;
//   title_hindi: string;
//   duration: string;
//   rating: number;
// }

// interface VideoModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   videos: VideoReview[];
//   initialVideoIndex: number;
// }

// const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videos, initialVideoIndex }) => {
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(initialVideoIndex);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const currentVideo = videos[currentVideoIndex];

//   useEffect(() => {
//     setCurrentVideoIndex(initialVideoIndex);
//   }, [initialVideoIndex]);

//   useEffect(() => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.play();
//       } else {
//         videoRef.current.pause();
//       }
//     }
//   }, [isPlaying]);

//   const handlePreviousVideo = () => {
//     setCurrentVideoIndex((prev) =>
//       prev === 0 ? videos.length - 1 : prev - 1
//     );
//     setIsPlaying(false);
//   };

//   const handleNextVideo = () => {
//     setCurrentVideoIndex((prev) =>
//       prev === videos.length - 1 ? 0 : prev + 1
//     );
//     setIsPlaying(false);
//   };

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const toggleMute = () => {
//     setIsMuted(!isMuted);
//     if (videoRef.current) {
//       videoRef.current.muted = !isMuted;
//     }
//   };

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <span
//         key={i}
//         className={`text-xl ${i < rating ? 'text-dhaba-gold' : 'text-dhaba-cream/30'
//           }`}
//       >
//         ★
//       </span>
//     ));
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent
//         className="
//       w-[92vw] sm:w-[88vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw]
//       max-w-none
//       max-h-[85vh] sm:max-h-[90vh]
//       bg-dhaba-premium-black border-dhaba-gold/30
//       p-0 flex flex-col
//     "
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-dhaba-gold/20 flex-shrink-0">
//           <div>
//             <h3 className="dhaba-hindi text-base sm:text-lg lg:text-xl font-semibold text-dhaba-cream mb-1">
//               वीडियो समीक्षा
//             </h3>
//             <p className="text-dhaba-gold font-medium text-xs sm:text-sm lg:text-base">
//               Customer Video Reviews
//             </p>
//           </div>
//           <div className="flex items-center space-x-2 sm:space-x-3">
            
//             <DialogClose asChild>
              
//             </DialogClose>

//           </div>
//         </div>

//         {/* Video Player */}
//         <div className="relative flex-1 bg-dhaba-premium-black group overflow-hidden px-2 sm:px-4 pb-3 sm:pb-4">
//           {/* Aspect ratio box + responsive caps */}
//           <div
//             className="
//           relative mx-auto
//           aspect-video
//           w-full
//           max-w-[85vw] sm:max-w-[75vw] md:max-w-[65vw] lg:max-w-[55vw] xl:max-w-[50vw]
//           max-h-[70vh] sm:max-h-[75vh] md:max-h-[80vh]
//         "
//           >
//             <video
//               ref={videoRef}
//               key={currentVideo.id}
//               className="absolute inset-0 w-full h-full object-contain rounded-lg"
//               poster={currentVideo.thumbnail}
//               muted={isMuted}
//               loop
//               controls={false}
//             >
//               <source src={currentVideo.videoUrl} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>

//             {/* Overlay */}
//             <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dhaba-premium-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

//             {/* Play/Pause (keep clickable) */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <Button
//                 variant="ghost"
//                 size="lg"
//                 onClick={togglePlay}
//                 className="pointer-events-auto w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-dhaba-gold/90 hover:bg-dhaba-gold text-dhaba-charcoal backdrop-blur-sm"
//               >
//                 {isPlaying ? (
//                   <Pause className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
//                 ) : (
//                   <Play className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 ml-1" />
//                 )}
//               </Button>
//             </div>

//             {/* Bottom Controls */}
//             <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 flex items-center justify-between">
//               <div className="flex items-center space-x-2 sm:space-x-3">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={toggleMute}
//                   className="pointer-events-auto text-white hover:text-dhaba-gold h-8 w-8 sm:h-10 sm:w-10"
//                 >
//                   {isMuted ? (
//                     <VolumeX className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
//                   ) : (
//                     <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
//                   )}
//                 </Button>
//                 <span className="text-white text-xs sm:text-sm lg:text-base">{currentVideo.duration}</span>
//               </div>
//             </div>

//             {/* Navigation Arrows */}
//             {videos.length > 1 && (
//               <>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={handlePreviousVideo}
//                   className="pointer-events-auto absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-dhaba-premium-black/70 hover:bg-dhaba-gold text-white hover:text-dhaba-charcoal backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                 >
//                   <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
//                 </Button>

//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={handleNextVideo}
//                   className="pointer-events-auto absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-dhaba-premium-black/70 hover:bg-dhaba-gold text-white hover:text-dhaba-charcoal backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                 >
//                   <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
//                 </Button>
//               </>
//             )}
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>

//   );
// };

// export default VideoModal;