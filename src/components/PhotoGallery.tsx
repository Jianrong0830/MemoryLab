import { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PhotoType = {
  id: number;
  src: string;
  alt: string;
  tag: 'professional' | 'personal' | 'couple';
  tagLabel: string;
  description: string;
  package: string;
};

// Photo gallery data
const photos: PhotoType[] = [
  {
    id: 7,
    src: "/images/個人寫真/7DEFDEC2-864F-4BCD-A437-6535DBCE1361.png",
    alt: "個人寫真 - 展現真實自我",
    tag: "personal",
    tagLabel: "個人寫真",
    description: "展現真實自我，捕捉每個獨特瞬間",
    package: "個人寫真"
  },
  {
    id: 1,
    src: "/images/形象照/FEA84252-D13B-4A5D-8E26-26848474DFF7.jpeg",
    alt: "形象照 - 專業形象提升",
    tag: "professional",
    tagLabel: "形象照",
    description: "專業形象照，助您提升職場形象",
    package: "專業形象照"
  },
  {
    id: 13,
    src: "/images/情侶寫真/26B3E97B-EDDA-405F-B806-F4D208C66EA2.jpeg",
    alt: "情侶寫真 - 捕捉愛的故事",
    tag: "couple",
    tagLabel: "情侶寫真",
    description: "捕捉愛的故事，紀錄甜蜜時光",
    package: "情侶寫真"
  },
  {
    id: 2,
    src: "/images/形象照/5AC55731-8BFA-49D4-909B-D803C7BF4FA7_1_105_c.jpeg",
    alt: "形象照 - 自然風格",
    tag: "professional",
    tagLabel: "形象照",
    description: "自然風格形象照，展現專業與親和力",
    package: "休閒形象照"
  },
  {
    id: 11,
    src: "/images/情侶寫真/F0FDEB6E-15A2-4B76-8B2B-71FDFD2C1FB3.jpeg",
    alt: "情侶寫真 - 記錄動人瞬間",
    tag: "couple",
    tagLabel: "情侶寫真",
    description: "記錄每個動人瞬間，見證愛的旅程",
    package: "情侶寫真"
  },
  {
    id: 5,
    src: "/images/形象照/E16E6E1A-DAC3-4D91-904D-0BA9C6500882.jpeg",
    alt: "形象照 - 個性化展現",
    tag: "professional",
    tagLabel: "形象照",
    description: "個性化形象照，展現獨特魅力",
    package: "個性形象照"
  },
  {
    id: 9,
    src: "/images/個人寫真/E592A00D-170F-448D-AB8C-347FB7BFCD5B.jpeg",
    alt: "個人寫真 - 捕捉自然之美",
    tag: "personal",
    tagLabel: "個人寫真",
    description: "捕捉自然之美，展現最真實的一面",
    package: "個人寫真"
  },
  {
    id: 6,
    src: "/images/形象照/07AF62D0-B623-4B38-95BE-7874CFD67B6D.jpeg",
    alt: "形象照 - 商業場合專用",
    tag: "professional",
    tagLabel: "形象照",
    description: "專業形象照，適合商業場合使用",
    package: "個性形象照"
  },
  {
    id: 14,
    src: "/images/情侶寫真/9DDA9574-3602-4B44-97AF-958A1043C2E8.jpeg",
    alt: "情侶寫真 - 捕捉甜蜜細節",
    tag: "couple",
    tagLabel: "情侶寫真",
    description: "甜蜜寫真，捕捉愛的每個細節",
    package: "情侶寫真"
  },
  {
    id: 8,
    src: "/images/個人寫真/AD908806-86BF-40BB-A6C5-2311353C3135.jpeg",
    alt: "個人寫真 - 展現自信與個性",
    tag: "personal",
    tagLabel: "個人寫真",
    description: "展現自信與個性，捕捉每個精彩瞬間",
    package: "個人寫真"
  },
  {
    id: 12,
    src: "/images/情侶寫真/A7BE635F-CC0C-4FA1-BD18-B546C4F8418B.jpeg",
    alt: "情侶寫真 - 紀錄甜蜜時光",
    tag: "couple",
    tagLabel: "情侶寫真",
    description: "捕捉愛的故事，紀錄甜蜜時光",
    package: "情侶寫真"
  },
  {
    id: 10,
    src: "/images/個人寫真/DFC100FD-ED67-453A-BDBF-71409F0F213B.jpeg",
    alt: "個人寫真 - 展現獨特魅力",
    tag: "personal",
    tagLabel: "個人寫真",
    description: "捕捉個人獨特魅力，展現真實自我",
    package: "個人寫真"
  }
];

// Filter options
const filters = [
  { value: 'all', label: '全部作品' },
  { value: 'professional', label: '形象照' },
  { value: 'personal', label: '個人寫真' },
  { value: 'couple', label: '情侶寫真' },
];

export const PhotoGallery = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoType | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [revealedPhotos, setRevealedPhotos] = useState<number[]>([]);

  // Filter photos based on selected filter
  const filteredPhotos = filter === 'all' 
    ? photos 
    : photos.filter(photo => photo.tag === filter);

  // Handle photo navigation in dialog
  const handlePrevious = () => {
    if (!selectedPhoto) return;
    const currentPhotoIndex = filteredPhotos.findIndex(photo => photo.id === selectedPhoto.id);
    const previousIndex = (currentPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[previousIndex]);
    setCurrentIndex(previousIndex);
  };

  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentPhotoIndex = filteredPhotos.findIndex(photo => photo.id === selectedPhoto.id);
    const nextIndex = (currentPhotoIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  // Set up intersection observer for reveal animations
  useEffect(() => {
    if (!galleryRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const photoId = parseInt(entry.target.getAttribute('data-photo-id') || '0');
          setRevealedPhotos(prev => [...prev, photoId]);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
    });

    const photoElements = galleryRef.current.querySelectorAll('.photo-item');
    photoElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [filter]); // Re-initialize when filter changes

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center mb-12 gap-6">
        {/* Filter options */}
        <div className="flex flex-wrap gap-3 justify-center">
          {filters.map((filterOption) => (
            <Badge
              key={filterOption.value}
              variant={filter === filterOption.value ? "default" : "outline"}
              className={cn(
                "cursor-pointer px-5 py-2.5 text-sm transition-all duration-300 hover:shadow-md",
                filter === filterOption.value ? "bg-primary scale-105" : "hover:scale-105"
              )}
              onClick={() => setFilter(filterOption.value)}
            >
              {filterOption.label}
            </Badge>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex gap-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md">
          <button 
            onClick={() => setIsGridView(true)}
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              isGridView ? "bg-primary text-white shadow-inner" : "hover:bg-gray-100"
            )}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </button>
          <button 
            onClick={() => setIsGridView(false)}
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              !isGridView ? "bg-primary text-white shadow-inner" : "hover:bg-gray-100"
            )}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="21" y1="6" x2="3" y2="6" />
              <line x1="21" y1="12" x2="3" y2="12" />
              <line x1="21" y1="18" x2="3" y2="18" />
            </svg>
          </button>
        </div>
      </div>
      
      <div 
        ref={galleryRef} 
        className={cn(
          isGridView 
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            : "flex flex-col gap-12"
        )}
      >
        {filteredPhotos.map((photo, index) => {
          const delay = index % 3 * 100; // Stagger effect
          const isRevealed = revealedPhotos.includes(photo.id);
          const isHovered = hoveredId === photo.id;
          
          return (
            <Dialog key={photo.id} onOpenChange={(open) => {
              if (open) {
                setSelectedPhoto(photo);
                setCurrentIndex(index);
              } else {
                setSelectedPhoto(null);
              }
            }}>
              <DialogTrigger asChild>
                <div 
                  className={cn(
                    "photo-item relative overflow-hidden transition-all duration-500",
                    isGridView 
                      ? `photo-card hover-lift ${isRevealed ? 'revealed' : 'reveal-on-scroll'}` 
                      : `flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-2 transition-transform duration-500 ${isRevealed ? 'revealed' : 'reveal-on-scroll'}`
                  )}
                  data-photo-id={photo.id}
                  style={{ transitionDelay: `${delay}ms` }}
                  onMouseEnter={() => setHoveredId(photo.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Tag positioned in top-right with white text */}
                  <div className="absolute top-3 right-3 z-10 bg-primary/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm shadow-md">
                    {photo.tagLabel}
                  </div>
                  
                  {/* Image container with fixed 5:4 aspect ratio */}
                  <div className={cn(
                    "overflow-hidden relative",
                    isGridView 
                      ? "pb-[80%]" // 5:4 aspect ratio (80% = 4/5*100)
                      : "flex-shrink-0 w-1/2 pb-[40%]" // Half width with 5:4 aspect ratio
                  )}>
                    <img 
                      src={photo.src} 
                      alt={photo.alt} 
                      className={cn(
                        "absolute inset-0 w-full h-full object-cover transition-all duration-700 hover:scale-105"
                      )}
                    />
                  </div>

                  {/* Content for list view */}
                  {!isGridView && (
                    <div className="p-6 flex flex-col justify-center flex-grow">
                      <h3 className="font-semibold text-xl mb-2">{photo.package}</h3>
                      <p className="text-gray-600 mb-4">{photo.description}</p>
                      <div className="mt-auto">
                        <button className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                          查看更多
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Overlay for grid view */}
                  {isGridView && (
                    <div className={cn(
                      "image-overlay",
                      isHovered && "transform-none"
                    )}>
                      <h3 className="font-semibold text-xl mb-1">{photo.package}</h3>
                      <p className="text-sm opacity-90">{photo.description}</p>
                    </div>
                  )}

                  {/* Artistic hover effect overlay */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none",
                    isHovered && "opacity-100"
                  )}></div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] p-1 bg-background/95 backdrop-blur-md">
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handlePrevious();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 backdrop-blur-sm hover:bg-black/50 transition-colors z-50"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  
                  <img 
                    src={selectedPhoto?.src || photo.src} 
                    alt={selectedPhoto?.alt || photo.alt} 
                    className="w-full max-h-[70vh] object-contain animate-scale"
                  />
                  
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-2 backdrop-blur-sm hover:bg-black/50 transition-colors z-50"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>

                  {/* Keyboard navigation hint */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 text-white text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                    <span className="flex items-center gap-1">
                      <kbd className="px-2 py-0.5 bg-white/20 rounded">←</kbd> 上一張
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-2 py-0.5 bg-white/20 rounded">→</kbd> 下一張
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-2 py-0.5 bg-white/20 rounded">Esc</kbd> 關閉
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{selectedPhoto?.package || photo.package}</DialogTitle>
                    <DialogDescription>{selectedPhoto?.description || photo.description}</DialogDescription>
                  </DialogHeader>
                  
                  <div className="mt-4 flex justify-center">
                    {filteredPhotos.map((_, idx) => (
                      <button
                        key={idx}
                        className={`h-2.5 w-2.5 rounded-full mx-1.5 transition-all duration-300 ${idx === currentIndex ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedPhoto(filteredPhotos[idx]);
                          setCurrentIndex(idx);
                        }}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
};
