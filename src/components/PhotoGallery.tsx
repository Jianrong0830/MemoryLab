
import { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PhotoType = {
  id: number;
  src: string;
  alt: string;
  tag: 'portrait' | 'professional' | 'creative';
  tagLabel: string;
  description: string;
  package: string;
};

// Photo gallery data
const photos: PhotoType[] = [
  {
    id: 1,
    src: "/lovable-uploads/9d61c56a-8744-45c1-943d-ba69a1d84d32.png",
    alt: "Professional portrait of a man in a suit",
    tag: "professional",
    tagLabel: "形象照方案",
    description: "專業形象照，適合履歷、LinkedIn等商業場合使用",
    package: "形象照方案"
  },
  {
    id: 2,
    src: "/lovable-uploads/fb08f974-ceab-4f61-8ace-0a52b863e27d.png",
    alt: "Casual portrait of a young man in casual clothing",
    tag: "portrait",
    tagLabel: "寫真方案",
    description: "自然風格寫真，展現真實的自我",
    package: "寫真方案"
  },
  {
    id: 3,
    src: "/lovable-uploads/e1c897df-d08c-4208-940f-c07551786266.png",
    alt: "Creative portrait with a man sitting",
    tag: "portrait",
    tagLabel: "寫真方案",
    description: "富有故事性的生活風格寫真",
    package: "寫真方案"
  },
  {
    id: 4,
    src: "/lovable-uploads/9b23681f-47ce-465c-91f4-6cd2c8d642de.png",
    alt: "Creative fashion portrait with green background",
    tag: "creative",
    tagLabel: "創意方案",
    description: "特殊主題創意拍攝，展現獨特個人風格",
    package: "客製方案"
  },
  // Empty slots for future photos
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    alt: "Portrait placeholder",
    tag: "portrait",
    tagLabel: "寫真方案",
    description: "自然風格寫真，展現真實的自我",
    package: "寫真方案"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    alt: "Professional portrait placeholder",
    tag: "professional",
    tagLabel: "形象照方案",
    description: "專業形象照，適合履歷、LinkedIn等商業場合使用",
    package: "形象照方案"
  },
];

// Filter options
const filters = [
  { value: 'all', label: '全部作品' },
  { value: 'portrait', label: '寫真方案' },
  { value: 'professional', label: '形象照方案' },
  { value: 'creative', label: '創意方案' },
];

export const PhotoGallery = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoType | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
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

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-wrap gap-3 mb-12 justify-center">
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
      
      <div ref={galleryRef} className="gallery-grid">
        {filteredPhotos.map((photo, index) => {
          const delay = index % 3 * 100; // Stagger effect
          const isRevealed = revealedPhotos.includes(photo.id);
          
          return (
            <Dialog key={photo.id}>
              <DialogTrigger asChild>
                <div 
                  className={`photo-card hover-lift photo-item ${isRevealed ? 'revealed' : 'reveal-on-scroll'}`} 
                  data-photo-id={photo.id}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  <div className={`photo-tag tag-${photo.tag}`}>{photo.tagLabel}</div>
                  <img 
                    src={photo.src} 
                    alt={photo.alt} 
                    className="w-full h-80 object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="image-overlay">
                    <h3 className="font-semibold text-xl mb-1">{photo.package}</h3>
                    <p className="text-sm opacity-90">{photo.description}</p>
                  </div>
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
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="p-6">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{selectedPhoto?.package || photo.package}</DialogTitle>
                    <DialogDescription>{selectedPhoto?.description || photo.description}</DialogDescription>
                  </DialogHeader>
                  
                  <div className="mt-4 flex justify-center">
                    {filteredPhotos.map((_, idx) => (
                      <span
                        key={idx}
                        className={`inline-block h-2 w-2 rounded-full mx-1 ${idx === currentIndex ? 'bg-primary' : 'bg-gray-300'}`}
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
